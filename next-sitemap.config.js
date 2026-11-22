const { existsSync } = require("fs")
const { join } = require("path")

const i18nConfig = require("./i18n.config.json")
const locales = i18nConfig.map(({ code }) => code)

const CONTENT_DIR = join(__dirname, "public/content")

// A markdown page in another locale that has no translation yet shows the
// English text and sets its canonical to the English page, so it stays out
// of the sitemap (src/lib/utils/seo.ts, PageMetadata)
const isUntranslatedMarkdownPage = (locale, pagePath) =>
  existsSync(join(CONTENT_DIR, pagePath, "index.md")) &&
  !existsSync(join(CONTENT_DIR, "translations", locale, pagePath, "index.md"))

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://the.x3.family",
  generateRobotsTxt: true,
  transform: async (_, path) => {
    const rootPath = path.split("/")[1]
    if (path.endsWith("/404")) return null
    const isDefaultLocale = !locales.includes(rootPath) || rootPath === "en"
    if (!isDefaultLocale) {
      const pagePath = path.split("/").slice(2).join("/")
      if (pagePath && isUntranslatedMarkdownPage(rootPath, pagePath)) return null
    }
    return {
      loc: path,
      changefreq: isDefaultLocale ? "weekly" : "monthly",
      priority: isDefaultLocale ? 0.7 : 0.5,
    }
  },
}
