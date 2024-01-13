import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Main, MyLink, PageTitle } from "@/CommonComponents";
import { Chatbox } from "@/Chatbox";

export default function Component() {
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
        <Chatbox />
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
        <MyLink href="/step-9">Next</MyLink>
      </div>
    </Main>
  );
}
