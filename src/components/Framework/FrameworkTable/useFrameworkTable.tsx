import { useState } from "react"
import { Icon } from "@chakra-ui/react"

import { FrameworkTableProps } from "@/components/Framework/FrameworkTable"
import {
  BulletPointIcon
} from "@/components/icons"

import { trackCustomEvent } from "@/lib/utils/matomo"

export interface DropdownOption {
  label: string
  value: string
  description: string
  filterKey: string
  category: string
  icon: typeof Icon
}

export type ColumnClassName = "firstCol" | "secondCol" | "thirdCol"

type UseFrameworkTableProps = Pick<FrameworkTableProps, "filters" | "frameworkData"> & {
  t: (x: string) => string
}

export const useFrameworkTable = ({
  filters,
  t,
  frameworkData,
}: UseFrameworkTableProps) => {
  const featureDropdownItems: Array<DropdownOption> = [
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-1-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-1-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-1-description"),
      filterKey: "perspective_1_option_1",
      category: "1",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-2-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-2-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-2-description"),
      filterKey: "perspective_1_option_2",
      category: "1",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-3-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-3-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-3-description"),
      filterKey: "perspective_1_option_3",
      category: "1",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-4-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-4-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-4-description"),
      filterKey: "perspective_1_option_4",
      category: "1",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-5-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-5-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-5-description"),
      filterKey: "perspective_1_option_5",
      category: "1",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-6-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-6-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-6-description"),
      filterKey: "perspective_1_option_6",
      category: "1",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-7-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-7-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-7-description"),
      filterKey: "perspective_1_option_7",
      category: "1",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-8-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-8-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-8-description"),
      filterKey: "perspective_1_option_8",
      category: "1",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-9-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-9-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-1-option-9-description"),
      filterKey: "perspective_1_option_9",
      category: "1",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-1-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-1-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-1-description"),
      filterKey: "perspective_2_option_1",
      category: "2",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-2-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-2-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-2-description"),
      filterKey: "perspective_2_option_2",
      category: "2",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-3-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-3-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-3-description"),
      filterKey: "perspective_2_option_3",
      category: "2",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-4-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-4-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-4-description"),
      filterKey: "perspective_2_option_4",
      category: "2",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-5-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-5-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-5-description"),
      filterKey: "perspective_2_option_5",
      category: "2",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-6-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-6-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-6-description"),
      filterKey: "perspective_2_option_6",
      category: "2",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-7-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-7-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-7-description"),
      filterKey: "perspective_2_option_7",
      category: "2",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-8-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-8-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-8-description"),
      filterKey: "perspective_2_option_8",
      category: "2",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-9-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-9-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-2-option-9-description"),
      filterKey: "perspective_2_option_9",
      category: "2",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-1-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-1-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-1-description"),
      filterKey: "perspective_3_option_1",
      category: "3",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-2-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-2-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-2-description"),
      filterKey: "perspective_3_option_2",
      category: "3",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-3-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-3-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-3-description"),
      filterKey: "perspective_3_option_3",
      category: "3",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-4-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-4-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-4-description"),
      filterKey: "perspective_3_option_4",
      category: "3",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-5-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-5-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-5-description"),
      filterKey: "perspective_3_option_5",
      category: "3",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-6-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-6-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-6-description"),
      filterKey: "perspective_3_option_6",
      category: "3",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-7-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-7-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-7-description"),
      filterKey: "perspective_3_option_7",
      category: "3",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-8-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-8-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-8-description"),
      filterKey: "perspective_3_option_8",
      category: "3",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-9-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-9-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-3-option-9-description"),
      filterKey: "perspective_3_option_9",
      category: "3",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-1-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-1-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-1-description"),
      filterKey: "perspective_4_option_1",
      category: "4",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-2-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-2-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-2-description"),
      filterKey: "perspective_4_option_2",
      category: "4",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-3-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-3-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-3-description"),
      filterKey: "perspective_4_option_3",
      category: "4",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-4-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-4-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-4-description"),
      filterKey: "perspective_4_option_4",
      category: "4",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-5-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-5-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-5-description"),
      filterKey: "perspective_4_option_5",
      category: "4",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-6-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-6-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-6-description"),
      filterKey: "perspective_4_option_6",
      category: "4",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-7-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-7-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-7-description"),
      filterKey: "perspective_4_option_7",
      category: "4",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-8-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-8-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-8-description"),
      filterKey: "perspective_4_option_8",
      category: "4",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-9-title"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-9-title"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-4-option-9-description"),
      filterKey: "perspective_4_option_9",
      category: "4",
      icon: BulletPointIcon,
    },
  ]

  const perspectiveDropdownItems: Array<DropdownOption> = [
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-1"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-1"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-1-description"),
      filterKey: "1",
      category: "1",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-2"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-2"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-2-description"),
      filterKey: "2",
      category: "2",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-3"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-3"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-3-description"),
      filterKey: "3",
      category: "3",
      icon: BulletPointIcon,
    },
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-4"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-4"),
      description: t("page-understand-the-framework:page-understand-the-framework-perspective-4-description"),
      filterKey: "4",
      category: "4",
      icon: BulletPointIcon,
    },
  ]

  const [frameworkCardData, setFrameworkData] = useState(
    frameworkData.map((framework) => {
      return { ...framework, moreInfo: false, key: framework.name }
    })
  )
  const [firstFeatureSelect, setFirstFeatureSelect] = useState(
    perspectiveDropdownItems[0]
  )
  const [secondFeatureSelect, setSecondFeatureSelect] = useState(
    perspectiveDropdownItems[1]
  )
  const [thirdFeatureSelect, setThirdFeatureSelect] = useState(
    perspectiveDropdownItems[2]
  )

  const updateMoreInfo = (key) => {
    const temp = [...frameworkCardData]

    temp.forEach((framework, idx) => {
      if (framework.key === key) {
        temp[idx].moreInfo = !temp[idx].moreInfo
      }
    })

    setFrameworkData(temp)
  }

  const filteredFrameworks = frameworkCardData.filter((framework) => {
    let showFramework = true

    const featureFilterKeys = featureDropdownItems.map((item) => item.filterKey)

    // OR logic for filter

    showFramework = featureFilterKeys.some(filter => {
      return filters[filter] && filters[filter] === framework[filter];
    });

    // making sure if filters are reset all levels are shown

    if (!featureFilterKeys.some(filter => filters[filter])) {
      showFramework = true;
    }

    return (
      showFramework
    )
  })

  const filteredFeatureDropdownItems = [...perspectiveDropdownItems].filter(
    (item) => {
      return (
        item.label !== firstFeatureSelect.label &&
        item.label !== secondFeatureSelect.label &&
        item.label !== thirdFeatureSelect.label
      )
    }
  )

  /**
   *
   * @param selectedOption selected dropdown option
   * @param stateUpdateMethod method for updating state for dropdown
   * @param className className of column
   *
   * This method gets the elements with the className, adds a fade class to fade icons out, after 0.5s it will then update state for the dropdown with the selectedOption, and then remove the fade class to fade the icons back in. Then it will send a matomo event for updating the dropdown.
   */
  const updateDropdown = (
    selectedOption: DropdownOption,
    stateUpdateMethod: Function,
    className: ColumnClassName
  ) => {
    const domItems: HTMLCollectionOf<Element> =
      document.getElementsByClassName(className)

    Array.from(domItems).forEach((item) => {
      item.classList.add("fade")
    })

    setTimeout(() => {
      stateUpdateMethod(selectedOption)
      Array.from(domItems).forEach((item) => {
        item.classList.remove("fade")
      })
    }, 375)

    trackCustomEvent({
      eventCategory: "FrameworkFeatureCompare",
      eventAction: `Select FrameworkFeatureCompare`,
      eventName: `${selectedOption.filterKey} selected`,
    })
  }

  return {
    featureDropdownItems,
    perspectiveDropdownItems,
    updateMoreInfo,
    filteredFrameworks,
    filteredFeatureDropdownItems,
    updateDropdown,
    setFirstFeatureSelect,
    setSecondFeatureSelect,
    setThirdFeatureSelect,
    frameworkCardData,
    firstFeatureSelect,
    secondFeatureSelect,
    thirdFeatureSelect,
  }
}
