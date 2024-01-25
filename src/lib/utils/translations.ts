import { Lang, Languages } from "@/lib/types"

import { DEFAULT_LOCALE } from "@/lib/constants"

import i18nConfig from "../../../i18n.config.json"

// same data as in the `config.json` but indexed by language code
export const languages: Languages = i18nConfig.reduce((result, config) => {
  return { ...result, [config.code]: config }
}, {} as Languages)

export const isLangRightToLeft = (lang: Lang): boolean => {
  const langConfig = i18nConfig.filter((language) => language.code === lang)

  if (!langConfig.length)
    throw new Error("Language code not found in isLangRightToLeft")

  return langConfig[0].langDir === "rtl"
}

// Overwrites the default Persian numbering of the Farsi language to use Hindu-Arabic numerals (0-9)
// Context: https://github.com/ethereum/ethereum-org-website/pull/5490#pullrequestreview-892596553
export const getLocaleForNumberFormat = (locale: Lang): Lang =>
  locale === "fa" ? DEFAULT_LOCALE : locale

export const isLang = (lang: string) => {
  return i18nConfig.map((language) => language.code).includes(lang)
}

export const getRequiredNamespacesForPage = (
  path: string,
  layout?: string | undefined
) => {
  const baseNamespaces = ["common"]

  const requiredNamespacesForPath = getRequiredNamespacesForPath(path)
  const requiredNamespacesForLayout = getRequiredNamespacesForLayout(layout)

  return [
    ...baseNamespaces,
    ...requiredNamespacesForPath,
    ...requiredNamespacesForLayout,
  ]
}

const getRequiredNamespacesForPath = (path: string) => {
  let primaryNamespace: string | undefined // the primary namespace for the page
  let requiredNamespaces: string[] = [] // any additional namespaces required for the page

  if (path === "assets") {
    primaryNamespace = "page-assets"
  }

  if (path === "/") {
    primaryNamespace = "page-index"
  }
  

  if (path.startsWith("/glossary")) {
    requiredNamespaces = [...requiredNamespaces, "glossary"]
  }

  if (path.startsWith("/unlock-your-potential")) {
    primaryNamespace = "page-unlock-your-potential"
    requiredNamespaces = [
      ...requiredNamespaces,
      "page-docs",
    ]
  }

  if (path.startsWith("/languages")) {
    primaryNamespace = "page-languages"
  }

  if (path.startsWith("/understand-yourself/understand-the-framework")) {
    primaryNamespace = "page-understand-the-framework"
  }

  if (path.startsWith("/unlock-your-potential/programs")) {
    primaryNamespace = "page-programs"
    requiredNamespaces = [...requiredNamespaces, "page-understand-the-framework", "glossary"]
  }

  if (path.startsWith("/live-your-best-life/about-us")) {
    primaryNamespace = "page-about-us"
  }



  // Quizzes
  // Note: Add any URL paths that have quizzes here
  if (
    path.startsWith("/live-your-best-life/about-us") ||
    path.startsWith("/understand-yourself/quizzes")
  ) {
    requiredNamespaces = [...requiredNamespaces, "quizzes"]
  }

  // Ensures that the primary namespace is always the first item in the array
  return primaryNamespace ? [primaryNamespace, ...requiredNamespaces] : [...requiredNamespaces]
}

const getRequiredNamespacesForLayout = (layout?: string) => {
  let requiredNamespaces: string[] = []

  // namespaces required for all layouts
  if (layout) {
    requiredNamespaces = [...requiredNamespaces, "glossary", "common"]
  }

  if (layout === "docs") {
    requiredNamespaces = [...requiredNamespaces, "page-docs"]
  }

  if (layout === "program") {
    requiredNamespaces = [...requiredNamespaces, "page-programs"]
  }

  return requiredNamespaces
}
