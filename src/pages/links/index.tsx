import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaBook, FaDiscord, FaFistRaised, FaGithub, FaHome, FaInstagram, FaLinkedin, FaSpotify, FaTiktok, FaToolbox, FaTwitter, FaYoutube } from "react-icons/fa"
import {
    useToken,
} from "@chakra-ui/react"

import { BasePageProps, Lang } from "@/lib/types"

import Links from "@/components/Links"

import { existsNamespace } from "@/lib/utils/existsNamespace"
import { getLastDeployDate } from "@/lib/utils/getLastDeployDate"
import {
    getRequiredNamespacesForPage,
    isLangRightToLeft,
} from "@/lib/utils/translations"

import icon from "@/public/assets/icon-1000.png"

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

const LinksPage = ({
}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const { t } = useTranslation(["common", "page-links"])
    const { locale } = useRouter()
    const dir = isLangRightToLeft(locale as Lang) ? "rtl" : "ltr"

    const headerData = {
        metaTitle: t("page-links:page-links-meta-title"),
        title: t("common:site-title"),
        description: t("common:site-description"),
        imageSrc: icon,
        imageAlt: t("common:icon-image-alt"),
        buttonLabel: t("common:learn-more"),
        buttonTo: "https://the.x3.family",
        connectTitle: t("page-links:page-links-connect-title")
    }

    const cardBoxShadow = useToken("colors", "cardBoxShadow")

    const cardsData = [
        {
            icon: FaBook,
            title: "Understand Yourself With The Better Life Framework",
            to: "/understand-yourself/",
            boxShadow: cardBoxShadow
        },
        {
            icon: FaToolbox,
            title: "Unlock Your Potential With Personalized Programs",
            to: "/unlock-your-potential/programs",
            boxShadow: cardBoxShadow
        },
        {
            icon: FaFistRaised,
            title: "Make Positive Impact By Joining Our Team",
            to: "/make-positive-impact/collaborate",
            boxShadow: cardBoxShadow
        },
        {
            icon: FaHome,
            title: "Live With Us @ Our Family Without Borders",
            to: "https://ourfamilywithoutborders.com",
            boxShadow: cardBoxShadow
        },
    ]
    
    const socialLinksData = [
        {
            icon: FaSpotify,
            to: "https://podcasters.spotify.com/pod/show/level-up-with-us",
            ariaLabel: "Podcast",
            color: "#1DB954",
            title: "Podcast: Level Up With Us"
        },
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
            icon: FaLinkedin,
            to: "https://www.linkedin.com/company/thex3family",
            ariaLabel: "LinkedIn",
            color: "#0077B5",
            title: "Network With Us"
        },
        {
            icon: FaGithub,
            to: "https://www.github.com/thex3family",
            ariaLabel: "GitHub",
            color: "#2b3137",
            title: "Build With Us"
        },
        {
            icon: FaTwitter,
            to: "https://www.twitter.com/thex3family",
            ariaLabel: "Twitter",
            color: "#1DA1F2",
            title: "Tweet At Us"
        },
    ]


    return (
        <Links headerData={headerData} cardsData={cardsData} socialLinksData={socialLinksData} dir={dir} />
    )
}

export default LinksPage