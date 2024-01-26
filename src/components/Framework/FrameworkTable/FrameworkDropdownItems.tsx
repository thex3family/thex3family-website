import React from 'react';
import { Icon } from "@chakra-ui/react";

import { BulletPointIcon } from "@/components/icons";

import { DropdownOption } from "./useFrameworkTable";

interface FrameworkDropdownItemsProps {
  t: (key: string) => string;
}

const FrameworkDropdownItems = ({ t }: FrameworkDropdownItemsProps) => {
  const featureDropdownItems: Array<DropdownOption> = [
    ...Array.from({ length: 4 }, (_, perspectiveIndex) => (
      Array.from({ length: 9 }, (_, optionIndex) => ({
        label: t(`page-understand-the-framework:page-understand-the-framework-perspective-${perspectiveIndex + 1}-option-${optionIndex + 1}-title`),
        value: t(`page-understand-the-framework:page-understand-the-framework-perspective-${perspectiveIndex + 1}-option-${optionIndex + 1}-title`),
        description: t(`page-understand-the-framework:page-understand-the-framework-perspective-${perspectiveIndex + 1}-option-${optionIndex + 1}-description`),
        filterKey: `perspective_${perspectiveIndex + 1}_option_${optionIndex + 1}`,
        category: `${perspectiveIndex + 1}`,
        icon: BulletPointIcon,
      }))
    )).flat(),
  ];

  const perspectiveDropdownItems: Array<DropdownOption> = [
    ...Array.from({ length: 4 }, (_, index) => ({
      label: t(`page-understand-the-framework:page-understand-the-framework-perspective-${index + 1}`),
      value: t(`page-understand-the-framework:page-understand-the-framework-perspective-${index + 1}`),
      description: t(`page-understand-the-framework:page-understand-the-framework-perspective-${index + 1}-description`),
      filterKey: `${index + 1}`,
      category: `${index + 1}`,
      icon: BulletPointIcon,
    })),
  ];

  return { featureDropdownItems, perspectiveDropdownItems };
};

export default FrameworkDropdownItems;