import { prismaClient } from "./database";
import { getUserId } from "./redirectCheck";

export const topicsPage1 = [
  {
    topic: "Covenant Marriages",
    statement:
      "I support all states in the United States offering covenant marriages.",
  },
  {
    topic: "Covenant Marriages",
    statement:
      "I support all states in the United States offering covenant marriages.",
  },
];
export const topicsPage2 = [
  {
    topic: "Lacey Act of 1900",
    statement: "I support keeping the Lacey Act of 1900.",
  },
  {
    topic: "Multifamily Zoning Laws",
    statement: "I support laws that expand multifamily zoning.",
  },
];

function getRandomIntegers(x: number, y: number): [number, number] {
  const min = Math.ceil(x);
  const max = Math.floor(y);

  // Generate the first random integer
  const firstInt = Math.floor(Math.random() * (max - min + 1)) + min;

  // Generate the second random integer, ensuring it's distinct from the first
  let secondInt = Math.floor(Math.random() * (max - min + 1)) + min;
  while (secondInt === firstInt) {
    secondInt = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return [firstInt, secondInt];
}

export function pickRandomQuestionIndexes() {
  return getRandomIntegers(0, topicsPage1.length - 1);
}

export async function getUserQuestion(index: number) {
  const userId = getUserId();
  if (userId === null) throw new Error("Could not get user ID");
  const result = await prismaClient.randomized_user_questions.findUnique({
    where: {
      user_id_question_index: {
        question_index: index,
        user_id: userId,
      },
    },
  });
  if (result === null) throw new Error("Could not retrieve question");
  return result;
}

export async function getAiType() {
  const userId = getUserId();
  if (userId === null) throw new Error("Could not get user ID");
  const res = await prismaClient.user_page_tracking.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      selected_ai: true,
    },
  });
  if (res === null) throw new Error("Could not find user in DB");
  return res.selected_ai;
}
