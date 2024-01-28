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
          text: t("better-life-framework-title"),
          to: "/understand-yourself",
        },
        {
          text: t("understand-the-framework-title"),
          to: "/understand-yourself/understand-the-framework/",
        },
        {
          text: t("the-4a-model-title"),
          to: "/understand-yourself/the-4a-model/",
        },
        {
          text: t("test-your-understanding-title"),
          to: "/understand-yourself/quizzes/",
        }
      ],
    },
    unlock_your_potential: {
      text: t("unlock-your-potential-title"),
      ariaLabel: t("unlock-your-potential-menu"),
      items: [
        {
          text: t("unlock-your-potential-secondary-title"),
          to: "/unlock-your-potential/",
        },
        {
          text: t("programs-title"),
          to: "/unlock-your-potential/programs/",
        },
        {
          text: t("docs-title"),
          to: "/unlock-your-potential/docs/",
        },
      ],
    },
    make_positive_impact: {
      text: t("make-positive-impact-title"),
      ariaLabel: t("make-positive-impact-menu"),
      items: [
        {
          text: t("make-positive-impact-secondary-title"),
          to: "/make-positive-impact/",
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
    live_your_best_life: {
      text: t("live-your-best-life-title"),
      ariaLabel: t("live-your-best-life-menu"),
      items: [
        {
          text: t("about-us-title"),
          to: "/live-your-best-life/about-us/",
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
