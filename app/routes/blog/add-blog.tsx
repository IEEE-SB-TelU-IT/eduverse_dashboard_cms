'use client'

import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router'

import type { Route } from './+types/add-blog'

import { AddBlogForm } from '@/components/blog/add-blog-form'
import { Button } from '@/components/ui/button'

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Add Blog Post - Eduverse Dashboard' },
    { name: 'description', content: 'Create a new blog post' },
  ]
}

export default function AddBlogPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-1 flex-col space-y-4 sm:space-y-8 p-4 sm:p-8">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-9 w-9"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />{' '}
          </Button>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              Add New Blog Post
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Create a new blog post for your content.
            </p>
          </div>
        </div>
      </div>
      <AddBlogForm />
    </div>
  )
}
