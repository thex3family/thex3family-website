import { RefObject, useState } from "react"
import { motion } from "framer-motion"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import {
  MdArrowBack,
  MdBrightness2,
  MdTranslate,
  MdWbSunny,
} from "react-icons/md"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  type ButtonProps,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerOverlay,
  Flex,
  Icon,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { isHrefActive, localizePath } from "@/lib/utils/url"

import LanguageList from "../LanguagePicker/LanguageList"

import { NAV_SECTION_KEYS, type NavItem, type NavSections } from "./types"

const hamburgerSvg =
  "M 2 13 l 10 0 l 0 0 l 10 0 M 4 19 l 8 0 M 12 19 l 8 0 M 2 25 l 10 0 l 0 0 l 10 0"
const closeSvg =
  "M 2 13 l 0 -3 l 20 0 l 0 3 M 7 14 l 10 10 M 7 24 l 10 -10 M 2 25 l 0 3 l 20 0 l 0 -3"

const glyphPathVariants = {
  closed: { d: hamburgerSvg, transition: { duration: 0.4 } },
  open: { d: [hamburgerSvg, closeSvg], transition: { duration: 0.4 } },
}

type ItemListProps = {
  items: NavItem[]
  depth: number
  onNavigate: () => void
}

/** Links render as rows; groups become a nested accordion, one level deeper */
const ItemList = ({ items, depth, onNavigate }: ItemListProps) => {
  const { asPath, locale } = useRouter()
  const path = asPath.split(/[?#]/)[0]
  const groups = items.filter((item) => item.items)
  const links = items.filter((item) => item.href !== undefined)

  return (
    <>
      {links.length > 0 && (
        <List m={0} ps={depth > 0 ? 2 : 0}>
          {links.map((item) => {
            const isActive = isHrefActive(
              item.href!,
              path,
              item.isPartiallyActive ?? true
            )
            return (
              <ListItem key={item.label} m={0}>
                <Box
                  as={NextLink}
                  href={localizePath(item.href!, locale)}
                  locale={false}
                  display="block"
                  px={4}
                  py={3}
                  borderRadius="base"
                  textDecoration="none"
                  color={isActive ? "primary.highContrast" : "body.base"}
                  bg={isActive ? "background.highlight" : "transparent"}
                  aria-current={isActive ? "page" : undefined}
                  _hover={{
                    color: "primary.highContrast",
                    textDecoration: "none",
                  }}
                  onClick={() => {
                    trackCustomEvent({
                      eventCategory: "Mobile navigation menu",
                      eventAction: `Menu - ${locale}`,
                      eventName: item.href!,
                    })
                    onNavigate()
                  }}
                >
                  <Text as="span" display="block" fontWeight="bold">
                    {item.label}
                  </Text>
                  <Text
                    as="span"
                    display="block"
                    fontSize="sm"
                    color="body.medium"
                  >
                    {item.description}
                  </Text>
                </Box>
              </ListItem>
            )
          })}
        </List>
      )}
      {groups.length > 0 && (
        <Accordion allowToggle ps={depth > 0 ? 2 : 0}>
          {groups.map((group) => (
            <AccordionItem key={group.label} border="none">
              <AccordionButton
                px={4}
                py={3}
                borderRadius="base"
                textAlign="start"
              >
                <Box flex="1">
                  <Text as="span" display="block" fontWeight="bold">
                    {group.label}
                  </Text>
                  <Text
                    as="span"
                    display="block"
                    fontSize="sm"
                    color="body.medium"
                  >
                    {group.description}
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel
                p={0}
                bg="background.highlight"
                borderRadius="base"
              >
                <ItemList
                  items={group.items!}
                  depth={depth + 1}
                  onNavigate={onNavigate}
                />
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  )
}

const FooterButton = ({ children, ...props }: ButtonProps) => (
  <Button
    variant="ghost"
    flex="1"
    h="auto"
    py={3}
    flexDir="column"
    gap={1}
    fontWeight="normal"
    fontSize="sm"
    color="body.base"
    _hover={{ color: "primary.highContrast" }}
    {...props}
  >
    {children}
  </Button>
)

export type MobileNavMenuProps = {
  linkSections: NavSections
  isDarkTheme: boolean
  toggleTheme: () => void
  drawerContainerRef: RefObject<HTMLElement | null>
  hideFrom?: string
}

const MobileNavMenu = ({
  linkSections,
  isDarkTheme,
  toggleTheme,
  drawerContainerRef,
  hideFrom,
}: MobileNavMenuProps) => {
  const { t } = useTranslation("common")
  const { locale } = useRouter()
  const { isOpen, onToggle, onClose } = useDisclosure()
  const [view, setView] = useState<"menu" | "languages">("menu")

  const close = () => {
    onClose()
    setView("menu")
  }

  return (
    <>
      <Button
        onClick={isOpen ? close : onToggle}
        aria-label={t(isOpen ? "nav-close-menu" : "nav-open-menu")}
        aria-expanded={isOpen}
        variant="ghost"
        px={0}
        zIndex="modal"
        hideFrom={hideFrom}
      >
        <Icon
          viewBox="0 0 24 40"
          mx={0.5}
          width={6}
          height={10}
          position="relative"
          strokeWidth="2px"
          sx={{ "& > path": { stroke: "body.base", fill: "none" } }}
        >
          <motion.path
            variants={glyphPathVariants}
            initial={false}
            animate={isOpen ? "open" : "closed"}
          />
        </Icon>
      </Button>
      <Drawer
        portalProps={{ containerRef: drawerContainerRef }}
        isOpen={isOpen}
        onClose={close}
        placement="start"
        size="sm"
      >
        <DrawerOverlay bg="modalBackground" />
        <DrawerContent bg="background.base">
          {/* At phone width the drawer covers the hamburger, so it needs its own close */}
          <DrawerCloseButton
            aria-label={t("nav-close-menu")}
            top={6}
            insetEnd={4}
            size="lg"
          />
          <DrawerBody pt={20} pb={6} px={2}>
            {view === "menu" ? (
              <Accordion allowToggle>
                {NAV_SECTION_KEYS.map((sectionKey) => {
                  const section = linkSections[sectionKey]
                  return (
                    <AccordionItem
                      key={sectionKey}
                      borderTop="none"
                      borderBottom="1px"
                      borderColor="body.light"
                    >
                      <AccordionButton
                        px={4}
                        py={4}
                        fontSize="xl"
                        fontWeight="bold"
                        _expanded={{ color: "primary.highContrast" }}
                      >
                        <Box flex="1" textAlign="start">
                          {section.label}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel px={0} pb={4}>
                        <ItemList
                          items={section.items}
                          depth={0}
                          onNavigate={close}
                        />
                      </AccordionPanel>
                    </AccordionItem>
                  )
                })}
              </Accordion>
            ) : (
              <>
                <Button
                  variant="ghost"
                  leftIcon={<Icon as={MdArrowBack} />}
                  onClick={() => setView("menu")}
                  mb={2}
                  fontWeight="normal"
                >
                  {t("nav-back-to-menu")}
                </Button>
                <LanguageList source="mobile" onSelect={close} />
              </>
            )}
          </DrawerBody>
          <DrawerFooter
            borderTop="1px"
            borderColor="body.light"
            justifyContent="space-between"
            px={2}
            py={2}
          >
            <FooterButton onClick={toggleTheme}>
              <Icon as={isDarkTheme ? MdWbSunny : MdBrightness2} boxSize={6} />
              {t(isDarkTheme ? "light-mode" : "dark-mode")}
            </FooterButton>
            <FooterButton
              onClick={() => setView(view === "menu" ? "languages" : "menu")}
              aria-pressed={view === "languages"}
            >
              <Icon as={MdTranslate} boxSize={6} />
              {t("languages-title")} {locale!.toUpperCase()}
            </FooterButton>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default MobileNavMenu
