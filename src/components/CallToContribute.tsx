import React, { ReactNode } from "react"
import { FaGithub } from "react-icons/fa"
import { Flex, FlexProps, Icon, useToken } from "@chakra-ui/react"

import { ButtonLink } from "./Buttons"
import InlineLink from "./Link"
import OldHeading from "./OldHeading"
import Text from "./OldText"
import Translation from "./Translation"

export interface IProps {
  editPath: string
}

export type ChildOnlyType = {
  children: ReactNode
}

const ContentColumn = (props: {
  children: ReactNode
  hideBelow?: FlexProps["hideBelow"]
}) => (
  <Flex
    direction="column"
    flexGrow={1}
    flexShrink={1}
    flexBasis="50%"
    p={4}
    color="text"
    textAlign={{ base: "start" }}
    {...props}
  />
)

const DescriptionParagraph = ({ children }: ChildOnlyType) => (
  <Text lineHeight="140%" color="text" fontFamily="monospace">
    {children}
  </Text>
)

const CallToContribute: React.FC<IProps> = ({ editPath }) => {
  /**
   * TODO: After completion of the UI migration,
   * Remove this and pass the token value directly
   * into the `hideBelow` prop
   */
  const largeBp = useToken("breakpoints", "lg")

  return (
    <Flex
      as="aside"
      bg="ednBackground"
      align="center"
      mt={8}
      border="1px"
      borderColor="primary.base"
      borderRadius="base"
      boxShadow="inset 0 -2px 0 0 var(--x3-colors-primary400)"
    >
      {/* <ContentColumn hideBelow={largeBp}>
        ░░░░░░░░░▄░░░░░░░░░░░░░░▄░░░░ ░░░░░░░░▌▒█░░░░░░░░░░░▄▀▒▌░░░
        ░░░░░░░░▌▒▒█░░░░░░░░▄▀▒▒▒▐░░░ ░░░░░░░▐▄▀▒▒▀▀▀▀▄▄▄▀▒▒▒▒▒▐░░░
        ░░░░░▄▄▀▒░▒▒▒▒▒▒▒▒▒█▒▒▄█▒▐░░░ ░░░▄▀▒▒▒░░░▒▒▒░░░▒▒▒▀██▀▒▌░░░
        ░░▐▒▒▒▄▄▒▒▒▒░░░▒▒▒▒▒▒▒▀▄▒▒▌░░ ░░▌░░▌█▀▒▒▒▒▒▄▀█▄▒▒▒▒▒▒▒█▒▐░░
        ░▐░░░▒▒▒▒▒▒▒▒▌██▀▒▒░░░▒▒▒▀▄▌░ ░▌░▒▄██▄▒▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒▌░
        ▀▒▀▐▄█▄█▌▄░▀▒▒░░░░░░░░░░▒▒▒▐░ ▐▒▒▐▀▐▀▒░▄▄▒▄▒▒▒▒▒▒░▒░▒░▒▒▒▒▌
        ▐▒▒▒▀▀▄▄▒▒▒▄▒▒▒▒▒▒▒▒░▒░▒░▒▒▐░ ░▌▒▒▒▒▒▒▀▀▀▒▒▒▒▒▒░▒░▒░▒░▒▒▒▌░
        ░▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▒▄▒▒▐░░ ░░▀▄▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▄▒▒▒▒▌░░
        ░░░░▀▄▒▒▒▒▒▒▒▒▒▒▄▄▄▀▒▒▒▒▄▀░░░ ░░░░░░▀▄▄▄▄▄▄▀▀▀▒▒▒▒▒▄▄▀░░░░░
        ░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▀▀░░░░░░░░
      </ContentColumn> */}
      <ContentColumn>
        {/* <OldHeading
          as="h2"
          fontFamily="monospace"
          textTransform="uppercase"
          bg="border"
          p={1}
          fontSize="2rem"
          lineHeight={1.4}
        >
          <Translation id="page-docs:page-calltocontribute-title" />
        </OldHeading> */}
        <DescriptionParagraph>
          <Translation id="page-docs:page-docs-calltocontribute-desc-1" />
        </DescriptionParagraph>
        <DescriptionParagraph>
          <Translation id="page-docs:page-docs-calltocontribute-desc-2" />
        </DescriptionParagraph>
        <DescriptionParagraph>
          <Translation id="page-docs:page-docs-calltocontribute-desc-3" />{" "}
          <InlineLink to="/unlock-your-potential/principles/how-do-I-submit-first-principles">
            <Translation id="page-docs:page-docs-calltocontribute-link" />
          </InlineLink>
        </DescriptionParagraph>
        <DescriptionParagraph>
          <Translation id="page-docs:page-docs-calltocontribute-desc-4" />{" "}
          <InlineLink to="https://our.x3.family">
            <Translation id="page-docs:page-docs-calltocontribute-link-2" />
          </InlineLink>{" "}
        </DescriptionParagraph>
        <ButtonLink
          to={editPath}
          leftIcon={
            <Icon
              fill="background.base"
              w={6}
              h={6}
              as={FaGithub}
              name="github"
            />
          }
        >
          <Translation id="page-docs:page-docs-calltocontribute-span" />
        </ButtonLink>
      </ContentColumn>
    </Flex>
  )
}

export default CallToContribute
