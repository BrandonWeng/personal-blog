import { notFound } from "next/navigation"
import { Metadata } from "next"
import { getPostBySlug, getFiles } from '@/lib/mdx'

interface PostProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const postWithComponent = await getPostBySlug(params.slug.join('/'))
  if (!postWithComponent) {
    return {}
  }

  const { post, title, description } = postWithComponent

  return {
    title,
    description,
  }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  const posts = await getFiles('posts')
  return posts.map((post) => ({
    slug: post.replace(/\.mdx$/, '').split('/'),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const postWithComponent = await getPostBySlug(params.slug.join('/'))
  if (!postWithComponent) {
    notFound()
  }
  const { post, component: MDXComponent, title, description } = postWithComponent

  return (
    <article className="py-6 prose dark:prose-invert">
      <MDXComponent />
    </article>
  )
}
