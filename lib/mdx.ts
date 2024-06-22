import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

const root = process.cwd()

interface PostFrontmatter {
  title: string;
  description?: string;
  [key: string]: any; // For any additional frontmatter fields
}

interface Post {
  slug: string;
  content: string;
  frontmatter: PostFrontmatter;
}


export async function getFiles(type: string) {
  return fs.readdirSync(path.join(root, 'content', type))
}

export async function getFileBySlug(type: string, slug: string) {
  const source = slug
    ? fs.readFileSync(path.join(root, 'content', type, `${slug}.mdx`), 'utf8')
    : fs.readFileSync(path.join(root, 'content', `${type}.mdx`), 'utf8')

  const { data, content } = matter(source)
  const mdxSource = await serialize(content, {})

  return {
    mdxSource,
    frontMatter: {
      slug: slug || null,
      ...data,
    },
  }
}

export async function getAllFilesFrontMatter(type: string) {
  const files = fs.readdirSync(path.join(root, 'content', type))

  return files.reduce((allPosts: any[], postSlug: string) => {
    const source = fs.readFileSync(
      path.join(root, 'content', type, postSlug),
      'utf8'
    )
    const { data } = matter(source)

    return [
      {
        ...data,
        slug: postSlug.replace('.mdx', ''),
      },
      ...allPosts,
    ]
  }, [])
}



export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(root, 'content', 'posts', `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)

  return {
    slug,
    content,
    frontmatter: data as PostFrontmatter,
  } as Post
}
