import React, { MutableRefObject } from "react"
import { uniqueId } from "lodash"
import { useRouter } from "next/router"
import { BsToggleOff, BsToggleOn } from "react-icons/bs"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  chakra,
  Checkbox,
  Flex,
  forwardRef,
  GridItem,
  Heading,
  HStack,
  Icon,
  List,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"

import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { StyledSelect } from "../../ProgramsTable"

import { useFrameworkFilterFeature } from "./useProgramsFilterFeature"

const FilterToggle = ({
  ariaLabel,
  conditionItem,
}: {
  ariaLabel: string
  conditionItem: boolean
}) => (
  <Box
    as="span"
    aria-label={ariaLabel}
    role="checkbox"
    aria-checked={conditionItem ? "true" : "false"}
  >
    <Icon
      as={conditionItem ? BsToggleOn : BsToggleOff}
      color="primary.base"
      boxSize="1.875rem"
    />
  </Box>
)

const FilterTag = forwardRef<{ isActive: boolean; name: string }, "button">(
  (props, ref) => {
    const { isActive, name, ...rest } = props
    return (
      <Button
        ref={ref}
        variant={isActive ? "solid" : "outline"}
        border="1px"
        fontSize="sm"
        lineHeight={1.2}
        opacity={isActive ? 1 : 0.7}
        p={2}
        textTransform="uppercase"
        {...rest}
      >
        {name}
      </Button>
    )
  }
)

export interface FrameworkFilterFeatureProps {
  allTags: { [key: string]: number };
  selectedTags: string[];
  handleTagSelect: (tagName: string) => void;
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  trackCustomEvent: typeof trackCustomEvent;
  resetFrameworkFilter: MutableRefObject<() => void>
  filters: Record<string, boolean>
  updateFilterOption: (key: any) => void
  updateFilterOptions: (key: any, value: any) => void
}

const FrameworkFilterFeature: React.FC<FrameworkFilterFeatureProps> = ({
  allTags,
  selectedTags,
  handleTagSelect,
  setSelectedTags,
  trackCustomEvent,
  updateFilterOption,
  updateFilterOptions,
  ...restProps
}) => {
  
  const router = useRouter();
  const { filters } = router.query;
  const { tags } = router.query;


  React.useEffect(() => {
    // Assuming 'filters' is a comma-separated string of filter keys
    const filterKeys = typeof filters === 'string' ? filters.split(',') : [];
  
    // Update all filter options in one line
    updateFilterOptions(filterKeys, true); // Assuming you want to set each filter to true
  }, [filters]);

  React.useEffect(() => {
    // Check if 'tags' query parameter exists and is a string
    if (typeof tags === 'string') {
      // Decode the URI component and split by comma to get an array of tags
      const decodedTags = decodeURIComponent(tags).split(',');
      // Update the selectedTags state with the array of tags
      setSelectedTags(decodedTags);
    }
  }, [tags, setSelectedTags]);

  const rest = {
    resetFrameworkFilter: restProps.resetFrameworkFilter,
    filters: restProps.filters,
    updateFilterOptions,
  };
  const { filterOptions, setShowOptions } = useFrameworkFilterFeature(rest)

  const filterPanelBg = useColorModeValue("chakra-subtle-bg", "black400")
  return (
    <Accordion
      as={VStack}
      allowMultiple
      reduceMotion
      spacing={4}
      alignItems="normal"
      p={{ base: 4, sm: 0 }}
      // Workaround to not having a dedicated prop to all items open by default
      defaultIndex={[...Object.keys(filterOptions).map((key) => +key), Object.keys(filterOptions).length]}
    >
      <Box
        as="span"
        m={0}
        fontWeight="normal"
        fontSize="sm"
        p="0 1.2rem"
        lineHeight="1.3rem"
        textAlign="center"
        color="secondary"
      >
        <Translation id="page-programs:page-programs-filters-description" />
      </Box>


      {filterOptions.map((filterOption, idx) => {
        return (
          <AccordionItem
            key={uniqueId("frameworkFilterSidebarItemFeature")}
            background={filterPanelBg}
            borderRadius="base"
            // Remove border color from global style
            borderColor="transparent"
            p={6}
          >
            {({ isExpanded }) => (
              <>
                <Heading
                  as="h3"
                  color="primary.base"
                  borderBottom={isExpanded ? "1px" : "none"}
                  borderColor="currentColor"
                  fontSize="lg"
                  fontWeight={600}
                  lineHeight={1.4}
                  py={1}
                  px={4}
                  borderRadius={1}
                  _hover={{ color: "primary.hover" }}
                >
                  <AccordionButton
                    color="inherit"
                    fontWeight="inherit"
                    fontSize="inherit"
                    p={0}
                    textAlign="initial"
                    _hover={{ background: "transparent" }}
                  >
                    <Box as="span" flex={1}>
                      {filterOption.title}
                    </Box>
                    <AccordionIcon
                      color="primary.base"
                      boxSize={9}
                      _hover={{ color: "primary.hover" }}
                    />
                  </AccordionButton>
                </Heading>
                <AccordionPanel as={List} p={0} m={0}>

                  {filterOption.title === "Perspectives" ? (
                    <StyledSelect
                      className="react-select-container"
                      classNamePrefix="react-select"
                      mt={6}
                      options={filterOption.items.map(item => ({
                        label: item.title,
                        value: item.filterKey
                      }))}
                      onChange={(selectedOptions) => {
                        // When all selections are cleared, selectedOptions is null or an empty array
                        if (!selectedOptions || selectedOptions.length === 0) {
                          filterOption.items.forEach(item => {
                            if (item.filterKey && restProps.filters[item.filterKey]) {
                              trackCustomEvent({
                                eventCategory: "ProgramFilterSidebar",
                                eventAction: `${filterOption.title} deselected`,
                                eventName: item.filterKey,
                              });
                              updateFilterOption(item.filterKey);
                            }
                          });
                        } else {
                          // selectedOptions contains an array of selected option objects
                          const filterKeys = selectedOptions.map(option => option.value);

                          filterKeys.forEach(filterKey => {
                            trackCustomEvent({
                              eventCategory: "ProgramFilterSidebar",
                              eventAction: `${filterOption.title} selected`,
                              eventName: `${filterKey} ${!restProps.filters[filterKey]}`,
                            });

                            updateFilterOption(filterKey);
                          });
                        }
                      }}
                      value={filterOption.items
                        .filter(item => item.filterKey && restProps.filters[item.filterKey])
                        .map(item => ({
                          label: item.title,
                          value: item.filterKey // Assuming filterKey is always a string if defined
                        }))
                      }
                      placeholder="All Perspectives"
                      isMulti
                      isSearchable={false}
                    />
                  ) :
                    (filterOption.items.map((item, itemIdx) => {
                      const LabelIcon = item.icon
                      return (
                        <Box
                          key={itemIdx}
                          borderBottom="1px"
                          borderColor="lightBorder"
                          pt="1.16rem"
                          px={3}
                          pb={3}
                          _last={{ border: "none" }}
                        >
                          <SimpleGrid
                            key={uniqueId("frameworkFilterSidebarItemPanel")}
                            templateColumns="28px auto 34px"
                            alignItems="center"
                            columnGap={2.5}
                            cursor="pointer"
                            onClick={
                              item.filterKey
                                ? () => {
                                  trackCustomEvent({
                                    eventCategory: "FrameworkFilterSidebar",
                                    eventAction: `${filterOption.title}`,
                                    eventName: `${item.filterKey} ${!restProps
                                      .filters[item.filterKey!]}`,
                                  })
                                  updateFilterOption(item.filterKey)
                                }
                                : () => {
                                  setShowOptions(
                                    idx,
                                    itemIdx,
                                    !item.showOptions
                                  )
                                  trackCustomEvent({
                                    eventCategory: "FrameworkFilterSidebar",
                                    eventAction: `${filterOption.title}`,
                                    eventName: `Toggle ${item.title
                                      } ${!item.showOptions}`,
                                  })
                                }
                            }
                          >
                            <GridItem>
                              <LabelIcon
                                boxSize={7}
                                mt={0.5}
                                color="text"
                                aria-hidden
                              />
                            </GridItem>
                            <GridItem as="span" lineHeight="1.1rem">
                              {item.title}
                            </GridItem>
                            <GridItem>
                              {item.filterKey && (
                                <FilterToggle
                                  ariaLabel={item.title}
                                  conditionItem={
                                    restProps.filters[item.filterKey]
                                  }
                                />
                              )}
                              {item.showOptions !== undefined && (
                                <FilterToggle
                                  ariaLabel={item.title}
                                  conditionItem={item.showOptions}
                                />
                              )}
                            </GridItem>
                            {/* <GridItem
                            as="span"
                            color="text200"
                            fontSize="0.9rem"
                            lineHeight="1.1rem"
                            colStart={2}
                          >
                            {item.description}
                          </GridItem> */}
                          </SimpleGrid>
                          {item.options.length > 0 && item.showOptions && (
                            <HStack mt={3.5} spacing={2}>
                              {item.options.map((option, optionIdx) => {
                                const handleClick = () => {
                                  let closeShowOptions = true

                                  for (let filterOption of item.options) {
                                    if (filterOption.name === option.name) {
                                      if (
                                        !restProps.filters[
                                        filterOption.filterKey!
                                        ]
                                      ) {
                                        closeShowOptions = false
                                        break
                                      }
                                    } else {
                                      if (
                                        restProps.filters[filterOption.filterKey!]
                                      ) {
                                        closeShowOptions = false
                                        break
                                      }
                                    }
                                  }

                                  if (closeShowOptions) {
                                    setShowOptions(
                                      idx,
                                      itemIdx,
                                      !item.showOptions
                                    )
                                  }

                                  trackCustomEvent({
                                    eventCategory: "FrameworkFilterSidebar",
                                    eventAction: `${filterOption.title}`,
                                    eventName: `${option.filterKey} ${!restProps
                                      .filters[option.filterKey!]}`,
                                  })
                                  updateFilterOption(option.filterKey)
                                }
                                return (
                                  <Checkbox
                                    key={optionIdx}
                                    aria-label={option.name}
                                    isChecked={
                                      restProps.filters[option.filterKey!]
                                    }
                                    width="full"
                                    onChange={handleClick}
                                  >
                                    <Text as="p" aria-hidden="true">
                                      {option.name}
                                    </Text>
                                  </Checkbox>
                                )
                              })}
                            </HStack>
                          )}
                        </Box>
                      );
                    })
                    )}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        )
      })}

      <AccordionItem
        key={uniqueId("frameworkFilterSidebarItemTag")}
        background={filterPanelBg}
        borderRadius="base"
        // Remove border color from global style
        borderColor="transparent"
        p={6}
      >
        {({ isExpanded }) => (
          <>
            <Heading
              as="h3"
              color="primary.base"
              borderBottom={isExpanded ? "1px" : "none"}
              borderColor="currentColor"
              fontSize="lg"
              fontWeight={600}
              lineHeight={1.4}
              py={1}
              px={4}
              borderRadius={1}
              _hover={{ color: "primary.hover" }}
            >
              <AccordionButton
                color="inherit"
                fontWeight="inherit"
                fontSize="inherit"
                p={0}
                textAlign="initial"
                _hover={{ background: "transparent" }}
              >
                <Box as="span" flex={1}>
                  Tags
                </Box>
                <AccordionIcon
                  color="primary.base"
                  boxSize={9}
                  _hover={{ color: "primary.hover" }}
                />
              </AccordionButton>
            </Heading>
            <AccordionPanel as={List} p={0} m={0}>
              {/* Tags */}
              <Flex
                justifyContent="center"
                mt={6}
                mb={4}
                flexDirection={{ base: "column", md: "initial" }}
              >
                <Flex
                  flexWrap="wrap"
                  alignItems="center"
                  gap={2}
                  w="full"
                  pl={3}
                >
                  {allTags && Object.entries(allTags).map(([tagName, tagCount], idx) => {
                    const name = `${tagName} (${tagCount})`
                    const isActive = selectedTags.includes(tagName)
                    return (
                      <FilterTag
                        key={idx}
                        onClick={() => handleTagSelect(tagName)}
                        {...{ name, isActive }}
                      />
                    )
                  })}
                  {selectedTags.length > 0 && (
                    <Button
                      color="primary.base"
                      textDecoration="underline"
                      bg="none"
                      border="none"
                      cursor="pointer"
                      p={0}
                      _hover={{
                        bg: "none",
                      }}
                      onClick={() => {
                        setSelectedTags([])
                        trackCustomEvent({
                          eventCategory: "tutorial tags",
                          eventAction: "click",
                          eventName: "clear",
                        })
                      }}
                    >
                      <Translation id="page-programs:page-programs-tags-reset" />
                    </Button>
                  )}
                </Flex>
              </Flex>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>

    </Accordion>
  )
}

export default FrameworkFilterFeature
