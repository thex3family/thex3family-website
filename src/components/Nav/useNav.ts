import { useTranslation } from "next-i18next"
import { useColorMode } from "@chakra-ui/react"

import { trackCustomEvent } from "@/lib/utils/matomo"

import type { NavSections, SubNavLink } from "./types"

export const useNav = ({ path }: { path: string }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const { t } = useTranslation("common")

  const isDarkTheme = colorMode === "dark"

  const linkSections: NavSections = {
    understand_yourself: {
      label: t("understand-yourself-title"),
      items: [
        {
          label: t("understand-yourself-secondary-title"),
          description: t("nav-understand-yourself-secondary-desc"),
          href: "/understand-yourself",
          isPartiallyActive: false,
        },
        {
          label: t("better-life-framework-title"),
          description: t("nav-better-life-framework-desc"),
          href: "/understand-yourself/better-life-framework",
        },
        {
          label: t("4a-model-of-understanding-title"),
          description: t("nav-4a-model-desc"),
          href: "/understand-yourself/4a-model-of-understanding",
        },
        {
          label: t("evolution-of-wants-title"),
          description: t("nav-evolution-of-wants-desc"),
          href: "/understand-yourself/evolution-of-wants",
        },
        {
          label: t("test-your-understanding-title"),
          description: t("nav-test-your-understanding-desc"),
          href: "/understand-yourself/quizzes",
        },
      ],
    },
    programs: {
      label: t("programs-title"),
      items: [
        {
          label: t("for-title"),
          description: t("nav-for-desc"),
          items: [
            {
              label: t("for-secondary-title"),
              description: t("nav-for-secondary-desc"),
              href: "/for",
              isPartiallyActive: false,
            },
            {
              label: t("students-title"),
              description: t("nav-students-desc"),
              href: "/for/students",
            },
            {
              label: t("creatives-title"),
              description: t("nav-creatives-desc"),
              href: "/for/creatives",
            },
            {
              label: t("retirees-title"),
              description: t("nav-retirees-desc"),
              href: "/for/retirees",
            },
          ],
        },
        {
          label: t("unlock-your-potential-title"),
          description: t("nav-unlock-your-potential-desc"),
          items: [
            {
              label: t("unlock-your-potential-secondary-title"),
              description: t("nav-unlock-your-potential-secondary-desc"),
              href: "/unlock-your-potential",
              isPartiallyActive: false,
            },
            {
              label: t("programs-title"),
              description: t("nav-programs-desc"),
              href: "/unlock-your-potential/programs",
            },
            {
              label: t("docs-title"),
              description: t("nav-docs-desc"),
              href: "/unlock-your-potential/principles",
            },
          ],
        },
      ],
    },
    about: {
      label: t("about-us-title"),
      items: [
        {
          label: t("make-positive-impact-title"),
          description: t("nav-make-positive-impact-desc"),
          items: [
            {
              label: t("make-positive-impact-secondary-title"),
              description: t("nav-make-positive-impact-secondary-desc"),
              href: "/make-positive-impact",
              isPartiallyActive: false,
            },
            {
              label: t("contribute-title"),
              description: t("nav-contribute-desc"),
              href: "/make-positive-impact/contribute",
            },
            {
              label: t("collaborate-title"),
              description: t("nav-collaborate-desc"),
              href: "/make-positive-impact/collaborate",
            },
            {
              label: t("co-create-title"),
              description: t("nav-co-create-desc"),
              href: "/make-positive-impact/co-create",
            },
          ],
        },
        {
          label: t("live-your-best-life-title"),
          description: t("nav-live-your-best-life-desc"),
          items: [
            {
              label: t("live-your-best-life-secondary-title"),
              description: t("nav-live-your-best-life-secondary-desc"),
              href: "/live-your-best-life",
              isPartiallyActive: false,
            },
            {
              label: t("about-us-secondary-title"),
              description: t("nav-about-us-secondary-desc"),
              href: "/live-your-best-life/about-us",
            },
          ],
        },
      ],
    },
  }

  const unlockYourPotentialSubNav: SubNavLink[] = [
    {
      text: t("unlock-your-potential-secondary-title"),
      to: "/unlock-your-potential",
      isPartiallyActive: false,
    },
    {
      text: t("programs-title"),
      to: "/unlock-your-potential/programs",
    },
    {
      text: t("docs-title"),
      to: "/unlock-your-potential/principles",
    },
  ]

  const shouldShowUnlockYourPotentialSubNav = path.includes(
    "/unlock-your-potential"
  )

  const toggleTheme = () => {
    toggleColorMode()
    trackCustomEvent({
      eventCategory: "nav bar",
      eventAction: "click",
      eventName: isDarkTheme ? "light mode" : "dark mode", // This will be inverted as the state is changing
    })
  }

  return {
    linkSections,
    unlockYourPotentialSubNav,
    shouldShowUnlockYourPotentialSubNav,
    isDarkTheme,
    toggleTheme,
  }
}
