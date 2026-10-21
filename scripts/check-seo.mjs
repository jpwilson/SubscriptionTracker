#!/usr/bin/env node
/**
 * Asserts the discoverability basics against a running build.
 *
 * Every public page must have, in the raw HTML with no JavaScript executed:
 * a unique <title>, a meta description, an absolute self-referencing canonical,
 * exactly one <h1>, JSON-LD that parses, and more than 300 words of text.
 * It also checks robots.txt, sitemap.xml and the two llms files.
 *
 *   npm run build && npm start &      # or: next start -p 3001
 *   node scripts/check-seo.mjs        # defaults to http://localhost:3001
 *   CHECK_BASE_URL=http://localhost:3000 node scripts/check-seo.mjs
 */

import { readFileSync } from 'node:fs'

const BASE = (process.env.CHECK_BASE_URL || 'http://localhost:3001').replace(/\/+$/, '')
const EXPECTED_HOST = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://subscription-tracker-vert.vercel.app'
).replace(/\/+$/, '')
const MIN_WORDS = 300

/** Read the page list out of src/lib/site.ts so the two cannot drift apart. */
function publicPaths() {
  const source = readFileSync(new URL('../src/lib/site.ts', import.meta.url), 'utf8')
  const entries = [...source.matchAll(/^\s{4}path: '([^']+)',$([\s\S]*?)^\s{2}\},$/gm)].map(
    (match) => ({ path: match[1], thin: /thin: true/.test(match[2]) })
  )
  if (entries.length === 0) throw new Error('Could not read PUBLIC_PAGES from src/lib/site.ts')
  return entries
}

function visibleText(html) {
  return html
    .replace(/<(script|style|noscript|svg|template)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const failures = []
const notes = []
function check(ok, message) {
  if (ok) return true
  failures.push(message)
  return false
}

async function get(path) {
  const response = await fetch(`${BASE}${path}`, { redirect: 'manual' })
  return { response, body: await response.text() }
}

async function checkPage({ path, thin }, seenTitles) {
  const { response, body } = await get(path)
  const label = path === '/' ? '/ (home)' : path

  if (!check(response.status === 200, `${label}: expected HTTP 200, got ${response.status}`)) return

  const title = body.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.trim()
  check(Boolean(title), `${label}: no <title>`)
  if (title) {
    check(!seenTitles.has(title), `${label}: duplicate <title> "${title}"`)
    seenTitles.add(title)
    if (title.length > 65) notes.push(`${label}: title is ${title.length} chars (aim for <= 60)`)
  }

  const description = body.match(/<meta name="description" content="([^"]*)"/)?.[1]
  check(Boolean(description), `${label}: no meta description`)
  if (description && (description.length < 70 || description.length > 185)) {
    notes.push(`${label}: meta description is ${description.length} chars (aim for 140-160)`)
  }

  const canonical = body.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  const expected = path === '/' ? EXPECTED_HOST : `${EXPECTED_HOST}${path}`
  check(canonical === expected, `${label}: canonical is ${canonical ?? 'missing'}, expected ${expected}`)

  const h1s = body.match(/<h1[\s>]/g) ?? []
  check(h1s.length === 1, `${label}: found ${h1s.length} <h1> elements, expected exactly 1`)

  check(
    /<meta property="og:title"/.test(body) && /<meta property="og:description"/.test(body),
    `${label}: missing Open Graph title/description`
  )
  check(/<meta name="twitter:card" content="summary_large_image"/.test(body), `${label}: missing twitter:card`)
  check(/<html lang="en"/.test(body), `${label}: missing lang attribute on <html>`)

  const blocks = [...body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
  check(blocks.length > 0, `${label}: no JSON-LD`)
  for (const [, json] of blocks) {
    try {
      const parsed = JSON.parse(json)
      check(Boolean(parsed['@type']), `${label}: JSON-LD block has no @type`)
    } catch (error) {
      failures.push(`${label}: JSON-LD does not parse (${error.message})`)
    }
  }
  check(!/aggregateRating/i.test(body), `${label}: contains aggregateRating — only use it with real reviews`)
  check(!/subtracker\.app/.test(body), `${label}: references subtracker.app, which does not resolve`)

  const words = visibleText(body).split(' ').filter(Boolean).length
  // The sign-in page is a form, not a content page, so the word floor is for the rest.
  if (!thin) {
    check(words > MIN_WORDS, `${label}: only ${words} words of crawler-visible text (need > ${MIN_WORDS})`)
  }
  console.log(`  ${label.padEnd(34)} ${String(words).padStart(5)} words  ${blocks.length} JSON-LD block(s)`)
}

async function checkRobots() {
  const { response, body } = await get('/robots.txt')
  check(response.status === 200, `/robots.txt: HTTP ${response.status}`)
  check(body.includes(`Sitemap: ${EXPECTED_HOST}/sitemap.xml`), '/robots.txt: missing absolute Sitemap line')
  for (const bot of [
    'OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'Claude-SearchBot', 'Claude-User', 'ClaudeBot',
    'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Googlebot', 'bingbot', 'Applebot',
    'Applebot-Extended', 'DuckAssistBot', 'meta-externalagent', 'CCBot',
  ]) {
    check(body.includes(`User-Agent: ${bot}`), `/robots.txt: no explicit group for ${bot}`)
  }
  check(!/Disallow: \/$/m.test(body), '/robots.txt: blanket Disallow: / found')
}

async function checkSitemap(paths) {
  const { response, body } = await get('/sitemap.xml')
  check(response.status === 200, `/sitemap.xml: HTTP ${response.status}`)
  check(
    (response.headers.get('content-type') || '').includes('xml'),
    `/sitemap.xml: content-type is ${response.headers.get('content-type')}`
  )
  for (const { path } of paths) {
    const url = path === '/' ? EXPECTED_HOST : `${EXPECTED_HOST}${path}`
    check(body.includes(`<loc>${url}</loc>`), `/sitemap.xml: missing ${url}`)
  }
  check(/<lastmod>/.test(body), '/sitemap.xml: no lastmod values')
}

async function checkTextFile(path, minWords) {
  const { response, body } = await get(path)
  check(response.status === 200, `${path}: HTTP ${response.status}`)
  const type = response.headers.get('content-type') || ''
  check(type.includes('text/plain'), `${path}: content-type is "${type}", expected text/plain`)
  check(!/<!DOCTYPE html|<html/i.test(body), `${path}: served HTML instead of plain text`)
  const words = body.split(/\s+/).filter(Boolean).length
  check(words > minWords, `${path}: only ${words} words (need > ${minWords})`)
  console.log(`  ${path.padEnd(34)} ${String(words).padStart(5)} words  ${type}`)
}

async function checkMissingPath() {
  const { response } = await get('/this-path-does-not-exist-9f2a')
  check(response.status === 404, `unknown path should 404, got ${response.status}`)
}

async function checkRedirect() {
  const { response } = await get('/vs-truebill')
  check(
    response.status === 308 || response.status === 301,
    `/vs-truebill should permanently redirect, got ${response.status}`
  )
}

async function main() {
  const paths = publicPaths()
  console.log(`Checking ${paths.length} public pages at ${BASE}\n`)

  const seenTitles = new Set()
  for (const page of paths) await checkPage(page, seenTitles)

  console.log('')
  await checkTextFile('/llms.txt', 150)
  await checkTextFile('/llms-full.txt', 1200)
  await checkRobots()
  await checkSitemap(paths)
  await checkMissingPath()
  await checkRedirect()

  if (notes.length > 0) {
    console.log(`\n${notes.length} note(s):`)
    for (const note of notes) console.log(`  - ${note}`)
  }

  if (failures.length > 0) {
    console.error(`\n${failures.length} check(s) FAILED:`)
    for (const failure of failures) console.error(`  ✗ ${failure}`)
    process.exit(1)
  }

  console.log('\nAll SEO checks passed.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
