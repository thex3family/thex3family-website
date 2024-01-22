import { useMemo, useState } from "react"
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaGithub } from "react-icons/fa"
import { Box, Flex, Icon, List, Stack, Text, useDisclosure } from "@chakra-ui/react"

import { BasePageProps, QuizStatus } from "@/lib/types"

import { ButtonLink } from "@/components/Buttons"
import FeedbackCard from "@/components/FeedbackCard"
import { HubHero } from "@/components/Hero"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"
import QuizWidget from "@/components/Quiz/QuizWidget"
import QuizzesList from "@/components/Quiz/QuizzesList"
import QuizzesModal from "@/components/Quiz/QuizzesModal"
import QuizzesStats from "@/components/Quiz/QuizzesStats"
import { useLocalQuizData } from "@/components/Quiz/useLocalQuizData"
import Translation from "@/components/Translation"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import { understand_yourself_quizzes, live_your_best_life_quizzes } from "@/data/quizzes"

import { INITIAL_QUIZ } from "@/lib/constants"

import { useRouter } from "next/router"
import understand_yourself from "@/public/understand_yourself.png"
import MainHero from "@/components/MainHero"

const handleGHAdd = () =>
  trackCustomEvent({
    eventCategory: "quiz_hub_events",
    eventAction: "Secondary button clicks",
    eventName: "GH_add",
  })

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage("/quizzes")

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

const QuizzesHubPage: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const { t } = useTranslation("quizzes", "common")

  const [userStats, updateUserStats] = useLocalQuizData()
  const [quizStatus, setQuizStatus] = useState<QuizStatus>("neutral")
  const [currentQuiz, setCurrentQuiz] = useState(INITIAL_QUIZ)
  const { onOpen, isOpen, onClose } = useDisclosure()

  const commonQuizListProps = useMemo(
    () => ({
      userStats,
      quizHandler: setCurrentQuiz,
      modalHandler: onOpen,
    }),
    [onOpen, userStats]
  )

  const { pathname } = useRouter()

  const heroProps = {
    pathname,
    lastUpdated: t("common:page-last-updated") + ": January 22, 2024", // This should be dynamic based on your data
    title: t("common:test-your-understanding-title"),
    description: t("common:test-your-understanding-description")
      .split('.')
      .filter(sentence => sentence.trim() !== '')
      .map(sentence => `${sentence.trim()}.`),
    imageSrc: understand_yourself.src, // Assuming understand_yourself is an imported image module
    imageAlt: t("common:understand-yourself-image-alt"),
  };
  
  return (
    <Box as={MainArticle}>
      <PageMetadata
        title={t("common:test-your-understanding-title")}
        description={t("common:test-your-understanding-description")}
      />
      {/* Main Hero */}
      <MainHero {...heroProps} />
      {/* <Container>
        <HeroContainer>
          <TitleCard>
            <Breadcrumbs slug={pathname} startDepth={1} mt={2} mb="8" />
            <Title>{t("common:test-your-understanding-title")}</Title>
            <Box>
              <List listStyleType="disc">
                {t("common:test-your-understanding-description")
                  .split('.')
                  .filter(sentence => sentence.trim() !== '')
                  .map((sentence, index) => (
                    <SummaryPoint key={index}>{`${sentence.trim()}.`}</SummaryPoint>
                  ))}
              </List>
            </Box>
          <LastUpdated>
            {t("common:page-last-updated")}:{" "}January 22, 2024
          </LastUpdated>
          </TitleCard>
          <Image
            src={understand_yourself}
            alt={t("common:understand-yourself-image-alt")}
            width={816}
            height={525}
            style={{ objectFit: "cover", overflow: "visible" }}
            priority
            flex={{ base: "1 1 100%", md: "none" }}
            alignSelf={{ base: "center", md: "flex-end" }}
          />
          )
        </HeroContainer>
        <MoreContent to="#start">
          <Icon as={MdExpandMore} fontSize="2xl" color="secondary" />
        </MoreContent>
      </Container> */}
      {/* <HubHero
        title={t("quizzes-title")}
        description={t("quizzes:quizzes-subtitle")}
        header={t("quizzes:test-your-knowledge")}
        heroImg={HeroImage}
      /> */}
      <QuizzesModal isOpen={isOpen} onClose={onClose} quizStatus={quizStatus}>
        <QuizWidget
          quizKey={currentQuiz}
          currentHandler={setCurrentQuiz}
          statusHandler={setQuizStatus}
          updateUserStats={updateUserStats}
        />
      </QuizzesModal>
      <Box px={{ base: 0, lg: "8" }} py={{ base: 0, lg: "4" }} mb="12" id="start">
        <Flex direction={{ base: "column-reverse", lg: "row" }} columnGap="20">
          <Stack spacing="10" flex="1">
            <Box>
              <QuizzesList
                content={understand_yourself_quizzes}
                headingId={t("common:unlock-your-potential-title")}
                descriptionId={t("common:unlock-your-potential-description")}
                {...commonQuizListProps}
              />
              <QuizzesList
                content={live_your_best_life_quizzes}
                headingId={t("common:live-your-best-life-title")}
                descriptionId={t("common:live-your-best-life-description")}
                {...commonQuizListProps}
              />
            </Box>
            <Flex
              direction={{ base: "column", xl: "row" }}
              justify="space-between"
              align="center"
              bg="background.highlight"
              borderRadius={{ lg: "lg" }}
              p="8"
              gap={{ base: "4", xl: 0 }}
            >
              <Box>
                <Text align={{ base: "center", xl: "left" }} fontWeight="bold">
                  <Translation id="quizzes:want-more-quizzes" />
                </Text>

                <Text align={{ base: "center", xl: "left" }}>
                  <Translation id="quizzes:quiz-contribute" />
                </Text>
              </Box>
              <ButtonLink
                href="/make-positive-impact/contribute/quizzes/"
                variant="outline"
                hideArrow
                onClick={handleGHAdd}
              >
                <Flex alignItems="center">
                  <Icon as={FaGithub} color="text" boxSize={6} me={2} />
                  <Translation id="quizzes:add-quiz" />
                </Flex>
              </ButtonLink>
            </Flex>
          </Stack>
          <Box flex="1">
            <QuizzesStats
              averageScoresArray={userStats.average}
              completedQuizzes={userStats.completed}
              totalCorrectAnswers={userStats.score}
            />
          </Box>
        </Flex>
      </Box>
      <Box w="full" py="4" px="8">
        <FeedbackCard />
      </Box>
    </Box>
  )
}

export default QuizzesHubPage
