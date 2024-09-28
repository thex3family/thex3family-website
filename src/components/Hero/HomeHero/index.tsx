import { useTranslation } from "next-i18next"
import { Box, Heading, Stack, Text, VStack } from "@chakra-ui/react"

import type { CommonHeroProps } from "@/lib/types"

import { ButtonLink } from "@/components/Buttons"
import { Image } from "@/components/Image"
import Morpher from "@/components/Morpher"
import SearchBar from "@/components/SearchBar"


export type HomeHeroProps = Pick<CommonHeroProps, "heroImg">

const HomeHero = ({ heroImg }: HomeHeroProps) => {
  const { t } = useTranslation("page-index, common")

  return (
    <Box>
      <Box height={{ base: "150", sm: "250", md: "350", lg: "440"}}>
        <Image
          src={heroImg}
          alt={t("common:hero-image-alt")}
          sizes="100vw"
          w="full"
          h="full"
          priority
          style={{ objectFit: "cover" }}
        />
      </Box>
      <VStack>
        <Stack
          spacing={{ base: "4", lg: "7" }}
          textAlign="center"
          mx="4"
          py="8"
          maxW="2xl"
        >
          <Morpher />
          <VStack spacing="6">
            <Heading as="h1" size="2xl">
              {t("page-index:page-index-title")}
            </Heading>
            <Text size="xl">{t("common:site-description")}</Text>
            <SearchBar t={t} variant="button"/>
          </VStack>
        </Stack>
      </VStack>
    </Box>
  )
}

export default HomeHero
