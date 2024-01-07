import { Button, buttonVariants } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function Component() {
  return (
    <main className="flex flex-col h-screen bg-gray-100 dark:bg-gray-800 p-1">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Engage & Learn: Interactive Chatbot
      </h2>
      <p className="bg-[#e89822] text-white rounded p-2">
        Interact with this chatbot to learn about League of Legends
      </p>
      <section className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex items-end space-x-2">
          <Avatar className="h-10 w-10">
            <AvatarImage alt="Chatbot" src="/placeholder-avatar.jpg" />
            <AvatarFallback>CB</AvatarFallback>
          </Avatar>
          <div className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
            <p className="text-sm text-gray-800 dark:text-gray-100">
              {
                "Hello! I'm here to help you learn about a specific topic. What would you like to know more about?"
              }
            </p>
          </div>
        </div>
        <div className="flex items-end space-x-2 ml-auto">
          <div className="p-3 rounded-lg bg-blue-500">
            <p className="text-sm text-white">{"What is league of legends?"}</p>
          </div>
          <Avatar className="h-10 w-10">
            <AvatarImage alt="User" src="/placeholder-avatar.jpg" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-end space-x-2">
          <Avatar className="h-10 w-10">
            <AvatarImage alt="Chatbot" src="/placeholder-avatar.jpg" />
            <AvatarFallback>CB</AvatarFallback>
          </Avatar>
          <div className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
            <p className="text-sm text-gray-800 dark:text-gray-100">
              {`League of Legends (LoL) is a popular multiplayer online battle arena (MOBA) game developed and published by Riot Games. It's a competitive game where players choose a "champion" with unique abilities and work together in teams to destroy the opposing team's base while defending their own. It involves strategy, teamwork, and skillful gameplay to achieve victory. With a large player base, diverse champions, and constantly evolving gameplay, League of Legends has become a prominent title in the esports scene.`}
            </p>
          </div>
        </div>
      </section>
      <footer className="flex items-center p-4 bg-white dark:bg-gray-900">
        <Input className="flex-1 mr-2" placeholder="Type your message" />
        <Button>Send</Button>
      </footer>
      <Link href="/step-6" className={cn(buttonVariants(), "w-full mx-auto")}>
        Next
      </Link>
    </main>
  );
}
