import type React from 'react'
import { Links, Meta, ScrollRestoration, Scripts } from 'react-router'

import type { Route } from '../+types/root'

import '@/css/app.css'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/common/sidebar/app-sidebar'
import DashboardNavbar from '@/components/common/navbar/dashboard-navbar'
import { ThemeProvider } from '@/contexts/theme-context'

export function DashbboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ThemeProvider
          defaultTheme="light"
          storageKey="eduverse-ui-theme"
          attribute="class"
        >
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <DashboardNavbar />
              <div className="flex flex-1 flex-col gap-4 p-2 sm:p-4 pt-0">
                {children}
                <ScrollRestoration />
                <Scripts />
              </div>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap',
  },
]
