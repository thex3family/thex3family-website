import { useCallback,useEffect, useMemo, useRef, useState } from "react"
import { GetStaticProps, InferGetServerSidePropsType } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaDiscord, FaGithub } from "react-icons/fa"
import {
  Badge,
  Box,
  chakra,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  forwardRef,
  Grid,
  Heading,
  Hide,
  Show,
  useDisclosure,
  useTheme,
  useToken,
} from "@chakra-ui/react"

import { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"

import BannerNotification from "@/components/BannerNotification"
import { Button, ButtonLink } from "@/components/Buttons"
import FeedbackCard from "@/components/FeedbackCard"
import { FilterBurgerIcon } from "@/components/icons/FilterBurgerIcon"
import InlineLink, { BaseLink } from "@/components/Link"
import MainArticle from "@/components/MainArticle"
import MainHero from "@/components/MainHero"
import Modal from "@/components/Modal"
import Text from "@/components/OldText"
import PageMetadata from "@/components/PageMetadata"
import FrameworkFilterSidebar from "@/components/Programs/ProgramsFilterSidebar"
import FrameworkTable from "@/components/Programs/ProgramsTable"
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
  ITutorial,
} from "@/lib/utils/tutorial"

import externalContent from "@/data/externalContent.json"
import externalTutorials from "@/data/externalPrograms.json"

import { NAV_BAR_PX_HEIGHT, SECONDARY_NAV_BAR_PX_HEIGHT } from "@/lib/constants"

import { useRtlFlip } from "@/hooks/useRtlFlip"
import tools from "@/public/tools.png"

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
        externalContent,
        locale as Lang
      ),
    [internalTutorials, locale]
  )

  const [allTags, setAllTags] = useState(() => getSortedTutorialTagsForLang(filteredTutorialsByLang));

  const { t } = useTranslation(["page-programs"])

  const [isModalOpen, setModalOpen] = useState(false)

  // Add this state for tag selection
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

  // Add this handler for tag selection
  const handleTagSelect = (tagName: string) => {
    setSelectedTags(prevSelectedTags => {
      const tagIndex = prevSelectedTags.indexOf(tagName);
      if (tagIndex > -1) {
        // Tag is already selected, remove it
        return prevSelectedTags.filter(tag => tag !== tagName);
      } else {
        // Tag is not selected, add it
        return [...prevSelectedTags, tagName];
      }
    });
  };

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
    setSelectedTags([])
  }

  const heroProps = {
    pathname,
    lastUpdated: t("common:page-last-updated") + ": January 24, 2024", // This should be dynamic based on your data
    title: t("common:programs-title"),
    description: t("common:programs-description")
      .split('.')
      .filter(sentence => sentence.trim() !== '')
      .map(sentence => `${sentence.trim()}.`),
    imageSrc: tools.src, // Assuming understand_yourself is an imported image module
    imageAlt: t("common:tools-image-alt"),
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
        {t("common:programs-alert")}
      </BannerNotification>
      <MainHero {...heroProps} />

      <Modal isOpen={isModalOpen} setIsOpen={setModalOpen}>
        <Heading fontSize="2rem" lineHeight="1.4" mb={4}>
          <Translation id="page-programs:page-programs-submit-button" />
        </Heading>
        <Text>
          <Translation id="page-programs:page-programs-submit-description" />
        </Text>
        <Flex
          flexDirection={{ base: "column", md: "initial" }}
          maxH={{ base: 64, md: "initial" }}
          overflowY={{ base: "scroll", md: "initial" }}
        >
           <ButtonLink
              leftIcon={<FaDiscord />}
              variant="outline"
              to="https://discordapp.com/channels/653664936903573504/1227984101060116481"
            >
              <Translation id="page-programs:page-programs-submit-button" />
            </ButtonLink>
          {/* <Flex
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
              <Translation id="page-programs:page-programs-new-github" />
            </Text>
            <Text>
              <Translation id="page-programs:page-programs-new-github-description" />
            </Text>
            <ButtonLink
              leftIcon={<FaGithub />}
              variant="outline"
              to="https://github.com/thex3family/thex3family-website/issues/new?assignees=&labels=Type%3A+Feature&template=suggest_tutorial.yaml&title="
            >
              <Translation id="page-programs:page-programs-raise-issue-button" />
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
              <Translation id="page-programs:page-programs-pull-request" />
            </Text>
            <Text>
              <Translation id="page-programs:page-programs-pull-request-description" />
            </Text>
            <ButtonLink
              leftIcon={<FaGithub />}
              variant="outline"
              to="https://github.com/thex3family/thex3family-website/new/dev/src/content/developers/tutorials"
            >
              <Translation id="page-programs:page-programs-pull-request-button" />
            </ButtonLink>
          </Flex> */}
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
              <Text fontSize="sm" lineHeight="14px" color="body.medium" mt={-5} mb={3}>
                {Object.values(filters).reduce<number>(
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
            w="full"
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

          <FrameworkTable
            filters={filters}
            frameworkData={filteredTutorialsByLang}
            setAllTags={setAllTags}
            selectedTags={selectedTags}
            setModalOpen={setModalOpen}
            trackCustomEvent={trackCustomEvent}
            locale={locale}
          />
        </Box>
      </Flex>
      <Box>
        <FeedbackCard />
      </Box>
    </Flex>
  )
}

export default TutorialPage
