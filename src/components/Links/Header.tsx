import { ReactNode } from "react"
import ButtonLink from "@/components/Buttons/ButtonLink"
import { Image } from "@/components/Image"
import { ChildOnlyProp } from "@/lib/types"
import {
    Box,
    Flex,
    FlexProps,
    Heading,
    HeadingProps,
} from "@chakra-ui/react"

import { StaticImageData } from "next/image"

type HeaderProps = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonTo: string;
  imageSrc: StaticImageData;
  imageAlt: string;
};

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
        justifyContent="center"
        alignItems="center"
        {...props} />
)

export const Header = ({ title, description, buttonLabel, buttonTo, imageSrc, imageAlt }: HeaderProps) => (
  <Flex alignItems="center" flexDirection={{ base: "column-reverse" }} gap={{ base: 4 }} textAlign="center">
    <Box flex="0 0 50%" boxSize="full">
      <Box mb={6}>
        <SectionHeading fontFamily="inherit">{title}</SectionHeading>
      </Box>
      <SectionDecription>{description}</SectionDecription>
      <ButtonLink to={buttonTo}>{buttonLabel}</ButtonLink>
    </Box>
    <ImageContainer>
      <Image src={imageSrc} alt={imageAlt} height={100} />
    </ImageContainer>
  </Flex>
);