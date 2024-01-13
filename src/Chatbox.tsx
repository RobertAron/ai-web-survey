"use client";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Bot, User } from "lucide-react";
import { match } from "ts-pattern";
import { useChat } from "ai/react";

export function Chatbox() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/learning",
  });

  return (
    <div className="border border-black h-0 grow flex flex-col bg-slate-100">
      <section
        className="h-0 grow p-4 overflow-y-scroll flex flex-col-reverse shrink"
        style={{ overflowAnchor: "auto" }}
      >
        <div className="flex flex-col gap-3 mb-auto">
          <div className="bg-[#e89822] text-white rounded p-2 flex gap-2">
            <AlertTriangle />
            <p>Interact with this chatbot to learn about League of Legends</p>
          </div>
          {messages.map((message) =>
            match(message)
              .with({ role: "assistant" }, (message) => (
                <div className="flex items-end space-x-2" key={message.id}>
                  <Avatar className="h-10 w-10 border border-black bg-white">
                    <Bot size={40} />
                  </Avatar>
                  <div className="p-3 rounded-lg bg-gray-200">
                    <p className="text-sm text-gray-800">{message.content}</p>
                  </div>
                </div>
              ))
              .with({ role: "user" }, (message) => (
                <div
                  className="flex items-end space-x-2 ml-auto"
                  key={message.id}
                >
                  <div className="p-3 rounded-lg bg-blue-500">
                    <p className="text-sm text-white">{message.content}</p>
                  </div>
                  <Avatar className="h-10 w-10 border border-black bg-white">
                    <User size={40} />
                  </Avatar>
                </div>
              ))
              .otherwise(() => null)
          )}
        </div>
      </section>
      <form className="flex items-center p-4" onSubmit={handleSubmit}>
        <Input
          value={input}
          onChange={handleInputChange}
          className="flex-1 mr-2"
          placeholder="Type your message"
        />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
