export type SectionKey =
  | "understand_yourself"
  | "unlock_your_potential"
  | "make_positive_impact"
  | "live_your_best_life"

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
