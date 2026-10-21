import { ComparisonPage } from '@/components/comparison-page'
import { getComparison } from '@/content/comparisons'
import { buildMetadata } from '@/lib/seo'

const comparison = getComparison('/vs-bobby')

export const metadata = buildMetadata({
  title: comparison.title,
  description: comparison.description,
  path: comparison.path,
  type: 'article',
})

export default function Page() {
  return <ComparisonPage comparison={comparison} />
}
