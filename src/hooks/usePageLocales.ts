import { createContext, useContext } from "react"

import type { PageLocales } from "@/lib/utils/seo"

/**
 * Which languages the current page exists in, filled by RootLayout from the
 * page's props so PageMetadata can emit honest canonical and hreflang tags.
 */
export const PageLocalesContext = createContext<PageLocales>({
  contentNotTranslated: false,
})

export const usePageLocales = () => useContext(PageLocalesContext)
