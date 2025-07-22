import {
  House,
  Bell,
  BookOpen,
  Settings,
  Users,
  Images,
  FileText,
  Tag,
  ShieldUser,
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
          url: '/',
          icon: FileText,
        },
        {
          title: 'Categories',
          url: '/',
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
