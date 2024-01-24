import { useMemo, useState } from "react"
import { Icon } from "@chakra-ui/react"

import { FrameworkTableProps } from "@/components/Programs/ProgramsTable"
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
  selectedTags: string[]
}

export const useFrameworkTable = ({
  filters,
  selectedTags,
  t,
  frameworkData,
}: UseFrameworkTableProps) => {
  // Add a state to manage the sort order
  const [sortOrder, setSortOrder] = useState('default');

  const featureDropdownItems: Array<DropdownOption> = [
    // Repeat the pattern for subsequent items
    ...Array.from({ length: 9 }, (_, index) => ({
      label: t(`page-understand-the-framework:page-understand-the-framework-level-${index + 1}-title`),
      value: t(`page-understand-the-framework:page-understand-the-framework-level-${index + 1}-title`),
      description: t(`page-understand-the-framework:page-understand-the-framework-level-${index + 1}-description`),
      filterKey: `LEVEL_${index + 1}`,
      category: "frameworkLevel",
      icon: BulletPointIcon,
    })),
    {
      label: t("common:knowledge-title"),
      value: t("common:knowledge-title"),
      description: t("common:knowledge-description"),
      filterKey: "knowledge",
      category: "programType",
      icon: BulletPointIcon,
    },
    {
      label: t("common:tools-title"),
      value: t("common:tools-title"),
      description: t("common:tools-description"),
      filterKey: "tools",
      category: "programType",
      icon: BulletPointIcon,
    },
    {
      label: t("common:community-title"),
      value: t("common:community-title"),
      description: t("common:community-description"),
      filterKey: "community",
      category: "programType",
      icon: BulletPointIcon,
    },
  ]

  const perspectiveDropdownItems: Array<DropdownOption> = [
    {
      label: t("page-understand-the-framework:page-understand-the-framework-perspective-filters"),
      value: t("page-understand-the-framework:page-understand-the-framework-perspective-filters"),
      description: t("common:better-life-framework-description"),
      filterKey: "frameworkLevel",
      category: "frameworkLevel",
      icon: BulletPointIcon,
    },
    {
      label: t("common:unlock-your-potential-title"),
      value: t("common:unlock-your-potential-title"),
      description: t("common:unlock-your-potential-description"),
      filterKey: "programType",
      category: "programType",
      icon: BulletPointIcon,
    },
  ]

  const filteredFrameworks = useMemo(() => {
    // Start with the full frameworkData array and apply the filter logic
    let frameworksToProcess = frameworkData.filter((framework) => {
      console.log('Starting filter operation');
      console.log('Current filters:', filters);
      console.log('Selected tags:', selectedTags);
      console.log('Evaluating framework:', framework.title);
  
      // Group feature filters by category
      const filtersByCategory = featureDropdownItems.reduce((acc, item) => {
        const { category, filterKey } = item;
        if (!acc[category]) {
          acc[category] = [];
        }
        if (filters[filterKey]) {
          acc[category].push(filterKey);
        }
        return acc;
      }, {});
  
      // Check for feature filter match within each category (OR relationship)
      const featureMatchWithinCategories = Object.keys(filtersByCategory).every(category => {
        return filtersByCategory[category].length === 0 || filtersByCategory[category].some(filterKey => {
          return framework[category] === filterKey;
        });
      });
  
      // Check if any tag is selected
      const isAnyTagSelected = selectedTags?.length > 0;
      console.log('Any tag selected:', isAnyTagSelected);
  
      // Check for tag filter match
      const tagsMatch = isAnyTagSelected ? selectedTags.every(tag => {
        return framework.tags?.includes(tag);
      }) : true;
  
      // Framework must match feature filters across all categories (AND relationship) and tag filters
      return featureMatchWithinCategories && tagsMatch;
    });
  
    // Sort the frameworks if sortOrder is set to 'alphabetical'
    if (sortOrder === 'alphabetical') {
      frameworksToProcess.sort((a, b) => a.title.localeCompare(b.title));
    }
  
    return frameworksToProcess;
  }, [frameworkData, selectedTags, filters, featureDropdownItems, sortOrder]);

  // ... rest of the hook ...


  // Add a function to update the sort order
  const updateSortOrder = (selectedOption: DropdownOption) => {
    setSortOrder(selectedOption.value);
  };

  const [firstFeatureSelect, setFirstFeatureSelect] = useState(
    perspectiveDropdownItems[0]
  )
  const [secondFeatureSelect, setSecondFeatureSelect] = useState(
    perspectiveDropdownItems[1]
  )
  const [thirdFeatureSelect, setThirdFeatureSelect] = useState(
    perspectiveDropdownItems[1]
  )

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
    filteredFrameworks,
    filteredFeatureDropdownItems,
    updateDropdown,
    setFirstFeatureSelect,
    setSecondFeatureSelect,
    setThirdFeatureSelect,
    firstFeatureSelect,
    secondFeatureSelect,
    thirdFeatureSelect,
    updateSortOrder,
    sortOrder,
  }
}
