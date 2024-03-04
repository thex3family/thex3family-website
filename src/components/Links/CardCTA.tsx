import { Flex, Icon, Text } from "@chakra-ui/react";
import { BaseLink } from "@/components/Link"
import { IconType } from "react-icons";

type CardProps = {
  icon: IconType;
  title: string;
  to: string;
  boxShadow: string;
};

export const Card = ({ icon, title, to, boxShadow }: CardProps) => (
  <Flex
    borderWidth="1px"
    borderStyle="solid"
    borderColor="text"
    borderRadius="base"
    p={4}
    flexDirection="column"
    width="150px"
    textAlign="center"
    position="relative"
    flexShrink={0}
    as={BaseLink}
    hideArrow
    target="_blank"
    style={{ color: 'inherit', textDecoration: 'none' }}
    href={to}
    boxShadow={boxShadow}
    _hover={{
      borderRadius: "base",
      boxShadow: "0px 8px 17px rgba(0, 0, 0, 0.15)",
      transition: "transform 0.1s",
      transform: "scale(1.02)",
    }}
  >
    <Icon as={icon} boxSize={4} position="absolute" top={-2} left="50%" transform="translateX(-50%)" />
    <Text size="md" mt={3} mb={2} fontWeight="500">
      {title}
    </Text>
  </Flex>
);