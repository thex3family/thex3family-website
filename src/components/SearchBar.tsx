
import Image from 'next/image'
import { Box, useColorMode } from "@chakra-ui/react"
import { MendableSearchBar } from "@mendable/search"

import icon from "@/public/assets/icon-1000.png"

const mendableAnonKey = process.env.NEXT_PUBLIC_MENDABLE_ANON_KEY || ""

const SearchBar = ({t, variant}) => {

  const { colorMode } = useColorMode()

  const searchStyle = { darkMode: colorMode === 'dark', accentColor: "primary" }

  const searchBarStyle = variant === 'button' ? {
    backgroundColor:  colorMode === 'dark' ? '#EDBE00' : '#13AA78',
    color: colorMode === 'dark' ? '#000000' : '#ffffff',
    showShortcut: false,
  } : {}

  const placeholderText = variant === 'button' ? t("common:ask-a-question") : t("common:search-placeholder")

  const shortcutKey = variant === 'button' ? "" : "k"

  return (
    <>
      <Box>
        <MendableSearchBar
          anon_key={mendableAnonKey}
          placeholder={placeholderText}
          style={searchStyle}
          searchBarStyle={searchBarStyle}
          dialogPlaceholder={t("common:search-dialog-placeholder")}
          welcomeMessage={t("common:search-welcome-message")}
          cmdShortcutKey={shortcutKey}
          botIcon={<Image src={icon} alt={t("common:icon-image-title")} />}
        />
      </Box>
    </>
  )
}

export default SearchBar
