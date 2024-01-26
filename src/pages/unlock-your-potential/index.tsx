import { ReactNode } from "react"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"
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
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import MainHero from "@/components/MainHero"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import make_positive_impact from "@/public/make_positive_impact.png"
import unlock_your_potential from "@/public/unlock_your_potential.png"

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
    url: "/unlock-your-potential/programs?filters=knowledge",
    button: <Translation id="common:knowledge-button" />,
  },
  {
    emoji: ":toolbox:",
    title: <Translation id="common:tools-title" />,
    description: <Translation id="tools-description" />,
    url: "/unlock-your-potential/programs?filters=tools",
    button: <Translation id="tools-button" />,
  },
  {
    emoji: ":hug:",
    title: <Translation id="common:community-title" />,
    description: <Translation id="common:community-description" />,
    url: "/unlock-your-potential/programs?filters=community",
    button: <Translation id="common:community-button" />,
  },
]



const DevelopersPage = () => {
  const { t } = useTranslation(["page-unlock-your-potential", "common", "page-docs"])

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
              <Translation id="page-docs:page-docs-nav-overview-title" />
            </OldHeading>
            <InlineLink to="/unlock-your-potential/docs/">
              <Translation id="page-docs:page-docs-nav-overview-title" />
            </InlineLink>
            <Text>
              <Translation id="page-docs:page-docs-nav-overview-description" />
            </Text>
          </Column>
          <Column>
            <OldHeading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
              <Translation id="page-docs:page-docs-nav-principles-title" />
            </OldHeading>
            <InlineLink to="/unlock-your-potential/docs/flow-state">
              <Translation id="page-docs:page-docs-nav-flow-state-title" />
            </InlineLink>
            <Text>
              <Translation id="page-docs:page-docs-nav-flow-state-description" />
            </Text>
          </Column>
          <RightColumn>
            <OldHeading as="h3" fontSize={{ base: "xl", md: "2xl" }}>
              <Translation id="page-docs:page-docs-nav-resources-title" />
            </OldHeading>
            <InlineLink to="/unlock-your-potential/docs/template">
              <Translation id="page-docs:page-docs-nav-template-title" />
            </InlineLink>
            <Text>
              <Translation id="page-docs:page-docs-nav-template-description" />
            </Text>
          </RightColumn>
        </ThreeColumnContent>
      </GrayContainer>
      <FeedbackCard />
    </Page>
  )
}

export default DevelopersPage
