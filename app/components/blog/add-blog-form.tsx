'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { Loader2, Info } from 'lucide-react'

import { toast } from '@/hooks/use-toast'
import { addBlogSchema, type AddBlogFormValues } from '@/schemas/blog-schema'
import { categoriesData } from '@/data/categories-data'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const AUTOSAVE_KEY = 'add-blog-form-draft'
const AUTOSAVE_DEBOUNCE_TIME = 1000

const getStatusClasses = (status: AddBlogFormValues['status']) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800'
    case 'draft':
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700'
    case 'revision':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800'
    case 'rejected':
      return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-700'
  }
}

export function AddBlogForm() {
  const form = useForm<AddBlogFormValues>({
    resolver: zodResolver(addBlogSchema),
    defaultValues: {
      title: '',
      content_text: '',
      status: 'draft',
      sub_category_id: 1,
      created_by: 1,
    },
  })

  const { handleSubmit, control, watch, reset, formState, getValues } = form
  const { isSubmitting, isDirty } = formState

  const [title, content_text] = watch(['title', 'content_text'])
  const [autosaveStatus, setAutosaveStatus] = useState<
    'idle' | 'saving' | 'saved'
  >('idle')
  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const savedDraft = localStorage.getItem(AUTOSAVE_KEY)
    if (savedDraft) {
      try {
        const parsed = JSON.parse(savedDraft)
        reset(parsed)
        toast({
          title: 'Draft Loaded',
          description: 'Your previous draft has been restored.',
          variant: 'success',
        })
      } catch (error) {
        console.error('Failed to parse saved draft:', error)
        toast({
          title: 'Error Loading Draft',
          description: 'Failed to restore your previous draft.',
          variant: 'destructive',
        })
      }
    }
  }, [reset])

  useEffect(() => {
    if (!isDirty) return

    setAutosaveStatus('saving')

    if (autosaveTimeoutRef.current) {
      clearTimeout(autosaveTimeoutRef.current)
    }

    autosaveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(getValues()))
        setAutosaveStatus('saved')
        setTimeout(() => setAutosaveStatus('idle'), 2000)
      } catch (error) {
        console.error('Autosave error:', error)
        setAutosaveStatus('idle')
        toast({
          title: 'Autosave Failed',
          description: 'Could not save your draft automatically.',
          variant: 'destructive',
        })
      }
    }, AUTOSAVE_DEBOUNCE_TIME)

    return () => {
      if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current)
    }
  }, [isDirty, getValues, title, content_text])

  const onSubmit = async (values: AddBlogFormValues) => {
    await new Promise((res) => setTimeout(res, 1500))
    toast({
      title: 'Blog Post Added!',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
      variant: 'success',
    })
    reset()
    localStorage.removeItem(AUTOSAVE_KEY)
    setAutosaveStatus('idle')
  }

  const handleReset = () => {
    reset()
    localStorage.removeItem(AUTOSAVE_KEY)
    setAutosaveStatus('idle')
    toast({
      title: 'Form Reset',
      description: 'The form has been cleared.',
      variant: 'success',
    })
  }

  const minContentLength = 50
  const currentContentLength = content_text ? content_text.length : 0

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
        <Card className="transition-all duration-300 hover:shadow-lg">
          <CardHeader className="relative">
            {autosaveStatus !== 'idle' && (
              <Badge
                variant="secondary"
                className="absolute top-4 right-4 text-xs px-2 py-1 animate-in fade-in duration-300"
              >
                {autosaveStatus === 'saving' ? 'Autosaving...' : 'Draft Saved!'}
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Card className="p-6">
                  <CardTitle className="heading-3 normal-case">
                    Basic Information
                  </CardTitle>
                  <CardDescription className="paragraph-small">
                    Provide the main details for your blog post.
                  </CardDescription>
                  <Separator />
                  <FormField
                    control={control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Give your blog a catchy title"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This will be the main title of your blog post.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue asChild>
                                <Badge
                                  variant="outline"
                                  className={`capitalize font-medium text-xs px-1.5 py-0.5 md:text-xs md:px-2 md:py-1 ${getStatusClasses(field.value)}`}
                                >
                                  {field.value}
                                </Badge>
                              </SelectValue>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">
                              <Badge
                                variant="outline"
                                className={`capitalize font-medium text-xs px-1.5 py-0.5 md:text-xs md:px-2 md:py-1 ${getStatusClasses('draft')}`}
                              >
                                Draft
                              </Badge>
                            </SelectItem>
                            <SelectItem value="revision">
                              <Badge
                                variant="outline"
                                className={`capitalize font-medium text-xs px-1.5 py-0.5 md:text-xs md:px-2 md:py-1 ${getStatusClasses('revision')}`}
                              >
                                Revision
                              </Badge>
                            </SelectItem>
                            <SelectItem value="approved">
                              <Badge
                                variant="outline"
                                className={`capitalize font-medium text-xs px-1.5 py-0.5 md:text-xs md:px-2 md:py-1 ${getStatusClasses('approved')}`}
                              >
                                Approved
                              </Badge>
                            </SelectItem>
                            <SelectItem value="rejected">
                              <Badge
                                variant="outline"
                                className={`capitalize font-medium text-xs px-1.5 py-0.5 md:text-xs md:px-2 md:py-1 ${getStatusClasses('rejected')}`}
                              >
                                Rejected
                              </Badge>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The current status of your blog post.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Card>

                <Card className="p-6">
                  <CardTitle className="heading-3 normal-case">
                    Content Details
                  </CardTitle>
                  <CardDescription className="paragraph-small">
                    Write the full content of your blog post.
                  </CardDescription>
                  <Separator />
                  <FormField
                    control={control}
                    name="content_text"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Start writing your story or article here..."
                            className="min-h-[200px] max-h-[400px] resize-none overflow-y-auto"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The full content of your blog post. Aim for at least{' '}
                          {minContentLength} characters.
                          <span
                            className={`ml-2 ${currentContentLength < minContentLength ? 'text-destructive' : 'text-muted-foreground'}`}
                          >
                            ({currentContentLength} / {minContentLength}{' '}
                            characters)
                          </span>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Card>

                <Card className="p-6 ">
                  <CardTitle className="heading-3 normal-case">
                    Metadata
                  </CardTitle>
                  <CardDescription className="paragraph-small">
                    Additional information for categorization and authorship.
                  </CardDescription>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={control}
                      name="sub_category_id"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <div className="flex items-center gap-1">
                            <FormLabel>Sub-category</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Select the category this blog post belongs to.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(Number(value))
                            }
                            defaultValue={String(field.value)}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a sub-category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categoriesData.map((category) => (
                                <SelectItem
                                  key={category.category_id}
                                  value={String(category.category_id)}
                                >
                                  {category.Category_Name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            The category this blog belongs to.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name="created_by"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <div className="flex items-center gap-1">
                            <FormLabel>Author ID</FormLabel>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-3 w-3 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>
                                  Enter the ID of the user who created this blog
                                  post.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 1"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number.parseInt(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            The ID of the user who created this blog post.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleReset}
                    disabled={isSubmitting}
                  >
                    Reset Form
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Add Blog Post
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
