'use client'

import * as React from 'react'

import type {
  Theme,
  ThemeContextType,
  ThemeProviderProps,
} from '@/types/theme.types'
import { THEMES } from '@/types/theme.types'
import { ThemeUtils } from '@/lib/utils'

const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined,
)

export function ThemeProvider({
  children,
  defaultTheme = THEMES.LIGHT,
  storageKey = 'eduverse-ui-theme',
  attribute = 'class',
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme)

  React.useEffect(() => {
    const storedTheme = ThemeUtils.getStoredTheme(storageKey)
    if (storedTheme) {
      setThemeState(storedTheme)
    }
  }, [storageKey])

  React.useEffect(() => {
    ThemeUtils.applyTheme(theme, attribute)
  }, [theme, attribute])

  const setTheme = React.useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme)
      ThemeUtils.setStoredTheme(storageKey, newTheme)
    },
    [storageKey],
  )

  const toggleTheme = React.useCallback(() => {
    const newTheme = ThemeUtils.toggleTheme(theme)
    setTheme(newTheme)
  }, [theme, setTheme])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault()
        toggleTheme()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toggleTheme])

  const value = React.useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={value} {...props}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = React.useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
