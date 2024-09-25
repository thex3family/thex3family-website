import { useEffect, useMemo, useState } from "react"
import { Icon } from "@chakra-ui/react"

import { ProgramsTableProps } from "@/components/Programs/ProgramsTable"

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

type UseProgramsTableProps = Pick<ProgramsTableProps, "filters" | "programsData"> & {
  t: (x: string) => string
  selectedTags: string[]
}

export const useProgramsTable = ({
  filters,
  selectedTags,
  t,
  programsData,
}: UseProgramsTableProps) => {
  // Add a state to manage the sort order
  const [sortOrder, setSortOrder] = useState('default');

  const { featureDropdownItems, perspectiveDropdownItems } = ProgramsDropdownItems({ t });

  const filteredPrograms = useMemo(() => {
    // Start with the full programsData array and apply the filter logic
    let programsToProcess = programsData.filter((programs) => {
      // console.log('Starting filter operation');
      // console.log('Current filters:', filters);
      // console.log('Selected tags:', selectedTags);
      // console.log('Evaluating programs:', programs.title);
  
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
          return programs[category] === filterKey;
        });
      });
  
      // Check if any tag is selected
      const isAnyTagSelected = selectedTags?.length > 0;
      // console.log('Any tag selected:', isAnyTagSelected);
  
      // Check for tag filter match
      const tagsMatch = isAnyTagSelected ? selectedTags.every(tag => {
        return programs.tags?.includes(tag);
      }) : true;
  
      // Programs must match feature filters across all categories (AND relationship) and tag filters
      return featureMatchWithinCategories && tagsMatch;
    });
  
    // Sort the programs based on sortOrder, handling potentially undefined programsLevel
    // and sorting programType by 'knowledge', 'action', and then 'community'
    if (sortOrder === 'alphabetical') {
      programsToProcess.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === 'default') {
      programsToProcess.sort((a, b) => {
        const levelA = a.frameworkLevel || '';
        const levelB = b.frameworkLevel || '';
        const levelComparison = levelA.localeCompare(levelB);
        if (levelComparison !== 0) return levelComparison;

        const typeOrder = { 'knowledge': 1, 'action': 2, 'community': 3 };
        const typeA = typeOrder[a.programType] || 4;
        const typeB = typeOrder[b.programType] || 4;
        return typeA - typeB;
      });
    }

    return programsToProcess;
  }, [programsData, selectedTags, filters, sortOrder]);

  // Add a function to update the sort order
  const updateSortOrder = (selectedOption: DropdownOption) => {
    setSortOrder(selectedOption.value);
  };

  return {
    filteredPrograms,
    updateSortOrder,
  }
}
