import { Main, PageTitle } from "@/CommonComponents";
import { Form } from "./Form";
import { redirectCheck } from "@/redirectCheck";

export default async function Component() {
  await redirectCheck();
  return (
    <Main>
      <PageTitle title="Mayor Simulation - Budget Allocation" />
      <div className="w-full flex-grow bg-white p-6 flex flex-col border rounded gap-2">
        <p>
          Pretend you are the mayor of your city and you have been tasked with
          distributing <span className="italic">left over funding</span> among four city branches. You need to
          decide what percentage of the remaining funding should go to each of
          the following branches:{" "}
          <span className="italic underline">
            Public Safety, K-12th Education, Welfare Assistance, and Veteran
            Services.
          </span>
        </p>
        <p>
          First, you will provide your <i>proposed initial allocation</i> in the
          four boxes below and hit {`"Submit Initial Allocation"`}. 
        </p>
        <p>  
          Then, to help make your final decision, you will get feedback on your
          proposed initial allocation from a modern AI language model (i.e. like ChatGPT). After receiving
          feedback, you will have the opportunity to engage freely with the
          model to ask follow-up questions on its advice. You are required
          to have at{" "}
          <span className="font-semibold italic">{`least 3 "interactions"`}</span>{" "}
          {`with the model. However, you may have up to 20 "interactions". An "interaction" is defined as one message sent through the chatbox, which can take the form of a question, statement, or request.`}
        </p>
        When you feel confident in your final choice, you will once again fill
        out the four boxes below the chatbox and
        {` submit your final allocation by pressing "Submit FINAL ALLOCATION". `}
        <span className="font-semibold">
          Note, the final allocation is meant to represent your opinion and you
          can only submit a Final Allocation once!
        </span>{" "}
        Please fill in a whole number from 0 to 100 (e.g., 20) for each of the
        following city branches. The total must equal 100.
        <Form />
      </div>
    </Main>
  );
}
