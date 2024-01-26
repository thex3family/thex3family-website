import * as React from "react"
import { Center, Flex, SimpleGrid, VStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import { FeedbackGlyphIcon } from "./FeedbackGlyphIcon"
import { FeedbackThumbsUpIcon } from "./FeedbackThumbsUpIcon"
import { HighlightDarkIcon } from "./HighlightDarkIcon"
import { HighlightIcon } from "./HighlightIcon"
import { HomeIcon } from "./HomeIcon"
import {
  CorrectIcon,
  IncorrectIcon,
  StarConfettiIcon,
  TrophyIcon,
} from "./quiz"

export default {
  title: "Atoms / Media & Icons / Icons",
  component: VStack,
} satisfies Meta<typeof VStack>

const iconsDefinitions = [
  CorrectIcon,
  IncorrectIcon,
  StarConfettiIcon,
  TrophyIcon,
  HomeIcon,
  FeedbackGlyphIcon,
  FeedbackThumbsUpIcon,
  HighlightDarkIcon,
  HighlightIcon,
]

iconsDefinitions.sort((a, b) =>
  (a?.displayName || "") > (b?.displayName || "") ? 1 : -1
)
const items = iconsDefinitions.map((IconDef) => (
  <Flex
    key={IconDef.displayName}
    direction="column"
    gap={4}
    p={4}
    border="1px"
    borderStyle="solid"
    borderColor="background.highlight"
  >
    <Center>
      <IconDef w="50px" h="50px" />
    </Center>
    <Center>{IconDef.displayName}</Center>
  </Flex>
))

export const Icons: StoryObj<typeof VStack> = {
  render: () => {
    return <SimpleGrid columns={[2, 2, 3, 5]}>{items}</SimpleGrid>
  },
}
