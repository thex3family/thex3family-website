import { ReactNode } from "react"
import React from 'react';
import { Header } from './Header';
import { Card } from './CardCTA';
import { SocialLink } from './SocialLink';
import { IconType } from "react-icons";
import {
    Box,
    Flex,
    Text,
    Heading,
    HeadingProps,
} from "@chakra-ui/react"
import MainArticle from "@/components/MainArticle"
import PageMetadata from "@/components/PageMetadata"

import { ChildOnlyProp } from "@/lib/types"
import { StaticImageData } from "next/image"

// Define the types for the data you expect to receive
type LinkPageProps = {
    headerData: {
        title: string;
        description: string;
        buttonLabel: string;
        buttonTo: string;
        imageSrc: StaticImageData;
        imageAlt: string;
        connectTitle: string;
    };
    cardsData: Array<{
        icon: IconType;
        title: string;
        to: string;
        boxShadow: string;
    }>;
    socialLinksData: Array<{
        icon: IconType;
        to: string;
        color: string;
        title: string;
    }>;
    dir: string;
};


const ContentBox = (props: ChildOnlyProp) => (
    <Box py={4} px={{ base: 4, lg: 8 }} {...props} />
)

const GrayContainer = (props: ChildOnlyProp) => (
    <Box width="full" background="grayBackground" {...props} />
)

const CardContainer = (props: {
    children: ReactNode
}) => (
    <Flex
        justifyContent={{ base: "flex-start" }}
        overflowX="auto" // Enable horizontal scrolling
        gap={8}
        p={4}
        width="full"
        flexWrap="nowrap" // Prevent wrapping of flex items
    >
        {props.children}
    </Flex>
);

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

const LinksPage: React.FC<LinkPageProps> = ({ headerData, cardsData, socialLinksData, dir }) => {

    return (
        <Flex
            as={MainArticle}
            flexDirection="column"
            alignItems="center"
            dir={dir}
            width="full"
            maxWidth="xl"
            mx="auto"
        >
            <PageMetadata
                title={headerData.title}
                description={headerData.description}
            />
            <GrayContainer>
                <ContentBox>
                    <Header {...headerData} />

                    <Text size="sm" mt={8} mb={4} fontWeight="600" textAlign="center">
                        Popular Links
                    </Text>
                    <CardContainer>
                        {cardsData.map((card, index) => (
                            <Card key={index} {...card} />
                        ))}
                    </CardContainer>
                </ContentBox>
            </GrayContainer>

            <Box pb={4}>
                <SectionHeading mt={12} fontFamily="heading" textAlign="center">
                    {headerData.connectTitle}
                </SectionHeading>
            </Box>
            {socialLinksData.map((link, index) => (
                <SocialLink key={index} {...link} />
            ))}
        </Flex>
    );
};

export default LinksPage;