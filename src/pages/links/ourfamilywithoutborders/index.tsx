import type { GetStaticProps, InferGetStaticPropsType } from "next"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaBed, FaBook, FaBookOpen, FaHome, FaInfo, FaInstagram, FaLightbulb, FaLinkedin, FaQuestion, FaRocket, FaSpotify, FaTiktok, FaYoutube } from "react-icons/fa"
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

import picture from "@/public/links/ourfamilywithoutborders.png"

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
        title: "Our Family Without Borders",
        description: "Grow, learn, live with amazing people around the world. A co-living and co-working experience by The Co-x3 Family Foundation.",
        customDescription: (
            <>
                Grow, learn, live with amazing people around the world. A co-living and co-working experience by The Co-x3 Family Foundation.
            </>
        ),
        imageSrc: picture,
        imageAlt: t("common:icon-image-alt"),
        buttonLabel: t("common:learn-more"),
        buttonTo: "https://ourfamilywithoutborders.com",
        connectTitle: t("page-links:page-links-connect-title")
    }

    const cardBoxShadow = useToken("colors", "cardBoxShadow")

    const cardsData = [
        {
            icon: FaHome,
            title: "See Our Homes Around The World",
            to: "https://www.ourfamilywithoutborders.com/homes",
            boxShadow: cardBoxShadow
        },
        {
            icon: FaBed,
            title: "Find An Available Room",
            to: "https://www.ourfamilywithoutborders.com/rooms",
            boxShadow: cardBoxShadow
        },
        {
            icon: FaInfo,
            title: "About Our Family Without Borders",
            to: "https://www.ourfamilywithoutborders.com/about",
            boxShadow: cardBoxShadow
        },
        {
            icon: FaQuestion,
            title: "Frequently Asked Questions",
            to: "https://www.ourfamilywithoutborders.com/faqs",
            boxShadow: cardBoxShadow
        },
    ]
    
    const socialLinksData = [
        {
            icon: FaInstagram,
            to: "https://www.instagram.com/ourfamilywithoutborders",
            ariaLabel: "Instagram",
            color: "#833AB4",
            title: "Instagram"
        },
        {
            icon: FaBook,
            to: "https://www.xiaohongshu.com/user/profile/68c3a550000000001901ebaf",
            ariaLabel: "Xiaohongshu",
            color: "#FF0000",
            title: "Xiaohongshu"
        },
        {
            icon: FaTiktok,
            to: "https://www.tiktok.com/@ourfamilywithoutborders",
            ariaLabel: "TikTok",
            color: "#00f2ea",
            title: "TikTok"
        },
        {
            icon: FaLinkedin,
            to: "https://www.linkedin.com/company/ourfamilywithoutborders/",
            ariaLabel: "LinkedIn",
            color: "#0077B5",
            title: "LinkedIn"
        },
        {
            icon: FaBookOpen,
            to: "https://www.ourfamilywithoutborders.com/blog",
            ariaLabel: "Blog",
            color: "#000000",
            title: "Blog"
        },
    ]


    return (
        <Links headerData={headerData} cardsData={cardsData} socialLinksData={socialLinksData} dir={dir} />
    )
}

export default LinksPage