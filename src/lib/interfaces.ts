import { StaticImageData } from "next/image"
import type { ReactNode } from "react"

import type {
  CrowdinContributor,
  Frontmatter,
  Lang,
  Layout,
  ToCItem,
  TranslationKey,
} from "@/lib/types"

/**
 * Quiz data interfaces
 */
export interface AnswerChoice {
  answerId: string
  isCorrect: boolean
}

export interface Answer {
  id: string
  label: TranslationKey
  explanation: TranslationKey
  moreInfoLabel?: string
  moreInfoUrl?: string
}

export interface RawQuestion {
  prompt: TranslationKey
  answers: Answer[]
  correctAnswerId: string
}

export interface Question extends RawQuestion {
  id: string
}

export interface QuestionBank {
  [key: string]: RawQuestion
}

export interface RawQuiz {
  title: TranslationKey
  questions: string[] // TODO: Force to be an array of questionID's
}

export interface Quiz {
  title: string
  questions: Question[]
}

export interface RawQuizzes {
  [key: string]: RawQuiz
}

export interface DeveloperDocsLink {
  id: TranslationKey
  to: string
  path: string
  title: TranslationKey
  description: TranslationKey
  items: DeveloperDocsLink[]
}

/**
 * Layout interface
 */
export interface SharedFrontmatter {
  title: string
  description: string
  lang: Lang
  sidebarDepth?: number
  isOutdated?: boolean
  template?: Layout
  emoji?: string
}

export interface StaticFrontmatter extends SharedFrontmatter {
  hideEditButton?: boolean
}

/**
 * TODO: Refactor markdown content that currently uses SummaryPointsNumbered
 * to use SummaryPoints (`summaryPoints: string[]`) instead. Then
 * deprecate @/lib/util/getSummaryPoints.ts
 */
export interface SummaryPointsNumbered {
  summaryPoint1?: string
  summaryPoint2?: string
  summaryPoint3?: string
  summaryPoint4?: string
}

interface ImageInfo {
  image: string
  alt: string
  blurDataURL: string
}

export interface MainFrontmatter
  extends SharedFrontmatter,
    SummaryPointsNumbered,
    ImageInfo {}

export interface DocsFrontmatter extends SharedFrontmatter {
  incomplete?: boolean
  hideEditButton?: boolean
}

export interface TutorialFrontmatter extends SharedFrontmatter {
  tags: string[]
  author: string
  source?: string
  sourceUrl?: string
  programType: string
  location: string
  frameworkLevel: string
  published: string
  address?: string
  hideEditButton?: boolean
}

export interface JobsFrontmatter extends SharedFrontmatter {
  compensation: string
}

export interface MdPageContent {
  slug: string
  content: string
  frontmatter: Frontmatter
  tocItems: ToCItem[]
  lastUpdatedDate?: string
  contentNotTranslated: boolean
  crowdinContributors: CrowdinContributor[]
}

// Local environment framework
export interface Framework {
  id: string
  url: string
  githubUrl: string
  background: string
  name: string
  description: string
  alt: string
  image: StaticImageData
  starCount?: number
  languages?: string[]
}

/**
 * Community events
 */

export interface CommunityEventsReturnType {
  pastEventData: CommunityEvent[]
  upcomingEventData: CommunityEvent[]
}

export interface CommunityEvent {
  date: string
  title: string
  calendarLink: string
}

export interface ReqCommunityEvent {
  start: { dateTime: string }
  summary: string
  htmlLink: string
  location: string
}

/**
 * Community page
 */

export interface ICard {
  image: StaticImageData
  title: string
  description: string
  alt: string
  to: string
}

export interface IGetInvolvedCard {
  emoji: string
  title: string
  description: string
}
