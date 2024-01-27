import { useTranslation } from "next-i18next"
import { MdInfoOutline } from "react-icons/md"
import { Box, Flex, Heading, HStack, Icon } from "@chakra-ui/react"

import frameworkFilterData from "../../../data/framework/framework-filters"
import Text from "../../OldText"
import Tooltip from "../../Tooltip"

import { DropdownOption } from "./useFrameworkTable"

interface FrameworkMoreInfoCategoryProps {
  framework: any
}

export const FrameworkMoreInfoCategory = ({
  framework,
}: FrameworkMoreInfoCategoryProps) => {
  const { t } = useTranslation("page-understand-the-framework")

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
        What It Feels Like
      </Heading>
      <Flex gap={2} wrap="wrap">
        <HStack
          spacing="0.2rem"
          fontSize="0.9rem"
          lineHeight={1}
          p="0.2rem"
          mx={1}
          width="200px"
          sx={{
            p: {
              color: "text",
              flex: "none",
              mb: 0,
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
          <p>{t(`page-understand-the-framework-level-${framework.name}-unlock`)}</p>
        </HStack>
      </Flex>
    </Box>
  )
}
