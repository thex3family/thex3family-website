import React from "react"
import { Heading, OrderedList, Stack, Text } from "@chakra-ui/react"

import type { QuizzesSection, UserStats } from "@/lib/types"

import { trackCustomEvent } from "@/lib/utils/matomo"

import allQuizzesData from "@/data/quizzes"

import Translation from "../Translation"

import QuizItem from "./QuizItem"

export interface QuizzesListProps {
  userStats: UserStats
  content: Array<QuizzesSection>
  headingId: string
  descriptionId: string
  quizHandler: (id: string) => void
  modalHandler: (isModalOpen: boolean) => void
}

const QuizzesList = ({
  content,
  userStats,
  headingId,
  descriptionId,
  quizHandler,
  modalHandler,
}: QuizzesListProps) => (
  <Stack spacing="8" px={{ base: "8", lg: 0 }} pt="12">
    <Stack spacing="8">
      <Heading size="xl">{headingId}</Heading>
      <Text>{descriptionId}</Text>
    </Stack>

    <OrderedList
      m={0}
      listStyleType="none"
      sx={{ counterReset: "list-counter" }}
    >
      {content.map((listItem) => {
        const handleStart = () => {
          quizHandler(listItem.id)
          modalHandler(true)

          trackCustomEvent({
            eventCategory: "quiz_hub_events",
            eventAction: "quizzes click",
            eventName: `${listItem.id}`,
          })
        }

        return (
          <QuizItem
            key={listItem.id}
            {...listItem}
            isCompleted={userStats.completed[listItem.id]?.[0]}
            numberOfQuestions={allQuizzesData[listItem.id].questions.length}
            titleId={allQuizzesData[listItem.id].title}
            handleStart={handleStart}
          />
        )
      })}
    </OrderedList>
  </Stack>
)

export default QuizzesList
