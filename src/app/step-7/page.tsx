import { Main, PageTitle } from "@/CommonComponents";
import { Quote } from "lucide-react";
import { Form } from "./Form";
import { redirectCheck } from "@/redirectCheck";

export default async function Component() {
  await redirectCheck();
  return (
    <Main>
      <PageTitle title="Mayor Simulation - Budget Allocation" />
      <section className="w-full max-w-2xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6 flex flex-col gap-4">
          <p className="dark:text-gray-400">
            Welcome to the Mayor Simulation. As a mayor, you are responsible for
            allocating the citys budget to different departments. Please enter
            the percentage of the budget you would like to allocate to each
            department. The total should not exceed 100%.
          </p>
          <p>Here is how an AI model believes you should use funds</p>
          <p className="border-2 border-l-8 border-blue-400 bg-blue-400/10 p-2">
            <Quote />
            You should put all the money into education
          </p>
          <Form />
        </div>
      </section>
      <section className="w-full max-w-2xl mx-auto mt-8 px-4 sm:px-6 lg:px-8"></section>
    </Main>
  );
}
