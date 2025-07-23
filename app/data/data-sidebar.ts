import {
  HomeIcon as House,
  Bell,
  BookOpen,
  Settings,
  Users,
  Images,
  FileText,
  Tag,
  ShieldIcon as ShieldUser,
} from 'lucide-react'

export const dataSidebar = {
  user: {
    name: 'Eduverse Admin',
    email: 'admin@gmail.com',
    avatar: '',
  },
  navMain: [
    {
      group: '',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: House,
        },
        {
          title: 'Notifications',
          url: '/',
          icon: Bell,
        },
      ],
    },

    {
      group: 'Content Manager',
      items: [
        {
          title: 'Courses',
          url: '/content-manager/courses',
          icon: BookOpen,
        },
        {
          title: 'Blog',
          url: '/blog',
          icon: FileText,
        },
        {
          title: 'Categories',
          url: '/categories',
          icon: Tag,
        },
      ],
    },

    {
      group: 'Resources',
      items: [
        {
          title: 'Media',
          url: '/content-manager/courses',
          icon: Images,
        },
      ],
    },

    {
      group: 'Settings',
      items: [
        {
          title: 'General Settings',
          url: '/',
          icon: Settings,
        },
        {
          title: 'Users',
          url: '/content-manager/courses',
          icon: Users,
        },
        {
          title: 'Roles',
          url: '/content-manager/courses',
          icon: ShieldUser,
        },
      ],
    },
  ],
}
