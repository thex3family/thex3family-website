import { useTranslation } from "next-i18next"
import { BsArrowCounterclockwise } from "react-icons/bs"
import {
  Box,
  Center,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  type TabsProps,
  useTheme,
} from "@chakra-ui/react"

import FrameworkFilterProfile from "@/components/Framework/FrameworkFilterSidebar/FrameworkFilterFeature"
import FrameworkFilterPersonas from "@/components/Framework/FrameworkFilterSidebar/FrameworkFilterProfile"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { FiltersType } from "@/pages/understand-yourself/understand-the-framework"

const FilterTab = ({
  eventName,
  ...rest
}: {
  children: React.ReactNode
  eventName: string
}) => (
  <Tab
    onClick={() => {
      trackCustomEvent({
        eventCategory: "FrameworkFilterSidebar",
        eventAction: `FrameworkFilterSidebar tab clicked`,
        eventName,
      })
    }}
    _hover={{
      bg: "selectHover",
    }}
    sx={{
      "&[aria-selected=true]": {
        _hover: {
          bg: "primary.base",
        },
      },
    }}
    {...rest}
  />
)

interface FrameworkFilterSidebarProps extends Omit<TabsProps, "children"> {
  filters: FiltersType
  resetFrameworkFilter: React.MutableRefObject<() => void>
  resetFilters: () => void
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>
  selectedPersona: number
  setSelectedPersona: React.Dispatch<React.SetStateAction<number>>
  updateFilterOption: (key: any) => void
  updateFilterOptions: (keys: any, value: any) => void
}

const FrameworkFilterSidebar: React.FC<FrameworkFilterSidebarProps> = ({
  filters,
  resetFrameworkFilter,
  resetFilters,
  setFilters,
  selectedPersona,
  setSelectedPersona,
  updateFilterOption,
  updateFilterOptions,
  top,
  ...tabsProps
}) => {
  const theme = useTheme()
  const { t } = useTranslation("page-understand-the-framework")

  return (
    <Tabs
      bg="background.base"
      transition="0.5s all"
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
      }}
      {...tabsProps}
    >
      <Box position="sticky" top={top ?? 0}>
        <TabList
          borderBottom="1px solid"
          borderBottomColor="primary.base"
          bg="background.base"
          sx={{
            ".chakra-tabs__tab": {
              flex: 1,
              fontSize: "0.9rem",
              letterSpacing: "0.02rem",
              py: "0.9rem",
              _first: {
                borderTopStartRadius: "lg",
              },
              _last: {
                borderTopEndRadius: "lg",
              },
            },
          }}
        >
          <FilterTab eventName="show user personas">
            {t("page-understand-the-framework-profile-filters")}
          </FilterTab>
          <FilterTab eventName="show feature filters">
            {t("page-understand-the-framework-perspective-filters")} (
            {Object.values(filters).reduce((acc, filter) => {
              if (filter) {
                acc += 1
              }
              return acc
            }, 0)}
            )
          </FilterTab>
        </TabList>
      </Box>
      <Center
        as="button"
        borderRadius="base"
        color="primary.base"
        fontSize="xs"
        gap={1}
        mx="auto"
        mt="0.55rem"
        py={0.5}
        px={1}
        _hover={{
          color: "selectHover",
        }}
        onClick={() => {
          resetFilters()
          resetFrameworkFilter.current()
          trackCustomEvent({
            eventCategory: "FrameworkFilterReset",
            eventAction: `FrameworkFilterReset clicked`,
            eventName: `reset filters`,
          })
        }}
      >
        <Icon as={BsArrowCounterclockwise} aria-hidden="true" fontSize="sm" />
        {t("page-understand-the-framework-reset-filters").toUpperCase()}
      </Center>
      <TabPanels
        m={0}
        sx={{
          ".chakra-tabs__tab-panel": {
            bg: "transparent",
            border: "none",
            p: 0,
          },
        }}
      >
        <TabPanel>
          <FrameworkFilterPersonas
            resetFilters={resetFilters}
            setFilters={setFilters}
            selectedPersona={selectedPersona}
            setSelectedPersona={setSelectedPersona}
          />
        </TabPanel>
        <TabPanel>
          <FrameworkFilterProfile
            resetFrameworkFilter={resetFrameworkFilter}
            filters={filters}
            updateFilterOption={updateFilterOption}
            updateFilterOptions={updateFilterOptions}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

FrameworkFilterSidebar.displayName = "FrameworkFilterSidebar"

export default FrameworkFilterSidebar
