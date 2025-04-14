import type React from "react";
import { useState } from "react";
import { MessageForm } from "../components/message-form";
import { MessageList } from "../components/message-list";
import type { Message, NewMessage } from "../types";

export const MessageScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello everyone! This is a test broadcast.",
      scheduledTime: "2024-03-20T15:00",
      recipients: ["Group A", "Group B"],
      status: "pending",
    },
  ]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this broadcast?")) {
      setMessages(messages.filter((msg) => msg.id !== id));
    }
  };

  const [newMessage, setNewMessage] = useState<NewMessage>({
    content: "",
    scheduledTime: "",
    recipients: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.content,
      scheduledTime: newMessage.scheduledTime,
      recipients: newMessage.recipients,
      status: "pending",
    };
    setMessages([...messages, message]);

    setNewMessage({ content: "", scheduledTime: "", recipients: [] });
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <MessageForm
        message={newMessage}
        onSubmit={handleSubmit}
        onChange={setNewMessage}
      />
      <MessageList messages={messages} onDelete={handleDelete} />
    </div>
  );
};
