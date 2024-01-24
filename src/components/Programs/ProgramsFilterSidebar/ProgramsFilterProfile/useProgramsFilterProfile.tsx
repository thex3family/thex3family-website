import { useTranslation } from "next-i18next"

// Icons
import {
  BulletPointIcon
} from "../../../icons"

// Types
interface Personas {
  title: string
  description: string
  featureHighlight: { label: string; icon: JSX.Element }[]
  presetFilters: {
    perspective_3_option_1: boolean
    perspective_3_option_2: boolean
    perspective_3_option_3: boolean
    perspective_3_option_4: boolean
    perspective_3_option_5: boolean
    perspective_3_option_6: boolean
    perspective_3_option_7: boolean
    perspective_3_option_8: boolean
    perspective_3_option_9: boolean
  }
}

export const useFrameworkFilterProfile = () => {
  const { t } = useTranslation("page-programs")

  const filterLabels = {
    one: {
      label: t("page-programs:page-programs-perspective-1-option-1-title"),
      icon: <BulletPointIcon />,
    },
  }

  const personas: Personas[] = [
    {
      title: t("page-programs:page-programs-profile-1-title"),
      description: t("page-programs:page-programs-profile-1-description"),
      featureHighlight: [
        // filterLabels.one,
      ],
      presetFilters: {
        perspective_3_option_1: true,
        perspective_3_option_2: true,
        perspective_3_option_3: false,
        perspective_3_option_4: false,
        perspective_3_option_5: false,
        perspective_3_option_6: false,
        perspective_3_option_7: false,
        perspective_3_option_8: false,
        perspective_3_option_9: false,
      },
    },
    {
      title: t("page-programs:page-programs-profile-2-title"),
      description: t("page-programs:page-programs-profile-2-description"),
      featureHighlight: [
        // filterLabels.one,
      ],
      presetFilters: {
        perspective_3_option_1: false,
        perspective_3_option_2: false,
        perspective_3_option_3: true,
        perspective_3_option_4: true,
        perspective_3_option_5: true,
        perspective_3_option_6: true,
        perspective_3_option_7: false,
        perspective_3_option_8: false,
        perspective_3_option_9: false,
      },
    },
    {
      title: t("page-programs:page-programs-profile-3-title"),
      description: t("page-programs:page-programs-profile-3-description"),
      featureHighlight: 
        [
          // filterLabels.one,
        ],
      presetFilters: {
        perspective_3_option_1: false,
        perspective_3_option_2: false,
        perspective_3_option_3: false,
        perspective_3_option_4: false,
        perspective_3_option_5: true,
        perspective_3_option_6: true,
        perspective_3_option_7: false,
        perspective_3_option_8: false,
        perspective_3_option_9: false,
      },
    },
    {
      title: t("page-programs:page-programs-profile-4-title"),
      description: t("page-programs:page-programs-profile-4-description"),
      featureHighlight: 
        [
          // filterLabels.one,
        ],
      presetFilters: {
        perspective_3_option_1: false,
        perspective_3_option_2: false,
        perspective_3_option_3: false,
        perspective_3_option_4: false,
        perspective_3_option_5: true,
        perspective_3_option_6: true,
        perspective_3_option_7: false,
        perspective_3_option_8: false,
        perspective_3_option_9: false,
      },
    },
  ]

  return {
    personas,
  }
}
