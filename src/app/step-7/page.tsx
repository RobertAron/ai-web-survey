import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Main, MyLink, PageTitle } from "@/CommonComponents";
import { Quote } from "lucide-react";

export default function Component() {
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="education"
              >
                Education
              </label>
              <Input
                className="w-full"
                id="education"
                max="100"
                min="0"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="health"
              >
                Health
              </label>
              <Input
                className="w-full"
                id="health"
                max="100"
                min="0"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="infrastructure"
              >
                Infrastructure
              </label>
              <Input
                className="w-full"
                id="infrastructure"
                max="100"
                min="0"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="publicSafety"
              >
                Public Safety
              </label>
              <Input
                className="w-full"
                id="publicSafety"
                max="100"
                min="0"
                type="number"
              />
            </div>
            <div className="space-y-2">
              <label
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="environment"
              >
                Environment
              </label>
              <Input
                className="w-full"
                id="environment"
                max="100"
                min="0"
                type="number"
              />
            </div>
          </div>
          <MyLink href="/step-8">Next</MyLink>
        </div>
      </section>
      <section className="w-full max-w-2xl mx-auto mt-8 px-4 sm:px-6 lg:px-8"></section>
    </Main>
  );
}
