import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { Theme } from '@/types/theme.types'
import { THEMES } from '@/types/theme.types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export class ThemeUtils {
  static isValidTheme(theme: string): theme is Theme {
    return Object.values(THEMES).includes(theme as Theme)
  }

  static getStoredTheme(storageKey: string): Theme | null {
    if (typeof window === 'undefined') return null

    try {
      const stored = localStorage.getItem(storageKey)
      return stored && this.isValidTheme(stored) ? stored : null
    } catch {
      return null
    }
  }

  static setStoredTheme(storageKey: string, theme: Theme): void {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(storageKey, theme)
    } catch {}
  }

  static applyTheme(theme: Theme, attribute = 'class'): void {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    if (attribute === 'class') {
      root.classList.remove('light', 'dark')
      root.classList.add(theme)
    } else {
      root.setAttribute(attribute, theme)
    }
  }

  static toggleTheme(currentTheme: Theme): Theme {
    return currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
  }
}
