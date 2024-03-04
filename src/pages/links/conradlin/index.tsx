import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaBook, FaBookOpen, FaInstagram, FaLightbulb, FaLinkedin, FaRocket, FaTiktok, FaYoutube } from "react-icons/fa"
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

import conrad from "@/public/team/conrad.png"

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
        title: "Conrad Lin",
        description: "I Help People Level Up | Author Of The Better Life Framework • Founder Of The Co-x3 Family Foundation",
        imageSrc: conrad,
        imageAlt: t("common:icon-image-alt"),
        buttonLabel: t("common:learn-more"),
        buttonTo: "https://conradlin.com",
        connectTitle: "🔻 See What I'm Up To 🔻"
    }

    const cardBoxShadow = useToken("colors", "cardBoxShadow")

    const cardsData = [
        {
            icon: FaLightbulb,
            title: "Sign Up For A FREE Consulting Session",
            to: "https://levelupwithconrad.com",
            boxShadow: cardBoxShadow
        },
        {
            icon: FaBook,
            title: "Understand Yourself With My Book (Free Preview!)",
            to: "/understand-yourself/",
            boxShadow: cardBoxShadow
        },
        {
            icon: FaRocket,
            title: "Join Me In Making Positive Impact",
            to: "/make-positive-impact/",
            boxShadow: cardBoxShadow
        },
    ]
    
    const socialLinksData = [
        {
            icon: FaYoutube,
            to: "https://www.youtube.com/playlist?list=PLgDMbYMf0e_qpWHJlpGW6fYI5cYHNK5Ty",
            ariaLabel: "YouTube",
            color: "#FF0000",
            title: "Weekly Podcast: Level Up With Conrad"
        },
        {
            icon: FaYoutube,
            to: "https://www.youtube.com/playlist?list=PLgDMbYMf0e_oMFRliRwjlXHcD7YCkO6NE",
            ariaLabel: "YouTube",
            color: "#FF0000",
            title: "How I'm Living My Best Life Every Day"
        },
        {
            icon: FaYoutube,
            to: "https://www.youtube.com/@conradlin",
            ariaLabel: "YouTube",
            color: "#FF0000",
            title: "Watch All My Content"
        },
        {
            icon: FaInstagram,
            to: "https://www.instagram.com/levelupwithconrad",
            ariaLabel: "Instagram",
            color: "#833AB4",
            title: "Clips and Daily Life"
        },
        {
            icon: FaTiktok,
            to: "https://www.tiktok.com/@conradlin",
            ariaLabel: "TikTok",
            color: "#00f2ea",
            title: "Clips From My Content"
        },
        {
            icon: FaLinkedin,
            to: "https://www.linkedin.com/in/conradlin/",
            ariaLabel: "LinkedIn",
            color: "#0077B5",
            title: "My Professional Network"
        },
        {
            icon: FaBookOpen,
            to: "https://www.conradlin.com/blog",
            ariaLabel: "Instagram",
            color: "#000000",
            title: "My Personal Blog"
        },
    ]


    return (
        <Links headerData={headerData} cardsData={cardsData} socialLinksData={socialLinksData} dir={dir} />
    )
}

export default LinksPage