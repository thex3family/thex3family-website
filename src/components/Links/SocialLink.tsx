import {
    Flex,
    FlexProps,
    Icon,
} from "@chakra-ui/react"
import { IconType } from "react-icons";
import { ReactNode } from "react"
import { BaseLink } from "@/components/Link"

type SocialLinkProps = {
  icon: IconType;
  to: string;
  color: string;
  title: string;
};


const MainSectionContainer = (props: {
    children: ReactNode
    staticBg?: FlexProps["bg"]
    hoverBg?: FlexProps["bg"]
    href?: string;
}) => (
    <Flex
        alignItems="center"
        justifyContent="space-between"
        background={props.staticBg}
        _hover={{ bg: props.hoverBg }}
        borderBlock="1px"
        borderColor="text"
        height={100}
        py={{ base: 8, lg: 0 }}
        width="full"
        transition="background-color 0.2s" // Add transition for smooth background color change
        fontSize={{ base: "md", sm: "lg" }}
        fontWeight={500}
        as={BaseLink} // Make the Flex component behave as an anchor tag
        hideArrow
        target="_blank" // Open the link in a new tab
        style={{ color: 'inherit', textDecoration: 'none' }} // Ensures that the font color does not change
        px={12}
        {...props} // Make sure to spread the rest of the props
    >
        {props.children}
    </Flex>
);

export const SocialLink = ({ icon, to, color, title }: SocialLinkProps) => (
  <MainSectionContainer
    staticBg={`${color}1A`} // 20% opacity of the color
    hoverBg={`${color}80`} // Full color on hover
    href={to} // Set the destination URL
  >
    <Icon as={icon} mr={2} fontSize="3xl" />{title}<Icon as={icon} ml={2} fontSize="3xl" />
  </MainSectionContainer>
);