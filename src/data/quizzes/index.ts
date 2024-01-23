// Import data types
import type { QuizzesSection } from "@/lib/types"
import type { RawQuizzes } from "@/lib/interfaces"

// Declare hash-map of quizzes based on slug key
const quizzes: RawQuizzes = {
  "quiz-about-us": {
    title: "quizzes:quiz-about-us",
    questions: ["a001", "a002", "a003", "a004", "a005"],
  },
  "quiz-better-life-framework": {
    title: "quizzes:quiz-better-life-framework",
    questions: ["b001", "b002", "b003", "b004"],
  },
  "quiz-understanding-the-framework": {
    title: "quizzes:quiz-understanding-the-framework",
    questions: ["c001", "c002", "c003", "c004", "c005"],
  },
  "quiz-the-4a-model": {
    title: "quizzes:quiz-the-4a-model",
    questions: ["d001", "d002", "d003", "d004", "d005"],
  },
}

export const understand_yourself_quizzes: QuizzesSection[] = [
  {
    id: "quiz-better-life-framework",
    level: "beginner",
    next: "quiz-understanding-the-framework",
  },
  {
    id: "quiz-understanding-the-framework",
    level: "intermediate",
    next: "quiz-the-4a-model",
  },
  {
    id: "quiz-the-4a-model",
    level: "intermediate",
  },
]

export const live_your_best_life_quizzes: QuizzesSection[] = [
  {
    id: "quiz-about-us",
    level: "beginner",
  },
]

export default quizzes
