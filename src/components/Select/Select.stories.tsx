import * as React from "react"
import { VStack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import SelectComponent from "./"

const selectData = [
  { label: "Students", value: "students" },
  { label: "Creatives", value: "creatives" },
  { label: "Retirees", value: "retirees" },
]

type SelectType = typeof SelectComponent

const meta: Meta<SelectType> = {
  title: "Atoms / Form / Select",
  component: SelectComponent,
}

export default meta

type Story = StoryObj<SelectType>

export const Select: Story = {
  args: {
    minW: "223px",
    options: selectData,
    onChange(selectedOption) {
      console.log(selectedOption)
    },
  },
  render: (args) => (
    <VStack spacing={8}>
      <SelectComponent {...args} />
      <SelectComponent variant="flushed" {...args} />
    </VStack>
  ),
}
