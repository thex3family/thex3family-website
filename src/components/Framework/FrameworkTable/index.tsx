import { ReactNode } from "react"
import { useTranslation } from "next-i18next"
import { FaBook, FaDiscord, FaGlobe, FaTools, FaTwitter, FaUsers } from "react-icons/fa"
import { MdExpandLess, MdExpandMore } from "react-icons/md"
import Select from "react-select"
import {
  Box,
  calc,
  chakra,
  Flex,
  FlexProps,
  forwardRef,
  Icon,
  keyframes,
  SimpleGrid,
  SimpleGridProps,
  Table,
  TableProps,
  Td,
  Th,
  Tr,
} from "@chakra-ui/react"

import { ChildOnlyProp } from "@/lib/types"

import { FrameworkMoreInfo } from "@/components/Framework/FrameworkTable/FrameworkMoreInfo"
import { useFrameworkTable } from "@/components/Framework/FrameworkTable/useFrameworkTable"
import { Image } from "@/components/Image"
import InlineLink, { LinkProps } from "@/components/Link"
import Text from "@/components/OldText"
import Tooltip from "@/components/Tooltip"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { FrameworkData } from "@/data/framework/framework-data"

import { NAV_BAR_PX_HEIGHT } from "@/lib/constants"

const Container = (props: TableProps) => (
  <Table
    w="full"
    sx={{
      th: {
        fontWeight: "normal",
        p: {
          fontSize: "0.9rem",
        },
      },
    }}
    {...props}
  />
)

const FrameworkContainer = (props: ChildOnlyProp) => (
  <Container
    borderBottom="1px"
    borderColor="lightBorder"
    _hover={{ bg: "chakra-subtle-bg", transition: "0.5s all" }}
    {...props}
  />
)

const Grid = forwardRef<SimpleGridProps, "tr">((props, ref) => (
  <SimpleGrid
    as={Tr}
    ref={ref}
    templateColumns={{ base: "60% auto 0% 0% 5%", md: "40% auto auto auto 5%" }}
    w="full"
    columnGap={2}
    alignItems="center"
    {...props}
  />
))

const FrameworkContentHeader = (props: ChildOnlyProp) => (
  <Grid
    bg="background.base"
    borderBottom="1px"
    borderColor="primary.base"
    templateColumns={{
      base: "auto",
      sm: "60% auto 0% 0% 5%",
      md: "40% auto auto auto 5%",
    }}
    rowGap={{ base: 4, sm: 0 }}
    p={2}
    position="sticky"
    top={{
      base: calc(NAV_BAR_PX_HEIGHT).add("4rem").toString(),
      lg: NAV_BAR_PX_HEIGHT,
    }}
    zIndex={1}
    sx={{
      th: {
        p: 0,
        borderBottom: "none",
        color: "currentColor",
        fontSize: "0.9rem",
        lineHeight: "revert",
        letterSpacing: "revert",
        textAlign: "revert",
        textTransform: "revert",
        "&:nth-of-type(2)": {
          display: { base: "flex", sm: "revert" },
          alignItems: "center",
          gap: 4,
        },
        "&:nth-of-type(3), &:nth-of-type(4)": {
          hideBelow: "md",
        },
      },
    }}
    {...props}
  />
)

const Framework = forwardRef<ChildOnlyProp, "tr">((props, ref) => (
  <Grid
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
    {...props}
  />
))

const ChakraSelect = chakra((props: { className?: string }) => (
  <Select {...props} />
))
const StyledSelect = (props) => (
  <ChakraSelect
    w="full"
    sx={{
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

export interface FrameworkTableProps {
  filters: Record<string, boolean>
  frameworkData: FrameworkData[]
}

const FrameworkTable = ({ filters, frameworkData }: FrameworkTableProps) => {
  const { t } = useTranslation("page-understand-the-framework")
  const {
    featureDropdownItems,
    filteredFeatureDropdownItems,
    filteredFrameworks,
    setFirstFeatureSelect,
    setSecondFeatureSelect,
    setThirdFeatureSelect,
    updateDropdown,
    updateMoreInfo,
    firstFeatureSelect,
    secondFeatureSelect,
    thirdFeatureSelect,
    frameworkCardData,
  } = useFrameworkTable({ filters, t, frameworkData })

  return (
    <Container>
      <FrameworkContentHeader>
        <Th>
          {filteredFrameworks.length === frameworkCardData.length ? (
            <Text as="span">
              {t("page-understand-the-framework-showing-all")} (
              <strong>{frameworkCardData.length}</strong>)
            </Text>
          ) : (
            <Text as="span">
              {t("page-understand-the-framework-showing")}{" "}
              <strong>
                {filteredFrameworks.length} / {frameworkCardData.length}
              </strong>{" "}
              {t("page-understand-the-framework-frameworks")}
            </Text>
          )}
        </Th>
        <Th>
          <Text as="span" hideFrom="sm" fontSize="md" whiteSpace="nowrap">
            {t("page-understand-the-framework-choose-perspectives")}
          </Text>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                label: t("page-understand-the-framework-choose-to-compare"),
                options: [...filteredFeatureDropdownItems],
              },
            ]}
            onChange={(selectedOption) => {
              updateDropdown(selectedOption, setFirstFeatureSelect, firstCol)
            }}
            defaultValue={firstFeatureSelect}
            isSearchable={false}
          />
        </Th>
        <Th>
          <StyledSelect
            className="react-select-container"
            classNamePrefix="react-select"
            options={[
              {
                label: t("page-understand-the-framework-choose-to-compare"),
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
                label: t("page-understand-the-framework-choose-to-compare"),
                options: [...filteredFeatureDropdownItems],
              },
            ]}
            onChange={(selectedOption) => {
              updateDropdown(selectedOption, setThirdFeatureSelect, thirdCol)
            }}
            defaultValue={thirdFeatureSelect}
            isSearchable={false}
          />
        </Th>
      </FrameworkContentHeader>
      {filteredFrameworks.map((framework, idx) => {

        // Assuming featureDropdownItems is an array of DropdownOption objects
        // and wallet is an object representing the wallet properties

        function findLastTrueLabel(items, filterKey, wallet) {
          const matchingLabels = items
            .filter(item => item.category === filterKey)
            .map(item => ({ label: item.label, filterKey: item.filterKey, description: item.description }))
            .filter(item => wallet[item.filterKey]);

          return matchingLabels[matchingLabels.length - 1];
        }

        // Usage
        const firstLastTrueLabel = findLastTrueLabel(featureDropdownItems, firstFeatureSelect.filterKey, framework);
        const secondLastTrueLabel = findLastTrueLabel(featureDropdownItems, secondFeatureSelect.filterKey, framework);
        const thirdLastTrueLabel = findLastTrueLabel(featureDropdownItems, thirdFeatureSelect.filterKey, framework);

        return (
          <FrameworkContainer key={framework.key}>
            <Framework
              onClick={() => {
                updateMoreInfo(framework.key)
                // Log "more info" event only on expanding
                framework.moreInfo &&
                  trackCustomEvent({
                    eventCategory: "FrameworkMoreInfo",
                    eventAction: `More info framework`,
                    eventName: `More info ${framework.name}`,
                  })
              }}
            >
              <Td lineHeight="revert">
                <FlexInfo>
                  <Box>
                    <Image
                      src={framework.image}
                      alt=""
                      objectFit="contain"
                      boxSize="56px"
                    />
                  </Box>
                  <Box>
                    <Text>{t(`page-understand-the-framework-level-${framework.name}-title`)}</Text>
                    <Text
                      hideBelow="sm"
                      color="text200"
                      fontSize="0.7rem"
                      lineHeight="0.85rem"
                    >
                      {t(`page-understand-the-framework-level-${framework.name}-description`)}
                    </Text>
                    {/* <Box mt={4}>
                      <Flex gap="0.8rem">
                        <SocialLink // knowledge
                          to={framework.knowledge}
                          hideArrow
                          customEventOptions={{
                            eventCategory: "FrameworkExternalLinkList",
                            eventAction: `Go to level`,
                            eventName: `Knowledge: ${framework.name} ${idx}`,
                            eventValue: JSON.stringify(filters),
                          }}
                        >
                          <Icon
                            as={FaBook}
                            color="#6FAAC3"
                            fontSize="2xl"
                          />
                        </SocialLink>
                        <SocialLink // tools
                          to={framework.tools}
                          hideArrow
                          customEventOptions={{
                            eventCategory: "FrameworkExternalLinkList",
                            eventAction: `Go to level`,
                            eventName: `Tools: ${framework.name} ${idx}`,
                            eventValue: JSON.stringify(filters),
                          }}
                        >
                          <Icon
                            as={FaTools}
                            color="#E03D3E"
                            fontSize="2xl"
                          />
                        </SocialLink>
                        <SocialLink // community
                          to={framework.community}
                          hideArrow
                          customEventOptions={{
                            eventCategory: "FrameworkExternalLinkList",
                            eventAction: `Go to level`,
                            eventName: `Community: ${framework.name} ${idx}`,
                            eventValue: JSON.stringify(filters),
                          }}
                        >
                          <Icon
                            as={FaUsers}
                            color="#EDBE00"
                            fontSize="2xl"
                          />
                        </SocialLink>
                      </Flex>
                    </Box> */}
                  </Box>
                </FlexInfo>
              </Td>
              <Td>
                <FlexInfoCenter className={firstCol}>
                  <Tooltip
                    content={
                      <Text lineHeight={1.2}>
                        {firstLastTrueLabel.description}
                      </Text>
                    }
                  >
                    {firstLastTrueLabel ? firstLastTrueLabel.label : "N/A"}
                  </Tooltip>
                </FlexInfoCenter>
              </Td>
              <Td>
                <FlexInfoCenter className={secondCol}>
                  <Tooltip
                    content={
                      <Text lineHeight={1.2}>
                        {secondLastTrueLabel.description}
                      </Text>
                    }
                  >
                    {secondLastTrueLabel ? secondLastTrueLabel.label : "N/A"}
                  </Tooltip>
                </FlexInfoCenter>
              </Td>
              <Td>
                <FlexInfoCenter className={thirdCol}>
                  <Tooltip
                    content={
                      <Text lineHeight={1.2}>
                        {thirdLastTrueLabel.description}
                      </Text>
                    }
                  >
                    {thirdLastTrueLabel ? thirdLastTrueLabel.label : "N/A"}
                  </Tooltip>
                </FlexInfoCenter>
              </Td>
              <Td>
                <FlexInfoCenter>
                  <Box>
                    <Icon
                      as={framework.moreInfo ? MdExpandLess : MdExpandMore}
                      color="primary.base"
                      fontSize="2xl"
                    />
                  </Box>
                </FlexInfoCenter>
              </Td>
            </Framework>
            {framework.moreInfo && (
              <FrameworkMoreInfo
                framework={framework}
                filters={filters}
                idx={idx}
                featureDropdownItems={featureDropdownItems}
              />
            )}
          </FrameworkContainer>
        )
      })}
    </Container>
  )
}

export default FrameworkTable
