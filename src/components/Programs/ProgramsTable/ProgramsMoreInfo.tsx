import { useTranslation } from "next-i18next"
import { Box, SimpleGrid, Text, VStack } from "@chakra-ui/react"

import { ButtonLink } from "../../Buttons"

import { DropdownOption } from "./useProgramsTable"
import { FrameworkMoreInfoCategory } from "./ProgramsMoreInfoCategory"

interface FrameworkMoreInfoProps {
  framework: Record<string, any>
  filters: Record<string, boolean>
  idx: number
  featureDropdownItems: DropdownOption[]
}

export const FrameworkMoreInfo = ({
  framework,
  filters,
  idx,
  featureDropdownItems,
}: FrameworkMoreInfoProps) => {
  const { t } = useTranslation("page-find-wallet")
  const frameworkHasFilter = (filterKey) => {
    return framework[filterKey] === true
  }
  // Cast as Number because TypeScript warned about sorting implicitly by true/false
  const orderedFeatureDropdownItems = featureDropdownItems.sort(
    (a, b) =>
      Number(frameworkHasFilter(b.filterKey)) -
      Number(frameworkHasFilter(a.filterKey))
  )

  const frameworkInfoSections = [
    { headingLabel: t("page-find-wallet-features"), sectionName: "feature" },
    { headingLabel: t("page-find-wallet-security"), sectionName: "security" },
    {
      headingLabel:
        t("page-find-wallet-buy-crypto") +
        " / " +
        t("page-find-wallet-sell-for-fiat"),
      sectionName: "trade_and_buy",
    },
    {
      headingLabel: t("page-find-wallet-smart-contract"),
      sectionName: "smart_contract",
    },
  ]

  return (
    <Box>
      <SimpleGrid templateColumns="65px auto">
        <Box>
          <Box
            bgGradient={`linear(to-b, ${framework.brand_color} 0%, rgba(217, 217, 217, 0) 97.4%)`}
            m="auto"
            width={1}
            height="full"
          />
        </Box>
        <Box>
          {frameworkInfoSections.map((section, idx) => (
            <FrameworkMoreInfoCategory
              key={idx}
              framework={framework}
              orderedFeatureDropdownItems={orderedFeatureDropdownItems}
              {...section}
            />
          ))}
          <VStack
            as={Text}
            color="text300"
            fontSize="sm"
            justifyContent="space-between"
            wrap="wrap"
            alignItems="flex-start"
            my={8}
            spacing={4}
          >
            <ButtonLink
              to={framework.url}
              customEventOptions={{
                eventCategory: "FrameworkExternalLinkList",
                eventAction: `Go to framework`,
                eventName: `${framework.name} ${idx}`,
                eventValue: JSON.stringify(filters),
              }}
            >
              {`${t("page-find-wallet-check-out")} ${framework.name}`}
            </ButtonLink>
            <Text as="i">
              {`${framework.name} ${t("page-find-wallet-info-updated-on")} ${
                framework.last_updated
              }`}
            </Text>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  )
}
