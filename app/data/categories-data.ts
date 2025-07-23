export interface Category {
  category_id: number
  Category_Name: string
  slug_url: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export const categoriesData: Category[] = [
  {
    category_id: 1,
    Category_Name: 'Web Development',
    slug_url: 'web-development',
    created_at: '2024-01-15 10:30:00',
    updated_at: '2024-01-20 14:45:00',
    deleted_at: null,
  },
  {
    category_id: 2,
    Category_Name: 'Mobile Development',
    slug_url: 'mobile-development',
    created_at: '2024-01-10 09:15:00',
    updated_at: '2024-01-18 16:20:00',
    deleted_at: null,
  },
  {
    category_id: 3,
    Category_Name: 'Data Science',
    slug_url: 'data-science',
    created_at: '2024-01-05 11:00:00',
    updated_at: '2024-01-15 13:30:00',
    deleted_at: null,
  },
  {
    category_id: 4,
    Category_Name: 'UI/UX Design',
    slug_url: 'ui-ux-design',
    created_at: '2024-01-12 08:45:00',
    updated_at: '2024-01-16 12:10:00',
    deleted_at: '2024-01-25 15:30:00',
  },
  {
    category_id: 5,
    Category_Name: 'DevOps',
    slug_url: 'devops',
    created_at: '2024-01-08 14:20:00',
    updated_at: '2024-01-22 10:15:00',
    deleted_at: null,
  },
  {
    category_id: 6,
    Category_Name: 'Cybersecurity',
    slug_url: 'cybersecurity',
    created_at: '2024-01-03 16:30:00',
    updated_at: '2024-01-14 09:45:00',
    deleted_at: null,
  },
  {
    category_id: 7,
    Category_Name: 'Machine Learning',
    slug_url: 'machine-learning',
    created_at: '2024-01-01 12:00:00',
    updated_at: '2024-01-10 15:30:00',
    deleted_at: '2024-01-28 09:15:00',
  },
  {
    category_id: 8,
    Category_Name: 'Cloud Computing',
    slug_url: 'cloud-computing',
    created_at: '2023-12-28 10:15:00',
    updated_at: '2024-01-05 11:20:00',
    deleted_at: null,
  },
]
