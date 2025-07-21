import { SquareTerminal, Bot, House, Bell, icons, Plus, BookOpen, Scroll, SwatchBook } from 'lucide-react'

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
          url: '#',
          icon: Scroll,
        },
        {
          title: 'Categories',
          url: '#',
          icon: SwatchBook,
          
        },
      ],
    },
  ],
}
