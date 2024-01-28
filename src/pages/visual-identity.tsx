import type { GetStaticProps } from "next/types"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
  Box,
  Center,
  Flex,
  Heading,
  type HeadingProps,
  SimpleGrid,
  type SimpleGridProps,
  useColorModeValue,
} from "@chakra-ui/react"

import type { BasePageProps, ChildOnlyProp } from "@/lib/types"

import AssetDownload from "@/components/AssetDownload"
import FeedbackCard from "@/components/FeedbackCard"
import { Image } from "@/components/Image"
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import PageMetadata from "@/components/PageMetadata"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import logoBlack from "@/public/assets/main-logo(black).png"
import logoWhite from "@/public/assets/main-logo(white).png"

import icon from "@/public/assets/icon-1000.png"

import hero from "@/public/home/hero.png"

const Row = (props: SimpleGridProps) => (
  <SimpleGrid
    templateColumns="repeat(auto-fit, minmax(min(288px, 100%), 1fr))"
    mx={-4}
    mb="8"
    {...props}
  />
)

const H2 = (props: ChildOnlyProp & HeadingProps) => (
  <Heading
    fontSize={{ base: "2xl", md: "3xl" }}
    lineHeight={1.4}
    mt={16}
    mb="6"
    {...props}
  />
)

const H3 = (props: ChildOnlyProp) => (
  <OldHeading
    as="h3"
    fontSize={{ base: "xl", md: "2xl" }}
    lineHeight={1.4}
    mb="0"
    {...props}
  />
)

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/visual-identity")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[1])

  const lastDeployDate = getLastDeployDate()

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployDate,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const AssetsPage = () => {
  const { t } = useTranslation(["common", "page-visual-identity"])
  const assetPageHeroImage = useColorModeValue(
    logoBlack,
    logoWhite
  )
  return (
    <Flex direction="column" width="full">
      <PageMetadata
        title={t("common:visual-identity-title")}
        description={t("common:visual-identity-description")}
      />
      <Box as={MainArticle} py="4" px="8">
        <Flex direction="column" px="8" py="4">
          <Center>
            <Image
              src={assetPageHeroImage}
              alt={t("common:visual-identity-image-alt")}
              w="5rem"
            />
          </Center>
          <Center>
            <Heading as="h1" size="2xl" my="8">
              {t("common:visual-identity-title")}
            </Heading>
          </Center>
          <Center>
            <InlineLink to="#illustrations">
              {t("page-visual-identity:page-visual-identity-illustrations-title")}
            </InlineLink>
          </Center>
          <Center>
            <InlineLink to="#brand">
              {t("page-visual-identity:page-visual-identity-brand-title")}
            </InlineLink>
          </Center>
        </Flex>

        <H2 id="illustrations">{t("page-visual-identity:page-visual-identity-illustrations-title")}</H2>

        <Row>
          <AssetDownload
            title={t("common:hero-image-title")}
            alt={t("common:hero-image-alt")}
            image={hero}
            artistName="Fung"
            artistUrl="https://www.kyoarashi.com/"
          />
        </Row>
        
        {/* <Row>
          <AssetDownload
            title={t("page-assets-doge")}
            alt={t("page-assets-doge")}
            image={hero}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={t("page-assets-blocks")}
            alt={t("page-assets-blocks")}
            image={hero}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
          <AssetDownload
            title={t("page-assets-enterprise")}
            alt={t("page-assets-enterprise")}
            image={hero}
            artistName="William Tempest"
            artistUrl="https://cargocollective.com/willtempest"
          />
        </Row>*/}
        
        <H2 id="brand">{t("page-visual-identity:page-visual-identity-brand-title")}</H2>
        <H3>{t("page-visual-identity:page-visual-identity-transparent-background-title")}</H3>
        <Row>
          <AssetDownload
            title={t("common:icon-image-title")}
            alt={t("common:icon-image-alt")}
            image={icon}
            svgUrl="/assets/svg/icon.svg"
            artistName="Chia Yee Hui"
            artistUrl="https://www.linkedin.com/in/yeechia"
          />
          <AssetDownload
            title={t("common:main-logo-black-image-title")}
            alt={t("common:main-logo-black-image-alt")}
            image={logoBlack}
            svgUrl="/assets/svg/main-logo(black).svg"
            artistName="Chia Yee Hui"
            artistUrl="https://www.linkedin.com/in/yeechia"
          />
          <AssetDownload
            title={t("common:main-logo-white-image-title")}
            alt={t("common:main-logo-white-image-alt")}
            image={logoWhite}
            svgUrl="/assets/svg/main-logo(white).svg"
            artistName="Chia Yee Hui"
            artistUrl="https://www.linkedin.com/in/yeechia"
          />
        </Row>
      </Box>
      <FeedbackCard />
    </Flex>
  )
}

export default AssetsPage
