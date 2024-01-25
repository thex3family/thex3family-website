// Import data types
import type { QuestionBank } from "@/lib/interfaces"

// Declare hash map of question bank
const questionBank: QuestionBank = {
  // About Us
  a001: {
    prompt: "a001-prompt",
    answers: [
      {
        id: "a001-a",
        label: "a001-a-label",
        explanation: "a001-a-explanation",
      },
      {
        id: "a001-b",
        label: "a001-b-label",
        explanation: "a001-b-explanation",
      },
      {
        id: "a001-c",
        label: "a001-c-label",
        explanation: "a001-c-explanation",
      },
      {
        id: "a001-d",
        label: "a001-d-label",
        explanation: "a001-d-explanation",
      },
    ],
    correctAnswerId: "a001-b",
  },
  a002: {
    prompt: "a002-prompt",
    answers: [
      {
        id: "a002-a",
        label: "a002-a-label",
        explanation: "a002-a-explanation",
      },
      {
        id: "a002-b",
        label: "a002-b-label",
        explanation: "a002-b-explanation",
      },
      {
        id: "a002-c",
        label: "a002-c-label",
        explanation: "a002-c-explanation",
      },
      {
        id: "a002-d",
        label: "a002-d-label",
        explanation: "a002-d-explanation",
      },
    ],
    correctAnswerId: "a002-a",
  },
  a003: {
    prompt: "a003-prompt",
    answers: [
      {
        id: "a003-a",
        label: "a003-a-label",
        explanation: "a003-a-explanation",
      },
      {
        id: "a003-b",
        label: "a003-b-label",
        explanation: "a003-b-explanation",
      },
      {
        id: "a003-c",
        label: "a003-c-label",
        explanation: "a003-c-explanation",
      },
      {
        id: "a003-d",
        label: "a003-d-label",
        explanation: "a003-d-explanation",
      },
    ],
    correctAnswerId: "a003-b",
  },
  a004: {
    prompt: "a004-prompt",
    answers: [
      {
        id: "a004-a",
        label: "a004-a-label",
        explanation: "a004-a-explanation",
      },
      {
        id: "a004-b",
        label: "a004-b-label",
        explanation: "a004-b-explanation",
      },
      {
        id: "a004-c",
        label: "a004-c-label",
        explanation: "a004-c-explanation",
      },
      {
        id: "a004-d",
        label: "a004-d-label",
        explanation: "a004-d-explanation",
      },
    ],
    correctAnswerId: "a004-d",
  },
  a005: {
    prompt: "a005-prompt",
    answers: [
      {
        id: "a005-a",
        label: "a005-a-label",
        explanation: "a005-a-explanation",
      },
      {
        id: "a005-b",
        label: "a005-b-label",
        explanation: "a005-b-explanation",
      },
      {
        id: "a005-c",
        label: "a005-c-label",
        explanation: "a005-c-explanation",
      },
      {
        id: "a005-d",
        label: "a005-d-label",
        explanation: "a005-d-explanation",
      },
    ],
    correctAnswerId: "a005-c",
  }
}

export default questionBank
