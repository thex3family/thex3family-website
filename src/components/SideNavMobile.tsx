import React, { ReactNode, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslation } from "next-i18next"
import { MdExpandMore } from "react-icons/md"
import { Box, Center, HStack, Icon } from "@chakra-ui/react"

import { BaseLink, LinkProps } from "@/components/Link"

import docLinks from "@/data/docs-links.yaml"

import {
  dropdownIconContainerVariant,
  IPropsNavLink as INavLinkProps,
} from "./SideNav"

const innerLinksVariants = {
  open: {
    opacity: 1,
    display: "block",
  },
  closed: {
    opacity: 0,
    display: "none",
  },
}

const LinkContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <HStack
      w="full"
      justify="space-between"
      py={2}
      pe={8}
      ps={2}
      _hover={{
        bgColor: "ednBackground",
      }}
    >
      {children}
    </HStack>
  )
}

const SideNavLink = ({ children, ...props }: LinkProps) => {
  return (
    <BaseLink
      w="full"
      textDecoration="none"
      color="text"
      _hover={{
        textDecoration: "none",
        color: "primary.base",
      }}
      _active={{
        color: "primary.base",
      }}
      {...props}
    >
      {children}
    </BaseLink>
  )
}

export interface IPropsNavLink extends INavLinkProps {
  closeSideNavMobile: () => void
}

const NavLink: React.FC<IPropsNavLink> = ({ item, path, closeSideNavMobile, isTopLevel }) => {
  const { t } = useTranslation("page-docs")
  const basePath = "/unlock-your-potential/principles/";
  const baseTranslation = "page-docs:page-docs-nav-";

  if (!item.to) {
    item.to = basePath + item.id;
  }
  item.title = t(baseTranslation + item.id + "-title");
  item.description = t(baseTranslation + item.id + "-description");

  const isLinkInPath =
    isTopLevel || path.includes(item.to) || path.includes(item.path)
  const [isOpen, setIsOpen] = useState<boolean>(isLinkInPath)

  useEffect(() => {
    // Only set on items that contain a link
    // Otherwise items w/ `path` would re-open every path change
    if (item.to) {
      const shouldOpen = path.includes(item.to) || path.includes(item.path)
      setIsOpen(shouldOpen)
    }
  }, [path, item.path, item.to])

  if (item.items) {
    return (
      <Box>
        <LinkContainer>
          {/* {item.to && (
            <SideNavLink to={item.to} isPartiallyActive={false}>
              {t(item.id)}
            </SideNavLink>
          )} */}
          <Box w="full" cursor="pointer" onClick={() => setIsOpen(!isOpen)}>
            {t(item.title)}
          </Box>
          <Box
            as={motion.div}
            cursor="pointer"
            onClick={() => setIsOpen(!isOpen)}
            variants={dropdownIconContainerVariant}
            animate={isOpen ? "open" : "closed"}
          >
            <Icon as={MdExpandMore} boxSize={6} color="secondary" />
          </Box>
        </LinkContainer>
        <Box
          as={motion.div}
          fontSize="sm"
          lineHeight="tall"
          fontWeight="normal"
          ps={4}
          key={item.id}
          animate={isOpen ? "open" : "closed"}
          variants={innerLinksVariants}
          initial="closed"
        >
          {item.items.map((childItem, idx) => (
            <NavLink item={childItem} path={path} key={idx} closeSideNavMobile={closeSideNavMobile} />
          ))}
        </Box>
      </Box>
    )
  }
  return (
    <Box onClick={closeSideNavMobile}>
      <LinkContainer>
        <SideNavLink to={item.to} isPartiallyActive={false}>
          {item.title}
        </SideNavLink>
      </LinkContainer>
    </Box>
  )
}

export interface IProps {
  path: string
}

// TODO consolidate into SideNav
const SideNavMobile: React.FC<IProps> = ({ path }) => {
  const { t } = useTranslation("page-docs")

  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Box
      position="sticky"
      zIndex={2}
      top="75px"
      bgColor="ednBackground"
      height="auto"
      w="full"
      display={{ base: "block", lg: "none" }}
    >
      <Center
        as={motion.div}
        fontWeight="medium"
        color="primary.base"
        cursor="pointer"
        py={4}
        px={8}
        boxSizing="border-box"
        bg="ednBackground"
        borderBottom="1px solid"
        borderBottomColor="border"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Box me={2}>Navigation</Box>
        <Box
          as={motion.div}
          cursor="pointer"
          variants={dropdownIconContainerVariant}
          animate={isOpen ? "open" : "closed"}
        >
          <Icon as={MdExpandMore} boxSize={6} color="secondary" />
        </Box>
      </Center>
      <AnimatePresence>
        {isOpen && (
          <Box
            as={motion.nav}
            h="auto"
            maxH="calc(100vh - 139px)" // full height minus primary nav
            overflowY="scroll"
            overflowX="hidden"
            borderBottom="1px solid"
            borderBottomColor="border"
            p={2}
            key="nav"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              display: "block",
              transition: {
                duration: 1,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.4,
              },
            }}
          >
            {docLinks.map((item, idx) => (
              <NavLink
                item={item}
                path={path}
                key={idx}
                closeSideNavMobile={() =>
                  setIsOpen(false)
                }
                isTopLevel
              />
            ))}
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default SideNavMobile
