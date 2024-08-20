import { useEffect,useState } from "react"
import { sortBy } from "lodash"
import {
  Box,
  Flex,
  LinkBox,
  LinkOverlay,
  List,
  ListItem,
  useColorModeValue,
  useToken,
  VisuallyHidden,
} from "@chakra-ui/react"

import Emoji from "@/components/Emoji"
import InfoBanner from "@/components/InfoBanner"
import Input from "@/components/Input"
import InlineLink, { BaseLink } from "@/components/Link"
import Text from "@/components/OldText"
import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"
// Import the getJobsData function
import { getJobsData } from "@/lib/utils/md"

import { useRtlFlip } from "@/hooks/useRtlFlip"

export interface Jobs {
  to: string
  title: string
  emoji: string
  location: string
  compensation: string
  isExternal: boolean
}

export interface IProps {
  locale: string;
}

// TODO create generalized CardList / TableCard
// TODO prop if ordered list or unordered
const JobBoard: React.FC<IProps> = ({ locale }) => {
  const [searchField, setSearchField] = useState<string>("")
  const [jobs, setJobs] = useState<Array<Jobs>>([]);

  // Define filterMeetups inside the component to access sortedMeetups
  const filterMeetups = (query: string, meetups: Array<Jobs>): Array<Jobs> => {
    if (!query) return meetups;

    const lowercaseQuery = query.toLowerCase();

    return meetups.filter((meetup) => {
      return (
        meetup.title.toLowerCase().includes(lowercaseQuery) ||
        meetup.location.toLowerCase().includes(lowercaseQuery) // should also search by compensation later.
      );
    });
  };

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch(`/api/fetchJobsData?locale=${locale}`);
        const jobsData = await response.json();
        console.log("jobsData", jobsData);
        setJobs(jobsData);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    }

    fetchJobs();
  }, [locale]);

  // Sort meetups by emoji and then by location
  const sortedMeetups: Array<Jobs> = sortBy(jobs, ["emoji", "location"]);
  // Use the sortedMeetups and searchField to get the filteredMeetups
  const filteredMeetups = filterMeetups(searchField, sortedMeetups);

  const { flipForRtl } = useRtlFlip()
  const listBoxShadow = useColorModeValue("tableBox.light", "tableBox.dark")
  const listItemBoxShadow = useColorModeValue(
    "tableItemBox.light",
    "tableItemBox.dark"
  )

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchField(event.target.value)
    trackCustomEvent({
      eventCategory: "events search",
      eventAction: "click",
      eventName: event.target.value,
    })
  }

  const primaryBaseColor = useToken("colors", "primary.base")

  return (
    <Box>
      <Input
        mb={6}
        onChange={handleSearch}
        placeholder={"Search by job title or location"}
        aria-describedby="input-instruction"
      />
      {/* hidden for attachment to input only */}
      <VisuallyHidden hidden id="input-instruction">
        results update as you type
      </VisuallyHidden>

      <List m={0} boxShadow={listBoxShadow} aria-label="Event meetup results">
        {filteredMeetups.map((meetup, idx) => (
          <LinkBox
            as={ListItem}
            key={idx}
            display="flex"
            justifyContent="space-between"
            boxShadow={listItemBoxShadow}
            mb={0.25}
            p={4}
            w="100%"
            _hover={{
              textDecoration: "none",
              borderRadius: "base",
              boxShadow: `0 0 1px ${primaryBaseColor}`,
              bg: "tableBackgroundHover",
            }}
          >
            <Flex flex="1 1 75%" me={4}>
              {/* <Box me={4} opacity="0.4">
                {idx + 1}
              </Box> */}
              <Box me={4}>
              <Emoji text={meetup.emoji} boxSize={4} me={2} lineHeight="unset" />
              </Box>
              <Box>
                <LinkOverlay
                  as={BaseLink}
                  href={meetup.to}
                  textDecor="none"
                  color="text"
                  hideArrow
                  isExternal
                >
                  {meetup.title}
                </LinkOverlay>
              </Box>
            </Flex>
            <Flex
              textAlign="end"
              alignContent="flex-start"
              me={4}
              gap={2}
            >
            <Text mb={0} opacity={"0.6"}>
              {meetup.compensation}
            </Text>
              <Text mb={0} opacity={"0.6"}>
                {meetup.location}
              </Text>
            </Flex>
            <Box
              as="span"
              _after={{
                content: '"↗"',
                ms: 0.5,
                me: 1.5,
                transform: flipForRtl,
                display: "inline-block",
              }}
            ></Box>
          </LinkBox>
        ))}
      </List>
      <Box aria-live="assertive" aria-atomic>
        {!filteredMeetups.length && (
          <InfoBanner emoji=":information_source:">
            <Translation id="common:no-jobs-available" />{" "}
            <InlineLink to="https://ask.x3.family/collaborator-application">
              <Translation id="common:apply" />
            </InlineLink>
          </InfoBanner>
        )}
      </Box>
    </Box>
  )
}

export default JobBoard
