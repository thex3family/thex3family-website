import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { MdTranslate } from "react-icons/md"
import {
  Button,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  useDisclosure,
} from "@chakra-ui/react"

import LanguageList from "./LanguageList"

/** Nav-bar language button that opens the filterable language list */
const LanguagePicker = () => {
  const { t } = useTranslation("common")
  const { locale } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom-end"
      isLazy
      lazyBehavior="unmount"
    >
      <PopoverTrigger>
        <Button
          variant="ghost"
          leftIcon={<Icon as={MdTranslate} boxSize={5} />}
          px={2}
          fontWeight="normal"
          color={isOpen ? "primary.highContrast" : "body.base"}
          bg={isOpen ? "primary.lowContrast" : "transparent"}
          _hover={{ color: "primary.base" }}
        >
          {t("languages-title")} {locale!.toUpperCase()}
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent
          w="xs"
          bg="background.base"
          borderColor="body.light"
          boxShadow="lg"
          zIndex="popover"
        >
          <PopoverBody p={1}>
            <LanguageList source="desktop" onSelect={onClose} />
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default LanguagePicker
