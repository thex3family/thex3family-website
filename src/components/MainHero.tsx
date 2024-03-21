import { MdExpandMore } from "react-icons/md"
import { Box, Icon, List, } from "@chakra-ui/react"

import Breadcrumbs from "@/components/Breadcrumbs"
import { Image } from "@/components/Image"

import YouTube from "./YouTube"

import { Container, HeroContainer, LastUpdated, MoreContent, SummaryPoint, Title, TitleCard } from "@/layouts"

interface MainHeroProps {
  pathname: string;
  lastUpdated: string;
  title: string;
  description: string[];
  imageSrc: string;
  imageAlt: string;
  children?: React.ReactNode;
  youtubeID?: string;
  height?: number;
}

const MainHero: React.FC<MainHeroProps> = ({ pathname, lastUpdated, title, description, imageSrc, imageAlt, children, youtubeID, height }) => {
  return (
    <Container >
      <HeroContainer>
        <TitleCard>
          <Breadcrumbs slug={pathname} startDepth={0} mt={2} mb="8" />
          <Title>{title}</Title>
          <Box>
            <List listStyleType="disc">
              {description.map((sentence, index) => (
                <SummaryPoint key={index}>{sentence}</SummaryPoint>
              ))}
            </List>
            {children}
          </Box>
          <LastUpdated>{lastUpdated}</LastUpdated>
        </TitleCard>
        {youtubeID ?
          <Box
            width="100%"
            height={height ? height : 600}
            display="flex"
            alignItems="center"
            justifyContent={{ base: "center", lg: "flex-end" }} // Center on base, right-align on lg
            mr={{ lg: 24 }}
            flex={{ base: "1 1 100%", lg: "none" }}
            position="relative" // Add relative positioning here
          >
            <YouTube id={youtubeID} />
          </Box> :
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={816}
            height={height ? height : 600}
            style={{ objectFit: "cover", overflow: "visible" }}
            priority
            flex={{ base: "1 1 100%", lg: "none" }}
            alignSelf={{ base: "center", md: "flex-end" }}
          />}
      </HeroContainer>
      <MoreContent to="#start">
        <Icon as={MdExpandMore} fontSize="2xl" color="secondary" />
      </MoreContent>
    </Container>
  );
};

export default MainHero;