import { Main, PageTitle } from "@/CommonComponents";
import { Form } from "./Form";


export async function AiInteraction({
  topic, submitUrl,
}: {
  topic: string;
  submitUrl: string;
}) {
  return (
    <Main>
      <PageTitle title="Engage & Learn: Interactive Chatbot" />
      <p>
        <b><i>Now you will use a modern AI language model to learn more about the topic.</i></b></p>
        
        <p>Interact with the language model via the chatbox  below to learn about the given topic. Remember you will
        be required to have at{" "}
        <span className="font-semibold italic">least 3 interactions</span> with
        the model on each topic. However, you may do up to 20 interactions. An
        interaction can be in the form of a question, statement, or request.
      </p>
      <p>
        To use the chatbox, write your message in the text box where it says
        {`"Type your message" and press the "Send" button. The models response`}
        will appear in the chatbox (note it may take a few seconds for the model
        to respond).
      </p>
      <p className="text-lg font-semibold">Topic: {topic}</p>
      <Form topic={topic} submitUrl={submitUrl} />
    </Main>
  );
}
