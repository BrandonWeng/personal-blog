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
  const post = await getPostBySlug(params.slug.join('/'))

  if (!post) {
    return {}
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  }
}

export async function generateStaticParams(): Promise<PostProps["params"][]> {
  const posts = await getFiles('posts')
  return posts.map((post) => ({
    slug: post.replace(/\.mdx$/, '').split('/'),
  }))
}

export default async function PostPage({ params }: PostProps) {
  const post = await getPostBySlug(params.slug.join('/'))
  if (!post) {
    notFound()
  }

  return (
    <article className="py-6 prose dark:prose-invert">
      <h1 className="mb-2">{post.frontmatter.title}</h1>
      {post.frontmatter.description && (
        <p className="text-xl mt-0 text-slate-7000 dark:text-slate-200">
          {post.frontmatter.description}
        </p>
      )}
      <hr className="my-4" />
      <Mdx code={post.content} />
    </article>
  )
}
