import { MdExpandMore } from "react-icons/md"
import { Box, Icon, List, } from "@chakra-ui/react"

import Breadcrumbs from "@/components/Breadcrumbs"
import { Image } from "@/components/Image"

import { Container, HeroContainer, LastUpdated, MoreContent, SummaryPoint, Title, TitleCard } from "@/layouts"

interface MainHeroProps {
    pathname: string;
    lastUpdated: string;
    title: string;
    description: string[];
    imageSrc: string;
    imageAlt: string;
  }
  
  const MainHero: React.FC<MainHeroProps> = ({ pathname, lastUpdated, title, description, imageSrc, imageAlt }) => {
    return (
      <Container>
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
            </Box>
            <LastUpdated>{lastUpdated}</LastUpdated>
          </TitleCard>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={816}
            height={525}
            style={{ objectFit: "cover", overflow: "visible" }}
            priority
            flex={{ base: "1 1 100%", md: "none" }}
            alignSelf={{ base: "center", md: "flex-end" }}
          />
        </HeroContainer>
        <MoreContent to="#start">
          <Icon as={MdExpandMore} fontSize="2xl" color="secondary" />
        </MoreContent>
      </Container>
    );
  };
  
  export default MainHero;