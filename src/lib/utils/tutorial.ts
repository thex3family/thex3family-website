import { Lang } from "@/lib/types"

import { Skill } from "@/components/TutorialMetadata"

export interface IExternalTutorial {
  url: string
  title: string
  description: string
  author: string
  authorURL: string
  tags: Array<string>
  programType: string
  location: string
  frameworkLevel: string
  timeToRead?: string
  lang: string
  publishDate: string
  type: string
}

export interface ITutorial {
  to: string
  title: string
  description: string
  author: string
  tags?: Array<string>
  programType: string
  location: string
  frameworkLevel?: Skill
  timeToRead?: number | null
  published?: string | null
  lang: string
  isExternal: boolean
  type?: string
}

// Take all tutorials, and return a list of tutorials for a specific locale
export const filterTutorialsByLang = (
  internalTutorials: any,
  externalTutorials: Array<IExternalTutorial>,
  externalContent: Array<IExternalTutorial>,
  locale: Lang
): Array<ITutorial> => {
  const internalTutorialsMap = internalTutorials.map((tutorial) => {
    const lang = tutorial?.lang || "en"

    return {
      to: (tutorial.to || "").replace(/\\/g, "/"), // Replace backslashes with forward slashes
      title: tutorial?.title || "",
      description: tutorial?.description || "",
      author: tutorial?.author || "",
      tags: tutorial?.tags?.map((tag) => (tag || "").toLowerCase().trim()),
      programType: tutorial?.programType,
      location: tutorial?.location,
      frameworkLevel: tutorial?.frameworkLevel as Skill,
      timeToRead: tutorial?.timeToRead,
      published: tutorial?.published,
      lang: tutorial?.lang,
      isExternal: false,
      type: "program"
    }
  })

  const externalTutorialsMap = externalTutorials.map<ITutorial>(
    (tutorial: IExternalTutorial) => ({
      to: tutorial.url,
      title: tutorial.title,
      description: tutorial.description,
      author: tutorial.author,
      tags: tutorial.tags.map((tag) => tag.toLowerCase().trim()),
      programType: tutorial.programType,
      location: tutorial.location,
      frameworkLevel: tutorial?.frameworkLevel as Skill,
      timeToRead: Number(tutorial.timeToRead),
      published: tutorial.publishDate ? new Date(tutorial.publishDate).toISOString() : null,
      lang: tutorial.lang || "en",
      isExternal: true,
      type: "program"
    })
  )

  const externalContentMap = externalContent.map<ITutorial>(
    (tutorial: IExternalTutorial) => ({
      to: tutorial.url,
      title: tutorial.title,
      description: tutorial.description,
      author: tutorial.author,
      tags: tutorial.tags.map((tag) => tag.toLowerCase().trim()),
      programType: tutorial.programType,
      location: tutorial.location,
      frameworkLevel: tutorial?.frameworkLevel as Skill,
      timeToRead: Number(tutorial.timeToRead),
      published: tutorial.publishDate ? new Date(tutorial.publishDate).toISOString() : null,
      lang: tutorial.lang || "en",
      isExternal: true,
      type: "content"
    })
  )

  const allTutorials: Array<ITutorial> = [
    ...internalTutorialsMap,
    ...externalTutorialsMap,
    ...externalContentMap,
  ]

  const filteredTutorials = allTutorials
    .filter((tutorial) => tutorial.lang === locale)
    .sort((a, b) => {
      if (a.published && b.published) {
        return new Date(b.published).getTime() - new Date(a.published).getTime()
      }
      // Dont order if no published is present
      return 0
    })

  return filteredTutorials
}

export const getSortedTutorialTagsForLang = (
  filteredTutorialsByLang: Array<ITutorial> = []
) => {
  const allTags = filteredTutorialsByLang.reduce<Array<string>>(
    (tags, tutorial) => {
      return [...tags, ...(tutorial.tags || [])]
    },
    []
  )

  const reducedTags = allTags.reduce((acc, tag) => {
    if (acc[tag]) {
      acc[tag] = acc[tag] + 1
    } else {
      acc[tag] = 1
    }
    return acc
  }, {})

  const sortedTags = Object.keys(reducedTags)
    .sort()
    .reduce((obj, key) => {
      obj[key] = reducedTags[key]
      return obj
    }, {})

  return sortedTags
}
