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
          Pretend you are the mayor of a city and need to allocate funding to
          five city branches. You need to decide what percentage of the budget
          should go to each of the following branches: Law Enforcement,
          Education, Homelessness, Health Care, and Immigration.
        </p>
        <p>
          In order to help make your decision, you will get feedback on your
          proposed allocation from a modern AI language model. To do this, fill
          out the percentages below and then hit “Provide Me Feedback”. You may
          change your answer as many times as you would like and continue to get
          updated feedback. When you are content with your answer, you will
          {`submit your final allocation by pressing "Submit FINAL ALLOCATION".`}
          <span className="font-semibold">
            Note, you can only submit a FINAL Allocation once!
          </span>
          Please fill in a percentage (e.g. 20) for each of the following. The
          total must be 100%.
        </p>
        <Form />
      </div>
    </Main>
  );
}
