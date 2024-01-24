import { useRef, useState } from "react"
import { shuffle } from "lodash"
import { GetStaticProps } from "next"
import { useRouter } from "next/router"
import { SSRConfig, useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Hide,
  Show,
  Text,
  useDisclosure,
  useTheme,
} from "@chakra-ui/react"

import { BasePageProps, ChildOnlyProp } from "@/lib/types"

import BannerNotification from "@/components/BannerNotification"
import Breadcrumbs from "@/components/Breadcrumbs"
import { Button } from "@/components/Buttons"
import WalletFilterSidebar from "@/components/FindWallet/WalletFilterSidebar"
import WalletTable from "@/components/FindWallet/WalletTable"
import { FilterBurgerIcon } from "@/components/icons/wallets/FilterBurgerIcon"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import OldHeading from "@/components/OldHeading"
import PageMetadata from "@/components/PageMetadata"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import { trackCustomEvent } from "@/lib/utils/matomo"
import { getRequiredNamespacesForPage } from "@/lib/utils/translations"

import walletData from "@/data/wallets/wallet-data"

import frameworkData from "@/data/framework/framework-data"
import FrameworkFilterSidebar from "@/components/Framework/FrameworkFilterSidebar"
import FrameworkTable from "@/components/Framework/FrameworkTable"

import { NAV_BAR_PX_HEIGHT } from "@/lib/constants"

import FindWalletHeroImage from "@/public/wallets/find-wallet-hero.png"
import MainHero from "@/components/MainHero"

import understand_the_framework from "@/public/understand_the_framework.png"

const Subtitle = ({ children }: ChildOnlyProp) => (
  <Text
    fontSize="xl"
    lineHeight={1.4}
    color="body.medium"
    mb={6}
    _last={{ mb: 8 }}
  >
    {children}
  </Text>
)

const filterDefault = {
}

export type FiltersType = typeof filterDefault

export const getStaticProps = (async ({ locale }) => {
  const lastDeployDate = getLastDeployDate()

  const requiredNamespaces = getRequiredNamespacesForPage(
    "/understand-yourself/understand-the-framework"
  )

  const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[1])

  return {
    props: {
      ...(await serverSideTranslations(locale!, requiredNamespaces)),
      contentNotTranslated,
      lastDeployDate,
    },
  }
}) satisfies GetStaticProps<BasePageProps>

const FindWalletPage = () => {
  const { pathname } = useRouter()
  const theme = useTheme()
  const { t } = useTranslation(["page-wallets-find-wallet", "common"])
  const resetFrameworkFilter = useRef(() => {})
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
    lastUpdated: t("common:page-last-updated") + ": January 22, 2024", // This should be dynamic based on your data
    title: t("common:understand-the-framework-title"),
    description: t("common:understand-the-framework-description")
      .split('.')
      .filter(sentence => sentence.trim() !== '')
      .map(sentence => `${sentence.trim()}.`),
    imageSrc: understand_the_framework.src, // Assuming understand_yourself is an imported image module
    imageAlt: t("common:understand-the-framework-image-alt"),
  };

  return (
    <Flex as={MainArticle} direction="column" position="relative" w="full">
      <PageMetadata
        title={t("common:understand-the-framework-title")}
        description={t("common:understand-the-framework-description")}
      />

      <BannerNotification shouldShow={true}>
        {t("common:understand-the-framework-alert")}
      </BannerNotification>

      <MainHero {...heroProps} />

      {/* <Flex
        direction={{ base: "column-reverse", sm: "row" }}
        position="relative"
        w="full"
        p={12}
        bg="layer2Gradient"
        mb="44px"
      >
        <Box w={{ base: "full", sm: "50%" }} mt={{ base: 8, sm: 0 }}>
          <Breadcrumbs slug={pathname} />
          <OldHeading
            as="h1"
            fontSize={{ base: "2.5rem", md: "5xl" }}
            lineHeight={1.4}
          >
            {t("page-find-wallet-title")}
          </OldHeading>
          <Subtitle>{t("page-find-wallet-description")}</Subtitle>
          <Subtitle>{t("page-find-wallet-desc-2")}</Subtitle>
        </Box>
        <Center w={{ base: "full", sm: "50%" }}>
          <Image
            src={FindWalletHeroImage}
            width={600}
            alt=""
            priority
            style={{
              objectFit: "contain",
            }}
          />
        </Center>
      </Flex> */}

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
            top={NAV_BAR_PX_HEIGHT}
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
          <FrameworkTable filters={filters} frameworkData={frameworkData} />
        </Box>
      </Flex>
    </Flex>
  )
}

export default FindWalletPage
