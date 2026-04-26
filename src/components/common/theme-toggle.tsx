import { Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@/components/ui/icon-button'
import { useThemeStore } from '@/store'

export function ThemeToggle() {
  const { t } = useTranslation('common')
  const { theme, toggleTheme } = useThemeStore()

  return (
    <IconButton label={t('toggleTheme')} onClick={toggleTheme}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </IconButton>
  )
}
