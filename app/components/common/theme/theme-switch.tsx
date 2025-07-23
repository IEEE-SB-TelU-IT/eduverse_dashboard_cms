'use client'
import { Moon, Sun } from 'lucide-react'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useTheme } from '@/contexts/theme-context'

export function ThemeSwitch() {
  const { toggleTheme } = useTheme()

  return (
    <DropdownMenuItem className="cursor-pointer" onClick={toggleTheme}>
      <div className="relative mr-2 h-4 w-4">
        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute top-0 left-0 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </div>
      <span>Theme</span>
    </DropdownMenuItem>
  )
}
