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
    LEVEL_1: boolean
    LEVEL_2: boolean
    LEVEL_3: boolean
    LEVEL_4: boolean
    LEVEL_5: boolean
    LEVEL_6: boolean
    LEVEL_7: boolean
    LEVEL_8: boolean
    LEVEL_9: boolean
    tags: string[];
  }
}

export const useProgramsFilterProfile = (setSelectedTags) => {
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
        LEVEL_1: true,
        LEVEL_2: true,
        LEVEL_3: true,
        LEVEL_4: true,
        LEVEL_5: true,
        LEVEL_6: true,
        LEVEL_7: true,
        LEVEL_8: true,
        LEVEL_9: true,
        tags: ["motivation"]
      },
    },
    {
      title: t("page-programs:page-programs-profile-2-title"),
      description: t("page-programs:page-programs-profile-2-description"),
      featureHighlight: [
        // filterLabels.one,
      ],
      presetFilters: {
        LEVEL_1: false,
        LEVEL_2: false,
        LEVEL_3: false,
        LEVEL_4: false,
        LEVEL_5: false,
        LEVEL_6: false,
        LEVEL_7: false,
        LEVEL_8: false,
        LEVEL_9: false,
        tags: ["relationships"]
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
        LEVEL_1: false,
        LEVEL_2: false,
        LEVEL_3: false,
        LEVEL_4: false,
        LEVEL_5: false,
        LEVEL_6: false,
        LEVEL_7: false,
        LEVEL_8: false,
        LEVEL_9: false,
        tags: ["self-love"]
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
        LEVEL_1: false,
        LEVEL_2: false,
        LEVEL_3: true,
        LEVEL_4: true,
        LEVEL_5: true,
        LEVEL_6: false,
        LEVEL_7: false,
        LEVEL_8: false,
        LEVEL_9: false,
        tags: []
      },
    },
  ]

  return {
    personas,
  }
}
