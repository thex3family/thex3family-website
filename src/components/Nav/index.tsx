import { useRef } from "react"
import { useTranslation } from "next-i18next"
import { MdBrightness2, MdWbSunny } from "react-icons/md"
import { Box, Flex } from "@chakra-ui/react"

import LanguagePicker from "@/components/LanguagePicker"
import SearchBar from "@/components/SearchBar"

import { IconButton } from "../Buttons"
import { HomeIcon } from "../icons"
import { BaseLink } from "../Link"

import DesktopMenu from "./DesktopMenu"
import MobileNavMenu from "./Mobile"
import { useNav } from "./useNav"

export interface IProps {
  path: string
}

// Layout follows the ethereum.org nav (MIT, see NOTICE.md): logo, sections
// with a mega-menu, then search, theme and language on the right
const Nav = ({ path }: IProps) => {
  const {
    linkSections,
    unlockYourPotentialSubNav,
    shouldShowUnlockYourPotentialSubNav,
    isDarkTheme,
    toggleTheme,
  } = useNav({ path })
  const { t } = useTranslation("common")
  const navWrapperRef = useRef(null)

  return (
    <Box position="sticky" top={0} zIndex="sticky" width="full">
      <Flex
        ref={navWrapperRef}
        as="nav"
        aria-label={t("nav-primary")}
        // The mega-menu panel is positioned against this bar
        position="relative"
        bg="background.base"
        borderBottom="1px"
        borderColor="body.light"
        height="4.75rem"
        justifyContent="center"
        py={4}
        px={{ base: 4, lg: 8 }}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          width="full"
          maxW="container.2lg"
        >
          <BaseLink
            to="/"
            aria-label={t("home")}
            display="inline-flex"
            alignItems="center"
            textDecor="none"
          >
            <HomeIcon opacity={0.85} _hover={{ opacity: 1 }} />
          </BaseLink>
          <Flex
            w="full"
            alignItems="center"
            justifyContent={{ base: "flex-end", lg: "space-between" }}
            ms={{ base: 3, lg: 6 }}
          >
            <DesktopMenu hideBelow="lg" linkSections={linkSections} />
            <Flex alignItems="center" gap={{ base: 2, lg: 1 }}>
              <SearchBar t={t} variant="search" />
              <IconButton
                hideBelow="lg"
                transition="transform 0.5s, color 0.2s"
                icon={isDarkTheme ? <MdWbSunny /> : <MdBrightness2 />}
                aria-label={t(
                  isDarkTheme ? "nav-switch-to-light" : "nav-switch-to-dark"
                )}
                variant="ghost"
                isSecondary
                px={1.5}
                _hover={{ transform: "rotate(10deg)", color: "primary.hover" }}
                onClick={toggleTheme}
              />
              <Box hideBelow="lg">
                <LanguagePicker />
              </Box>
              <MobileNavMenu
                hideFrom="lg"
                linkSections={linkSections}
                isDarkTheme={isDarkTheme}
                toggleTheme={toggleTheme}
                drawerContainerRef={navWrapperRef}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {shouldShowUnlockYourPotentialSubNav && (
        <Flex
          as="nav"
          aria-label={t("nav-docs")}
          display={{ base: "none", lg: "flex" }}
          bg="ednBackground"
          borderBottom="1px"
          borderColor="border"
          py={4}
          px={8}
        >
          {unlockYourPotentialSubNav.map((link) => (
            <BaseLink
              key={link.to}
              to={link.to}
              isPartiallyActive={link.isPartiallyActive}
              color="text"
              fontWeight="normal"
              textDecor="none"
              me={8}
              _hover={{ color: "primary.base" }}
              _visited={{}}
            >
              {link.text}
            </BaseLink>
          ))}
        </Flex>
      )}
    </Box>
  )
}

export default Nav
