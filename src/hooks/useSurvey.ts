import { useMemo } from "react"
import { useRouter } from "next/router"

import { SITE_URL } from "@/lib/constants"

export const useSurvey = (feedbackSubmitted: boolean) => {
  const { asPath } = useRouter()
  const url = SITE_URL + asPath
  return useMemo((): string | null => {
    if (!feedbackSubmitted) return null
    return `https://ask.x3.family/thex3family-website-feedback//?url=${url}`
  }, [feedbackSubmitted, url])
}
