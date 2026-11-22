import { useMemo, useState } from "react"
import { useRouter } from "next/router"

import type { Lang } from "@/lib/types"

import { languages } from "@/lib/utils/translations"

export type LanguageOption = {
  code: Lang
  /** The language's name in itself, e.g. "日本語" */
  localName: string
  /** The language's name in the reader's current language, e.g. "Japanese" */
  displayName: string
  isCurrent: boolean
}

// Next.js reads this cookie to pick the locale on the next visit to "/"
const LOCALE_COOKIE = "NEXT_LOCALE"
const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365

export const rememberLocale = (code: Lang) => {
  document.cookie = `${LOCALE_COOKIE}=${code}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; samesite=lax`
}

// Locale codes that need a script subtag to name the right written language
const DISPLAY_TAGS: Partial<Record<string, string>> = { zh: "zh-Hans" }

const displayNameIn = (uiLocale: string, code: string, fallback: string) => {
  try {
    return (
      new Intl.DisplayNames([uiLocale], { type: "language" }).of(
        DISPLAY_TAGS[code] ?? code
      ) ?? fallback
    )
  } catch {
    return fallback
  }
}

export const useLanguagePicker = () => {
  const { locale, asPath } = useRouter()
  const [filter, setFilter] = useState("")

  const options: LanguageOption[] = useMemo(
    () =>
      Object.values(languages).map(({ code, localName, name }) => ({
        code,
        localName,
        displayName: displayNameIn(locale!, code, name),
        isCurrent: code === locale,
      })),
    [locale]
  )

  const query = filter.trim().toLowerCase()
  const filteredOptions = query
    ? options.filter(
        ({ code, localName, displayName }) =>
          code.includes(query) ||
          localName.toLowerCase().includes(query) ||
          displayName.toLowerCase().includes(query)
      )
    : options

  return {
    asPath,
    locale: locale as Lang,
    options,
    filteredOptions,
    filter,
    setFilter,
  }
}
