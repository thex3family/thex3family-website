import { useTranslation } from "next-i18next"
import { Box, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react"

import { Image } from "@/components/Image"

import { ButtonLink } from "../../Buttons"

import { FrameworkMoreInfoCategory } from "./FrameworkMoreInfoCategory"
import { DropdownOption } from "./useFrameworkTable"

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
  const { t } = useTranslation("page-better-life-framework")

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
          <Flex>
            <Image
                  src={framework.illustration}
                  alt={t("page-index:page-index-get-started-image-alt")}
                  width={500}
                />
          </Flex>
          <FrameworkMoreInfoCategory
            framework={framework}
          />
          <VStack
            as={Text}
            fontSize="xs"
            alignItems="flex-start"
            my={8}
            spacing={4}
          >
            <ButtonLink
              to={`/unlock-your-potential/programs?filters=LEVEL_${framework.name}`}
              target="_blank"
              customEventOptions={{
                eventCategory: "FrameworkExternalLinkList",
                eventAction: `Go to framework`,
                eventName: `${framework.name} ${idx}`,
                eventValue: JSON.stringify(filters),
              }}
            >
              {t("page-better-life-framework-check-out")} {t(`page-better-life-framework-level-${framework.name}-title`)}
            </ButtonLink>
            <Text>
              {`${t("page-better-life-framework-info-updated-on")} ${framework.last_updated
                }.`}
            </Text>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  )
}
