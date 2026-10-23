import {
  DEFAULT_LOCALE,
  DISCORD_PATH,
  LOCALES_CODES,
  MAIN_CONTENT_ID,
} from "@/lib/constants"

export const isDiscordInvite = (href: string): boolean =>
  href.includes(DISCORD_PATH) && !href.includes("http")

export const isExternal = (href: string): boolean =>
  href.includes("http") ||
  href.includes("mailto:") ||
  href.includes("ipfs") ||
  isDiscordInvite(href)

export const isGlossary = (href: string): boolean =>
  href.includes("glossary") && href.includes("#")

export const isPdf = (href: string): boolean => href.endsWith(".pdf")

export const sanitizeHitUrl = (url: string): string =>
  url
    .replace(/^https?:\/\/[^\/]+(?=\/)/, "")
    .replace(`#${MAIN_CONTENT_ID}`, "")
    .replace("#content", "")
    .replace("#top", "")

export const isHrefActive = (
  href: string,
  pathname: string,
  isPartiallyActive?: boolean
) => {
  // remove any potential trailing slash to compare the paths correctly
  const cleanHref = href.replace(/\/+$/, "")

  return isPartiallyActive
    ? pathname.startsWith(cleanHref)
    : pathname === cleanHref
}

export const isHash = (href: string): boolean => href.startsWith("#")

/**
 * Prefixes an internal path with its locale ("/for" -> "/es/for").
 *
 * Next's Link only adds the prefix in the client bundle, so prerendered HTML
 * links every page to English until hydration. Links pass the result with
 * `locale={false}`, which Next documents as "href already has the locale".
 */
export const localizePath = (path: string, locale?: string | false) => {
  if (!locale || locale === DEFAULT_LOCALE || !path.startsWith("/")) return path
  // Already localized (in this or another locale), e.g. "/ja/x" rendered on /es
  const firstSegment = path.split(/[/?#]/)[1]
  if (LOCALES_CODES.includes(firstSegment)) return path
  return path === "/" ? `/${locale}` : `/${locale}${path}`
}
