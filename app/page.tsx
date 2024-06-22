import Link from "next/link"
import { getAllFilesFrontMatter } from "@/lib/mdx"

export default async function Home() {
  const posts = await getAllFilesFrontMatter('posts')

  return (
    <div className="prose dark:prose-invert">
      {posts.map((post) => (
        <article key={post.slug}>
          <Link href={`/posts/${post.slug}`}>
            <h2>{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  )
}
