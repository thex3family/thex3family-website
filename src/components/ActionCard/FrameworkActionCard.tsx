import {
  Center,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
} from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"
import { Image } from "@/components/Image"

import understand_yourself from "@/public/understand_yourself.png"
import understand_the_framework from "@/public/understand_the_framework.png"
import unlock_your_potential from "@/public/unlock_your_potential.png"
import make_positive_impact from "@/public/make_positive_impact.png"

interface IProps {
  to: string
  alt: string
  image: string
  title: string
  description: string
  buttonText: string
}

const FrameworkActionCard: React.FC<IProps> = ({
  to,
  alt,
  image,
  title,
  description,
  buttonText,
}) => {
  const images = {
    understand_yourself,
    understand_the_framework,
    unlock_your_potential,
    make_positive_impact,
  }
  const imgSrc = images[image] ?? images.understand_yourself

  return (
    <LinkBox
      as={Flex}
      direction="column"
      border="1px solid"
      borderColor="lightBorder"
    >
      <Center background="mainGradient" h="260px">
        <Image src={imgSrc} alt={alt} style={{ objectFit: "contain" }} />
      </Center>
      <Flex p={6} flex="1" flexDir="column" justify="space-between" gap={4}>
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Text flex="1">{description}</Text>
        <LinkOverlay as={ButtonLink} href={to}>
          {buttonText}
        </LinkOverlay>
      </Flex>
    </LinkBox>
  )
}

export default FrameworkActionCard
