import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { FaGithub } from "react-icons/fa"
import { MdExpandMore } from "react-icons/md"
import {
  Box,
  Flex,
  type FlexProps,
  Icon,
  List,
  ListItem,
  SimpleGrid,
  Text,
  useToken} from "@chakra-ui/react"

import type { ChildOnlyProp, Lang } from "@/lib/types"
import type { MdPageContent, UpgradeFrontmatter } from "@/lib/interfaces"

import BasicActionCard from "@/components/ActionCard/BasicActionCard"
import FrameworkActionCard from "@/components/ActionCard/FrameworkActionCard"
import Breadcrumbs from "@/components/Breadcrumbs"
import type { List as ButtonDropdownList } from "@/components/ButtonDropdown"
import { ButtonLink } from "@/components/Buttons"
import FeedbackCard from "@/components/FeedbackCard"
import { Image } from "@/components/Image"
import JobBoard from "@/components/JobBoard"
import LeftNavBar from "@/components/LeftNavBar"
import { BaseLink } from "@/components/Link"
import {
  ContentContainer,
  MobileButton,
  MobileButtonDropdown,
  Page
} from "@/components/MdComponents"
import OldHeading from "@/components/OldHeading"

import { getEditPath } from "@/lib/utils/editPath"
import { getSummaryPoints } from "@/lib/utils/getSummaryPoints"
import { getLocaleTimestamp } from "@/lib/utils/time"

import { MAIN_CONTENT_ID } from "@/lib/constants"
import InfoBanner from "@/components/InfoBanner"

const CardGrid = (props: ChildOnlyProp) => (
  <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={8} {...props} />
)

// const Page = (props: FlexProps) => <MdPage sx={{}} {...props} />

export const Title = (props: ChildOnlyProp) => (
  <OldHeading
    as="h1"
    fontSize="2.5rem"
    fontWeight="bold"
    lineHeight={1.4}
    mt={0}
    {...props}
  />
)

export const SummaryPoint = (props: ChildOnlyProp) => (
  <ListItem color="text300" mb={0} {...props} />
)

export const Container = (props: ChildOnlyProp) => (
  <Box position="relative" w="full" {...props} />
)

export const HeroContainer = (props: ChildOnlyProp) => (
  <Flex
    justify="flex-end"
    direction={{ base: "column-reverse", lg: "row" }}
    bg="mainGradient"
    boxShadow="inset 0px -1px 0px rgba(0, 0, 0, 0.1)"
    minH="608px"
    maxH={{ base: "full", lg: "608px" }}
    w="full"
    overflow="hidden"
    {...props}
  />
)

export const MoreContent = (props: ChildOnlyProp & { to: string }) => (
  <Flex
    hideBelow="lg"
    as={BaseLink}
    bg="ednBackground"
    justify="center"
    p={4}
    w="full"
    _hover={{
      bg: "background.base",
    }}
    {...props}
  />
)

export const TitleCard = (props: ChildOnlyProp) => {
  const cardBoxShadow = useToken("colors", "cardBoxShadow")

  return (
    <Flex
      direction="column"
      justify="flex-start"
      position={{ base: "relative", lg: "absolute" }}
      bg={{ base: "ednBackground", lg: "background.base" }}
      border="1px"
      borderColor="border"
      borderRadius="sm"
      boxShadow={{ lg: cardBoxShadow }}
      maxW={{ base: "full", lg: "640px" }}
      p={8}
      top={{ lg: 24 }}
      insetInlineStart={{ lg: 24 }}
      zIndex={10}
      {...props}
    />
  )
}

export const LastUpdated = (props: ChildOnlyProp) => (
  <Text
    color="text200"
    fontStyle="italic"
    pt={4}
    mb={0}
    borderTop="1px"
    borderColor="border"
    {...props}
  />
)

// Main layout components
export const mainComponents = {
  CardGrid,
  JobBoard,
  BasicActionCard,
  FrameworkActionCard,
  InfoBanner
}

interface IProps
  extends ChildOnlyProp,
  Pick<MdPageContent, "slug" | "tocItems" | "lastUpdatedDate"> {
  frontmatter: UpgradeFrontmatter
}
export const MainLayout: React.FC<IProps> = ({
  children,
  frontmatter,
  slug,
  tocItems,
  lastUpdatedDate,
}) => {
  const { asPath: relativePath } = useRouter()
  const { t } = useTranslation("common")
  const { locale } = useRouter()

  const summaryPoints = getSummaryPoints(frontmatter)

  const absoluteEditPath = getEditPath(relativePath)

  // Assign different styling, default
  let root = "default"
  if (slug.includes("make-positive-impact")) {
    root = "make-positive-impact"
  }
  if (slug.includes("understand-yourself")) {
    root = "understand-yourself"
  }
  if (slug.includes("for")) {
    root = "for"
  }

  let dropdownLinks: ButtonDropdownList | null = null;
  if (root === "make-positive-impact") {
    dropdownLinks = {
      text: t("make-positive-impact-title"),
      ariaLabel: t("make-positive-impact-menu"),
      items: [
        {
          text: t("make-positive-impact-secondary-title"),
          to: "/make-positive-impact",
          matomo: {
            eventCategory: "make positive impact menu",
            eventAction: "click",
            eventName: "make-positive-impact",
          },
        },
        {
          text: t("contribute-title"),
          to: "/make-positive-impact/contribute/",
          matomo: {
            eventCategory: "make positive impact menu",
            eventAction: "click",
            eventName: "contribute",
          },
        },
        {
          text: t("collaborate-title"),
          to: "/make-positive-impact/collaborate/",
          matomo: {
            eventCategory: "make positive impact menu",
            eventAction: "click",
            eventName: "collaborate",
          },
        },
        {
          text: t("co-create-title"),
          to: "/make-positive-impact/co-create/",
          matomo: {
            eventCategory: "make positive impact menu",
            eventAction: "click",
            eventName: "co-create",
          },
        },
      ],
    };
  }
  if (root === "understand-yourself") {
    dropdownLinks = {
      text: t("understand-yourself-title"),
      ariaLabel: t("understand-yourself-menu"),
      items: [
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
    }
  }
  if (root === "for") {
    dropdownLinks = {
      text: t("for-title"),
      ariaLabel: t("for-menu"),
      items: [
        {
          text: t("for-title"),
          to: "/for/",
        },
      ],
    }
  }

  const lgBreakpoint = useToken("breakpoints", "lg")

  return (
    <Container>
      <HeroContainer>
        <TitleCard>
          <Breadcrumbs slug={slug} startDepth={0} mt={2} mb="8" />
          <Title>{frontmatter.title}</Title>
          <Box>
            <List listStyleType="disc">
              {summaryPoints.map((point, idx) => (
                <SummaryPoint key={idx}>{point}</SummaryPoint>
              ))}
            </List>
          </Box>
          <LastUpdated>
            {t("common:page-last-updated")}:{" "}
            {getLocaleTimestamp(locale as Lang, lastUpdatedDate!)}
          </LastUpdated>
        </TitleCard>
        {frontmatter.image && (
          <Image
            src={frontmatter.image}
            // blurDataURL={frontmatter.blurDataURL}
            alt={frontmatter.alt}
            width={816}
            height={525}
            style={{ objectFit: "cover", overflow: "visible" }}
            priority
            flex={{ base: "1 1 100%", md: "none" }}
            alignSelf={{ base: "center", md: "flex-end" }}
            maxH={{
              base: "340px",
              lg: "full",
            }}
          />
        )}
      </HeroContainer>
      <MoreContent to={"#" + MAIN_CONTENT_ID}>
        <Icon as={MdExpandMore} fontSize="2xl" color="secondary" />
      </MoreContent>
      <Page>
        {/* TODO: Switch to `above="lg"` after completion of Chakra Migration */}
        <LeftNavBar
          editPath={absoluteEditPath}
          hideBelow={lgBreakpoint}
          dropdownLinks={dropdownLinks}
          tocItems={tocItems}
          maxDepth={frontmatter.sidebarDepth!}
        />
        <ContentContainer>
          {children}
          <FeedbackCard />
        </ContentContainer>
        <MobileButton>
          <Flex align="center" gap={2} w="full">
            {dropdownLinks && <MobileButtonDropdown list={dropdownLinks} flex="1" />}
            <ButtonLink
              leftIcon={<Icon as={FaGithub} />}
              href={absoluteEditPath}
              variant="outline"
            >
              Edit
            </ButtonLink>
          </Flex>
        </MobileButton>
      </Page>
    </Container>
  )
}
