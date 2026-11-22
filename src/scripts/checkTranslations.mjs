// Checks every translation against its English source and exits 1 on any problem.
//
//   node src/scripts/checkTranslations.mjs
//
// Interface strings (src/intl/<locale>/<namespace>.json): same keys as English,
// and every {{placeholder}} and HTML tag in the English value is kept.
// Pages (public/content/translations/<locale>/<path>/index.md): an English
// page exists at public/content/<path>/index.md, the frontmatter has the same
// keys, and `lang` names the locale.
//
// It cannot judge whether a translation is good. That is the native-speaker
// review in the README (Languages And Translations).

import { existsSync, readdirSync, readFileSync, statSync } from "fs"
import { join, relative } from "path"

const ROOT = process.cwd()
const INTL_DIR = join(ROOT, "src/intl")
const CONTENT_DIR = join(ROOT, "public/content")
const TRANSLATED_CONTENT_DIR = join(CONTENT_DIR, "translations")
const DEFAULT_LOCALE = "en"

const locales = JSON.parse(readFileSync(join(ROOT, "i18n.config.json"), "utf8"))
  .map(({ code }) => code)
  .filter((code) => code !== DEFAULT_LOCALE)

const problems = []
const report = (file, message) =>
  problems.push(`${relative(ROOT, file).split("\\").join("/")}: ${message}`)

const placeholders = (value) =>
  (value.match(/\{\{\s*[\w.]+\s*\}\}/g) || []).map((p) => p.replace(/\s/g, "")).sort()
const tagNames = (value) =>
  (value.match(/<\/?([a-zA-Z][\w-]*)/g) || []).map((t) => t.toLowerCase()).sort()
const sameList = (a, b) => a.length === b.length && a.every((x, i) => x === b[i])

// Interface strings
for (const file of readdirSync(join(INTL_DIR, DEFAULT_LOCALE))) {
  if (!file.endsWith(".json")) continue
  const english = JSON.parse(readFileSync(join(INTL_DIR, DEFAULT_LOCALE, file), "utf8"))
  for (const locale of locales) {
    const path = join(INTL_DIR, locale, file)
    if (!existsSync(path)) {
      report(path, "missing (the page falls back to English)")
      continue
    }
    let translated
    try {
      translated = JSON.parse(readFileSync(path, "utf8"))
    } catch (error) {
      report(path, `not valid JSON: ${error.message}`)
      continue
    }
    for (const key of Object.keys(english)) {
      if (!(key in translated)) {
        report(path, `missing key "${key}"`)
        continue
      }
      const source = String(english[key])
      const target = String(translated[key])
      if (!sameList(placeholders(source), placeholders(target)))
        report(path, `"${key}" changes the placeholders ${placeholders(source).join(" ") || "(none)"}`)
      if (!sameList(tagNames(source), tagNames(target)))
        report(path, `"${key}" changes the HTML tags ${tagNames(source).join(" ") || "(none)"}`)
    }
    for (const key of Object.keys(translated))
      if (!(key in english)) report(path, `extra key "${key}" not in English`)
  }
}

// Translated pages
const frontmatterKeys = (markdown) => {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!match) return null
  return match[1]
    .split(/\r?\n/)
    .map((line) => line.match(/^([A-Za-z_][\w-]*):/))
    .filter(Boolean)
    .map((m) => m[1])
}
const frontmatterValue = (markdown, key) =>
  markdown.match(new RegExp(`^${key}:\\s*["']?([^"'\\r\\n]*)`, "m"))?.[1]?.trim()

const markdownFiles = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) return markdownFiles(path)
    return name === "index.md" ? [path] : []
  })

if (existsSync(TRANSLATED_CONTENT_DIR)) {
  for (const locale of readdirSync(TRANSLATED_CONTENT_DIR)) {
    const localeDir = join(TRANSLATED_CONTENT_DIR, locale)
    if (!statSync(localeDir).isDirectory()) continue
    if (!locales.includes(locale)) {
      report(localeDir, `"${locale}" is not a locale in i18n.config.json`)
      continue
    }
    for (const path of markdownFiles(localeDir)) {
      const englishPath = join(CONTENT_DIR, relative(localeDir, path))
      if (!existsSync(englishPath)) {
        report(path, "has no English page at the same path")
        continue
      }
      const translated = readFileSync(path, "utf8")
      const englishKeys = frontmatterKeys(readFileSync(englishPath, "utf8"))
      const translatedKeys = frontmatterKeys(translated)
      if (!translatedKeys) {
        report(path, "has no frontmatter")
        continue
      }
      const expected = [...new Set([...(englishKeys || []), "lang"])].sort()
      const actual = [...new Set(translatedKeys)].sort()
      if (!sameList(expected, actual))
        report(path, `frontmatter keys differ from English (expected ${expected.join(", ")})`)
      if (frontmatterValue(translated, "lang") !== locale)
        report(path, `lang should be "${locale}"`)
    }
  }
}

if (problems.length) {
  console.error(`${problems.length} translation problem(s):\n`)
  for (const problem of problems) console.error(`  - ${problem}`)
  process.exit(1)
}
console.log(`Translations OK (${locales.join(", ")})`)
