/**
 * Renders JSON-LD into the raw HTML response. A plain <script> tag is used on
 * purpose: it is server-rendered inline, so crawlers that do not execute
 * JavaScript still see the structured data.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data]
  return (
    <>
      {payload.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
