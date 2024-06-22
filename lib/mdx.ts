import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

export async function getAllFilesFrontMatter(type: string): Promise<PostFrontmatter[]> {
  const files = fs.readdirSync(path.join(root, 'content', type));

  return files.reduce((allPosts: PostFrontmatter[], postSlug: string) => {
    const source = fs.readFileSync(
      path.join(root, 'content', type, postSlug),
      'utf8'
    );

    const { data, content } = matter(source);

    const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i);
    const h2Match = content.match(/<h2[^>]*>(.*?)<\/h2>/i);

    return [
      {
        ...data,
        slug: postSlug.replace('.mdx', ''),
        title: h1Match ? h1Match[1] : undefined,
        description: h2Match ? h2Match[1] : undefined,
      },
      ...allPosts,
    ];
  }, []);
}


interface PostWithComponent {
  post: Post;
  component: React.ComponentType;
  title: string;
  description: string;
}

export async function getPostBySlug(slug: string): Promise<PostWithComponent | null> {
  const filePath = path.join(root, 'content', 'posts', `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)
  const MDXComponent = await import(`@/content/posts/${slug}.mdx`)
  const h1Match = content.match(/<h1[^>]*>(.*?)<\/h1>/i)
  const h2Match = content.match(/<h2[^>]*>(.*?)<\/h2>/i)
  return {
    post: {
      slug,
      content,
      frontmatter: data as PostFrontmatter,
    },
    component: MDXComponent.default,
    title: h1Match ? h1Match[1] : undefined,
    description: h2Match ? h2Match[1] : undefined,
  }
}
