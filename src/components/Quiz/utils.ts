import { CompletedQuizzes, type Lang, QuizShareStats } from "@/lib/types"

import { getLocaleForNumberFormat } from "@/lib/utils/translations"

import allQuizzesData, {
  live_your_best_life_quizzes,
  understand_yourself_quizzes,
} from "@/data/quizzes"

import {
  TOTAL_QUIZ_AVERAGE_SCORE,
  TOTAL_QUIZ_QUESTIONS_ANSWERED,
  TOTAL_QUIZ_RETRY_RATE,
} from "@/lib/constants"

export const getTotalQuizzesPoints = () =>
  Object.values(allQuizzesData)
    .map((quiz) => quiz.questions.length)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    }, 0)

export const getNumberOfCompletedQuizzes = (quizzes: CompletedQuizzes) =>
  Object.values(quizzes)
    .map((v) => v[0])
    .filter((v) => v).length

export const getNextQuiz = (currentQuiz?: string) => {
  const allQuizzes = [...understand_yourself_quizzes, ...live_your_best_life_quizzes]
  const nextQuiz = allQuizzes.find((quiz) => quiz.id === currentQuiz)

  return nextQuiz ? nextQuiz.next : undefined
}

export const shareOnTwitter = ({ score, total }: QuizShareStats): void => {
  const url = "https://the.x3.family/understand-yourself/quizzes"
  const hashtags = ["thex3family", "liveyourbestlife", "quiz"]
  const tweet =
    score > 0
      ? `${encodeURI(
          `I took quizzes on the.x3.family and overall scored ${score} out of ${total}! Try it yourself at ${url}`
        )}`
      : `${encodeURI(
          `How well do you know how to live a better life? Check out these quizzes on the.x3.family: ${url}`
        )}`

  window.open(
    `https://twitter.com/intent/tweet?text=${tweet}&hashtags=${hashtags}`
  )
}

const mean = (values: number[]) =>
  values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0

export const getFormattedStats = (language, average) => {
  const localeForNumbers = getLocaleForNumberFormat(language as Lang)

  // Initialize number and percent formatters
  const numberFormatter = new Intl.NumberFormat(localeForNumbers, {
    style: "decimal",
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 3,
  })

  const percentFormatter = new Intl.NumberFormat(localeForNumbers, {
    style: "percent",
    minimumSignificantDigits: 1,
    maximumSignificantDigits: 3,
  })

  const computedAverage = average.length > 0 ? mean(average) : 0

  // Convert collective stats to fraction for percentage format
  const normalizedCollectiveAverageScore = TOTAL_QUIZ_AVERAGE_SCORE / 100
  const normalizedCollectiveRetryRate = TOTAL_QUIZ_RETRY_RATE / 100

  return {
    formattedUserAverageScore: percentFormatter.format(computedAverage / 100), // Normalize user average
    formattedCollectiveQuestionsAnswered: numberFormatter.format(
      TOTAL_QUIZ_QUESTIONS_ANSWERED
    ),
    formattedCollectiveAverageScore: percentFormatter.format(
      normalizedCollectiveAverageScore
    ),
    formattedCollectiveRetryRate: percentFormatter.format(
      normalizedCollectiveRetryRate
    ),
  }
}
