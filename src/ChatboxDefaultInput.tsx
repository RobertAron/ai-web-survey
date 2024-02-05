import { UseChatHelpers } from "ai/react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

export function ChatboxDefaultInput({
  useChatHelpers,
}: {
  useChatHelpers: UseChatHelpers;
}) {
  const { input, handleInputChange, handleSubmit } = useChatHelpers;
  return (
    <form className="flex items-center p-4" onSubmit={handleSubmit}>
      <Input
        value={input}
        onChange={handleInputChange}
        className="flex-1 mr-2"
        placeholder="Type your message"
      />
      <Button type="submit">Send</Button>
    </form>
  );
}
