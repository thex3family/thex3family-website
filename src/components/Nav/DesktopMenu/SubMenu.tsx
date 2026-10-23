import NextLink from "next/link"
import { useRouter } from "next/router"
import { MdChevronRight } from "react-icons/md"
import { Box, Grid, Icon, type SystemStyleObject } from "@chakra-ui/react"
import {
  Content,
  Item,
  Link as NavigationMenuLink,
  List,
  Sub,
  Trigger,
  Viewport,
} from "@radix-ui/react-navigation-menu"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { isHrefActive, localizePath } from "@/lib/utils/url"

import type { Level, NavItem } from "../types"

import ItemContent from "./ItemContent"

// Each level sits on a slightly darker surface so the open path reads as a trail
const LEVEL_STYLES: Record<
  Level,
  { columns: string; bg: string; hoverBg: string }
> = {
  1: {
    columns: "repeat(3, 1fr)",
    bg: "background.base",
    hoverBg: "background.highlight",
  },
  2: { columns: "1fr", bg: "background.highlight", hoverBg: "background.base" },
}

const entryStyles = (hoverBg: string): SystemStyleObject => ({
  display: "flex",
  alignItems: "center",
  gap: 2,
  w: "full",
  p: 4,
  borderRadius: "md",
  color: "body.base",
  textDecoration: "none",
  textAlign: "start",
  bg: "transparent",
  cursor: "pointer",
  _hover: {
    bg: hoverBg,
    color: "primary.highContrast",
    textDecoration: "none",
    ".nav-item-description": { color: "primary.highContrast" },
  },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "primary.highContrast",
    outlineOffset: "-2px",
  },
  "&[data-active=true], &[data-state=open]": {
    bg: hoverBg,
    color: "primary.highContrast",
    ".nav-item-description": { color: "primary.highContrast" },
  },
})

type SubMenuProps = {
  lvl: Level
  items: NavItem[]
  /** English section key, for analytics */
  sectionKey: string
}

/**
 * The panel under a top-level section. Links render as rows with a
 * description; a group opens its own list in the columns to the right.
 */
const SubMenu = ({ lvl, items, sectionKey }: SubMenuProps) => {
  const { asPath, locale } = useRouter()
  const { columns, bg, hoverBg } = LEVEL_STYLES[lvl]

  // Open the first group by default so the panel never shows an empty half
  const firstGroup = items.find((item) => item.items)

  return (
    <Sub orientation="vertical" defaultValue={firstGroup?.label} asChild>
      <Grid templateColumns={columns} h="full" bg={bg}>
        <List asChild>
          <Box as="ul" listStyleType="none" m={0} p={2}>
            {items.map((item) => {
              if (item.href !== undefined) {
                const isActive = isHrefActive(
                  item.href,
                  asPath.split(/[?#]/)[0],
                  item.isPartiallyActive ?? true
                )
                return (
                  <Item key={item.label} value={item.label} asChild>
                    <Box as="li" mb={1} _last={{ mb: 0 }}>
                      <NavigationMenuLink asChild active={isActive}>
                        <Box
                          as={NextLink}
                          href={localizePath(item.href, locale)}
                          locale={false}
                          data-active={isActive}
                          aria-current={isActive ? "page" : undefined}
                          sx={entryStyles(hoverBg)}
                          onClick={() =>
                            trackCustomEvent({
                              eventCategory: "Desktop navigation menu",
                              eventAction: `Menu - ${sectionKey} - ${locale}`,
                              eventName: item.href!,
                            })
                          }
                        >
                          <ItemContent item={item} />
                        </Box>
                      </NavigationMenuLink>
                    </Box>
                  </Item>
                )
              }

              return (
                <Item key={item.label} value={item.label} asChild>
                  <Box as="li" mb={1} _last={{ mb: 0 }}>
                    <Trigger asChild>
                      <Box as="button" type="button" sx={entryStyles(hoverBg)}>
                        <ItemContent item={item} />
                        <Icon
                          as={MdChevronRight}
                          boxSize={6}
                          flexShrink={0}
                          sx={{ "[dir=rtl] &": { transform: "scaleX(-1)" } }}
                        />
                      </Box>
                    </Trigger>
                    <Content asChild>
                      <Box h="full">
                        <SubMenu
                          lvl={(lvl + 1) as Level}
                          items={item.items}
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
        {lvl === 1 && <Viewport style={{ gridColumn: "2 / 4" }} />}
      </Grid>
    </Sub>
  )
}

export default SubMenu
