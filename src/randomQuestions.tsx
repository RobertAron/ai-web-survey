import { prismaClient } from "./database";
import { getUserId } from "./redirectCheck";

export const topics = [
  "The future of artificial intelligence in everyday life",
  "Sustainable fashion trends and their impact on the environment",
  "Exploring the benefits and challenges of remote work culture",
  "The psychology behind decision-making in consumer behavior",
  "The rise of plant-based diets and their effects on personal health",
  "Urban gardening initiatives and their role in fostering community resilience",
  "The evolution of digital storytelling in interactive media",
  "Innovative approaches to renewable energy technology",
  "Cultural appropriation versus cultural appreciation in the fashion industry",
  "The influence of social media on mental health and well-being",
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
  return getRandomIntegers(0, topics.length - 1);
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
