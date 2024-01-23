import { useTranslation } from "next-i18next"
import { MdInfoOutline } from "react-icons/md"
import { Box, Flex, Heading, HStack, Icon } from "@chakra-ui/react"

import frameworkFilterData from "../../../data/framework/framework-filters"
import Text from "../../OldText"
import Tooltip from "../../Tooltip"

import { DropdownOption } from "./useFrameworkTable"

interface FrameworkMoreInfoCategoryProps {
  framework: any
  orderedFeatureDropdownItems: DropdownOption[]
  headingLabel: any
  sectionName: string
}

export const FrameworkMoreInfoCategory = ({
  framework,
  orderedFeatureDropdownItems,
  headingLabel,
  sectionName,
}: FrameworkMoreInfoCategoryProps) => {
  const { t } = useTranslation("page-frameworks-find-framework")

  return (
    <Box width="full" mt={12} _first={{ mt: 2 }}>
      <Heading
        as="h4"
        lineHeight={1.4}
        fontSize="md"
        fontWeight={500}
        color="primary.base"
        mx="0.2rem"
        mb={2}
      >
        {headingLabel}
      </Heading>
      <Flex gap={2} wrap="wrap">
        {orderedFeatureDropdownItems.map((feature) => {
          const featureColor = framework[feature.filterKey!] ? "text" : "secondary"
          if (feature.category === sectionName)
            return (
              <HStack
                key={feature.label}
                spacing="0.2rem"
                fontSize="0.9rem"
                lineHeight={1}
                p="0.2rem"
                mx={4}
                width="200px"
                sx={{
                  p: {
                    color: featureColor,
                    flex: "none",
                    mb: 0,
                    textDecor: framework[feature.filterKey!]
                      ? "none"
                      : "line-through",
                  },
                  "span + p": {
                    textDecor: "none",
                  },
                  "p + div, div + div": {
                    svg: {
                      width: 6,
                      fill: "secondary",
                      pe: 2,
                    },
                  },
                }}
              >
                <Icon
                  as={feature.icon}
                  fontSize="1.75rem"
                  color={featureColor}
                />
                <p>{feature.label}</p>
                <Tooltip
                  content={
                    <Text lineHeight={1.2}>
                      {t(frameworkFilterData[feature.filterKey].description)}
                    </Text>
                  }
                >
                  <Icon as={MdInfoOutline} color={featureColor} />
                </Tooltip>
              </HStack>
            )
        })}
      </Flex>
    </Box>
  )
}
