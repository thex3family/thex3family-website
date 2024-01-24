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
    // Repeat the pattern for subsequent items
    ...Array.from({ length: 9 }, (_, index) => ({
      label: t(`page-understand-the-framework:page-understand-the-framework-level-${index + 1}-title`),
      value: t(`page-understand-the-framework:page-understand-the-framework-level-${index + 1}-title`),
      description: t(`page-understand-the-framework:page-understand-the-framework-level-${index + 1}-description`),
      filterKey: `perspective_1_option_${index + 1}`,
      category: "1",
      icon: BulletPointIcon,
    })),
    {
      label: t("common:knowledge-title"),
      value: t("common:knowledge-title"),
      description: t("common:knowledge-description"),
      filterKey: "perspective_2_option_1",
      category: "2",
      icon: BulletPointIcon,
    },
    {
      label: t("common:tools-title"),
      value: t("common:tools-title"),
      description: t("common:tools-description"),
      filterKey: "perspective_2_option_2",
      category: "2",
      icon: BulletPointIcon,
    },
    {
      label: t("common:community-title"),
      value: t("common:community-title"),
      description: t("common:community-description"),
      filterKey: "perspective_2_option_3",
      category: "2",
      icon: BulletPointIcon,
    },
  ]

  const perspectiveDropdownItems: Array<DropdownOption> = [
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-filters"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-filters"),
      description: t("common:better-life-framework-description"),
      filterKey: "1",
      category: "1",
      icon: BulletPointIcon,
    },
    {
      label: t("common:unlock-your-potential-title"),
      value: t("common:unlock-your-potential-title"),
      description: t("common:unlock-your-potential-description"),
      filterKey: "2",
      category: "2",
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
    perspectiveDropdownItems[1]
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
