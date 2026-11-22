import type { Lang } from "@/lib/types"

import { DEFAULT_LOCALE, LOCALES_CODES, SITE_URL } from "@/lib/constants"

// Locale codes that need a script subtag in hreflang to name the written language
const HREFLANG_TAGS: Partial<Record<string, string>> = { zh: "zh-Hans" }

/**
 * Absolute URL of a page in one locale: English has no prefix, the others
 * are prefixed ("/es/for"). Query strings, hashes and trailing slashes are
 * dropped so every locale's URL is spelled one way.
 */
export const localeUrl = (asPath: string, locale: string): string => {
  const path = asPath.replace(/[?#].*/, "").replace(/\/+$/, "") || "/"
  const prefixed =
    locale === DEFAULT_LOCALE
      ? path
      : path === "/"
        ? `/${locale}`
        : `/${locale}${path}`
  return new URL(prefixed, SITE_URL).href.replace(/\/$/, "")
}

export type AlternateLink = { hreflang: string; href: string }

/**
 * hreflang alternates for a page: one per locale that has the page in its own
 * language, plus x-default (English) for readers matching none of them.
 */
export const alternateLinks = (
  asPath: string,
  availableLocales: readonly string[] = LOCALES_CODES
): AlternateLink[] => [
  ...availableLocales.map((locale) => ({
    hreflang: HREFLANG_TAGS[locale] ?? locale,
    href: localeUrl(asPath, locale),
  })),
  { hreflang: "x-default", href: localeUrl(asPath, DEFAULT_LOCALE) },
]

export type PageLocales = {
  /** Locales with this page in their own language; undefined means all of them */
  availableLocales?: Lang[]
  /** True when this locale's URL is showing the English text as a fallback */
  contentNotTranslated: boolean
}
