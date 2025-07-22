import * as React from 'react'
import { Command } from 'lucide-react'
import { Link } from 'react-router'

import { NavMain } from '@/components/common/sidebar/items/nav-main'
import { NavUser } from '@/components/common/sidebar/items/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { dataSidebar } from '@/data/data-sidebar'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Eduverse</span>
                  <span className="truncate text-xs">Dashboard CMS</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain groups={dataSidebar.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={dataSidebar.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
