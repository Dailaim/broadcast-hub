import { create } from "zustand";
import type { Message } from "../types";

type NewMessage = Omit<Message, "id" | "status">;

type MessageState = {
  messages: Message[];
  newMessage: NewMessage;
  editingMessage: Message | null;
  handleSubmit: (e: React.FormEvent) => void;
  handleDelete: (id: string) => void;
  handleEdit: (message: Message) => void;
  cancelEditing: () => void;
  setNewMessage: (data: Partial<NewMessage>) => void;
};

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [
    {
      id: "1",
      content: "Hello everyone! This is a test broadcast.",
      scheduledTime: "2024-03-20T15:00",
      recipients: ["Group A", "Group B"],
      status: "pending",
    },
  ],
  newMessage: {
    content: "",
    scheduledTime: "",
    recipients: [],
  },
  editingMessage: null,

  handleSubmit: (e) => {
    e.preventDefault();
    const { newMessage, messages } = get();

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.content,
      scheduledTime: newMessage.scheduledTime,
      recipients: newMessage.recipients,
      status: "pending",
    };

    set({
      messages: [...messages, message],
      newMessage: { content: "", scheduledTime: "", recipients: [] },
    });
  },

  handleDelete: (id: string) => {
    if (window.confirm("Are you sure you want to delete this broadcast?")) {
      set((state) => ({
        messages: state.messages.filter((msg) => msg.id !== id),
      }));
    }
  },

  handleEdit: (message: Message) => {
    set({
      editingMessage: message,
      newMessage: {
        content: message.content,
        scheduledTime: message.scheduledTime,
        recipients: message.recipients,
      },
    });
  },

  cancelEditing: () =>
    set(() => ({
      editingMessage: null,
      newMessage: {
        content: "",
        scheduledTime: "",
        recipients: [],
      },
    })),

  setNewMessage: (data) =>
    set((state) => ({
      newMessage: { ...state.newMessage, ...data },
    })),
}));
