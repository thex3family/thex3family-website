import { Stack } from "@chakra-ui/react"
import { Meta, StoryObj } from "@storybook/react"

import BreadcrumbsComponent from "."

type BreadcrumbsType = typeof BreadcrumbsComponent

const meta: Meta<BreadcrumbsType> = {
  title: "Molecules / Navigation / Breadcrumbs",
  component: BreadcrumbsComponent,
}

export default meta

type Story = StoryObj<typeof meta>

export const Breadcrumbs: Story = {
  render: () => (
    <Stack spacing="8">
      <BreadcrumbsComponent slug="/make-positive-impact/" />
      <BreadcrumbsComponent slug="/make-positive-impact/contribute" />
    </Stack>
  ),
}
