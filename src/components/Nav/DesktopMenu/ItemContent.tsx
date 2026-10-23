import { Box, Text } from "@chakra-ui/react"

import type { NavItem } from "../types"

type ItemContentProps = {
  item: NavItem
}

/** Label and one-line description shown for every menu entry */
const ItemContent = ({ item }: ItemContentProps) => (
  <Box textAlign="start" me="auto">
    <Text as="span" display="block" fontWeight="bold" lineHeight="short">
      {item.label}
    </Text>
    <Text
      as="span"
      display="block"
      fontSize="sm"
      lineHeight="short"
      mt={1}
      color="body.medium"
      className="nav-item-description"
    >
      {item.description}
    </Text>
  </Box>
)

export default ItemContent
