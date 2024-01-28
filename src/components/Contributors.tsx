import { useEffect, useState } from "react"
import { shuffle } from "lodash"
import { Box, Flex, Image, LinkBox, LinkOverlay } from "@chakra-ui/react"

import InlineLink from "@/components/Link"
import Text from "@/components/OldText"

import data from "!!raw-loader!@/../.all-contributorsrc"

export interface Contributor {
  login: string
  name: string
  avatar_url: string
  profile: string
  contributions: Array<string>
}

const Contributors = () => {
  const [contributorsList, setContributorsList] = useState<Contributor[]>([]);

  useEffect(() => {
    // Shuffle the contributors only on the client side, after mounting
    setContributorsList(shuffle(JSON.parse(data).contributors));
  }, []); // Empty dependency array ensures this runs once on mount

  if (contributorsList.length === 0) {
    // Optionally, render a placeholder or nothing while waiting for the shuffle
    // Render a placeholder message
    return (
      <Box textAlign="center" padding="4">
        <Text>Loading contributors...</Text>
      </Box>
    );
    return null;
  }

  return (
    <>
      <p>
        This is possible thanks to our <strong>{contributorsList.length} comrades</strong> who have contributed so far!
      </p>

      <Flex flexWrap="wrap">
        {contributorsList.map((contributor) => (
          <LinkBox
            key={contributor.login}
            as="div"
            maxWidth="132px"
            margin="2"
            boxShadow="0px 14px 66px rgba(0, 0, 0, 0.07), 0px 10px 17px rgba(0, 0, 0, 0.03), 0px 4px 7px rgba(0, 0, 0, 0.05)"
            _hover={{
              textDecoration: "none",
              borderRadius: "base",
              boxShadow: "0px 8px 17px rgba(0, 0, 0, 0.15)",
              background: "tableBackgroundHover",
              transition: "transform 0.1s",
              transform: "scale(1.02)",
            }}
            _focus={{
              textDecoration: "none",
              borderRadius: "base",
              boxShadow: "0px 8px 17px rgba(0, 0, 0, 0.15)",
              background: "tableBackgroundHover",
              transition: "transform 0.1s",
              transform: "scale(1.02)",
            }}
          >
            <Image
              width="132px"
              height="132px"
              src={contributor.avatar_url}
              alt={contributor.name}
            />
            <Box padding="1rem">
              <Text as="h3" fontSize="md" marginTop="2" marginBottom="4">
                <LinkOverlay
                  as={InlineLink}
                  href={contributor.profile}
                  hideArrow
                  color="text"
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                  isExternal
                  noOfLines={1}
                >
                  {contributor.name}
                </LinkOverlay>
              </Text>
            </Box>
          </LinkBox>
        ))}
      </Flex>
    </>
  )
}

export default Contributors
