import { Globe } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { IconButton } from '@/components/ui/icon-button'

const LANGUAGES = ['en', 'es'] as const
type Language = (typeof LANGUAGES)[number]

export function LanguageToggle() {
  const { t, i18n } = useTranslation('common')

  const toggleLanguage = () => {
    const currentIndex = LANGUAGES.indexOf(i18n.language as Language)
    const nextLanguage = LANGUAGES[(currentIndex + 1) % LANGUAGES.length]
    void i18n.changeLanguage(nextLanguage)
  }

  return (
    <IconButton label={t('toggleLanguage')} onClick={toggleLanguage}>
      <Globe />
      <span className="text-xs font-medium uppercase leading-none">
        {i18n.language}
      </span>
    </IconButton>
  )
}
