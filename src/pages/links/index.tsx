import { ReactNode } from "react"
import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import {
    Box,
    chakra,
    Flex,
    FlexProps,
    Heading,
    HeadingProps,
    Icon,
    SimpleGridProps,
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

import { FaDiscord, FaGithub, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa"

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
    minChildWidth: SimpleGridProps["minChildWidth"]
}) => (
    <Flex
        flexWrap="wrap"
        gap={8}
        p={{ lg: 4 }}
        width="full"
        sx={{
            "& > *": {
                minW: props.minChildWidth,
            },
        }}
    >
        {props.children}
    </Flex>
)

const ContentBox = (props: ChildOnlyProp) => (
    <Box py={4} px={{ base: 4, lg: 8 }} {...props} />
)

const StyledActionCard = chakra(ActionCard, {
    baseStyle: {
        background: "background.base",
        borderRadius: "sm",
        border: "1px",
        borderColor: "text",
        margin: 0,
    },
})

const GrayContainer = (props: ChildOnlyProp) => (
    <Box width="full" pb={16} background="grayBackground" {...props} />
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
        as="a" // Make the Flex component behave as an anchor tag
        target="_blank" // Open the link in a new tab
        rel="noopener noreferrer" // Security measures for opening new tabs
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
            title: t("understand-yourself-title"),
            description: t("understand-yourself-description"),
            alt: t("understand-yourself-image-alt"),
            to: "/understand-yourself/",
          },
          {
            image: unlock_your_potential,
            title: t("unlock-your-potential-title"),
            description: t("unlock-your-potential-description"),
            alt: t("unlock-your-potential-image-alt"),
            to: "/unlock-your-potential/",
          },
    ]

    const socialLinks = [
        {
            icon: FaDiscord,
            to: "https://our.x3.family/",
            ariaLabel: "Community",
            color: "#7289da",
            title: "Chat With Us In Our Community"
        },
        {
            icon: FaYoutube,
            to: "https://www.youtube.com/c/thex3family",
            ariaLabel: "YouTube",
            color: "#FF0000",
            title: "Watch Our Content On YouTube"
        },
        {
            icon: FaInstagram,
            to: "https://www.instagram.com/thex3family",
            ariaLabel: "Instagram",
            color: "#833AB4",
            title: "See Our Daily Life On Our Instagram"
        },
        {
            icon: FaTiktok,
            to: "https://www.tiktok.com/@thex3family",
            ariaLabel: "TikTok",
            color: "#00f2ea",
            title: "Get Quick Learnings On Our TikTok"
        },
        {
            icon: FaGithub,
            to: "https://github.com/thex3family",
            ariaLabel: "GitHub",
            color: "#2b3137",
            title: "Build Together With Us On Our GitHub"
        },
        {
            icon: FaTwitter,
            to: "https://twitter.com/thex3family",
            ariaLabel: "Twitter",
            color: "#1DA1F2",
            title: "Chat With Us On Our Twitter"
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
                            <ButtonLink to={header.to} variant={"secondary"}>
                                {header.button}
                            </ButtonLink>
                        </Box>
                        <ImageContainer>
                            <Image
                                src={header.image}
                                alt={t("page-index:page-index-get-started-image-alt")}
                                height={300}
                                backgroundSize="cover"
                                background="no-repeat 50px"
                            />
                        </ImageContainer>
                    </Flex>
                    <Box py={4} textAlign="center">
                    </Box>
                    <CardContainer minChildWidth={{ lg: "480px" }}>
                        {cards.map((card, idx) => (
                            <StyledActionCard
                                key={idx}
                                boxShadow={cardBoxShadow}
                                m={0}
                                title={card.title}
                                description={card.description}
                                alt={card.alt}
                                to={card.to}
                                image={card.image}
                                imageWidth={320}
                            />
                        ))}
                    </CardContainer>
                </ContentBox>


            </GrayContainer>
            {/* Banner 1 */}

            <Box pb={4}>
                <SectionHeading mt={12} fontFamily="heading" textAlign="center">
                    Let's Connect!
                </SectionHeading>
            </Box>
            {socialLinks.map((link, index) => (
                <MainSectionContainer
                    key={index}
                    containerBg={`${link.color}1A`} // 20% opacity of the color
                    hoverBg={`${link.color}80`} // Full color on hover
                    href={link.to} // Set the destination URL
                >
                    <Icon as={link.icon} mr={2} fontSize="3xl"/>{link.title}<Icon as={link.icon} ml={2} fontSize="3xl"/>
                </MainSectionContainer>
            ))}
        </Flex>
    )
}

export default HomePage