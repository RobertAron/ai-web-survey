import { Main, PageTitle } from "@/CommonComponents";
import { Form } from "./Form";

export async function AiInteraction({
  topic,
  submitUrl,
  aiStep,
  warningMessage
}: {
  topic: string;
  submitUrl: string;
  aiStep: number;
  warningMessage: string | null;
}) {
  return (
    <Main>
      <PageTitle title="Interact with Language Model" />
      <p className="font-bold italic">
        Now you will use a modern AI language model (i.e. like ChatGPT) to learn
        more about the topic.
      </p>

      <p>
        Interact with the language model via the chatbox below to gain further
        insights about the given topic. You are required to have at{" "}
        <span className="font-semibold italic">{`least 3 "interactions"`}</span>{" "}
        {`with the model on each topic. However, you may have up to 20 "interactions". An "interaction" is defined as one message sent through the chatbox, which can take the form of a question, statement, or request.`}
      </p>
      <p>
        To use the chatbox, write your message in the text box where it says
        {` "Type your message" and press the "Send" button. The model's response `}
        will appear in the chatbox (
        <span className="underline">
          note it may take a few seconds for the model to respond
        </span>
        ).
      </p>
      <p className="text-lg font-semibold">Topic: {topic}</p>
      <Form
        topic={topic}
        submitUrl={submitUrl}
        aiStep={aiStep}
        warningMessage={warningMessage}
      />
    </Main>
  );
}
