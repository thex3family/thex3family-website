import { useState } from "react"
import { Icon } from "@chakra-ui/react"

import { FrameworkTableProps } from "@/components/Framework/FrameworkTable"
import {
  BulletPointIcon
} from "@/components/icons"

import { trackCustomEvent } from "@/lib/utils/matomo"

import FrameworkDropdownItems from "./FrameworkDropdownItems"

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
  
  const { featureDropdownItems, perspectiveDropdownItems } = FrameworkDropdownItems({ t });

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

  // show all the dropdown options to handle mobile
  
  const filteredFeatureDropdownItems = [...perspectiveDropdownItems];

  // const filteredFeatureDropdownItems = [...perspectiveDropdownItems].filter(
  //   (item) => {
  //     return (
  //       item.label !== firstFeatureSelect.label &&
  //       item.label !== secondFeatureSelect.label &&
  //       item.label !== thirdFeatureSelect.label
  //     )
  //   }
  // )

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
