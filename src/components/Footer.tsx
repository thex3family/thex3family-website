// TODO
import React from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaDiscord,FaGithub, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa"
import {
  Box,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  SimpleGrid,
  useToken,
} from "@chakra-ui/react"

import { Lang, TranslationKey } from "@/lib/types"

import { BaseLink } from "@/components/Link"
import Translation from "@/components/Translation"

import { getLocaleTimestamp } from "@/lib/utils/time"

const socialLinks = [
  {
    icon: FaDiscord,
    to: "https://our.x3.family/",
    ariaLabel: "Community",
    color: "#7289da",
  },
  {
    icon: FaYoutube,
    to: "https://www.youtube.com/c/thex3family",
    ariaLabel: "YouTube",
    color: "#FF0000",
  },
  {
    icon: FaInstagram,
    to: "https://www.instagram.com/thex3family",
    ariaLabel: "Instagram",
    color: "#833AB4",
  },
  {
    icon: FaTiktok,
    to: "https://www.tiktok.com/@thex3family",
    ariaLabel: "TikTok",
    color: "#00f2ea",
  },
  {
    icon: FaGithub,
    to: "https://github.com/thex3family",
    ariaLabel: "GitHub",
    color: "#333",
  },
  {
    icon: FaTwitter,
    to: "https://twitter.com/thex3family",
    ariaLabel: "Twitter",
    color: "#1DA1F2",
  },
]
export interface LinkSection {
  title: TranslationKey
  links: Array<{
    to: string
    text: TranslationKey
    isPartiallyActive?: boolean
  }>
}

export interface IProps {
  lastDeployDate: string
}

const Footer: React.FC<IProps> = ({ lastDeployDate }) => {
  const { locale } = useRouter()
  const { t } = useTranslation("common")

  // TODO: check if `medBp` is being used or remove it
  const [medBp] = useToken("breakpoints", ["md"])
  const linkSections: Array<LinkSection> = [
    {
      title: t("understand-yourself-title"),
      links: [
        {
          text: t("better-life-framework-title"),
          to: "/understand-yourself/",
        },
        {
          text: t("understand-the-framework-title"),
          to: "/understand-yourself/understand-the-framework/",
        },
        {
          text: t("the-4a-model-title"),
          to: "/understand-yourself/the-4a-model/",
        },
        {
          text: t("test-your-understanding-title"),
          to: "/understand-yourself/quizzes/",
        }
      ],
    },
    {
      title: t("programs-title"),
      links: [
        {
          text: t("for-secondary-title"),
          to: "/for/",
        },
        {
          text: t("unlock-your-potential-secondary-title"),
          to: "/unlock-your-potential/",
        },
        {
          text: t("knowledge-title"),
          to: "/unlock-your-potential/programs?filters=knowledge",
        },
        {
          text: t("tools-title"),
          to: "/unlock-your-potential/programs?filters=tools",
        },
        {
          text: t("community-title"),
          to: "/unlock-your-potential/programs?filters=community",
        },
        {
          text: t("docs-title"),
          to: "/unlock-your-potential/docs/",
        },
      ],
    },
    {
      title: t("about-us-title"),
      links: [
        {
          text: t("make-positive-impact-secondary-title"),
          to: "/make-positive-impact/",
        },
        {
          text: t("contribute-title"),
          to: "/make-positive-impact/contribute/",
        },
        {
          text: t("collaborate-title"),
          to: "/make-positive-impact/collaborate/",
        },
        {
          text: t("co-create-title"),
          to: "/make-positive-impact/co-create/",
        },
        {
          text: t("about-us-title"),
          to: "/live-your-best-life/about-us/",
        },
      ],
    },
    {
      title: t("popular-pages-title"),
      links: [
        {
          text: t("subscription-title"),
          to: "/make-positive-impact/contribute/subscription",
        },
        {
          text: t("donate-title"),
          to: "/make-positive-impact/contribute/donate",
        },
      ],
    },
    {
      title: t("info-title"),
      links: [
        {
          to: "/glossary/",
          text: t("glossary-title"),
        },
        {
          to: "/languages/",
          text: t("languages-title"),
        },
        {
          to: "/visual-identity/",
          text: t("visual-identity-title"),
        },
        {
          to: "/privacy-policy/",
          text: t("privacy-policy-title"),
        },
        {
          to: "/terms-of-use/",
          text: t("terms-of-use-title"),
        },
        {
          to: "/cookie-policy/",
          text: t("cookie-policy-title"),
        },
        {
          to: "mailto:support@co-x3.com",
          text: t("contact-title"),
        },
      ],
    },
  ]

  return (
    <Box as="footer" p="1rem 2rem">
      <Flex
        fontSize="sm"
        justify="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Box color="text200">
          <Translation id="website-last-updated" />:{" "}
          {getLocaleTimestamp(locale as Lang, lastDeployDate!)}
        </Box>
        <Box my={4}>
          {socialLinks.map((link, idk) => {
            return (
              <BaseLink
                key={idk}
                to={link.to}
                hideArrow
                color="secondary"
                aria-label={link.ariaLabel}
              >
                <Icon
                  as={link.icon}
                  _hover={{
                    color: link.color,
                    transition:
                      "color 0.2s ease-in-out, transform 0.2s ease-in-out",
                  }}
                  fontSize="4xl"
                  ms={4}
                />
              </BaseLink>
            )
          })}
        </Box>
      </Flex>
      <SimpleGrid
        gap={4}
        justifyContent="space-between"
        templateColumns={{
          base: "auto",
          sm: "repeat(2, auto)",
          md: "repeat(3, auto)",
          xl: "repeat(6, auto)",
        }}
      >
        {linkSections.map((section: LinkSection, idx) => (
          <Box key={idx}>
            <Heading as="h3" fontSize="sm" lineHeight="1.6" my="1.14em">
              <Translation id={section.title} />
            </Heading>
            <List fontSize="sm" lineHeight="1.6" fontWeight="400" m={0}>
              {section.links.map((link, linkIdx) => (
                <ListItem key={linkIdx} mb={4}>
                  <BaseLink
                    to={link.to}
                    isPartiallyActive={false}
                    textDecor="none"
                    color="text200"
                    fontWeight="normal"
                    _hover={{
                      textDecor: "none",
                      color: "primary.base",
                      _after: {
                        color: "primary.base",
                      },
                      "& svg": {
                        fill: "primary.base",
                      },
                    }}
                    sx={{
                      "& svg": {
                        fill: "text200",
                      },
                    }}
                  >
                    {link.text}
                  </BaseLink>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Footer
