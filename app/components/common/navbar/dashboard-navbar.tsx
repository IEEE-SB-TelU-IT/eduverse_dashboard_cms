import { Separator } from '@radix-ui/react-separator'

import { SidebarTrigger } from '@/components/ui/sidebar'

export default function DashboardNavbar() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <nav className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
      </nav>
    </header>
  )
}
