import Link from "next/link"
import { getAllFilesFrontMatter } from "@/lib/mdx"

export default async function Home() {
  const posts = await getAllFilesFrontMatter('posts')
  return (
    <div className="prose dark:prose-invert">
      {posts.map((post) => (
        <article key={post.slug} className="mb-6">
          <div className="flex items-center justify-between">
            <Link href={`/posts/${post.slug}`} prefetch={true}>
              <h2 className="mb-0">{post.title}</h2>
            </Link>
            {post.date && <p className="text-sm text-gray-500 mb-0">{post.date.toLocaleDateString()}</p>}
          </div>
          {post.description && <p className="mt-2">{post.description}</p>}
        </article>
      ))}
    </div>
  )
}
