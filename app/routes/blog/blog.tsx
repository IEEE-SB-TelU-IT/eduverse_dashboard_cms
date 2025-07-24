import type { Route } from './+types/blog'

import { BlogTable } from '@/components/blog/blog-table'
import { blogData } from '@/data/blog-data'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Blog - Eduverse Dashboard' },
    { name: 'description', content: 'Manage blog posts and content' },
  ]
}

export default function Blog() {
  return (
    <div className="flex flex-1 flex-col space-y-4 sm:space-y-8 p-4 sm:p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Blog Posts
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage blog posts, articles, and content publishing.
          </p>
        </div>
      </div>
      <BlogTable data={blogData} />
    </div>
  )
}
