import NextLink from "next/link"
import { useTranslation } from "next-i18next"
import { MdCheck } from "react-icons/md"
import {
  Box,
  Flex,
  Icon,
  Input,
  List,
  ListItem,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { localizePath } from "@/lib/utils/url"

import { rememberLocale, useLanguagePicker } from "./useLanguagePicker"

type LanguageListProps = {
  /** Called after a language is chosen, e.g. to close the popover or drawer */
  onSelect?: () => void
  /** Analytics label for where the list is shown */
  source: "desktop" | "mobile"
}

/**
 * Filter box plus one link per supported language. Each link keeps the reader
 * on the same page in the chosen language and remembers the choice.
 */
const LanguageList = ({ onSelect, source }: LanguageListProps) => {
  const { t } = useTranslation("common")
  const { asPath, locale, options, filteredOptions, filter, setFilter } =
    useLanguagePicker()

  return (
    <Flex direction="column" gap={2}>
      <Box px={2} pt={2}>
        <Text
          as="label"
          htmlFor={`language-filter-${source}`}
          fontSize="xs"
          color="body.medium"
        >
          {t("nav-language-filter-count", { count: options.length })}
        </Text>
        <Input
          id={`language-filter-${source}`}
          size="sm"
          mt={1}
          placeholder={t("nav-language-filter")}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          autoComplete="off"
        />
      </Box>
      <List m={0} p={1} maxH="xs" overflowY="auto">
        {filteredOptions.map(({ code, localName, displayName, isCurrent }) => (
          <ListItem key={code} m={0}>
            <Flex
              as={NextLink}
              href={localizePath(asPath, code)}
              locale={false}
              lang={code}
              hrefLang={code}
              aria-current={isCurrent ? "true" : undefined}
              align="center"
              justify="space-between"
              gap={3}
              px={3}
              py={2}
              borderRadius="base"
              textDecoration="none"
              color={isCurrent ? "primary.highContrast" : "body.base"}
              bg={isCurrent ? "background.highlight" : "transparent"}
              _hover={{
                bg: "background.highlight",
                color: "primary.highContrast",
              }}
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "primary.highContrast",
                outlineOffset: "-2px",
              }}
              onClick={() => {
                rememberLocale(code)
                trackCustomEvent({
                  eventCategory: "Language picker",
                  eventAction: `${source} - ${locale}`,
                  eventName: code,
                })
                onSelect?.()
              }}
            >
              <Box>
                <Text
                  as="span"
                  display="block"
                  fontWeight="bold"
                  lineHeight="short"
                >
                  {localName}
                </Text>
                <Text
                  as="span"
                  display="block"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="wide"
                  color="body.medium"
                  lang={locale}
                >
                  {displayName}
                </Text>
              </Box>
              {isCurrent && (
                <>
                  <Icon as={MdCheck} boxSize={5} aria-hidden />
                  <VisuallyHidden>{t("nav-language-current")}</VisuallyHidden>
                </>
              )}
            </Flex>
          </ListItem>
        ))}
        {filteredOptions.length === 0 && (
          <ListItem m={0} px={3} py={2} color="body.medium" fontSize="sm">
            {t("nav-language-no-results")}
          </ListItem>
        )}
      </List>
      <Box borderTop="1px" borderColor="body.light" px={3} py={2}>
        <Box
          as={NextLink}
          href={localizePath("/languages", locale)}
          locale={false}
          fontSize="sm"
          color="primary.highContrast"
          onClick={() => onSelect?.()}
        >
          {t("nav-language-all")}
        </Box>
      </Box>
    </Flex>
  )
}

export default LanguageList
