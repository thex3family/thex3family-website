import { useTranslation } from "next-i18next"
import { useColorModeValue } from "@chakra-ui/react"

import { Image } from "@/components/Image"

import darkImage from "@/public/assets/main-logo(black).png"
import lightImage from "@/public/assets/main-logo(white).png"

const Logo = () => {
  const { t } = useTranslation("common")
  const image = useColorModeValue(darkImage, lightImage)

  return (
    <Image src={image} h={100} w="auto" alt={t("logo")} />
  )
}

export default Logo
