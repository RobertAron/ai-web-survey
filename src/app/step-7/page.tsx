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
          Welcome to the Mayor Simulation. As a mayor, you are responsible for
          allocating the citys budget to different departments. Please enter the
          percentage of the budget you would like to allocate to each
          department. The total should not exceed 100%.
        </p>
        <Form />
      </div>
    </Main>
  );
}
