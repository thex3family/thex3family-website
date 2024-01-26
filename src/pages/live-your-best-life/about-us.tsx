import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { MdInfoOutline } from "react-icons/md"
import {
  Box,
  type BoxProps,
  Center,
  Flex,
  type FlexProps,
  Heading,
  type HeadingProps,
  Icon,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react"

import type {
  BasePageProps,
  ChildOnlyProp,
  Lang,
  MetricReturnData,
} from "@/lib/types"

import AdoptionChart from "@/components/AdoptionChart"
import {
  Banner,
  BannerBody,
  BannerGrid,
  BannerGridCell,
  BannerImage,
} from "@/components/BannerGrid"
import Button from "@/components/Buttons/Button"
import ButtonLink from "@/components/Buttons/ButtonLink"
import Callout from "@/components/Callout"
import Card from "@/components/Card"
import EnergyConsumptionChart from "@/components/EnergyConsumptionChart"
import FeedbackCard from "@/components/FeedbackCard"
import { Image, type ImageProps } from "@/components/Image"
import InlineLink from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import MainHero from "@/components/MainHero"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"
import { StandaloneQuizWidget } from "@/components/Quiz/QuizWidget"
import Slider, { EmblaSlide } from "@/components/Slider"
import StatErrorMessage from "@/components/StatErrorMessage"
import Tabs from "@/components/Tabs"
import Tooltip from "@/components/Tooltip"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { runOnlyOnce } from "@/lib/utils/runOnlyOnce"
import {
  getLocaleForNumberFormat,
  getRequiredNamespacesForPage,
} from "@/lib/utils/translations"

import { fetchTxCount } from "@/lib/api/fetchTxCount"
import community_gathering from "@/public/community_gathering.png"
import comrades from "@/public/comrades.png"
import mission from "@/public/mission.png"
import vision from "@/public/vision.png"

const Slogan = (props: ChildOnlyProp) => (
  <Text
    textStyle="normal"
    fontWeight="normal"
    fontSize="2rem"
    lineHeight={1.4}
    {...props}
  />
)

const Title = (props: ChildOnlyProp) => (
  <Heading
    as="h1"
    fontSize="sm"
    lineHeight={1.4}
    letterSpacing="wider"
    fontWeight="500"
    mb={4}
    textTransform="uppercase"
    color="textTableOfContents"
    {...props}
  />
)

const Subtitle = (props: ChildOnlyProp) => (
  <Text fontSize="xl" lineHeight={1.4} color="text200" {...props} />
)

const Hero = (props: ChildOnlyProp) => (
  <Box
    flex="1 1 100%"
    maxW="800px"
    bgSize="cover"
    bgRepeat="no-repeat"
    {...props}
  />
)

const Summary = (props: BoxProps) => (
  <Box p={4} borderRadius="base" bg="cardGradient" {...props} />
)

const Content = (props: ChildOnlyProp) => (
  <Box w="full" px={0} py={4} {...props} />
)

const TwoColumnContent = (props: FlexProps) => (
  <Flex
    w="full"
    gap={{ base: 8, lg: 4 }}
    align={{ base: "flex-start", lg: "center" }}
    direction={{ base: "column", lg: "row" }}
    {...props}
  />
)

const Section = (props: BoxProps) => <Box w="full" py={12} px={8} {...props} />

export const Width50 = (props: ChildOnlyProp) => (
  <Box w="full" flex={1} {...props} />
)

export const Width60 = (props: ChildOnlyProp) => (
  <Box w="full" flex={3} {...props} />
)

export const Width40 = (props: ChildOnlyProp) => (
  <Center w="full" flex={2} {...props} />
)

const H2 = (prop: ChildOnlyProp & HeadingProps) => (
  <Heading
    fontSize={{ base: "2xl", md: "3xl" }}
    lineHeight={1.4}
    mb={6}
    {...prop}
  />
)

const H3 = (props: ChildOnlyProp) => (
  <OldHeading
    as="h3"
    mt={0}
    fontSize={{ base: "xl", md: "2xl" }}
    lineHeight={1.4}
    fontWeight={600}
    mb={0}
    {...props}
  />
)

const CardContainer = (props: ChildOnlyProp) => (
  <Flex wrap="wrap" mx={-4} {...props} />
)

const Column = (props: ChildOnlyProp) => (
  <Box flex="0 0 50%" maxW={{ base: "full", md: "75%" }} mb={6} {...props} />
)

const StatPrimary = (props: ChildOnlyProp) => (
  <Box fontSize="5xl" mb={4} lineHeight={1} {...props} />
)

const StatDescription = (props: ChildOnlyProp) => (
  <Box fontSize="md" color="text200" {...props} />
)

const ButtonRow = (props: ChildOnlyProp) => (
  <Flex align="center" mt={4} mb={6} wrap="wrap" gap={4} {...props} />
)

const NoWrapText = (props: ChildOnlyProp) => (
  <Text as="span" whiteSpace="nowrap" {...props} />
)

const Image400 = ({ src }: Pick<ImageProps, "src">) => (
  <Image src={src} alt="" width={400} />
)

// const cachedFetchTxCount = runOnlyOnce(fetchTxCount)

type Props = BasePageProps & {
  data: MetricReturnData
}

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()

  const requiredNamespaces = getRequiredNamespacesForPage("/live-your-best-life/about-us")

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[1])

  const data = { data: [], value: 0 }

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployDate,
      data,
    },
  }
}) satisfies GetStaticProps<Props>

const WhatIsEthereumPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation(["page-about-us", "quizzes"])

  const { locale } = useRouter()
  const localeForNumberFormat = getLocaleForNumberFormat(locale! as Lang)

  const formatNumber = (value: number) =>
    new Intl.NumberFormat(localeForNumberFormat, {
      notation: "compact",
      minimumSignificantDigits: 3,
      maximumSignificantDigits: 4,
    }).format(value)

  const txStat = "error" in data ? "" : formatNumber(data.value)

  const cards = [
    {
      emoji: ":book:",
      title: t("common:knowledge-title"),
      description: t("common:knowledge-description"),
    },

    {
      emoji: ":toolbox:",
      title: t("common:tools-title"),
      description: t("common:tools-description"),
    },
    {
      emoji: ":hug:",
      title: t("common:community-title"),
      description: t("common:community-description"),
    },
    {
      emoji: ":crossed_swords:",
      title: t("common:contribute-title"),
      description: t("common:contribute-description"),
    },
    {
      emoji: ":watch:",
      title: t("common:collaborate-title"),
      description: t("common:collaborate-description"),
    },
    {
      emoji: ":handshake:",
      title: t("common:co-create-title"),
      description: t("common:co-create-description"),
    },
  ]

  // const tabs1 = [
  //   {
  //     title: t("common:vision-title"),
  //     eventName: "Vision Tab",
  //     content: (
  //       <Text mb="0">
  //         <Translation id="common:vision-description" />
  //       </Text>
  //     ),
  //   },
  // ]
  // const tabs2 = [
  //   {
  //     title: t("common:mission-title"),
  //     eventName: "Mission Tab",
  //     content: (
  //       <Text mb="0">
  //         <Translation id="common:mission-description" />
  //       </Text>
  //     ),
  //   },
  // ]

  const slides = [
    { eventName: "History - Slide 1" },
    { eventName: "History - Slide 2" },
    { eventName: "History - Slide 3" },
  ]

  const tooltipContent = ({ text, url, ariaLabel }) => (
    <div>
      {text}{" "}
      <InlineLink to={url} aria-label={ariaLabel}>
        Learn More
      </InlineLink>
    </div>
  )

  const { pathname } = useRouter()

  const heroProps = {
    pathname,
    lastUpdated: t("common:page-last-updated") + ": January 22, 2024", // This should be dynamic based on your data
    title: t("common:about-us-title"),
    description: t("common:about-us-description")
      .split('.')
      .filter(sentence => sentence.trim() !== '')
      .map(sentence => `${sentence.trim()}.`),
    imageSrc: comrades.src, // Assuming understand_yourself is an imported image module
    imageAlt: t("common:about-us-image-alt"),
  };

  return (
    <Flex
      as={MainArticle}
      direction="column"
      align="center"
      w="full"
      m="0 auto"
    >
      <PageMetadata
        title={t("common:about-us-title")}
        description={t("common:about-us-description")}
        image="comrades.png"
      />

      {/* Main Hero */}
      <MainHero {...heroProps} />

      {/* <Flex
        align="center"
        justify="space-between"
        direction={{ base: "column-reverse", md: "row" }}
      >
        <Box as="header">
          <Title>{t("page-what-is-ethereum-title")}</Title>
          <Slogan>{t("page-what-is-ethereum-desc")}</Slogan>
          <Subtitle>{t("page-what-is-ethereum-subtitle")}</Subtitle>
          <ButtonRow>
            <Button toId="summary">
              {t("page-what-is-ethereum-button-lets-start")}
            </Button>
          </ButtonRow>
        </Box>
        <Hero>
          <Image
            src={hero}
            alt={t("page-what-is-ethereum-alt-img-bazaar")}
            priority
          />
        </Hero>
      </Flex> */}

      <Box
        w="full"
        bg="grayBackground"
        boxShadow={{
          base: "none",
          md: "inset 0px 1px 0px var(--x3-colors-tableItemBoxShadow)",
        }}
      >
        <Section id="start">
          {/* <TwoColumnContent id="summary">
            <Width60>
              <Summary>
                <Heading
                  fontSize="1.4rem"
                  lineHeight={1.4}
                  color="text300"
                  mb={6}
                >
                  {t("page-what-is-ethereum-summary-title")}
                </Heading>
                <Text>{t("page-what-is-ethereum-summary-desc-1")}</Text>
                <Text>{t("page-what-is-ethereum-summary-desc-2")}</Text>
                <Text mb={0}>{t("page-what-is-ethereum-summary-desc-3")}</Text>
              </Summary>
            </Width60>
            <Width40 />
          </TwoColumnContent>

          <br />
          <br /> */}

          <Content>
            {/* <Column>
              <H2>{t("page-what-is-ethereum-explore")}</H2>
            </Column> */}
            <CardContainer>
              <Callout
                flex="1 1 416px"
                minH="full"
                image={vision}
                titleKey="common:vision-title"
                alt={t("common:vision-image-alt")}
                descriptionKey="common:vision-description"
              >
                {/* <Box>
                  <ButtonLink to="/developers/">
                    {t("page-what-is-ethereum-start-building-btn")}
                  </ButtonLink>
                </Box> */}
              </Callout>
              <Callout
                flex="1 1 416px"
                minH="full"
                image={mission}
                titleKey="common:mission-title"
                alt={t("common:mission-image-alt")}
                descriptionKey="common:mission-description"
              >
                {/* <Box>
                  <ButtonLink to="/community/">
                    {t("page-what-is-ethereum-meet-comm")}
                  </ButtonLink>
                </Box> */}
              </Callout>
            </CardContainer>
          </Content>
          
        </Section>
        <Section>

          {/* <TwoColumnContent>
            <Width50>
              <Tabs
                tabs={tabs2}
              />
            </Width50>
            <Width50>
              <Tabs
                tabs={tabs1}
              />
            </Width50>
          </TwoColumnContent> */}

          <Content>
            <H2>{t("page-about-us:page-about-us-breakdown-title")}</H2>
            <CardContainer>
              {cards.map((card, idx) => (
                <Card
                  key={idx}
                  emoji={card.emoji}
                  title={card.title}
                  description={card.description}
                  flex="1 1 30%"
                  minW="240px"
                  m={4}
                  p={6}
                />
              ))}
            </CardContainer>
          </Content>
        </Section>

        <Section>
          <TwoColumnContent>
            <Width60>
              <H2>
                {t("page-about-us:page-about-us-history-title")}
              </H2>
              <Text>
                {t("page-about-us:page-about-us-history-description")}
              </Text>

              <Slider
                onSlideChange={(index) => {
                  trackCustomEvent({
                    eventCategory: `History Slider`,
                    eventAction: `Clicked`,
                    eventName: slides[index].eventName,
                  })
                }}
              >
                <EmblaSlide>
                  <H3>{t("page-about-us:page-about-us-history-slide-1-title")}</H3>
                  <Text>
                    <Translation id="page-about-us:page-about-us-history-slide-1-description-1" />
                    <br />
                    <br />
                    <Translation id="page-about-us:page-about-us-history-slide-1-description-2" />
                  </Text>
                </EmblaSlide>
                <EmblaSlide>
                  <H3>{t("page-about-us:page-about-us-history-slide-2-title")}</H3>
                  <Text>
                    <Translation id="page-about-us:page-about-us-history-slide-2-description-1" />
                    <br />
                    <br />
                    <Translation id="page-about-us:page-about-us-history-slide-2-description-2" />
                  </Text>
                </EmblaSlide>
                <EmblaSlide>
                  <H3>{t("page-about-us:page-about-us-history-slide-3-title")}</H3>
                  <Text>
                    <Translation id="page-about-us:page-about-us-history-slide-3-description-1" />
                    <br />
                    <br />
                    <Translation id="page-about-us:page-about-us-history-slide-3-description-2" />
                  </Text>
                </EmblaSlide>
              </Slider>
            </Width60>
            <Width40>
              <AdoptionChart />
            </Width40>
          </TwoColumnContent>
        </Section>

        <Section>
          <Banner>
            <BannerBody>
              <H2>{t("page-about-us:page-about-us-stats-title")}</H2>
              <BannerGrid>
                <BannerGridCell>
                  <StatPrimary>1B+</StatPrimary>
                  <StatDescription>
                    <Translation id="page-about-us:page-about-us-stats-stat-1-title" />{" "}
                    <Tooltip
                        content={tooltipContent({
                          text: t("page-about-us:page-about-us-stats-stat-1-tooltip"),
                          url: "/unlock-your-potential/programs?filters=knowledge",
                          ariaLabel: "Learn More About Our Targets",
                        })}
                      >
                        <Icon as={MdInfoOutline} fontSize="md" />
                      </Tooltip>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>90M+</StatPrimary>
                  <StatDescription>
                    <Translation id="page-about-us:page-about-us-stats-stat-2-title" />{" "}
                    <Tooltip
                        content={tooltipContent({
                          text: t("page-about-us:page-about-us-stats-stat-2-tooltip"),
                          url: "/unlock-your-potential/programs?filters=tools",
                          ariaLabel: "Learn More About Our Targets",
                        })}
                      >
                        <Icon as={MdInfoOutline} fontSize="md" />
                      </Tooltip>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>10M+</StatPrimary>
                  <StatDescription>
                    <Translation id="page-about-us:page-about-us-stats-stat-3-title" />{" "}
                    <Tooltip
                        content={tooltipContent({
                          text: t("page-about-us:page-about-us-stats-stat-3-tooltip"),
                          url: "/unlock-your-potential/programs?filters=community",
                          ariaLabel: "Learn More About Our Targets",
                        })}
                      >
                        <Icon as={MdInfoOutline} fontSize="md" />
                      </Tooltip>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>9M+</StatPrimary>
                  <StatDescription>
                    <Translation id="page-about-us:page-about-us-stats-stat-4-title" />{" "}
                    <Tooltip
                        content={tooltipContent({
                          text: t("page-about-us:page-about-us-stats-stat-4-tooltip"),
                          url: "/make-positive-impact/contribute/",
                          ariaLabel: "Learn More About Our Targets",
                        })}
                      >
                        <Icon as={MdInfoOutline} fontSize="md" />
                      </Tooltip>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>900k+</StatPrimary>
                  <StatDescription>
                    <Translation id="page-about-us:page-about-us-stats-stat-5-title" />{" "}
                    <Tooltip
                        content={tooltipContent({
                          text: t("page-about-us:page-about-us-stats-stat-5-tooltip"),
                          url: "/unlock-your-potential/collaborate/",
                          ariaLabel: "Learn More About Our Targets",
                        })}
                      >
                        <Icon as={MdInfoOutline} fontSize="md" />
                      </Tooltip>
                  </StatDescription>
                </BannerGridCell>
                <BannerGridCell>
                  <StatPrimary>
                    100k+
                  </StatPrimary>
                  <StatDescription>
                    <Translation id="page-about-us:page-about-us-stats-stat-6-title" />{" "}
                    <Tooltip
                        content={tooltipContent({
                          text: t("page-about-us:page-about-us-stats-stat-6-tooltip"),
                          url: "/unlock-your-potential/co-create/",
                          ariaLabel: "Learn More About Our Targets",
                        })}
                      >
                        <Icon as={MdInfoOutline} fontSize="md" />
                      </Tooltip>
                  </StatDescription>
                </BannerGridCell>
              </BannerGrid>
            </BannerBody>
            <BannerImage>
              <Image400 src={community_gathering} />
            </BannerImage>
          </Banner>
        </Section>
      </Box>
      
      <Content>
        <StandaloneQuizWidget quizKey="quiz-about-us" />
      </Content>

      <Content>
        <FeedbackCard />
      </Content>
    </Flex>
  )
}

export default WhatIsEthereumPage
