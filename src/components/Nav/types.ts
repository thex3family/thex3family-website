export type SectionKey =
  | "understand_yourself"
  | "programs"
  | "about"

export interface IItem {
  text: string
  to?: string
  items?: Array<IItem>
  isPartiallyActive?: boolean
}

export interface ISection {
  text: string
  ariaLabel: string
  items: Array<IItem>
}

export type ISections = {
  [key in SectionKey]: ISection
}
