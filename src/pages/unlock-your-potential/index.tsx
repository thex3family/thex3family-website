import { ReactNode } from "react"
import { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  TextProps,
  useColorModeValue,
} from "@chakra-ui/react"

import { BasePageProps, ChildOnlyProp } from "@/lib/types"

import ButtonLink from "@/components/Buttons/ButtonLink"
import Callout from "@/components/Callout"
import Card, { IProps as ICardProps } from "@/components/Card"
import FeedbackCard from "@/components/FeedbackCard"
import HubHero from "@/components/Hero/HubHero"
import { Image } from "@/components/Image"
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import DevelopersImage from "@/public/developers-eth-blocks.png"
import DogeImage from "@/public/doge-computer.png"
import HeroImage from "@/public/heroes/developers-hub-hero.jpg"
import { useRouter } from "next/router"
import MainHero from "@/components/MainHero"
import unlock_your_potential from "@/public/unlock_your_potential.png"
import make_positive_impact from "@/public/make_positive_impact.png"

const Page = (props: ChildOnlyProp) => (
  <Flex
    flexDirection="column"
    alignItems="center"
    w="full"
    my={0}
    mx="auto"
    {...props}
  />
)

const GrayContainer = (props: ChildOnlyProp) => (
  <Box
    w="full"
    py={16}
    px={0}
    mt={8}
    bg="grayBackground"
    boxShadow="inset 0px 1px 0px var(--x3-colors-tableItemBoxShadow)"
    {...props}
  />
)

const Content = (props: ChildOnlyProp) => (
  <Box as={MainArticle} py={4} px={8} w="full" {...props} />
)

const Subtitle = (props: TextProps) => (
  <Text fontSize="xl" lineHeight="140%" color="text200" {...props} />
)

const MonoSubtitle = (props: ChildOnlyProp) => <OldHeading mb={0} {...props} />

const StyledCardContainer = (props: ChildOnlyProp) => (
  <SimpleGrid columns={[1, 1, 2, 4]} mx={-4} mt={8} mb={12} {...props} />
)

const TwoColumnContent = (props: ChildOnlyProp) => (
  <Flex
    justifyContent="space-between"
    alignItems={{ base: "flex-start", lg: "center" }}
    flexDirection={{ base: "column", lg: "row" }}
    w="100%"
    {...props}
  />
)

const ThreeColumnContent = (props: ChildOnlyProp) => (
  <Flex
    py={0}
    px={8}
    w="full"
    justifyContent="space-between"
    alignItems={{ base: "flex-start", lg: "flex-start" }}
    flexDirection={{ base: "column", lg: "row" }}
    {...props}
  />
)

const Column = (props: ChildOnlyProp) => (
  <Box flex="1 1 33%" mb={6} me={8} w="full" {...props} />
)
const RightColumn = (props: ChildOnlyProp) => (
  <Box flex="1 1 33%" mb={6} me={0} w="full" {...props} />
)
const IntroColumn = (props: ChildOnlyProp) => (
  <Box
    flex="1 1 33%"
    mb={6}
    mt={{ base: 0, lg: 32 }}
    me={{ base: 0, sm: 8 }}
    w="full"
    {...props}
  />
)

const StyledCard = (props: ICardProps) => {
  const tableBoxShadow = useColorModeValue("tableBox.light", "tableBox.dark")

  return (
    <Card
      boxShadow={tableBoxShadow}
      m={4}
      p={6}
      {...props}
      _hover={{
        borderRadius: "4px",
        boxShadow: "0px 8px 17px rgba(0, 0, 0, 0.15)",
        background: "tableBackgroundHover",
        transition: "transform 0.1s",
        transform: "scale(1.02)",
      }}
    />
  )
}

const StyledCallout = chakra(Callout, {
  baseStyle: {
    flex: { base: "auto", md: "1 1 416px" },
  },
})

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/unlock-your-potential")

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

interface IDevelopersPath {
  emoji: string
  title: ReactNode
  description: ReactNode
  url: string
  button: ReactNode
}

const paths: Array<IDevelopersPath> = [
  {
    emoji: ":scroll:",
    title: <Translation id="common:understand-the-framework-title" />,
    description: <Translation id="common:understand-the-framework-description" />,
    url: "/understand-yourself/understand-the-framework/",
    button: <Translation id="common:get-started" />,
  },
  {
    emoji: ":book:",
    title: <Translation id="common:knowledge-title" />,
    description: <Translation id="common:knowledge-description" />,
    url: "/unlock-your-potential/knowledge/",
    button: <Translation id="common:knowledge-button" />,
  },
  {
    emoji: ":toolbox:",
    title: <Translation id="common:tools-title" />,
    description: <Translation id="tools-description" />,
    url: "/unlock-your-potential/tools/",
    button: <Translation id="tools-button" />,
  },
  {
    emoji: ":hug:",
    title: <Translation id="common:community-title" />,
    description: <Translation id="common:community-description" />,
    url: "/unlock-your-potential/community/",
    button: <Translation id="common:community-button" />,
  },
]



const DevelopersPage = () => {
  const { t } = useTranslation(["page-unlock-your-potential", "common"])

  const { pathname } = useRouter()

  const heroProps = {
    pathname,
    lastUpdated: t("common:page-last-updated") + ": January 22, 2024", // This should be dynamic based on your data
    title: t("common:unlock-your-potential-title"),
    description: t("common:unlock-your-potential-description")
      .split('.')
      .filter(sentence => sentence.trim() !== '')
      .map(sentence => `${sentence.trim()}.`),
    imageSrc: unlock_your_potential.src, // Assuming understand_yourself is an imported image module
    imageAlt: t("common:unlock-your-potential-image-alt"),
  };

  return (
    <Page>
      <PageMetadata
        title={t("common:unlock-your-potential-title")}
        description={t("common:unlock-your-potential-description")}
      />
      

      {/* Main Hero */}
      <MainHero {...heroProps} />

      {/* <HubHero
        heroImg={HeroImage}
        header={`${t("page-unlock-your-potential:page-developers-title-1")} ${t(
          "page-unlock-your-potential:page-developers-title-2"
        )} ${t("page-unlock-your-potential:page-developers-title-3")}`}
        title={t("developers")}
        description={t("page-unlock-your-potential:page-developers-subtitle")}
      /> */}

      <Content id="start">
        <MonoSubtitle>
          <Translation id="page-unlock-your-potential:page-unlock-your-potential-get-started-title" />
        </MonoSubtitle>
        <Subtitle my={6}>
          <Translation id="page-unlock-your-potential:page-unlock-your-potential-get-started-description" />
        </Subtitle>
        <StyledCardContainer>
          {paths.map((path, idx) => (
            <StyledCard
              key={idx}
              emoji={path.emoji}
              title={path.title}
              description={path.description}
            >
              <ButtonLink to={path.url}>{path.button}</ButtonLink>
            </StyledCard>
          ))}
        </StyledCardContainer>
        <TwoColumnContent>
          <IntroColumn>
            <OldHeading>
              <Translation id="page-unlock-your-potential:page-unlock-your-potential-about-title" />
            </OldHeading>
            <Subtitle mb={6}>
              <Translation id="page-unlock-your-potential:page-unlock-your-potential-about-description-1" />
            </Subtitle>
            <Subtitle mb={6}>
              <Translation id="page-unlock-your-potential:page-unlock-your-potential-about-description-2" />
            </Subtitle>
          </IntroColumn>
          <StyledCallout
            image={make_positive_impact}
            titleKey="common:make-positive-impact-title"
            descriptionKey="common:make-positive-impact-description"
            alt={t("common:make-positive-impact-image-alt")}
          >
          <div>
            <ButtonLink to="/make-positive-impact/">
              <Translation id="make-positive-impact-button" />
            </ButtonLink>
            </div>
          </StyledCallout>
        </TwoColumnContent>
      </Content>
      <GrayContainer>
        <Content>
          <OldHeading>
            <Translation id="page-unlock-your-potential:page-unlock-your-potential-documentation-title" />
          </OldHeading>
            <Subtitle mb={6}>
              <Translation id="page-unlock-your-potential:page-unlock-your-potential-documentation-description" />
            </Subtitle>
        </Content>

        <ThreeColumnContent>
          <Column>
            <OldHeading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
              <Translation id="page-unlock-your-potential:page-developers-docs-introductions" />
            </OldHeading>
            <InlineLink to="/developers/docs/intro-to-ethereum/">
              <Translation id="page-unlock-your-potential:page-developers-intro-eth-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-into-eth-desc" />
            </Text>

            <InlineLink to="/developers/docs/intro-to-ether/">
              <Translation id="page-unlock-your-potential:page-developers-intro-ether-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-intro-ether-desc" />
            </Text>

            <InlineLink to="/developers/docs/dapps/">
              <Translation id="page-unlock-your-potential:page-developers-intro-dapps-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-intro-dapps-desc" />
            </Text>

            <InlineLink to="/developers/docs/ethereum-stack/">
              <Translation id="page-unlock-your-potential:page-developers-intro-stack" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-intro-stack-desc" />
            </Text>

            <InlineLink to="/developers/docs/web2-vs-web3/">
              <Translation id="page-unlock-your-potential:page-developers-web3-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-web3-desc" />
            </Text>

            <InlineLink to="/developers/docs/programming-languages/">
              <Translation id="page-unlock-your-potential:page-developers-languages" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-language-desc" />
            </Text>
            <Image
              hideBelow="lg"
              src={DogeImage}
              alt={t("page-assets-doge")}
              maxW="400px"
              mt={16}
            />
          </Column>
          <Column>
            <OldHeading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
              <Translation id="page-unlock-your-potential:page-developers-fundamentals" />
            </OldHeading>
            <InlineLink to="/developers/docs/accounts/">
              <Translation id="page-unlock-your-potential:page-developers-accounts-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-account-desc" />
            </Text>

            <InlineLink to="/developers/docs/transactions/">
              <Translation id="page-unlock-your-potential:page-developers-transactions-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-transactions-desc" />
            </Text>

            <InlineLink to="/developers/docs/blocks/">
              <Translation id="page-unlock-your-potential:page-developers-blocks-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-block-desc" />
            </Text>

            <InlineLink to="/developers/docs/evm/">
              <Translation id="page-unlock-your-potential:page-developers-evm-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-evm-desc" />
            </Text>

            <InlineLink to="/developers/docs/gas/">
              <Translation id="page-unlock-your-potential:page-developers-gas-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-gas-desc" />
            </Text>

            <InlineLink to="/developers/docs/nodes-and-clients/">
              <Translation id="page-unlock-your-potential:page-developers-node-clients-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-node-clients-desc" />
            </Text>

            <InlineLink to="/developers/docs/networks/">
              <Translation id="page-unlock-your-potential:page-developers-networks-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-networks-desc" />
            </Text>

            <InlineLink to="/developers/docs/consensus-mechanisms/pow/mining/">
              <Translation id="page-unlock-your-potential:page-developers-mining-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-mining-desc" />
            </Text>

            <InlineLink to="/developers/docs/consensus-mechanisms/pow/mining-algorithms/">
              <Translation id="page-unlock-your-potential:page-developers-mining-algorithms-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-mining-algorithms-desc" />
            </Text>
          </Column>
          <RightColumn>
            <OldHeading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
              <Translation id="page-unlock-your-potential:page-developers-stack" />
            </OldHeading>
            <InlineLink to="/developers/docs/smart-contracts/">
              <Translation id="page-unlock-your-potential:page-developers-smart-contracts-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-smart-contracts-desc" />
            </Text>
            <InlineLink to="/developers/docs/frameworks/">
              <Translation id="page-unlock-your-potential:page-developers-frameworks-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-frameworks-desc" />
            </Text>
            <InlineLink to="/developers/docs/apis/javascript/">
              <Translation id="page-unlock-your-potential:page-developers-js-libraries-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-js-libraries-desc" />
            </Text>
            <InlineLink to="/developers/docs/apis/backend/">
              <Translation id="page-unlock-your-potential:page-developers-api-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-api-desc" />
            </Text>
            <InlineLink to="/developers/docs/data-and-analytics/block-explorers/">
              <Translation id="page-unlock-your-potential:page-developers-block-explorers-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-block-explorers-desc" />
            </Text>
            <InlineLink to="/developers/docs/smart-contracts/security/">
              <Translation id="page-unlock-your-potential:page-developers-smart-contract-security-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-smart-contract-security-desc" />
            </Text>
            <InlineLink to="/developers/docs/storage/">
              <Translation id="page-unlock-your-potential:page-developers-storage-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-storage-desc" />
            </Text>
            <InlineLink to="/developers/docs/ides/">
              <Translation id="page-unlock-your-potential:page-developers-dev-env-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-dev-env-desc" />
            </Text>
            <OldHeading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
              <Translation id="page-unlock-your-potential:page-developers-advanced" />
            </OldHeading>
            <InlineLink to="/developers/docs/standards/tokens/">
              <Translation id="page-unlock-your-potential:page-developers-token-standards-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-token-standards-desc" />
            </Text>
            <InlineLink to="/developers/docs/mev/">
              <Translation id="page-unlock-your-potential:page-developers-mev-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-mev-desc" />
            </Text>
            <InlineLink to="/developers/docs/oracles/">
              <Translation id="page-unlock-your-potential:page-developers-oracles-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-oracle-desc" />
            </Text>
            <InlineLink to="/developers/docs/scaling/">
              <Translation id="page-unlock-your-potential:page-developers-scaling-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-scaling-desc" />
            </Text>
            <InlineLink to="/developers/docs/networking-layer/">
              <Translation id="page-unlock-your-potential:page-developers-networking-layer-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-networking-layer-desc" />
            </Text>
            <InlineLink to="/developers/docs/data-structures-and-encoding/">
              <Translation id="page-unlock-your-potential:page-developers-data-structures-and-encoding-link" />
            </InlineLink>
            <Text>
              <Translation id="page-unlock-your-potential:page-developers-data-structures-and-encoding-desc" />
            </Text>
          </RightColumn>
        </ThreeColumnContent>
      </GrayContainer>
      <FeedbackCard />
    </Page>
  )
}

export default DevelopersPage
