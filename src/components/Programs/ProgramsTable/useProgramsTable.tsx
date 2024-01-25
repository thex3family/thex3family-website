import { useEffect, useMemo, useState } from "react"
import { Icon } from "@chakra-ui/react"

import { FrameworkTableProps } from "@/components/Programs/ProgramsTable"

import ProgramsDropdownItems from "./ProgramsDropdownItems"

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

  const { featureDropdownItems, perspectiveDropdownItems } = ProgramsDropdownItems({ t });

  const filteredFrameworks = useMemo(() => {
    // Start with the full frameworkData array and apply the filter logic
    let frameworksToProcess = frameworkData.filter((framework) => {
      // console.log('Starting filter operation');
      // console.log('Current filters:', filters);
      // console.log('Selected tags:', selectedTags);
      // console.log('Evaluating framework:', framework.title);
  
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
      // console.log('Any tag selected:', isAnyTagSelected);
  
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
  }, [frameworkData, selectedTags, filters, sortOrder]);

  // Add a function to update the sort order
  const updateSortOrder = (selectedOption: DropdownOption) => {
    setSortOrder(selectedOption.value);
  };

  return {
    filteredFrameworks,
    updateSortOrder,
  }
}
