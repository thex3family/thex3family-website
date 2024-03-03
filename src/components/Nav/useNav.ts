import { useState } from "react"
import { cloneDeep } from "lodash"
import { useTranslation } from "next-i18next"
import { useColorMode } from "@chakra-ui/react"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { FROM_QUERY } from "@/lib/constants"

import { IItem, ISections } from "./types"

export const useNav = ({ path }: { path: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const { t } = useTranslation("common")

  const isDarkTheme = colorMode === "dark"

  const primaryNav: ISections = {
    understand_yourself: {
      text: t("understand-yourself-title"),
      ariaLabel: t("understand-yourself-menu"),
      items: [
        {
          text: t("understand-yourself-secondary-title"),
          to: "/understand-yourself",
        },
        {
          text: t("better-life-framework-title"),
          to: "/understand-yourself/better-life-framework/",
        },
        {
          text: t("4a-model-of-understanding-title"),
          to: "/understand-yourself/4a-model-of-understanding",
        },
        {
          text: t("evolution-of-wants-title"),
          to: "/understand-yourself/evolution-of-wants/",
        },
        {
          text: t("test-your-understanding-title"),
          to: "/understand-yourself/quizzes/",
        }
      ],
    },
    programs: {
      text: t("programs-title"),
      ariaLabel: t("programs-menu"),
      items: [
        {
          text: t("for-title"),
          items: [
            {
              text: t("for-secondary-title"),
              to: "/for/",
              isPartiallyActive: false,
            },
            {
              text: t("students-title"),
              to: "/for/students",
            },
            {
              text: t("creatives-title"),
              to: "/for/creatives",
            },
            {
              text: t("retirees-title"),
              to: "/for/retirees",
            },
          ]
        },
        {
          text: t("unlock-your-potential-title"),
          items: [
            {
              text: t("unlock-your-potential-secondary-title"),
              to: "/unlock-your-potential/",
              isPartiallyActive: false,
            },
            {
              text: t("knowledge-title"),
              to: "/unlock-your-potential/programs?filters=knowledge",
            },
            {
              text: t("tools-title"),
              to: "/unlock-your-potential/programs?filters=tools",
            },
            {
              text: t("community-title"),
              to: "/unlock-your-potential/programs?filters=community",
            },
            {
              text: t("docs-title"),
              to: "/unlock-your-potential/docs/",
            },
          ]
        },
      ],
    },
    about: {
      text: t("about-us-title"),
      ariaLabel: t("about-us-menu"),
      items: [
        {
          text: t("make-positive-impact-title"),
          items: [
            {
              text: t("make-positive-impact-secondary-title"),
              to: "/make-positive-impact/",
              isPartiallyActive: false,
            },
            {
              text: t("contribute-title"),
              to: "/make-positive-impact/contribute/",
            },
            {
              text: t("collaborate-title"),
              to: "/make-positive-impact/collaborate/",
            },
            {
              text: t("co-create-title"),
              to: "/make-positive-impact/co-create/",
            }
          ],
        },
        {
          text: t("live-your-best-life-title"),
          items: [
            {
              text: t("live-your-best-life-secondary-title"),
              to: "/live-your-best-life",
            },
            {
              text: t("about-us-secondary-title"),
              to: "/live-your-best-life/about-us/",
            },
          ],
        },
      ],
    },
  }

  const UnlockYourPotentialSubNav: Array<IItem> = [
    {
      text: t("unlock-your-potential-secondary-title"),
      to: "/unlock-your-potential/",
      isPartiallyActive: false,
    },
    {
      text: t("programs-title"),
      to: "/unlock-your-potential/programs/",
    },
    {
      text: t("docs-title"),
      to: "/unlock-your-potential/docs/",
    },
  ]

  let mobileLinkSections = cloneDeep(primaryNav)
  const toggleMenu = (): void => {
    setIsMenuOpen((prev) => !prev)
  }

  const shouldShowUnlockYourPotentialSubNav = path.includes("/unlock-your-potential")
  const splitPath = path.split("/")
  const fromPageParameter =
    splitPath.length > 1 && splitPath[1] !== "languages"
      ? `?${FROM_QUERY}=/${splitPath.slice(1).join("/")}`
      : ""

  const changeColorMode = () => {
    toggleColorMode()
    trackCustomEvent({
      eventCategory: "nav bar",
      eventAction: "click",
      eventName: isDarkTheme ? "light mode" : "dark mode", // This will be inverted as the state is changing
    })
  }

  const mobileNavProps = {
    isMenuOpen,
    isDarkTheme,
    toggleMenu,
    toggleTheme: changeColorMode,
    linkSections: mobileLinkSections,
    fromPageParameter,
  }

  return {
    toggleColorMode: changeColorMode,
    isDarkTheme,
    primaryNav,
    UnlockYourPotentialSubNav,
    shouldShowUnlockYourPotentialSubNav,
    fromPageParameter,
    mobileNavProps,
  }
}
