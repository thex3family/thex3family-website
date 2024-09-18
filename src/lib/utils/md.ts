import fs from "fs"
import { extname, join } from "path"

import matter from "gray-matter"
import readingTime from "reading-time"

import type { Frontmatter } from "@/lib/types"
import type { MdPageContent } from "@/lib/interfaces"

import { Jobs } from "@/components/JobBoard"
import { Skill } from "@/components/TutorialMetadata"

import { dateToString } from "@/lib/utils/date"
import { getFallbackEnglishPath, removeEnglishPrefix } from "@/lib/utils/i18n"
import { ITutorial } from "@/lib/utils/tutorial"

import { CONTENT_DIR, DEFAULT_LOCALE, LOCALES_CODES } from "@/lib/constants"

import { toPosixPath } from "./relativePath"

const CURRENT_CONTENT_DIR = join(process.cwd(), CONTENT_DIR)

const getPostSlugs = (dir: string, files: string[] = []) => {
  const contentDir = join(CURRENT_CONTENT_DIR, dir)
  // Temporal list of content pages allowed to be compiled
  // When a content page is migrated (and the components being used), should be added to this list
  const temporalAllowedPages = [
    // understand-yourself
    "/understand-yourself",
    "/understand-yourself/4a-model-of-understanding",
    "/understand-yourself/evolution-of-wants",

    // unlock-your-potential

      // programs
      "/unlock-your-potential/programs/level-up-with-us",
      "/unlock-your-potential/programs/levelupwithconrad",
      "/unlock-your-potential/programs/talks-by-co-x3",
      "/unlock-your-potential/programs/guide-1",
      "/unlock-your-potential/programs/guide-2",
      "/unlock-your-potential/programs/guide-3",
      "/unlock-your-potential/programs/guide-4",
      "/unlock-your-potential/programs/guide-5",
      "/unlock-your-potential/programs/guide-6",
      "/unlock-your-potential/programs/guide-7",
      "/unlock-your-potential/programs/guide-8",
      "/unlock-your-potential/programs/guide-9",
      "/unlock-your-potential/programs/talk-it-out",
      "/unlock-your-potential/programs/understand-yourself",
      "/unlock-your-potential/programs/q-and-a",
      "/unlock-your-potential/programs/now-i-understand",
      "/unlock-your-potential/programs/live-your-best-life",

      // docs
      "/unlock-your-potential/docs",
      "/unlock-your-potential/docs/template",
      "/unlock-your-potential/docs/breathing-techniques",
      "/unlock-your-potential/docs/flow-state",
      "/unlock-your-potential/docs/meditation",
      "/unlock-your-potential/docs/pain",
      "/unlock-your-potential/docs/sensory-deprivation",
      "/unlock-your-potential/docs/empathy",
      "/unlock-your-potential/docs/pareto-principle-80-20-rule",

    // make-positive-impact
    "/make-positive-impact",

      "/make-positive-impact/contribute",
      
      "/make-positive-impact/contribute/be-a-patron",
      "/make-positive-impact/contribute/be-a-patron/donate",
      "/make-positive-impact/contribute/be-a-patron/membership",
      "/make-positive-impact/contribute/be-a-patron/corporate",

      "/make-positive-impact/contribute/be-an-adventurer",
      "/make-positive-impact/contribute/be-an-adventurer/glossary",
      "/make-positive-impact/contribute/be-an-adventurer/quizzes",
      //"/make-positive-impact/contribute/translations",
      
      "/make-positive-impact/contribute/be-an-advocate",

      "/make-positive-impact/collaborate",
      "/make-positive-impact/collaborate/house-manager-the-castle",
      "/make-positive-impact/collaborate/house-manager-our-retreat",
      "/make-positive-impact/collaborate/grant-writer",
      "/make-positive-impact/collaborate/hr-collaborator",
      "/make-positive-impact/collaborate/executive-assistant",
      "/make-positive-impact/collaborate/video-editor",
      "/make-positive-impact/collaborate/social-media-collaborator",
      

      "/make-positive-impact/co-create",
    
    "/live-your-best-life",

    // info
    "/glossary",
    "/privacy-policy",
    "/mobile-terms-of-service",
    "/terms-of-use",
    "/cookie-policy",
    "/contact-us",

    // for

    "/for",
    "/for/students",
    "/for/creatives",
    "/for/retirees",
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
    "unlock-your-potential/programs"
  )
  let tutorialData: ITutorial[] = []

  if (fs.existsSync(fullPath)) {
    const languageTutorialFiles = fs.readdirSync(fullPath)

    tutorialData = languageTutorialFiles.map((dir) => {
      const filePath = join(
        CURRENT_CONTENT_DIR,
        locale !== "en" ? `translations/${locale!}` : "",
        "unlock-your-potential/programs",
        dir,
        "index.md"
      )
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContents)
      const frontmatter = data as Frontmatter

      return {
        to: join(`/${locale}/unlock-your-potential/programs`, dir),
        title: frontmatter.title,
        description: frontmatter.description,
        author: frontmatter.author || "",
        tags: frontmatter.tags,
        programType: frontmatter.programType,
        location: frontmatter.location,
        frameworkLevel: frontmatter.frameworkLevel as Skill,
        timeToRead: Math.round(readingTime(content).minutes),
        published: dateToString(frontmatter.published),
        lang: frontmatter.lang,
        isExternal: false,
      }
    })
  }

  return tutorialData
}

export const getJobsData = (locale: string): Jobs[] => {
  const basePath = join(
    CURRENT_CONTENT_DIR,
    locale !== "en" ? `translations/${locale}` : "",
    "make-positive-impact/collaborate"
  );
  
  let jobsData: Jobs[] = []

  if (fs.existsSync(basePath)) {
    const items = fs.readdirSync(basePath);

    jobsData = items
      .filter((item) => {
        const itemPath = join(basePath, item);
        return fs.statSync(itemPath).isDirectory();
      })
      .map((dir) => {
        const filePath = join(basePath, dir, "index.md");

        if (fs.existsSync(filePath)) {
          const fileContents = fs.readFileSync(filePath, "utf8");
          const { data } = matter(fileContents);
          const frontmatter = data as Frontmatter;

          return {
            to: join(`/${locale}/make-positive-impact/collaborate`, dir),
            title: frontmatter.title,
            emoji: frontmatter.emoji,
            location: frontmatter.location,
            compensation: frontmatter.compensation,
            isExternal: false,
          } as Jobs; // Type assertion here
        } else {
          console.error(`index.md not found in directory: ${dir}`);
          return null;
        }
      })
      .filter((job): job is Jobs => job !== null); // Type guard here
  }

  return jobsData;
};
