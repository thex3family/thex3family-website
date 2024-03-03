import { ReactNode, useState } from "react"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaGithub } from "react-icons/fa"
import {
  Box,
  chakra,
  Divider,
  Flex,
  FlexProps,
  Heading,
  HeadingProps,
  Icon,
  SimpleGridProps,
  Stack,
  useToken,
} from "@chakra-ui/react"

import { AllMetricData, BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"
import type { CommunityEventsReturnType } from "@/lib/interfaces"

import ActionCard from "@/components/ActionCard"
import ButtonLink from "@/components/Buttons/ButtonLink"
import CalloutBanner from "@/components/CalloutBanner"
import Codeblock from "@/components/Codeblock"
import CodeModal from "@/components/CodeModal"
import CommunityEvents from "@/components/CommunityEvents"
import HomeHero from "@/components/Hero/HomeHero"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import StatsBoxGrid from "@/components/StatsBoxGrid"
import TitleCardList, { ITitleCardItem } from "@/components/TitleCardList"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { runOnlyOnce } from "@/lib/utils/runOnlyOnce"
import {
  getRequiredNamespacesForPage,
  isLangRightToLeft,
} from "@/lib/utils/translations"

import { BASE_TIME_UNIT } from "@/lib/constants"

import CreateWalletContent from "!!raw-loader!@/data/CreateWallet.js"
import SimpleDomainRegistryContent from "!!raw-loader!@/data/SimpleDomainRegistry.sol"
import SimpleTokenContent from "!!raw-loader!@/data/SimpleToken.sol"
import SimpleWalletContent from "!!raw-loader!@/data/SimpleWallet.sol"
import { fetchCommunityEvents } from "@/lib/api/calendarEvents"
import community from "@/public/community.png"
import community_gathering from "@/public/community_gathering.png"
import contribute from "@/public/contribute.png"
import creatives from "@/public/creatives.png"
import hero from "@/public/home/hero.png"
import knowledge from "@/public/knowledge.png"
import live_your_best_life from "@/public/live_your_best_life.png"
import make_positive_impact from "@/public/make_positive_impact.png"
import retirees from "@/public/retirees.png"
import students from "@/public/students.png"
import tools from "@/public/tools.png"
import better_life_framework from "@/public/better_life_framework.png"
import understand_yourself from "@/public/understand_yourself.png"
import unlock_your_potential from "@/public/unlock_your_potential.png"

const SectionHeading = (props: HeadingProps) => (
  <Heading
    lineHeight={1.4}
    fontFamily="sans-serif"
    fontSize={{ base: "2xl", sm: "2rem" }}
    fontWeight={600}
    mb={2}
    {...props}
  />
)

const SectionDecription = (props: ChildOnlyProp) => (
  <Box mb={8} fontSize={{ base: "md", sm: "xl" }} lineHeight={1.4} {...props} />
)

const ImageContainer = (props: FlexProps & { children: ReactNode }) => (
  <Flex width={{ base: "75%", lg: "full" }} height="full" {...props} />
)

const CardContainer = (props: {
  children: ReactNode
  minChildWidth: SimpleGridProps["minChildWidth"]
}) => (
  <Flex
    flexWrap="wrap"
    gap={8}
    p={{ lg: 4 }}
    width="full"
    sx={{
      "& > *": {
        minW: props.minChildWidth,
      },
    }}
  >
    {props.children}
  </Flex>
)

const ContentBox = (props: ChildOnlyProp) => (
  <Box py={4} px={{ base: 4, lg: 8 }} {...props} />
)

const StyledActionCard = chakra(ActionCard, {
  baseStyle: {
    background: "background.base",
    borderRadius: "sm",
    border: "1px",
    borderColor: "text",
    margin: 0,
  },
})

const StyledCodeModal = chakra(CodeModal)

const StyledTitleCardList = chakra(TitleCardList)

const GrayContainer = (props: ChildOnlyProp) => (
  <Box width="full" pb={16} background="grayBackground" {...props} />
)

const MainSectionContainer = (props: {
  children: ReactNode
  containerBg: FlexProps["bg"]
}) => (
  <Flex
    alignItems="center"
    background={props.containerBg}
    borderBlock="1px"
    borderColor="text"
    height={{ base: "100%", lg: "720px" }}
    mt="-1px"
    py={{ base: 8, lg: 0 }}
    width="full"
  >
    {props.children}
  </Flex>
)

const FeatureContent = (props: ChildOnlyProp) => (
  <Flex
    flex="0 0 50%"
    flexDirection="column"
    justifyContent="center"
    boxSize="full"
    maxWidth={{ lg: "75%" }}
    p={{ base: 8, lg: 24 }}
    {...props}
  />
)

const Row = (props: { children: ReactNode; isReversed?: boolean }) => (
  <Flex
    alignItems="center"
    flexDirection={{
      base: "column-reverse",
      lg: props.isReversed ? "row-reverse" : "row",
    }}
  >
    {props.children}
  </Flex>
)

const ButtonLinkRow = (props: ChildOnlyProp) => (
  <Stack
    alignItems="flex-start"
    direction={{ base: "column", md: "row" }}
    spacing={{ base: 6, md: 2 }}
    {...props}
  />
)


const cachedFetchCommunityEvents = runOnlyOnce(fetchCommunityEvents)

type Props = BasePageProps & {
  communityEvents: CommunityEventsReturnType
  metricResults: AllMetricData
}

export const getStaticProps = (async ({ locale }) => {
  const metricResults: AllMetricData = {
    totalEthStaked: { data: [], value: 0 },
    nodeCount: { data: [], value: 0 },
    totalValueLocked: { data: [], value: 0 },
    txCount: { data: [], value: 0 },
  }

  const communityEvents = await cachedFetchCommunityEvents()

  // load i18n required namespaces for the given page
  const requiredNamespaces = getRequiredNamespacesForPage("/")

  // check if the translated page content file exists for locale
  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[0])

  // load last deploy date to pass to Footer in RootLayout
  const lastDeployDate = getLastDeployDate()  
  
  // Log the props before returning them
  // console.log({
  //   translations: await serverSideTranslations(locale!, requiredNamespaces),
  //   communityEvents,
  //   contentNotTranslated,
  //   lastDeployDate,
  //   metricResults,
  // });

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      communityEvents,
      contentNotTranslated,
      lastDeployDate,
      metricResults,
    },
    // revalidate: BASE_TIME_UNIT * 24,
  }
}) satisfies GetStaticProps<Props>

const HomePage = ({
  communityEvents,
  metricResults,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation(["common", "page-index"])
  const { locale } = useRouter()
  const [isModalOpen, setModalOpen] = useState(false)
  const [activeCode, setActiveCode] = useState(0)
  const dir = isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"

  const toggleCodeExample = (id: number): void => {
    setActiveCode(id)
    setModalOpen(true)
  }

  const cards = [
    {
      image: understand_yourself,
      title: t("understand-yourself-title"),
      description: t("understand-yourself-description"),
      alt: t("understand-yourself-image-alt"),
      to: "/understand-yourself/",
    },
    {
      image: unlock_your_potential,
      title: t("unlock-your-potential-title"),
      description: t("unlock-your-potential-description"),
      alt: t("unlock-your-potential-image-alt"),
      to: "/unlock-your-potential/",
    },
    {
      image: make_positive_impact,
      title: t("make-positive-impact-title"),
      description: t("make-positive-impact-description"),
      alt: t("make-positive-impact-image-alt"),
      to: "/make-positive-impact/",
    },
    {
      image: live_your_best_life,
      title: t("live-your-best-life-title"),
      description: t("live-your-best-life-description"),
      alt: t("live-your-best-life-image-alt"),
      to: "/live-your-best-life/about-us/",
    },
  ]

  const touts = [
    {
      image: students,
      alt: t("students-image-alt"),
      title: t("students-title"),
      description: t("students-description"),
      to: "/for/students",
    },
    {
      image: creatives,
      alt: t("creatives-image-alt"),
      title: t("creatives-title"),
      description: t("creatives-description"),
      to: "/for/creatives",
    },
    {
      image: retirees,
      alt: t("retirees-image-alt"),
      title: t("retirees-title"),
      description: t("retirees-description"),
      to: "/for/retirees",
    },
  ]

  interface CodeExample extends ITitleCardItem {
    codeLanguage: string
    code: string
  }

  const codeExamples: Array<CodeExample> = [
    {
      title: t("page-index:page-index-banner-5-code-example-title-0"),
      description: t("page-index:page-index-banner-5-code-example-description-0"),
      codeLanguage: "language-solidity",
      code: SimpleWalletContent,
    },
    {
      title: t("page-index:page-index-banner-5-code-example-title-1"),
      description: t("page-index:page-index-banner-5-code-example-description-1"),
      codeLanguage: "language-solidity",
      code: SimpleTokenContent,
    },
    {
      title: t("page-index:page-index-banner-5-code-example-title-2"),
      description: t("page-index:page-index-banner-5-code-example-description-2"),
      codeLanguage: "language-javascript",
      code: CreateWalletContent,
    },
    {
      title: t("page-index:page-index-banner-5-code-example-title-3"),
      description: t("page-index:page-index-banner-5-code-example-description-3"),
      codeLanguage: "language-solidity",
      code: SimpleDomainRegistryContent,
    },
  ]

  const cardBoxShadow = useToken("colors", "cardBoxShadow")
  
  return (
    <Flex
      as={MainArticle}
      flexDirection="column"
      alignItems="center"
      dir={dir}
      width="full"
    >
      <PageMetadata
        title={t("page-index:page-index-meta-title")}
        description={t("page-index:page-index-meta-description")}
      />
      <Box w="full">
        <HomeHero heroImg={hero} />
      </Box>
      {/* Getting Started Section */}
      <GrayContainer>
        <ContentBox>
          <Flex
            alignItems="center"
            flexDirection={{ base: "column-reverse", md: "row" }}
            gap={{ base: 4 }}
            mt={{ md: 4 }}
            mb={{ md: 12 }}
          >
            <Box
              flex="0 0 50%"
              maxW={{ lg: "75%" }}
              p={{ sm: 8, lg: 24 }}
              boxSize="full"
            >
            <Box mb={6}>
              <SectionHeading fontFamily="inherit">
                <Translation id="page-index:page-index-get-started" />
              </SectionHeading>
              </Box>
              <SectionDecription>
                <Translation id="page-index:page-index-get-started-description" />
              </SectionDecription>
              <ButtonLinkRow>
              <ButtonLink to="/live-your-best-life/about-us/" variant={"secondary"}>
                <Translation id="common:learn-more" />
              </ButtonLink>
            </ButtonLinkRow>
            </Box>
            <ImageContainer>
              <Image
                src={community_gathering}
                alt={t("page-index:page-index-get-started-image-alt")}
                width={720}
                backgroundSize="cover"
                background="no-repeat 50px"
              />
            </ImageContainer>
          </Flex>
          <Box pb={4} textAlign="center">
            <SectionHeading mt={12} mb={8} fontFamily="heading">
              <Translation id="page-index:page-index-cards-header" />
            </SectionHeading>
          </Box>
          <CardContainer minChildWidth={{ lg: "480px" }}>
            {cards.map((card, idx) => (
              <StyledActionCard
                key={idx}
                boxShadow={cardBoxShadow}
                m={0}
                title={card.title}
                description={card.description}
                alt={card.alt}
                to={card.to}
                image={card.image}
                imageWidth={320}
              />
            ))}
          </CardContainer>
        </ContentBox>

        {/* Explore Section */}
        <ContentBox>
          <Box pb={4}>
            <SectionHeading mt={12} mb={8} fontFamily="heading" textAlign="center">
              <Translation id="common:for-title" />
            </SectionHeading>
          </Box>
          <CardContainer minChildWidth={{ lg: "400px" }}>
            {touts.map((tout, idx) => {
              return (
                <StyledActionCard
                  key={idx}
                  title={tout.title}
                  description={tout.description}
                  alt={tout.alt}
                  to={tout.to}
                  image={tout.image}
                  imageWidth={320}
                  boxShadow={cardBoxShadow}
                />
              )
            })}
          </CardContainer>
        </ContentBox>
      </GrayContainer>
      {/* Banner 1 */}
      
      <Box pb={4}>
            <SectionHeading mt={12} mb={8} fontFamily="heading" textAlign="center">
              <Translation id="page-index:page-index-banner-header" />
            </SectionHeading>
          </Box>
      <MainSectionContainer containerBg="homeBoxGreen">
        <Row isReversed>
          <FeatureContent>
            <SectionHeading>
              <Translation id="page-index:page-index-banner-1-title" />
            </SectionHeading>
            <SectionDecription>
              <Translation id="page-index:page-index-banner-1-description" />
            </SectionDecription>
            <ButtonLinkRow>
              <ButtonLink to="/understand-yourself/">
                <Translation id="page-index:page-index-banner-1-button" />
              </ButtonLink>
              <ButtonLink to="/understand-yourself/better-life-framework/" variant="outline">
                <Translation id="page-index:page-index-banner-1-secondary-button" />
              </ButtonLink>
            </ButtonLinkRow>
          </FeatureContent>
          <ImageContainer ps={{ lg: 8 }}>
            <Image
              src={better_life_framework}
              alt={t("common:better-life-framework-image-alt")}
              width={700}
            />
          </ImageContainer>
        </Row>
      </MainSectionContainer>
      {/* Banner 2 */}
      <MainSectionContainer containerBg="homeBoxBlue">
        <Row>
          <FeatureContent>
            <SectionHeading>
              <Translation id="common:knowledge-header" />
            </SectionHeading>
            <SectionDecription>
              <Translation id="common:knowledge-description" />
            </SectionDecription>
            <ButtonLinkRow>
              <ButtonLink to="/unlock-your-potential/programs?filters=knowledge">
                <Translation id="common:knowledge-button" />
              </ButtonLink>
            </ButtonLinkRow>
          </FeatureContent>
          <ImageContainer>
            <Image
              src={knowledge}
              alt={t("common:knowledge-image-alt")}
              width={700}
            />
          </ImageContainer>
        </Row>
      </MainSectionContainer>
      {/* Banner 3 */}
      <MainSectionContainer containerBg="homeBoxRed">
        <Row isReversed>
          <FeatureContent>
            <SectionHeading>
              <Translation id="common:tools-header" />
            </SectionHeading>
            <SectionDecription>
              <Translation id="common:tools-description" />
            </SectionDecription>
            <ButtonLinkRow>
              <ButtonLink to="/unlock-your-potential/programs?filters=tools">
                <Translation id="common:tools-button" />
              </ButtonLink>
            </ButtonLinkRow>
          </FeatureContent>
          <ImageContainer>
            <Image
              src={tools}
              alt={t("common:tools-image-alt")}
              width={700}
            />
          </ImageContainer>
        </Row>
      </MainSectionContainer>
      {/* Banner 4 */}
      <MainSectionContainer containerBg="homeBoxYellow">
        <Box ps={{ lg: 8 }}>
          <Row>
            <FeatureContent>
              <SectionHeading>
                <Translation id="common:community-header" />
              </SectionHeading>
              <SectionDecription>
                <Translation id="common:community-description" />
              </SectionDecription>
              <ButtonLinkRow>
                <ButtonLink to="/unlock-your-potential/programs?filters=community">
                  <Translation id="common:community-button" />
                </ButtonLink>
              </ButtonLinkRow>
            </FeatureContent>
            <ImageContainer>
              <Image
                src={community}
                alt={t("common:community-image-alt")}
                width={700}
              />
            </ImageContainer>
          </Row>
        </Box>
      </MainSectionContainer>
      {/* Banner 5 */}
      <MainSectionContainer containerBg="homeBoxGreen">
        <Row>
          <Box py={4} px={{ base: 4, sm: 8 }} width="full">
            <StyledTitleCardList
              content={codeExamples}
              //clickHandler={toggleCodeExample}
              clickHandler={() => window.open('/unlock-your-potential/programs')}
              headerKey="page-index:page-index-banner-5-code-examples"
              isCode
              border="1px"
              borderColor="text"
              boxShadow={cardBoxShadow}
              maxWidth={{ lg: "624px" }}
              ms={{ lg: 16 }}
            />
          </Box>
          <FeatureContent>
            <SectionHeading>
              <Translation id="page-index:page-index-banner-5-title" />
            </SectionHeading>
            <SectionDecription>
              <Translation id="page-index:page-index-banner-5-description" />
            </SectionDecription>
            <ButtonLinkRow>
              <ButtonLink to="/make-positive-impact/">
                <Translation id="common:make-positive-impact-button" />
              </ButtonLink>
            </ButtonLinkRow>
          </FeatureContent>
          {/* <StyledCodeModal
            isOpen={isModalOpen}
            setIsOpen={setModalOpen}
            title={codeExamples[activeCode].title}
            sx={{
              ".modal-component-container": {
                padding: 0,
                left: 0,
                right: 0,
                bottom: 0,
                top: "50%",
              },
              ".modal-component": {
                maxWidth: "100%",
                maxHeight: "50%",
                padding: 0,
              },
              ".modal-component-content": {
                marginTop: "3rem",
                width: "100%",
                overflow: "auto",
              },
            }}
          >
            <Codeblock
              codeLanguage={codeExamples[activeCode].codeLanguage}
              allowCollapse={false}
              fromHomepage
            >
              {codeExamples[activeCode].code}
            </Codeblock>
          </StyledCodeModal> */}
        </Row>
      </MainSectionContainer>
      {/* Stats Section */}
      <GrayContainer>
        <ContentBox>
          <SectionHeading mt={12} mb={8} fontFamily="heading">
            <Translation id="page-index:page-index-stats-title" />
          </SectionHeading>
          <SectionDecription>
            <Translation id="page-index:page-index-stats-subtitle" />
          </SectionDecription>
        </ContentBox>
        <StatsBoxGrid data={metricResults} />
      </GrayContainer>
      <Divider mb={16} mt={16} w="10%" height="0.25rem" bgColor="homeDivider" />
      <CommunityEvents events={communityEvents} />
      <ContentBox>
        <CalloutBanner
          titleKey={"page-index:page-index-contribution-banner-title"}
          descriptionKey={
            "page-index:page-index-contribution-banner-description"
          }
          image={contribute}
          imageWidth={600}
          alt={t("contribute-image-alt")}
          mt={32}
          mb={16}
          mx={0}
        >
          <ButtonLinkRow>
            <ButtonLink to="/make-positive-impact/contribute/">
              <Translation id="page-index:page-index-contribution-banner-button" />
            </ButtonLink>
            <ButtonLink
              to="https://github.com/thex3family/thex3family-website"
              leftIcon={<Icon as={FaGithub} fontSize="2xl" />}
              variant="outline"
            >
              GitHub
            </ButtonLink>
          </ButtonLinkRow>
        </CalloutBanner>
      </ContentBox>
    </Flex>
  )
}

export default HomePage
