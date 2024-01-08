import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Main, PageTitle } from "@/CommonComponents";

export default function Component() {
  return (
    <Main>
      <PageTitle
        title="Mayor Simulation - Budget Allocation"
      />
      <section className="w-full max-w-2xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to the Mayor Simulation. As a mayor, you are responsible for
            allocating the citys budget to different departments. Please enter
            the percentage of the budget you would like to allocate to each
            department. The total should not exceed 100%.
          </p>
          <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6">
            <h2 className="text-xl font-bold text-center dark:text-gray-100">
              Chat with our AI Assistant
            </h2>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg" />
            <div className="mt-4">
              <Input
                className="w-full"
                placeholder="Type your message here..."
                type="text"
              />
            </div>
          </div>
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
          <Button className="mt-6 w-full">Submit</Button>
        </div>
      </section>
      <section className="w-full max-w-2xl mx-auto mt-8 px-4 sm:px-6 lg:px-8"></section>
    </Main>
  );
}
