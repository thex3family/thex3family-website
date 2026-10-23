import { useState } from "react"
import { useRouter } from "next/router"
import { Box, type BoxProps,Button } from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
import {
  Content,
  Item,
  List,
  Root,
  Trigger,
  Viewport,
} from "@radix-ui/react-navigation-menu"

import type { Lang } from "@/lib/types"

import { isLangRightToLeft } from "@/lib/utils/translations"

import { NAV_SECTION_KEYS, type NavSections } from "../types"

import SubMenu from "./SubMenu"

const panelIn = keyframes`
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
`

type DesktopMenuProps = BoxProps & {
  linkSections: NavSections
}

/**
 * Top-level sections with a full-width mega-menu panel under the nav bar.
 * Radix NavigationMenu owns hover intent, keyboard navigation and focus;
 * Chakra owns the styling. The panel is positioned against the sticky nav.
 */
const DesktopMenu = ({ linkSections, ...props }: DesktopMenuProps) => {
  const { locale } = useRouter()
  const [openSection, setOpenSection] = useState("")
  const direction = isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"

  return (
    <Box {...props}>
      <Root
        dir={direction}
        orientation="horizontal"
        delayDuration={0}
        value={openSection}
        onValueChange={setOpenSection}
      >
        <List asChild>
          <Box as="ul" display="flex" listStyleType="none" m={0} gap={1}>
            {NAV_SECTION_KEYS.map((sectionKey) => {
              const { label, items } = linkSections[sectionKey]
              const isOpen = openSection === sectionKey

              return (
                <Item key={sectionKey} value={sectionKey} asChild>
                  <Box as="li" m={0}>
                    <Trigger asChild>
                      <Button
                        variant="ghost"
                        position="relative"
                        px={{ base: 3, xl: 4 }}
                        py={2}
                        h="auto"
                        whiteSpace="nowrap"
                        fontWeight="normal"
                        color={isOpen ? "primary.highContrast" : "body.base"}
                        bg={isOpen ? "primary.lowContrast" : "transparent"}
                        borderRadius="base"
                        _hover={{
                          color: "primary.base",
                          bg: isOpen ? "primary.lowContrast" : "transparent",
                        }}
                        // Bridge the gap to the panel so moving the pointer down keeps it open
                        _after={{
                          content: '""',
                          position: "absolute",
                          insetX: 0,
                          top: "100%",
                          h: 5,
                        }}
                      >
                        {label}
                      </Button>
                    </Trigger>
                    <Content asChild>
                      <Box
                        position="absolute"
                        insetX={0}
                        top="100%"
                        borderTop="1px"
                        borderBottom="1px"
                        borderColor="body.light"
                        bg="background.base"
                        boxShadow="md"
                        animation={`${panelIn} 150ms ease-out`}
                        sx={{
                          "@media (prefers-reduced-motion: reduce)": {
                            animation: "none",
                          },
                        }}
                      >
                        <SubMenu
                          lvl={1}
                          items={items}
                          sectionKey={sectionKey}
                        />
                      </Box>
                    </Content>
                  </Box>
                </Item>
              )
            })}
          </Box>
        </List>
        <Viewport />
      </Root>
    </Box>
  )
}

export default DesktopMenu
