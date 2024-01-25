import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { Badge, Box, Flex, HStack, Text } from "@chakra-ui/react"

import type { Lang, TranslationKey } from "@/lib/types"
import { TutorialFrontmatter } from "@/lib/interfaces"

import CopyToClipboard from "@/components/CopyToClipboard"
import Emoji from "@/components/Emoji"
import InlineLink from "@/components/Link"
import Translation from "@/components/Translation"
import TutorialTags from "@/components/TutorialTags"

import { getLocaleTimestamp } from "@/lib/utils/time"

export type TutorialMetadataProps = {
  frontmatter: TutorialFrontmatter
  timeToRead: number
}

export enum Skill {
  LEVEL_1 = "1",
  LEVEL_2 = "2",
  LEVEL_3 = "3",
  LEVEL_4 = "4",
  LEVEL_5 = "5",
  LEVEL_6 = "6",
  LEVEL_7 = "7",
  LEVEL_8 = "8",
  LEVEL_9 = "9",
}

export const getSkillTranslationId = (skill: Skill): TranslationKey =>
  `page-understand-the-framework:page-understand-the-framework-level-${
    Skill[skill.toUpperCase() as keyof typeof Skill]+'-title'
  }`

const TutorialMetadata = ({
  frontmatter,
  timeToRead,
}: TutorialMetadataProps) => {
  const { locale } = useRouter()
  const { t } = useTranslation("page-programs")

  const hasSource = frontmatter.source && frontmatter.sourceUrl
  const published = frontmatter.published
  const author = frontmatter.author
  const address = frontmatter.address

  return (
    <Flex
      flexDirection="column"
      justifyContent="space-between"
      borderBottomWidth={{ base: 0, lg: "1px" }}
      borderBottomColor="border"
    >
      <Flex justifyContent="space-between" alignItems="center" w="full" mb={8}>
        <Flex flexWrap="wrap" w="full">
          <TutorialTags tags={frontmatter.tags} />
        </Flex>
        <Flex
          as={Badge}
          variant="secondary"
          alignSelf="flex-start"
          mb={2}
          whiteSpace="nowrap"
        >
          {t(getSkillTranslationId(frontmatter.frameworkLevel as Skill))}
        </Flex>
      </Flex>
      <HStack
        mb={6}
        flexWrap="wrap"
        mt={-4}
        fontSize="sm"
        color="text300"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={4}
      >
        {author && (
          <Box>
            <Emoji fontSize="sm" me={2} text=":writing_hand:" />
            {author}
          </Box>
        )}
        {hasSource && (
          <Box>
            <Emoji fontSize="sm" me={2} text=":books:" />
            <InlineLink to={frontmatter.sourceUrl}>
              {frontmatter.source}
            </InlineLink>
          </Box>
        )}
        {published && (
          <Box>
            <Emoji fontSize="sm" me={2} text=":calendar:" />{" "}
            {getLocaleTimestamp(locale! as Lang, published)}
          </Box>
        )}
        <Box>
          <Emoji fontSize="sm" me={2} text=":stopwatch:" />
          {timeToRead} {t("comp-programs-metadata-minute-read")}
        </Box>
      </HStack>
      <HStack
        mb={6}
        flexWrap="wrap"
        mt={-4}
        fontSize="sm"
        color="text300"
        justifyContent="flex-start"
      >
        {address && (
          <Flex flexWrap="wrap" w="full" me={4}>
            <CopyToClipboard text={address}>
              {(isCopied) => (
                <Box
                  color="primary.base"
                  cursor="pointer"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  fontFamily="monospace"
                  bg="ednBackground"
                  px={1}
                  fontSize="sm"
                  _hover={{
                    bg: "primary100",
                  }}
                >
                  <Text
                    as={Translation}
                    textTransform="uppercase"
                    id="comp-programs-metadata-tip-author"
                  />{" "}
                  {address} {isCopied && <Translation id="copied" />}
                  {isCopied && (
                    <Emoji fontSize="sm" mx={2} text=":white_check_mark:" />
                  )}
                </Box>
              )}
            </CopyToClipboard>
          </Flex>
        )}
      </HStack>
    </Flex>
  )
}

export default TutorialMetadata
