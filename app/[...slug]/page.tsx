import { notFound } from "next/navigation"
import { Metadata } from "next"
import fs from "fs/promises"
import path from "path"
import matter from 'gray-matter'


interface PageProps {
  params: {
    slug: string[]
  }
}

async function getPageFromParams(params: PageProps["params"]) {
  const slug = params?.slug?.join("/")
  const filePath = path.join(process.cwd(), 'content', 'pages', `${slug}.mdx`)

  try {
    const source = await fs.readFile(filePath, 'utf8')
    const { content } = matter(source)

    // Dynamically import the MDX file
    const MDXComponent = await import(`@/content/pages/${slug}.mdx`)

    return {
      source,
      slug,
      content,
      MDXComponent: MDXComponent.default
    }
  } catch (error) {
    return null
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const page = await getPageFromParams(params)

  if (!page) {
    return {}
    }

  return {
    title: page.slug.charAt(0).toUpperCase() + page.slug.slice(1),
  }
}

export async function generateStaticParams(): Promise<PageProps["params"][]> {
  // Read the 'pages' directory and return all MDX file paths
  const pagesDir = path.join(process.cwd(), 'content', 'pages')
  const files = await fs.readdir(pagesDir)
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace('.mdx', '').split('/'),
    }))
}

export default async function AboutPage({ params }: PageProps) {
  const page = await getPageFromParams(params)

  if (!page) {
    return notFound()
  }

  const { MDXComponent } = page

  return (
    <article className="py-6 prose dark:prose-invert">
      <MDXComponent />
    </article>
  )
}
