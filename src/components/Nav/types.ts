// Navigation structure, adapted from the ethereum.org nav (MIT, see NOTICE.md):
// every item has a one-line description, and an item is either a link or a
// group of further items, never both.

type LinkOnly = { href: string; items?: never }
type ItemsOnly = { items: NavItem[]; href?: never }

export type NavItem = {
  label: string
  description: string
  /** Match the active page by prefix (default) or by exact path */
  isPartiallyActive?: boolean
} & (LinkOnly | ItemsOnly)

export type NavSectionKey = "understand_yourself" | "programs" | "about"

export type NavSection = {
  label: string
  items: NavItem[]
}

export type NavSections = Record<NavSectionKey, NavSection>

export const NAV_SECTION_KEYS: NavSectionKey[] = [
  "understand_yourself",
  "programs",
  "about",
]

/** Desktop menu depth: 1 = the panel under a section, 2 = a group inside it */
export type Level = 1 | 2

/** A flat link used by the secondary "Unlock Your Potential" bar */
export type SubNavLink = {
  text: string
  to: string
  isPartiallyActive?: boolean
}
