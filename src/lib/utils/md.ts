import fs from "fs"
import { extname, join } from "path"

import matter from "gray-matter"
import readingTime from "reading-time"

import type { Frontmatter } from "@/lib/types"
import type { MdPageContent } from "@/lib/interfaces"

import { Skill } from "@/components/TutorialMetadata"

import { dateToString } from "@/lib/utils/date"
import { getFallbackEnglishPath, removeEnglishPrefix } from "@/lib/utils/i18n"

import { CONTENT_DIR, DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import { toPosixPath } from "./relativePath"

import { ITutorial } from "@/pages/developers/tutorials"

const CURRENT_CONTENT_DIR = join(process.cwd(), CONTENT_DIR)

const getPostSlugs = (dir: string, files: string[] = []) => {
  const contentDir = join(CURRENT_CONTENT_DIR, dir)
  // Temporal list of content pages allowed to be compiled
  // When a content page is migrated (and the components being used), should be added to this list
  const temporalAllowedPages = [
    // understand-yourself
    "/understand-yourself",
    // make-positive-impact
    "/make-positive-impact",
    "/make-positive-impact/contribute",
    "/make-positive-impact/collaborate",
    "/make-positive-impact/co-create",

    // Use cases (7/7) ✅
    "/dao",
    "/decentralized-identity",
    "/defi",
    "/desci",
    "/nft",
    "/refi",
    "/social-networks",
    // Staking (4/4) ✅
    "/staking/pools",
    "/staking/saas",
    "/staking/solo",
    "/staking/withdrawals",
    // Roadmap (5/5) ✅
    "/roadmap",
    "/roadmap/future-proofing",
    "/roadmap/scaling",
    "/roadmap/security",
    "/roadmap/user-experience",
    // Upgrade (2/2) ✅
    "/roadmap/beacon-chain",
    "/roadmap/merge",
    // Developer docs (0/95)
    "/unlock-your-potential/docs",
    // Developer tutorials (53/53) ✅
    "/unlock-your-potential/knowledge/scam-token-tricks",
    // Static (68/68) ✅
    "/about",
    "/bridges",
    "/community/code-of-conduct",
    "/community/events",
    "/community/get-involved",
    "/community/grants",
    "/community/language-resources",
    "/community/online",
    "/community/research",
    "/community/support",
    //
    "/contributing/adding-desci-projects",
    "/contributing/adding-developer-tools",
    "/contributing/adding-exchanges",
    "/contributing/adding-glossary-terms",
    "/contributing/adding-layer-2s",
    "/contributing/adding-products",
    "/contributing/adding-staking-products",
    "/contributing/adding-wallets",
    "/contributing/content-resources",
    "/contributing/design",
    "/contributing/design/adding-design-resources",
    "/contributing/design-principles",
    "/contributing/quizzes",
    "/contributing/style-guide",
    "/contributing/style-guide/content-standardization",
    "/contributing/translation-program",
    "/contributing/translation-program/content-buckets",
    "/contributing/translation-program/faq",
    "/contributing/translation-program/how-to-translate",
    "/contributing/translation-program/mission-and-vision",
    "/contributing/translation-program/playbook",
    "/contributing/translation-program/resources",
    "/contributing/translation-program/translatathon",
    "/contributing/translation-program/translators-guide",
    "/cookie-policy",
    "/deprecated-software",
    "/eips",
    "/energy-consumption",
    "/enterprise",
    "/enterprise/private-ethereum",
    "/foundation",
    "/glossary",
    "/governance",
    "/guides",
    "/guides/how-to-create-an-ethereum-account",
    "/guides/how-to-id-scam-tokens",
    "/guides/how-to-revoke-token-access",
    "/guides/how-to-swap-tokens",
    "/guides/how-to-use-a-bridge",
    "/guides/how-to-use-a-wallet",
    "/history/",
    "/privacy-policy",
    "/roadmap/account-abstraction",
    "/roadmap/danksharding",
    "/roadmap/merge/issuance",
    "/roadmap/pbs",
    "/roadmap/secret-leader-election",
    "/roadmap/single-slot-finality",
    "/roadmap/statelessness",
    "/roadmap/verkle-trees",
    "/security",
    "/smart-contracts",
    "/staking/dvt",
    "/terms-of-use",
    "/web3",
    "/whitepaper",
    "/zero-knowledge-proofs",
  ]

  // Get an array of all files and directories in the passed directory using `fs.readdirSync`
  const fileList = fs.readdirSync(contentDir)

  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = join(contentDir, file)

    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory()) {
      // If it is a directory, recursively call the `getPostSlugs` function with the
      // directory path and the files array
      const nestedDir = join(dir, file)

      getPostSlugs(nestedDir, files)
    } else {
      const fileExtension = extname(name)

      if (fileExtension === ".md") {
        // If it is a .md file (allowed content page), push the path to the files array
        for (const page of temporalAllowedPages) {
          const fullPagePath = join(CURRENT_CONTENT_DIR, page)

          if (name.includes(fullPagePath)) {
            files.push(
              toPosixPath(
                fullPagePath
                  .replace(CURRENT_CONTENT_DIR, "")
                  .replace("/index.md", "")
              )
            )
          }
        }
      }
    }
  }

  return files
}

export const getContentBySlug = (slug: string) => {
  // If content is in english, remove en/ prefix so filepath can be read correctly
  let realSlug = removeEnglishPrefix(slug)

  for (const code of LOCALES_CODES) {
    // Adds `translations/` prefix for translated content so file path can be read correctly
    if (code !== DEFAULT_LOCALE && slug.split("/").includes(code)) {
      realSlug = join("translations", slug, "index.md")
    }
  }

  let fullPath = toPosixPath(join(CURRENT_CONTENT_DIR, realSlug))
  let contentNotTranslated = false

  // If content is not translated, use english content fallback
  if (!fs.existsSync(fullPath)) {
    fullPath = getFallbackEnglishPath(fullPath)
    contentNotTranslated = true
  }

  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)
  const frontmatter = data as Frontmatter
  const items: Omit<MdPageContent, "tocItems" | "crowdinContributors"> = {
    slug,
    content,
    frontmatter,
    contentNotTranslated,
  }

  return items
}

export const getContent = (dir: string) => {
  const slugs = getPostSlugs(dir)
  const content = slugs.map(getContentBySlug)

  return content
}

export const getTutorialsData = (locale: string): ITutorial[] => {
  const fullPath = join(
    CURRENT_CONTENT_DIR,
    locale !== "en" ? `translations/${locale!}` : "",
    "developers/tutorials"
  )
  let tutorialData: ITutorial[] = []

  if (fs.existsSync(fullPath)) {
    const languageTutorialFiles = fs.readdirSync(fullPath)

    tutorialData = languageTutorialFiles.map((dir) => {
      const filePath = join(
        CURRENT_CONTENT_DIR,
        locale !== "en" ? `translations/${locale!}` : "",
        "developers/tutorials",
        dir,
        "index.md"
      )
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContents)
      const frontmatter = data as Frontmatter

      return {
        to: join(`/${locale}/developers/tutorials`, dir),
        title: frontmatter.title,
        description: frontmatter.description,
        author: frontmatter.author || "",
        tags: frontmatter.tags,
        skill: frontmatter.skill as Skill,
        timeToRead: Math.round(readingTime(content).minutes),
        published: dateToString(frontmatter.published),
        lang: frontmatter.lang,
        isExternal: false,
      }
    })
  }

  return tutorialData
}
