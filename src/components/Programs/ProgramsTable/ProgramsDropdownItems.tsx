import React from 'react';
import { Icon } from "@chakra-ui/react";

import { BulletPointIcon } from "@/components/icons";

import { DropdownOption } from "./useProgramsTable";

interface DropdownItemsProps {
  t: (key: string) => string;
}

const ProgramsDropdownItems = ({ t }: DropdownItemsProps) => {
  const featureDropdownItems: Array<DropdownOption> = [
    ...Array.from({ length: 9 }, (_, index) => ({
        label: t(`page-better-life-framework:page-better-life-framework-level-${index + 1}-title`),
        value: t(`page-better-life-framework:page-better-life-framework-level-${index + 1}-title`),
        description: t(`page-better-life-framework:page-better-life-framework-level-${index + 1}-description`),
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
  ];

  const perspectiveDropdownItems: Array<DropdownOption> = [
    {
      label: t("page-better-life-framework:page-better-life-framework-perspective-filters"),
      value: t("page-better-life-framework:page-better-life-framework-perspective-filters"),
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
  ];

  return { featureDropdownItems, perspectiveDropdownItems };
};

export default ProgramsDropdownItems;