import Head from "next/head"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { alternateLinks, localeUrl } from "@/lib/utils/seo"

import { DEFAULT_LOCALE, SITE_URL } from "@/lib/constants"

import { usePageLocales } from "@/hooks/usePageLocales"

type NameMeta = {
  name: string
  content: string
}

type PropMeta = {
  property: string
  content: string
}

export type Meta = NameMeta | PropMeta

export interface IProps {
  title: string
  description: string
  image?: string
  canonicalUrl?: string
  author?: string
}

const PageMetadata: React.FC<IProps> = ({
  description,
  title,
  image,
  canonicalUrl,
  author,
}) => {
  const { locale, asPath } = useRouter()
  const { t } = useTranslation()
  const { availableLocales, contentNotTranslated } = usePageLocales()

  const desc = description || t("site-description")
  const siteTitle = t("site-title")
  const fullTitle = `${title} | ${siteTitle}`

  // This page's own URL in the current locale (no query, hash or trailing slash)
  const url = localeUrl(asPath, locale!)

  /**
   * A page showing English text as a fallback is a duplicate of the English
   * page, so it points search engines there instead of at itself.
   */
  const isFallback = contentNotTranslated && locale !== DEFAULT_LOCALE
  const canonical =
    canonicalUrl || (isFallback ? localeUrl(asPath, DEFAULT_LOCALE) : url)
  const alternates = alternateLinks(asPath, availableLocales)

  /* Set fallback ogImage based on path */
  let ogImage = "/home/hero.png"

  if (image) {
    ogImage = image
  }

  const ogImageUrl = new URL(ogImage, SITE_URL).href
  const metadata: Meta[] = [
    { name: `description`, content: desc },
    { name: `image`, content: ogImageUrl },
    { property: `og:title`, content: fullTitle },
    { property: `og:description`, content: desc },
    { property: `og:type`, content: `website` },
    { name: `twitter:card`, content: `summary_large_image` },
    { name: `twitter:creator`, content: author || siteTitle },
    { name: `twitter:site`, content: author || siteTitle },
    { name: `twitter:title`, content: fullTitle },
    { name: `twitter:description`, content: desc },
    { name: `twitter:image`, content: ogImageUrl },
    { property: `og:url`, content: url },
    { property: `og:image`, content: ogImageUrl },
    { property: `og:site_name`, content: siteTitle },
    { name: `docsearch:description`, content: desc },
  ]

  return (
    <Head>
      <title>{fullTitle}</title>
      {metadata.map((data) => (
        <meta
          key={(data as NameMeta).name || (data as PropMeta).property}
          {...data}
        />
      ))}
      <link rel="canonical" key="canonical" href={canonical} />
      {alternates.map(({ hreflang, href }) => (
        <link
          rel="alternate"
          key={`alternate-${hreflang}`}
          hrefLang={hreflang}
          href={href}
        />
      ))}
    </Head>
  )
}

export default PageMetadata
