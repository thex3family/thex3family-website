import { useEffect, useMemo, useState, useRef } from "react"
import { GetStaticProps, InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaGithub } from "react-icons/fa"
import {
  Badge,
  Box,
  chakra,
  Flex,
  Hide,
  forwardRef,
  Grid,
  Heading,
  useDisclosure,
  useToken,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  Show,
  useTheme,
} from "@chakra-ui/react"

import { NAV_BAR_PX_HEIGHT, SECONDARY_NAV_BAR_PX_HEIGHT } from "@/lib/constants"

import { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"

import { Button, ButtonLink } from "@/components/Buttons"
import Emoji from "@/components/Emoji"
import FeedbackCard from "@/components/FeedbackCard"
import InlineLink, { BaseLink } from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import Modal from "@/components/Modal"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"
import Translation from "@/components/Translation"
import { getSkillTranslationId, Skill } from "@/components/TutorialMetadata"
import TutorialTags from "@/components/TutorialTags"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { getTutorialsData } from "@/lib/utils/md"
import { getLocaleTimestamp, INVALID_DATETIME } from "@/lib/utils/time"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"
import {
  filterTutorialsByLang,
  getSortedTutorialTagsForLang,
} from "@/lib/utils/tutorial"

import externalTutorials from "@/data/externalPrograms.json"

import { useRtlFlip } from "@/hooks/useRtlFlip"

import BannerNotification from "@/components/BannerNotification"
import MainHero from "@/components/MainHero"
import understand_the_framework from "@/public/understand_the_framework.png"

import frameworkData from "@/data/framework/framework-data"
import FrameworkFilterSidebar from "@/components/Programs/ProgramsFilterSidebar"
import FrameworkTable from "@/components/Programs/ProgramsTable"
import { FilterBurgerIcon } from "@/components/icons/wallets"

const filterDefault = {
}

type Props = BasePageProps & {
  internalTutorials: ITutorial[]
}

export const getStaticProps = (async ({ locale }) => {
  const requiredNamespaces = getRequiredNamespacesForPage(
    "/unlock-your-potential/programs"
  )

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[1])

  const lastDeployDate = getLastDeployDate()

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      internalTutorials: getTutorialsData(locale!),
      lastDeployDate,
    },
  }
}) satisfies GetStaticProps<Props>

export interface IExternalTutorial {
  url: string
  title: string
  description: string
  author: string
  authorURL: string
  tags: Array<string>
  programType: string
  skillLevel?: Skill
  timeToRead?: string
  lang: string
  publishDate: string
}

export interface ITutorial {
  to: string
  title: string
  description: string
  author: string
  tags?: Array<string>
  programType: string
  skillLevel?: Skill
  timeToRead?: number | null
  published?: string | null
  lang: string
  isExternal: boolean
}

const published = (locale: string, published: string) => {
  const localeTimestamp = getLocaleTimestamp(locale as Lang, published)
  return localeTimestamp !== INVALID_DATETIME ? (
    <span>
      {localeTimestamp}
    </span>
  ) : null
}

const TutorialPage = ({
  internalTutorials,
}: InferGetServerSidePropsType<typeof getStaticProps>) => {
  const { locale, pathname } = useRouter()
  const theme = useTheme()
  const { flipForRtl } = useRtlFlip()
  const tableBoxShadow = useToken("colors", "tableBoxShadow")
  const cardBoxShadow = useToken("colors", "cardBoxShadow")
  const filteredTutorialsByLang = useMemo(
    () =>
      filterTutorialsByLang(
        internalTutorials,
        externalTutorials,
        locale as Lang
      ),
    [internalTutorials, locale]
  )

  const allTags = useMemo(
    () => getSortedTutorialTagsForLang(filteredTutorialsByLang),
    [filteredTutorialsByLang]
  )

  const { t } = useTranslation(["page-programs"])

  const [isModalOpen, setModalOpen] = useState(false)
  const [filteredTutorials, setFilteredTutorials] = useState(
    filteredTutorialsByLang
  )
  const [selectedTags, setSelectedTags] = useState<Array<string>>([])

  useEffect(() => {
    let tutorials = filteredTutorialsByLang

    if (selectedTags.length) {
      tutorials = tutorials.filter((tutorial) => {
        return selectedTags.every((tag) => (tutorial.tags || []).includes(tag))
      })
    }

    setFilteredTutorials(tutorials)
  }, [filteredTutorialsByLang, selectedTags])

  const handleTagSelect = (tagName: string) => {
    const tempSelectedTags = selectedTags

    const index = tempSelectedTags.indexOf(tagName)
    if (index > -1) {
      tempSelectedTags.splice(index, 1)
      trackCustomEvent({
        eventCategory: "tutorial tags",
        eventAction: "click",
        eventName: `${tagName} remove`,
      })
    } else {
      tempSelectedTags.push(tagName)
      trackCustomEvent({
        eventCategory: "tutorial tags",
        eventAction: "click",
        eventName: `${tagName} add`,
      })
    }

    setSelectedTags([...tempSelectedTags])
  }

  const CardGrid = ({ children }: ChildOnlyProp) => (
    <Grid
      templateColumns="repeat(auto-fill, minmax(min(100%, 280px), 1fr))"
      gap={1}
    >
      {children}
    </Grid>
  )

  // framework stuff

  const resetFrameworkFilter = useRef(() => { })
  const { isOpen: showMobileSidebar, onOpen, onClose } = useDisclosure()
  const [filters, setFilters] = useState(filterDefault)
  const [selectedPersona, setSelectedPersona] = useState(NaN)

  const updateFilterOption = (key) => {
    const updatedFilters = { ...filters }
    updatedFilters[key] = !updatedFilters[key]
    setFilters(updatedFilters)
    setSelectedPersona(NaN)
  }

  const updateFilterOptions = (keys, value) => {
    const updatedFilters = { ...filters }
    for (let key of keys) {
      updatedFilters[key] = value
    }
    setFilters(updatedFilters)
    setSelectedPersona(NaN)
  }

  const resetFilters = () => {
    setSelectedPersona(NaN)
    setFilters(filterDefault)
  }

  const heroProps = {
    pathname,
    lastUpdated: t("common:page-last-updated") + ": January 24, 2024", // This should be dynamic based on your data
    title: t("common:programs-title"),
    description: t("common:programs-description")
      .split('.')
      .filter(sentence => sentence.trim() !== '')
      .map(sentence => `${sentence.trim()}.`),
    imageSrc: understand_the_framework.src, // Assuming understand_yourself is an imported image module
    imageAlt: t("common:understand-the-framework-image-alt"),
  };


  return (
    <Flex as={MainArticle} direction="column" position="relative" w="full">
      <PageMetadata
        title={t("common:programs-title")}
        description={t(
          "common:programs-description"
        )}
      />

      <BannerNotification shouldShow={true}>
        {t("common:understand-the-framework-alert")}
      </BannerNotification>
      <MainHero {...heroProps} />

      <Modal isOpen={isModalOpen} setIsOpen={setModalOpen}>
        <Heading fontSize="2rem" lineHeight="1.4" mb={4}>
          <Translation id="page-programs:page-programs-submit-button" />
        </Heading>
        <Text>
          <Translation id="page-knowledge:page-tutorial-listing-policy-intro" />{" "}
          <InlineLink to="/contributing/content-resources/">
            <Translation id="page-knowledge:page-tutorial-listing-policy" />
          </InlineLink>
        </Text>
        <Text>
          <Translation id="page-knowledge:page-tutorial-submit-tutorial" />
        </Text>
        <Flex
          flexDirection={{ base: "column", md: "initial" }}
          maxH={{ base: 64, md: "initial" }}
          overflowY={{ base: "scroll", md: "initial" }}
        >
          <Flex
            borderWidth="1px"
            borderStyle="solid"
            borderColor="border"
            borderRadius="base"
            p={4}
            flexDirection="column"
            w={{ base: "full", md: "50%" }}
            justifyContent="space-between"
            mt={2}
            mb={{ base: 2, md: 6 }}
            ms={0}
            me={{ base: 0, md: 2 }}
          >
            <Text as="b">
              <Translation id="page-knowledge:page-tutorial-new-github" />
            </Text>
            <Text>
              <Translation id="page-knowledge:page-tutorial-new-github-desc" />
            </Text>
            <ButtonLink
              leftIcon={<FaGithub />}
              variant="outline"
              to="https://github.com/ethereum/ethereum-org-website/issues/new?assignees=&labels=Type%3A+Feature&template=suggest_tutorial.yaml&title="
            >
              <Translation id="page-knowledge:page-tutorial-raise-issue-btn" />
            </ButtonLink>
          </Flex>
          <Flex
            borderWidth="1px"
            borderStyle="solid"
            borderColor="border"
            borderRadius="base"
            p={4}
            flexDirection="column"
            w={{ base: "full", md: "50%" }}
            justifyContent="space-between"
            mt={2}
            mb={{ base: 2, md: 6 }}
            ms={0}
            me={{ base: 0, md: 2 }}
          >
            <Text as="b">
              <Translation id="page-knowledge:page-tutorial-pull-request" />
            </Text>
            <Text>
              <Translation id="page-knowledge:page-tutorial-pull-request-desc-1" />{" "}
              <code>
                <Translation id="page-knowledge:page-tutorial-pull-request-desc-2" />
              </code>{" "}
              <Translation id="page-knowledge:page-tutorial-pull-request-desc-3" />
            </Text>
            <ButtonLink
              leftIcon={<FaGithub />}
              variant="outline"
              to="https://github.com/ethereum/ethereum-org-website/new/dev/src/content/developers/tutorials"
            >
              <Translation id="page-knowledge:page-tutorial-pull-request-btn" />
            </ButtonLink>
          </Flex>
        </Flex>
      </Modal>

      <Hide above="lg">
        <Box
          display={{ base: "block", lg: "none" }}
          position="sticky"
          top={NAV_BAR_PX_HEIGHT}
          bg="background.base"
          w="full"
          zIndex="docked"
          py="5px"
        >
          <Button
            rightIcon={<FilterBurgerIcon />}
            variant="outline"
            borderInlineStart="none"
            borderInlineStartRadius="none"
            gap={4}
            sx={{
              svg: {
                boxSize: 8,
                line: { stroke: "primary.base" },
                circle: { stroke: "primary.base" },
              },
            }}
            onClick={() => {
              showMobileSidebar ? onClose() : onOpen()
              trackCustomEvent({
                eventCategory: "MobileFilterToggle",
                eventAction: `Tap MobileFilterToggle`,
                eventName: `show mobile filters ${!showMobileSidebar}`,
              })
            }}
          >
            <Box>
              <Text>{t("common:filters")}</Text>
              <Text fontSize="sm" lineHeight="14px" color="body.medium">
                {Object.values(filters).reduce(
                  (acc, filter) => (filter ? acc + 1 : acc),
                  0
                )}{" "}
                {t("common:active")}
              </Text>
            </Box>
          </Button>
        </Box>
        <Drawer
          isOpen={showMobileSidebar}
          placement="start"
          onClose={onClose}
          size="sm"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader mb={4}>
              <DrawerCloseButton />
            </DrawerHeader>
            <DrawerBody position="relative">
              <FrameworkFilterSidebar
                position="absolute"
                inset={2}
                overflow="auto"
                allTags={allTags}
                selectedTags={selectedTags}
                handleTagSelect={handleTagSelect}
                setSelectedTags={setSelectedTags}
                trackCustomEvent={trackCustomEvent}
                {...{
                  filters,
                  resetFrameworkFilter,
                  updateFilterOption,
                  updateFilterOptions,
                  resetFilters,
                  selectedPersona,
                  setFilters,
                  setSelectedPersona,
                }}
              />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Hide>

      <Flex px={{ base: 0, md: 8 }} pt={4} pb={6} gap={6} mt={6} id="start">
        <Show above="lg">
          <FrameworkFilterSidebar
            maxW="330px"
            top={SECONDARY_NAV_BAR_PX_HEIGHT}
            allTags={allTags}
            selectedTags={selectedTags}
            handleTagSelect={handleTagSelect}
            setSelectedTags={setSelectedTags}
            trackCustomEvent={trackCustomEvent}
            {...{
              filters,
              resetFrameworkFilter,
              updateFilterOption,
              updateFilterOptions,
              resetFilters,
              selectedPersona,
              setFilters,
              setSelectedPersona,
            }}
          />
        </Show>
        <Box
          w="full"
          sx={{
            scrollbarWidth: "thin",
            scrollbarColor: `${theme.colors.lightBorder} ${theme.colors.background}`,

            "::-webkit-scrollbar": {
              width: 2,
            },
            "::-webkit-scrollbar-track": {
              bg: "background.base",
            },
            "::-webkit-scrollbar-thumb": {
              bgColor: "lightBorder",
              borderRadius: "base",
              border: "2px solid",
              borderColor: "background.base",
            },
            table: {
              m: 0,
            },
          }}
        >
          {filteredTutorials.length !== 0 && (
            <CardGrid>
              {filteredTutorials.map((tutorial) => {
                return (
                  <Flex
                    as={BaseLink}
                    textDecoration="none"
                    flexDirection="column"
                    justifyContent="space-between"
                    fontWeight="normal"
                    color="text"
                    // boxShadow="0px 1px 1px var(--x3-colors-tableItemBoxShadow)"
                    border="1px solid"
                    padding={8}
                    w="full"
                    _hover={{
                      textDecoration: "none",
                      borderRadius: "base",
                      boxShadow: "0 0 1px var(--x3-colors-primary-base)",
                      bg: "tableBackgroundHover",
                    }}
                    key={tutorial.to}
                    to={tutorial.to ?? undefined}
                    hideArrow
                  >
                    <Flex
                      justifyContent="space-between"
                      alignItems="flex-start"
                      flexDirection={{ base: "column" }}
                      gap={6}
                    >
                      <Flex gap={2}>
                      <Badge variant="secondary">
                        {tutorial.programType}
                      </Badge>
                      <Badge variant="secondary">
                        <Translation id={getSkillTranslationId(tutorial.skill!)} />
                      </Badge>
                      </Flex>
                      <Text
                        noOfLines={2}
                        color="text"
                        fontWeight="semibold"
                        fontSize="2xl"
                      >
                        {tutorial.title}
                      </Text>
                    </Flex>
                    <Text noOfLines={3} color="text200">{tutorial.description}</Text>
                    <div>
                      <Flex direction="column" align="start" fontSize="sm" color="text200" textTransform="uppercase" mb={6}>
                        <Flex align="center" mb={1}>
                          <Emoji text=":writing_hand:" fontSize="sm" me={2} />
                          {tutorial.author}
                        </Flex>
                        {published(locale!, tutorial.published ?? "") && (
                          <Flex align="center" mb={1}>
                            <Emoji text=":calendar:" fontSize="sm" me={2} />
                            {published(locale!, tutorial.published ?? "")}
                          </Flex>
                        )}
                        {tutorial.timeToRead && (
                          <Flex align="center" mb={1}>
                            <Emoji text=":stopwatch:" fontSize="sm" me={2} />
                            {tutorial.timeToRead} <Translation id="page-programs:page-programs-read-time" />
                          </Flex>
                        )}
                      </Flex>
                      <Flex flexWrap="wrap" w="full">
                        <TutorialTags tags={tutorial.tags?.slice(0, 2) ?? []} />
                      </Flex>
                    </div>
                  </Flex>
                )
              })}
              <Flex
                textDecoration="none"
                flexDirection="column"
                justifyContent="center"
                fontWeight="normal"
                color="text"
                // boxShadow="0px 1px 1px var(--x3-colors-tableItemBoxShadow)"
                border="1px solid"
                padding={8}
                w="full"
                _hover={{
                  textDecoration: "none",
                  borderRadius: "base",
                  boxShadow: "0 0 1px var(--x3-colors-primary-base)",
                  bg: "tableBackgroundHover",
                }}
              >
                <Button
                  variant="outline"
                  color="text"
                  borderColor="text"
                  _hover={{
                    color: "primary.base",
                    borderColor: "primary.base",
                    boxShadow: cardBoxShadow,
                  }}
                  _active={{
                    bg: "secondaryButtonBackgroundActive",
                  }}
                  py={2}
                  px={3}
                  onClick={() => {
                    setModalOpen(true)
                    trackCustomEvent({
                      eventCategory: "tutorials tags",
                      eventAction: "click",
                      eventName: "submit",
                    })
                  }}
                >
                  <Translation id="page-programs:page-programs-submit-button" />
                </Button>
              </Flex>
            </CardGrid>)}

          {filteredTutorials.length === 0 && (
            <Box
              // boxShadow={tableBoxShadow}
              w={"full"}
            >
              <Flex
                justifyContent="center"
                pb={{ base: 4, md: 8 }}
                pt={{ base: 4, md: "initial" }}
                px={{ base: 0, md: "initial" }}
                flexDirection={{ base: "column", md: "initial" }}
              >
              </Flex>
              <Box mt={0} textAlign="center" padding={12}>
                <Emoji text=":crying_face:" fontSize="5xl" mb={8} mt={8} />
                <OldHeading>
                  <Translation id="page-programs:page-programs-filter-error" />
                </OldHeading>
                <Text>
                  <Translation id="page-programs:page-programs-try-removing-filters" />
                </Text>
                <Button
                  variant="outline"
                  color="text"
                  borderColor="text"
                  _hover={{
                    color: "primary.base",
                    borderColor: "primary.base",
                    boxShadow: cardBoxShadow,
                  }}
                  _active={{
                    bg: "secondaryButtonBackgroundActive",
                  }}
                  py={2}
                  px={3}
                  onClick={() => {
                    setModalOpen(true)
                    trackCustomEvent({
                      eventCategory: "tutorials tags",
                      eventAction: "click",
                      eventName: "submit",
                    })
                  }}
                >
                  <Translation id="page-programs:page-programs-submit-button" />
                </Button>
              </Box>
            </Box>
          )}
          {/* <FrameworkTable filters={filters} frameworkData={frameworkData} /> */}
        </Box>
      </Flex>
      <Box>
        <FeedbackCard />
      </Box>
    </Flex>
  )
}

export default TutorialPage
