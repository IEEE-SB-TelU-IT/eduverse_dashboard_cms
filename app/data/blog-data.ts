export interface Blog {
  blog_id: number
  title: string
  content_text: string
  status: 'approved' | 'rejected' | 'revision' | 'draft'
  sub_category_id: number
  created_by: number
  created_at: string
  updated_at: string
}

export const blogData: Blog[] = [
  {
    blog_id: 1,
    title: 'Getting Started with React Development',
    content_text:
      'React is a powerful JavaScript library for building user interfaces. In this comprehensive guide, we will explore the fundamentals of React development, including components, state management, and best practices for creating scalable applications.',
    status: 'approved',
    sub_category_id: 1,
    created_by: 1,
    created_at: '2024-01-15 10:30:00',
    updated_at: '2024-01-20 14:45:00',
  },
  {
    blog_id: 2,
    title: 'Advanced TypeScript Patterns',
    content_text:
      'TypeScript brings type safety to JavaScript development. This article covers advanced patterns including generics, conditional types, and utility types that can help you write more robust and maintainable code.',
    status: 'approved',
    sub_category_id: 1,
    created_by: 2,
    created_at: '2024-01-12 09:15:00',
    updated_at: '2024-01-18 16:20:00',
  },
  {
    blog_id: 3,
    title: 'Mobile App Development with React Native',
    content_text:
      'React Native allows developers to build native mobile applications using React. Learn how to set up your development environment, create components, and deploy your first mobile app.',
    status: 'draft',
    sub_category_id: 2,
    created_by: 1,
    created_at: '2024-01-10 11:00:00',
    updated_at: '2024-01-15 13:30:00',
  },
  {
    blog_id: 4,
    title: "Data Science with Python: A Beginner's Guide",
    content_text:
      'Python is one of the most popular languages for data science. This guide introduces you to essential libraries like pandas, numpy, and matplotlib for data analysis and visualization.',
    status: 'revision',
    sub_category_id: 3,
    created_by: 3,
    created_at: '2024-01-08 08:45:00',
    updated_at: '2024-01-16 12:10:00',
  },
  {
    blog_id: 5,
    title: 'UI/UX Design Principles for Developers',
    content_text:
      'Understanding design principles is crucial for developers. This article covers fundamental UI/UX concepts including color theory, typography, layout, and user experience best practices.',
    status: 'rejected',
    sub_category_id: 4,
    created_by: 2,
    created_at: '2024-01-05 14:20:00',
    updated_at: '2024-01-22 10:15:00',
  },
  {
    blog_id: 6,
    title: 'DevOps Best Practices for Modern Applications',
    content_text:
      'DevOps practices help streamline development and deployment processes. Learn about CI/CD pipelines, containerization with Docker, and infrastructure as code.',
    status: 'approved',
    sub_category_id: 5,
    created_by: 3,
    created_at: '2024-01-03 16:30:00',
    updated_at: '2024-01-14 09:45:00',
  },
  {
    blog_id: 7,
    title: 'Cybersecurity Fundamentals for Web Developers',
    content_text:
      'Security should be a top priority in web development. This comprehensive guide covers common vulnerabilities, security best practices, and tools for protecting your applications.',
    status: 'draft',
    sub_category_id: 6,
    created_by: 1,
    created_at: '2024-01-01 12:00:00',
    updated_at: '2024-01-10 15:30:00',
  },
  {
    blog_id: 8,
    title: 'Building Scalable APIs with Node.js',
    content_text:
      'Node.js is excellent for building scalable backend services. Learn how to design RESTful APIs, implement authentication, handle errors, and optimize performance.',
    status: 'approved',
    sub_category_id: 1,
    created_by: 2,
    created_at: '2023-12-28 10:15:00',
    updated_at: '2024-01-05 11:20:00',
  },
]
