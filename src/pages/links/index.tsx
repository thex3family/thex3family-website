import { ReactNode } from "react"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaBook, FaDiscord, FaGithub, FaHome, FaInstagram, FaTiktok, FaToolbox, FaTwitter, FaYoutube } from "react-icons/fa"
import {
    Box,
    chakra,
    Flex,
    FlexProps,
    Heading,
    HeadingProps,
    Icon,
    SimpleGrid,
    SimpleGridProps,
    Text,
    useToken,
} from "@chakra-ui/react"

import { BasePageProps, ChildOnlyProp, Lang } from "@/lib/types"

import ActionCard from "@/components/ActionCard"
import ButtonLink from "@/components/Buttons/ButtonLink"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import {
    getRequiredNamespacesForPage,
    isLangRightToLeft,
} from "@/lib/utils/translations"

import community_gathering from "@/public/community_gathering.png"
import understand_yourself from "@/public/understand_yourself.png"
import unlock_your_potential from "@/public/unlock_your_potential.png"
import { BaseLink } from "@/components/Link"

const SectionHeading = (props: HeadingProps) => (
    <Heading
        lineHeight={1.4}
        fontFamily="sans-serif"
        fontSize={{ base: "2xl", sm: "2rem" }}
        fontWeight={600}
        mb={2}
        {...props}
    />
)

const SectionDecription = (props: ChildOnlyProp) => (
    <Box mb={8} fontSize={{ base: "md", sm: "xl" }} lineHeight={1.4} {...props} />
)

const ImageContainer = (props: FlexProps & { children: ReactNode }) => (
    <Flex width="full" height="full"
        justifyContent="center" // Add this line to center the image horizontally
        alignItems="center"    // Add this line to center the image vertically
        {...props} />
)

const CardContainer = (props: {
    children: ReactNode
}) => (
    <Flex
        justifyContent={{ base: "flex-start", md: "center" }} // Start alignment on small screens, center on medium and up
        overflowX="auto" // Enable horizontal scrolling
        gap={8}
        p={4}
        width="full"
        flexWrap="nowrap" // Prevent wrapping of flex items
    >
        {props.children}
    </Flex>
);

const ContentBox = (props: ChildOnlyProp) => (
    <Box py={4} px={{ base: 4, lg: 8 }} {...props} />
)

const StyledActionCard = chakra(ActionCard, {
    baseStyle: {
        width: "100%", // Make sure the card takes the full width of the grid column
        maxWidth: "32%", // Set a fixed width for the cards
        background: "background.base",
        borderRadius: "sm",
        border: "1px",
        borderColor: "text",
        margin: 0,
        fontSize: { base: "sm", md: "md", lg: "lg", xl: "xl" },
    },
})

const GrayContainer = (props: ChildOnlyProp) => (
    <Box width="full" background="grayBackground" {...props} />
)

const MainSectionContainer = (props: {
    children: ReactNode
    containerBg: FlexProps["bg"]
    hoverBg?: FlexProps["bg"]
    href?: string;
}) => (
    <Flex
        alignItems="center"
        justifyContent="space-between"
        background={props.containerBg}
        _hover={{ bg: props.hoverBg }}
        borderBlock="1px"
        borderColor="text"
        height={100}
        py={{ base: 8, lg: 0 }}
        width="full"
        transition="background-color 0.2s" // Add transition for smooth background color change
        fontSize={{ base: "md", sm: "lg" }}
        fontWeight={500}
        as={BaseLink}// Make the Flex component behave as an anchor tag
        hideArrow
        target="_blank" // Open the link in a new tab
        style={{ color: 'inherit', textDecoration: 'none' }} // Ensures that the font color does not change
        px={12}
        {...props} // Make sure to spread the rest of the props
    >
        {props.children}
    </Flex>
);

type Props = BasePageProps & {
}

export const getStaticProps = (async ({ locale }) => {

    // load i18n required namespaces for the given page
    const requiredNamespaces = getRequiredNamespacesForPage("/links")

    // check if the translated page content file exists for locale
    const contentNotTranslated = !existsNamespace(locale!, requiredNamespaces[0])

    // load last deploy date to pass to Footer in RootLayout
    const lastDeployDate = getLastDeployDate()

    return {
        props: {
            ...(await serverSideTranslations(locale!, requiredNamespaces)),
            contentNotTranslated,
            lastDeployDate,
        },
        // revalidate: BASE_TIME_UNIT * 24,
    }
}) satisfies GetStaticProps<Props>

const HomePage = ({
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { t } = useTranslation(["common", "page-links"])
    const { locale } = useRouter()
    const dir = isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"

    const header = {
        title: t("common:site-title"),
        description: t("common:site-description"),
        image: community_gathering,
        alt: "",
        button: t("common:learn-more"),
        to: "https://the.x3.family",
    }

    const cards = [
        {
            image: understand_yourself,
            icon: FaBook,
            title: "Understand Yourself With The Better Life Framework",
            to: "/understand-yourself/",
        },
        {
            image: understand_yourself,
            icon: FaToolbox,
            title: "Unlock Your Potential With Personalized Programs",
            to: "/unlock-your-potential/",
        },
        {
            image: understand_yourself,
            icon: FaHome,
            title: "Live With Us @ Our Family Without Borders",
            to: "https://ourfamilywithoutborders.com",
        },
    ]

    const socialLinks = [
        {
            icon: FaDiscord,
            to: "https://our.x3.family/",
            ariaLabel: "Community",
            color: "#7289da",
            title: "Join The Community"
        },
        {
            icon: FaYoutube,
            to: "https://www.youtube.com/c/thex3family",
            ariaLabel: "YouTube",
            color: "#FF0000",
            title: "Watch Our Content"
        },
        {
            icon: FaInstagram,
            to: "https://www.instagram.com/thex3family",
            ariaLabel: "Instagram",
            color: "#833AB4",
            title: "A Day In Our Life"
        },
        {
            icon: FaTiktok,
            to: "https://www.tiktok.com/@thex3family",
            ariaLabel: "TikTok",
            color: "#00f2ea",
            title: "Get Quick Learnings"
        },
        {
            icon: FaGithub,
            to: "https://github.com/thex3family",
            ariaLabel: "GitHub",
            color: "#2b3137",
            title: "Build With Us"
        },
        {
            icon: FaTwitter,
            to: "https://twitter.com/thex3family",
            ariaLabel: "Twitter",
            color: "#1DA1F2",
            title: "Tweet At Us"
        },
    ]

    const cardBoxShadow = useToken("colors", "cardBoxShadow")

    return (
        <Flex
            as={MainArticle}
            flexDirection="column"
            alignItems="center"
            dir={dir}
            width="full"
            pb="60px"
        >
            <PageMetadata
                title={t("page-links:page-links-meta-title")}
                description={header.description}
            />
            <GrayContainer>
                <ContentBox>
                    <Flex
                        alignItems="center"
                        flexDirection={{ base: "column-reverse" }}
                        gap={{ base: 4 }}
                        textAlign="center"
                    >
                        <Box
                            flex="0 0 50%"
                            maxW={{ lg: "75%" }}
                            px={{ sm: 8, lg: 24 }}
                            boxSize="full"
                        >
                            <Box mb={6}>
                                <SectionHeading fontFamily="inherit">
                                    {header.title}
                                </SectionHeading>
                            </Box>
                            <SectionDecription>
                                {header.description}
                            </SectionDecription>
                            <ButtonLink to={header.to}>
                                {header.button}
                            </ButtonLink>
                        </Box>
                        <ImageContainer>
                            <Image
                                src={header.image}
                                alt={t("page-index:page-index-get-started-image-alt")}
                                height={125}
                            />
                        </ImageContainer>
                    </Flex>

                    <Text size="sm" mt={8} mb={4} fontWeight="600" textAlign="center">
                        Popular Links
                    </Text>
                    <CardContainer>
                        {cards.map((card, index) => (
                            <Flex
                                key={index}
                                borderWidth="1px"
                                borderStyle="solid"
                                borderColor="text"
                                borderRadius="base"
                                p={4}
                                flexDirection="column"
                                width="150px"
                                textAlign="center"
                                position="relative"
                                flexShrink={0}
                                as={BaseLink} // Make the Flex component behave as an anchor tag
                                hideArrow
                                target="_blank" // Open the link in a new tab
                                style={{ color: 'inherit', textDecoration: 'none' }} // Ensures that the font color does not change
                                href={card.to}
                                boxShadow={cardBoxShadow}
                                _hover={{
                                    borderRadius: "base",
                                    boxShadow: "0px 8px 17px rgba(0, 0, 0, 0.15)",
                                    transition: "transform 0.1s",
                                    transform: "scale(1.02)",
                                }}
                            >
                                <Icon as={card.icon} boxSize={4} position="absolute" top={-2} left="50%" transform="translateX(-50%)" />
                                <Text size="md" mt={3} mb={2} fontWeight="500">
                                    {card.title}
                                </Text>
                            </Flex>
                        ))}
                    </CardContainer>
                </ContentBox>
            </GrayContainer>

            <Box pb={4}>
                <SectionHeading mt={12} fontFamily="heading" textAlign="center">
                    {t("page-links:page-links-connect-title")}
                </SectionHeading>
            </Box>
            {socialLinks.map((link, index) => (
                <MainSectionContainer
                    key={index}
                    containerBg={`${link.color}1A`} // 20% opacity of the color
                    hoverBg={`${link.color}80`} // Full color on hover
                    href={link.to} // Set the destination URL
                >
                    <Icon as={link.icon} mr={2} fontSize="3xl" />{link.title}<Icon as={link.icon} ml={2} fontSize="3xl" />
                </MainSectionContainer>
            ))}
        </Flex>
    )
}

export default HomePage