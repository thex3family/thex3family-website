import * as React from "react"
import {
  Box,
  Center,
  Flex,
  Link as ChakraLink,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import components from "@/@chakra-ui/components"

import Translation from "../Translation"

type TextType = typeof Text

const meta = {
  title: "Atoms / Typography / Text",
  component: Text,
  parameters: {
    layout: "none",
  },
  decorators: [
    (Story) => (
      <Center minH="100vh">
        <Story />
      </Center>
    ),
  ],
} satisfies Meta<TextType>

export default meta

type Story = StoryObj<typeof meta>

const textSizes = components.Text.sizes

const SINGLE_TEXT_CHILD = <Translation id="page-index:page-index-title" />

export const Normal: Story = {
  args: {
    children: SINGLE_TEXT_CHILD,
  },
  render: (args) => {
    return (
      <VStack w="full">
        <Box>
          Adjust the viewport to below &quot;md&quot; to see the font size and
          line height change
        </Box>
        <Stack>
          {Object.keys(textSizes || {}).map((key, idx) => (
            <Flex key={idx} gap="6">
              <Text size={key} flex="1" textAlign="end">
                {key}
              </Text>
              <Text size={key} flex="9" {...args} />
            </Flex>
          ))}
        </Stack>
      </VStack>
    )
  },
}

export const Bold: Story = {
  args: {
    children: SINGLE_TEXT_CHILD,
    fontWeight: "bold",
  },
  render: (args) => {
    return (
      <VStack w="full">
        <Box>
          Adjust the viewport to below &quot;md&quot; to see the font size and
          line height change
        </Box>
        <Stack>
          {Object.keys(textSizes || {}).map((key, idx) => (
            <Flex key={idx} gap="6">
              <Text size={key} flex="1" textAlign="end">
                {key}
              </Text>
              <Text size={key} flex="9" {...args} />
            </Flex>
          ))}
        </Stack>
      </VStack>
    )
  },
}
export const Italic: Story = {
  args: {
    children: SINGLE_TEXT_CHILD,
    fontStyle: "italic",
  },
  render: (args) => {
    return (
      <VStack w="full">
        <Box>
          Adjust the viewport to below &quot;md&quot; to see the font size and
          line height change
        </Box>
        <Stack>
          {Object.keys(textSizes || {}).map((key, idx) => (
            <Flex key={idx} gap="6">
              <Text size={key} flex="1" textAlign="end">
                {key}
              </Text>
              <Text size={key} flex="9" {...args} />
            </Flex>
          ))}
        </Stack>
      </VStack>
    )
  },
}

export const Link: StoryObj<typeof ChakraLink> = {
  args: {
    children: SINGLE_TEXT_CHILD,
  },
  render: (args) => {
    return (
      <VStack w="full">
        <Box>
          Adjust the viewport to below &quot;md&quot; to see the font size and
          line height change
        </Box>
        <Stack>
          {Object.keys(textSizes || {}).map((key, idx) => (
            <Flex key={idx} gap="6">
              <Text size={key} flex="1" textAlign="end">
                {key}
              </Text>
              <ChakraLink size={key} href="#" flex="9" {...args} />
            </Flex>
          ))}
        </Stack>
      </VStack>
    )
  },
}

export const BodyCopy: Story = {
  render: () => (
    <Box maxW="prose" px="4">
      <Text>
        Text body normal. Co-x3 is a family of students, creatives, and retirees
        who help each other level up every day - no matter your background or
        location. It&apos;s a community-built home for the knowledge, tools,
        and friendships that make growth easier!
      </Text>
    </Box>
  ),
}
