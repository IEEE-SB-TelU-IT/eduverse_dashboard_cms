import { z } from 'zod'

export const addBlogSchema = z.object({
  title: z
    .string()
    .min(5, { message: 'Title must be at least 5 characters.' })
    .max(100, { message: 'Title must not exceed 100 characters.' }),
  content_text: z
    .string()
    .min(50, { message: 'Content must be at least 50 characters.' }),
  status: z.enum(['approved', 'rejected', 'revision', 'draft'], {
    errorMap: () => ({ message: 'Please select a valid status.' }),
  }),
  sub_category_id: z.coerce
    .number()
    .min(1, { message: 'Sub Category ID must be a positive number.' }),
  created_by: z.coerce
    .number()
    .min(1, { message: 'Created By ID must be a positive number.' }),
})

export type AddBlogFormValues = z.infer<typeof addBlogSchema>
