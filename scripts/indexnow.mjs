#!/usr/bin/env node
/**
 * Ping IndexNow with every public URL in the sitemap.
 *
 * IndexNow feeds Bing (and therefore Copilot and DuckDuckGo), Yandex, Seznam
 * and Naver. Google does not use it. Run it after a deploy that changes public
 * page content:
 *
 *   node scripts/indexnow.mjs            # show what would be submitted
 *   node scripts/indexnow.mjs --submit   # actually POST to api.indexnow.org
 *
 * The key file must be reachable at https://<host>/<key>.txt and contain
 * exactly the key. It lives in public/, so deploying the site publishes it.
 */

const KEY = process.env.INDEXNOW_KEY || '56fd194fbf8271a96cf86b9b7eded128'
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://subscription-tracker-vert.vercel.app'
).replace(/\/+$/, '')
const ENDPOINT = 'https://api.indexnow.org/indexnow'

const host = new URL(SITE_URL).host
const submit = process.argv.includes('--submit')

async function readSitemapUrls() {
  const sitemapUrl = `${SITE_URL}/sitemap.xml`
  const response = await fetch(sitemapUrl)
  if (!response.ok) {
    throw new Error(`Could not fetch ${sitemapUrl}: HTTP ${response.status}`)
  }
  const xml = await response.text()
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim())
  if (urls.length === 0) throw new Error(`No <loc> entries found in ${sitemapUrl}`)
  return urls
}

async function main() {
  const urlList = await readSitemapUrls()

  const payload = {
    host,
    key: KEY,
    keyLocation: `${SITE_URL}/${KEY}.txt`,
    urlList,
  }

  if (!submit) {
    console.log('Dry run — nothing was submitted. Re-run with --submit to send this:\n')
    console.log(JSON.stringify(payload, null, 2))
    console.log(`\nPOST ${ENDPOINT}`)
    console.log(`\nBefore submitting, check ${payload.keyLocation} returns the key as text/plain.`)
    return
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })

  // IndexNow returns 200 (accepted) or 202 (accepted, key validation pending).
  console.log(`${response.status} ${response.statusText}`)
  const body = await response.text()
  if (body) console.log(body)
  if (!response.ok && response.status !== 202) process.exitCode = 1
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
