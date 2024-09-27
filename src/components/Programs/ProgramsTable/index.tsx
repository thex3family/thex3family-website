import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaBookOpen, FaBorderAll, FaEye, FaTools } from "react-icons/fa"
import Select from "react-select"
import {
  Badge,
  Box,
  calc,
  chakra,
  Flex,
  FlexProps,
  forwardRef,
  Heading,
  HeadingProps,
  Icon,
  keyframes,
  SimpleGrid,
  SimpleGridProps,
  Table,
  TableProps,
  Td,
  Th,
  Tr,
  useToken,
} from "@chakra-ui/react"

import { ChildOnlyProp, Lang } from "@/lib/types"

import { Button } from "@/components/Buttons"
import Emoji from "@/components/Emoji"
import InlineLink, { BaseLink, LinkProps } from "@/components/Link"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import { useProgramsTable } from "@/components/Programs/ProgramsTable/useProgramsTable"
import { getSkillTranslationId } from "@/components/TutorialMetadata"
import TutorialTags from "@/components/TutorialTags"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { getLocaleTimestamp, INVALID_DATETIME } from "@/lib/utils/time"
import { getSortedTutorialTagsForLang, ITutorial } from "@/lib/utils/tutorial"

import { SECONDARY_NAV_BAR_PX_HEIGHT } from "@/lib/constants"

const Container = (props: TableProps) => (
  <Box
    w="full"
    {...props}
  />
)

const ProgramsContainer = (props: ChildOnlyProp) => (
  <Container
    borderBottom="1px"
    borderColor="lightBorder"
    _hover={{ bg: "chakra-subtle-bg", transition: "0.5s all" }}
    {...props}
  />
)

const Grid = forwardRef<SimpleGridProps, "tr">((props, ref) => (
  <SimpleGrid
    ref={ref}
    templateColumns={{ base: "60% auto 0% 0% 5%", md: "40% auto auto auto 5%" }}
    w="full"
    columnGap={2}
    alignItems="center"
    {...props}
  />
))

const ProgramsContentHeader = (props: ChildOnlyProp) => (
  <Grid
    bg="background.base"
    borderBottom="1px"
    borderColor="primary.base"
    textAlign={{ base: "center", sm: "right", md: "left"}}
    templateColumns={{
      base: "auto",
      sm: "1fr 1fr",
      md: "1fr 0.5fr",
    }}
    p={2}
    position="sticky"
    top={{
      base: calc(SECONDARY_NAV_BAR_PX_HEIGHT).add("1rem").toString(),
      md: calc(SECONDARY_NAV_BAR_PX_HEIGHT).add("1rem").toString(),
      lg: SECONDARY_NAV_BAR_PX_HEIGHT,
    }}
    zIndex={1}
    sx={{
      Box: {
        width: "100%",
        display: "flex", // Apply flexbox layout to the <th>
        justifyContent: "flex-end", // Justify content to the end
        p: 0,
        borderBottom: "none",
        color: "currentColor",
        fontSize: "0.9rem",
        lineHeight: "revert",
        letterSpacing: "revert",
        textAlign: "center",
        textTransform: "revert",
      },
    }}
    {...props}
  />
)

const Programs = forwardRef<ChildOnlyProp, "tr">((props, ref) => (
  <Grid
    tabIndex={0}
    ref={ref}
    cursor="pointer"
    py="25px"
    px={{ base: 4, lg: 1 }}
    sx={{
      p: {
        m: 0,
      },
      td: {
        padding: 0,
        borderBottom: "none",
        height: "full",
      },
      "td:nth-of-type(3), td:nth-of-type(4)": {
        hideBelow: "md",
      },
    }}
    templateColumns="auto"
    {...props}
  />
))

const ChakraSelect = chakra((props: { className?: string }) => (
  <Select {...props} />
))
export const StyledSelect = (props) => (
  <ChakraSelect
    w="full"
    sx={{
      textAlign: "center",
      ".react-select": {
        "&__control": {
          bg: "searchBackground",
          border: "1px",
          borderColor: "text",
          cursor: "pointer",
          pe: "0.3rem",
          transition: "0.5s all",

          ".react-select__value-container": {
            ".react-select__single-value": {
              color: "text",
            },
          },

          ".react-select__indicators": {
            ".react-select__indicator-separator": {
              bg: "none",
            },
            ".react-select__indicator": {
              color: "text",
              p: 0,
            },
          },

          "&:hover, &--is-focused": {
            bg: "primary.base",
            borderColor: "primary.base",

            ".react-select__value-container": {
              ".react-select__single-value": {
                color: "background.base",
              },
            },

            ".react-select__indicators": {
              ".react-select__indicator": {
                color: "background.base",
              },
            },
            ".react-select__placeholder": { // Change placeholder color on hover/focus
              color: "background.base",
            },
          },
        },

        "&__placeholder": {
          color: "text200",
        },

        "&__single-value, &__menu, &__input": {
          color: "text",
        },

        "&__menu": {
          bg: "searchBackground",
        },

        "&__option": {
          "&:hover, &--is-focused": {
            bg: "selectHover",
          },
          _active: {
            bg: "selectActive",
            color: "buttonColor !important",
          },

          "&--is-selected": {
            bg: "primary.base",
            color: "buttonColor",
            _hover: {
              bg: "primary.base",
            },
          },
        },
      },
    }}
    {...props}
  />
)

const FlexInfo = (props: FlexProps) => (
  <Flex
    alignItems="center"
    gap={4}
    ps="0.3rem"
    sx={{
      p: {
        p: 0,
        fontSize: "1.2rem",
        fontWeight: "bold",
        "& + p": {
          mt: "0.1rem",
          fontSize: "0.9rem",
          lineHeight: 5,
          fontWeight: "normal",
        },
      },
    }}
    {...props}
  />
)

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const FlexInfoCenter = (props: { children: ReactNode; className?: string }) => (
  <FlexInfo
    animation={`${fadeIn} 0.375s`}
    cursor="pointer"
    justifyContent="center"
    height="full"
    sx={{
      "&.fade": {
        animation: `${fadeOut} 0.375s`,
      },
      fontSize: "16px",
      wordWrap: "break-word",
      margin: "auto",
      width: "0px",
      textAlign: "center",
    }}
    {...props}
  />
)

const SocialLink = (props: LinkProps) => (
  <InlineLink
    display="flex"
    height={8}
    alignItems="center"
    verticalAlign="middle"
    transform="scale(1)"
    transition="transform 0.1s"
    _hover={{
      transform: "scale(1.15)",
    }}
    {...props}
  />
)

const H2 = (prop: ChildOnlyProp & HeadingProps) => (
  <Heading
    fontSize={{ base: "2xl", md: "3xl" }}
    lineHeight={1.4}
    mb={6}
    mt={12}
    textAlign="center"
    {...prop}
  />
)

// Types
export interface DropdownOption {
  label: string
  value: string
  filterKey: string
  category: string
  icon: ReactNode
}

// Constants
const firstCol = "firstCol"
const secondCol = "secondCol"
const thirdCol = "thirdCol"

export interface ProgramsTableProps {
  filters: Record<string, boolean>
  programsData: ITutorial[]
  setModalOpen: (open: boolean) => void
  trackCustomEvent: typeof trackCustomEvent;
  locale: string
}

const ProgramsTable = ({ filters, programsData, setAllTags, selectedTags, setModalOpen, trackCustomEvent, locale }) => {
  const { t } = useTranslation("page-programs")
  const {
    filteredPrograms,
    updateSortOrder,
  } = useProgramsTable({
    filters,
    selectedTags,
    programsData,
    t: t,
  });

  // Use an effect to update allTags when filteredPrograms changes
  useEffect(() => {
    const newAllTags = getSortedTutorialTagsForLang(filteredPrograms);
    setAllTags(newAllTags);
  }, [filteredPrograms]);

  const CardGrid = ({ children }: ChildOnlyProp) => (
    <Grid
      templateColumns="repeat(auto-fill, minmax(min(100%, 280px), 1fr))"
      gap={1}
      pt={2}
    >
      {children}
    </Grid>
  )

  const published = (locale: string, published: string) => {
    const localeTimestamp = getLocaleTimestamp(locale as Lang, published)
    return localeTimestamp !== INVALID_DATETIME ? (
      <span>
        {localeTimestamp}
      </span>
    ) : null
  }

  const cardBoxShadow = useToken("colors", "cardBoxShadow")

  const router = useRouter();

  const { view } = router.query; // Destructure the 'view' query parameter

  // State to manage the toggle between list and gallery view
  const [dataView, setDataView] = useState(view);

  // Function to toggle the view state
  const toggleView = (viewType: 'program' | 'content' | '') => {
    setDataView(viewType);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, view: viewType },
    }, undefined, { shallow: true });
  };
  
  useEffect(() => {
    // This effect ensures that if the URL's view parameter changes outside of the toggleView function,
    // the state updates to reflect it.
    if (view !== dataView) {
      setDataView(view as 'program' | 'content' | '');
    }
  }, [view]);

  return (
    <Container>
      <ProgramsContentHeader>
      {/*<Box>
           <Button
            onClick={() => toggleView('')}
            variant="outline"
            leftIcon={dataView === '' || dataView == undefined ? <FaEye size="0.8em" /> : undefined}
            mr={2}
          >
            <Box>
              All
            </Box>
          </Button>
          <Button
            onClick={() => toggleView('program')}
            variant="outline"
            leftIcon={dataView === 'program' ? <FaEye size="0.8em" /> : undefined}
            mr={2}
          >
            <Box>
              {t("page-programs:page-programs-programs")}
            </Box>
          </Button>
          <Button
            onClick={() => toggleView('content')}
            variant="outline"
            leftIcon={dataView === 'content' ? <FaEye size="0.8em" /> : undefined}
            mr={2}
          >
            <Box display={{ base: 'none', sm: 'inline' }}>
              {t("page-programs:page-programs-content")}
            </Box>
          </Button> 
        </Box>*/}
        <Box mb={{ base: "2", xs: "0" }}>
          {filteredPrograms.length === programsData.length ? (
            <Text as="span" fontSize={{ base: 'sm' }} lineHeight="1.5em">
              {t("page-programs:page-programs-showing-all")} (
              <strong>{programsData.length}</strong>)
            </Text>
          ) : (
            <Text as="span" fontSize={{ base: 'sm' }} lineHeight="1.5em">
              {t("page-programs:page-programs-showing")}{" "}
              <strong>
                {filteredPrograms.length} / {programsData.length}
              </strong>
              {/* {" "}
              {t("page-programs:page-programs-programs")} */}
            </Text>
          )}
        </Box>
        <Box>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                label: t("page-programs:page-programs-sort-by"),
                options: [
                  // Add an option for default sorting
                  { label: t("page-programs:page-programs-sort-default"), value: 'default' },
                  // Add an option for alphabetical sorting
                  { label: t("page-programs:page-programs-sort-alphabetical"), value: 'alphabetical' },
                ],
              },
            ]}
            placeholder={t("page-programs:page-programs-sort-by")}
            onChange={(selectedOption) => {
              updateSortOrder(selectedOption);
            }}
            defaultValue={{ label: t("page-programs:page-programs-sort-default"), value: 'default' }} // Set the default option
            isSearchable={false}
          />
        </Box>
        {/* <Th>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                label: t("page-programs:page-programs-sort-by"),
                options: [...filteredFeatureDropdownItems],
              },
            ]}
            onChange={(selectedOption) => {
              updateDropdown(selectedOption, setSecondFeatureSelect, secondCol)
            }}
            defaultValue={secondFeatureSelect}
            isSearchable={false}
          />
        </Th>
        <Th>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                label: t("page-programs:page-programs-sort-by"),
                options: [...filteredFeatureDropdownItems],
              },
            ]}
            onChange={(selectedOption) => {
              updateDropdown(selectedOption, setThirdFeatureSelect, thirdCol)
            }}
            defaultValue={thirdFeatureSelect}
            isSearchable={false}
          />
        </Th> */}
      </ProgramsContentHeader>
      {!dataView || dataView === "program" ? filteredPrograms.filter(tutorial => tutorial.type === "program").length !== 0 ? (
        <>
          <CardGrid>
            {filteredPrograms.filter(tutorial => tutorial.type === "program").map((tutorial, idx) => {
              const comingSoon = !!tutorial.to;
              return (
                <Flex
                  as={comingSoon ? BaseLink : 'div'} // Use 'div' if there's no link
                  textDecoration="none"
                  flexDirection="column"
                  justifyContent="space-between"
                  fontWeight="normal"
                  color="text"
                  border="1px solid"
                  borderColor="var(--x3-colors-primary-base)"
                  padding={8}
                  h="full"
                  w="full"
                  position="relative"
                  _hover={{
                    textDecoration: comingSoon ? "none" : undefined,
                    borderRadius: comingSoon ? "base" : undefined,
                    boxShadow: comingSoon ? "0 0 1px var(--x3-colors-primary-base)" : undefined,
                    bg: comingSoon ? "tableBackgroundHover" : undefined,
                  }}
                  key={tutorial.title}
                  {...(comingSoon ? { to: tutorial.to, target: "_blank", hideArrow: true } : {})}
                  cursor={comingSoon ? 'pointer' : 'not-allowed'}
                >
                  <Badge
                    position="absolute" // Absolutely position the "Coming Soon" tag
                    top={2}
                    right={2}
                    colorScheme="white"
                    fontSize="xl"
                    _after={{
                      ms: 0.5,
                      me: "0.3rem",
                      display: comingSoon ? "inline-block" : "none",
                      content: `"↗"`,
                      fontStyle: "normal",
                    }}
                  >
                    {comingSoon ? '' : '🚧'}
                  </Badge>
                  <Flex
                    justifyContent="space-between"
                    alignItems="flex-start"
                    flexDirection={{ base: "column" }}
                    gap={6}
                  >
                    <Flex gap={2}>
                      <Badge variant="secondary">
                        {t(getSkillTranslationId(tutorial.frameworkLevel!))}
                      </Badge>
                      <Badge variant="secondary">
                        {tutorial.programType}
                      </Badge>
                    </Flex>
                    <Text
                      color="text"
                      fontWeight="semibold"
                      fontSize="2xl"
                      lineHeight="1.2em"
                    >
                      {tutorial.title}
                    </Text>
                  </Flex>
                  <Text noOfLines={2} color="text200">{tutorial.description}</Text>
                  <div>
                    <Flex direction="column" align="start" fontSize="sm" color="text200" textTransform="uppercase" mb={6}>
                      {/* <Flex align="center" mb={1}>
                          <Emoji text=":wave:" fontSize="sm" me={2} />
                          {tutorial.author}
                        </Flex> */}
                      {/* <Flex align="center" mb={1}>
                          <Emoji text=":heart:" fontSize="sm" me={2} />
                          10 Likes
                        </Flex> */}
                      {/* {tutorial.timeToRead && (
                          <Flex align="center" mb={1}>
                            <Emoji text=":stopwatch:" fontSize="sm" me={2} />
                            {tutorial.timeToRead} {t("page-programs:page-programs-read-time")}
                          </Flex>
                        )} */}
                      {/* {published(locale!, tutorial.published ?? "") && (
                          <Flex align="center" mb={1}>
                            <Emoji text=":calendar:" fontSize="sm" me={2} />
                            {published(locale!, tutorial.published ?? "")}
                          </Flex>
                        )} */}
                      <Flex align="center" mb={2}>
                        <Emoji
                          text={
                            tutorial.location === 'virtual' ? ":globe_with_meridians:" :
                              tutorial.location === 'physical' ? ":round_pushpin:" :
                                tutorial.location === 'system' ? ":gear:" :
                                  tutorial.location === 'app' ? ":mobile_phone:" :
                                    ":eyes:" // Default case for all other types of locations
                          }
                          fontSize="sm"
                          me={2}
                        />
                        {tutorial.location}
                      </Flex>
                      {/* <Flex align="center" mb={0}>
                      <Emoji text=":star:" fontSize="sm" me={1} />
                      <Emoji text=":star:" fontSize="sm" me={1} />
                      <Emoji text=":star:" fontSize="sm" me={1} />
                      <Emoji text=":star:" fontSize="sm" me={1} />
                      <Emoji text=":star:" fontSize="sm" me={1} />
                    </Flex> */}
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
              borderColor="var(--x3-colors-primary-base)"
              padding={8}
              h="full"
              w="full"
              _hover={{
                textDecoration: "none",
                borderRadius: "base",
                boxShadow: "0 0 1px var(--x3-colors-primary-base)",
                // bg: "tableBackgroundHover",
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
                {t("page-programs:page-programs-submit-button")}
              </Button>
            </Flex>
          </CardGrid>
        </>)
        : (
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
                {t("page-programs:page-programs-filter-error")}
              </OldHeading>
              <Text>
                {t("page-programs:page-programs-try-removing-filters")}
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
                {t("page-programs:page-programs-submit-button")}
              </Button>
            </Box>
          </Box>) : ""}
      {!dataView || dataView === "content" ? filteredPrograms.filter(tutorial => tutorial.type === "content").length !== 0 ? (
        <>
          {!dataView ? <H2
          >
             {t("page-programs:page-programs-content")}
          </H2> : ""}
          <Flex pt={2} gap={1} flexDirection="column">
            {filteredPrograms.filter(tutorial => tutorial.type === "content").map((tutorial, idx) => {
              const comingSoon = !!tutorial.to;
              return (
                <Flex
                  as={comingSoon ? BaseLink : 'div'} // Use 'div' if there's no link
                  textDecoration="none"
                  flexDirection="column"
                  justifyContent="space-between"
                  fontWeight="normal"
                  color="text"
                  border="1px solid"
                  borderColor="var(--x3-colors-primary-base)"
                  padding={8}
                  h="full"
                  w="full"
                  position="relative"
                  _hover={{
                    textDecoration: comingSoon ? "none" : undefined,
                    borderRadius: comingSoon ? "base" : undefined,
                    boxShadow: comingSoon ? "0 0 1px var(--x3-colors-primary-base)" : undefined,
                    bg: comingSoon ? "tableBackgroundHover" : undefined,
                  }}
                  key={tutorial.title}
                  {...(comingSoon ? { to: tutorial.to, target: "_blank", hideArrow: true } : {})}
                  cursor={comingSoon ? 'pointer' : 'not-allowed'}
                >
                  <Flex
                    justifyContent="space-between"
                    mb={{ base: 8, md: -4 }}
                    alignItems="flex-start"
                    flexDirection={{ base: "column", md: "initial" }}
                  >
                    <Text
                      color="text"
                      fontWeight="semibold"
                      fontSize="2xl"
                      me={{ base: 0, md: 24 }}
                      lineHeight="1.2em"
                    >
                      {tutorial.title} {comingSoon ? '↗' : '🚧'}
                    </Text>
                    <Flex gap={2}>
                      <Badge variant="secondary">
                        {t(getSkillTranslationId(tutorial.programsLevel!))}
                      </Badge>
                      <Badge variant="secondary">
                        {tutorial.programType}
                      </Badge>
                    </Flex>
                  </Flex>
                  <Text color="text200" fontSize="sm" textTransform="uppercase">
                    <Emoji text=":writing_hand:" fontSize="sm" me={2} />
                    {tutorial.author}
                    {/* {tutorial.published ? (
                  <> • {published(locale!, tutorial.published!)}</>
                ) : null} */}
                    {(tutorial.timeToRead ?? 0) > 0 && (
                      <>
                        {" "}
                        •
                        <Emoji text=":stopwatch:" fontSize="sm" mx={1} />
                        {tutorial.timeToRead}{" "}
                        {t("page-programs:comp-programs-metadata-minute-read")}
                      </>
                    )}
                  </Text>
                  <Text color="text200">{tutorial.description}</Text>
                  <Flex flexWrap="wrap" w="full">
                    <TutorialTags tags={tutorial.tags ?? []} />
                  </Flex>
                </Flex>
              )
            })}
            {/* <Flex
              textDecoration="none"
              flexDirection="column"
              justifyContent="center"
              fontWeight="normal"
              color="text"
              // boxShadow="0px 1px 1px var(--x3-colors-tableItemBoxShadow)"
              border="1px solid"
              borderColor="var(--x3-colors-primary-base)"
              padding={8}
              h="full"
              w="full"
              _hover={{
                textDecoration: "none",
                borderRadius: "base",
                boxShadow: "0 0 1px var(--x3-colors-primary-base)",
                // bg: "tableBackgroundHover",
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
                {t("page-programs:page-programs-submit-button")}
              </Button>
            </Flex> */}
          </Flex>
        </>
      )
        : "" : ""}
    </Container>
  )
}

export default ProgramsTable
