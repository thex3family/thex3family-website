import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  type BreadcrumbProps as ChakraBreadcrumbProps,
} from "@chakra-ui/react"

import { BaseLink } from "@/components/Link"

export type BreadcrumbsProps = ChakraBreadcrumbProps & {
  slug: string
  startDepth?: number
}

type Crumb = {
  fullPath: string
  text: string
}

const Breadcrumbs = ({
  slug: originalSlug,
  startDepth = 0,
  ...props
}: BreadcrumbsProps) => {
  const { t } = useTranslation("common")
  const { locale, asPath } = useRouter()

  const hasHome = asPath !== "/"
  const slug = originalSlug.replace(`/${locale}/`, "/")
  const slugChunk = slug.split("/")
  const sliced = slugChunk.filter((item) => !!item)

  const crumbs = [
    // If homepage (e.g. "en"), set text to "home" translation
    ...(hasHome
      ? [
          {
            fullPath: "/",
            text: t("page-index-meta-title"),
          },
        ]
      : []),
    ,
    ...sliced.map((path, idx) => ({
      fullPath: slugChunk.slice(0, idx + 2).join("/") + "/",
      text: t(path+"-title"),
    })),
  ]
    .filter((item): item is Crumb => !!item)
    .slice(startDepth)

  return (
    <Breadcrumb {...props}>
      {crumbs.map(({ fullPath, text }) => {
        const normalizedSlug = slug.endsWith('/') ? slug : `${slug}/`;
        const normalizedFullPath = fullPath.endsWith('/') ? fullPath : `${fullPath}/`;
        const isCurrentPage = normalizedSlug === normalizedFullPath;
        
        return (
          <BreadcrumbItem key={fullPath} isCurrentPage={isCurrentPage}>
            <BreadcrumbLink
              as={BaseLink}
              to={fullPath}
              isPartiallyActive={isCurrentPage}
              textTransform="uppercase"
            >
              {text}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default Breadcrumbs
