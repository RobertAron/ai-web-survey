import { Chatbox } from "@/Chatbox";
import { Main, MyLink, PageTitle } from "@/CommonComponents";

export default function Component() {
  return (
    <Main>
      <PageTitle
        title="Engage & Learn: Interactive Chatbot"
        subtitle="Learn about a topic from the chatbot."
      />
      <Chatbox />
      <MyLink href="/step-6">Next</MyLink>
    </Main>
  );
}
