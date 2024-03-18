import { prismaClient } from "./database";
import { getUserId } from "./redirectCheck";

export const topics = [
  {
    topic: "The future of artificial intelligence in everyday life",
    statement: "AI will revolutionize various aspects of daily living.",
  },
  {
    topic: "Sustainable fashion trends and their impact on the environment",
    statement:
      "Fashion industry practices significantly contribute to environmental degradation.",
  },
  {
    topic: "Exploring the benefits and challenges of remote work culture",
    statement:
      "Remote work improves work-life balance but poses challenges for collaboration.",
  },
  {
    topic: "The psychology behind decision-making in consumer behavior",
    statement:
      "Consumer decisions are influenced by subconscious psychological factors.",
  },
  {
    topic: "The rise of plant-based diets and their effects on personal health",
    statement:
      "Adopting a plant-based diet can lead to improved health outcomes.",
  },
  {
    topic:
      "Urban gardening initiatives and their role in fostering community resilience",
    statement:
      "Urban gardening strengthens community bonds and enhances food security.",
  },
  {
    topic: "The evolution of digital storytelling in interactive media",
    statement:
      "Interactive storytelling platforms redefine audience engagement in media consumption.",
  },
  {
    topic: "Innovative approaches to renewable energy technology",
    statement:
      "Renewable energy technologies are essential for combating climate change.",
  },
  {
    topic:
      "Cultural appropriation versus cultural appreciation in the fashion industry",
    statement:
      "The fashion industry often blurs the line between cultural appropriation and cultural appreciation.",
  },
  {
    topic: "The influence of social media on mental health and well-being",
    statement:
      "Excessive social media usage negatively impacts mental health and well-being.",
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
