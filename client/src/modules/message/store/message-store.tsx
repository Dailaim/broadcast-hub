import { create } from "zustand";
import type { Message } from "../types";

type NewMessage = Omit<Message, "id" | "status">;

type MessageState = {
  newMessage: NewMessage;
  editingMessage: Message | null;
  cancelEditing: () => void;
  setNewMessage: (data: Partial<NewMessage>) => void;
};

export const useMessageStore = create<MessageState>((set) => ({
  newMessage: {
    content: "",
    scheduledTime: "",
    group_id: 0,
  },
  editingMessage: null,

  cancelEditing: () =>
    set(() => ({
      editingMessage: null,
      newMessage: {
        content: "",
        scheduledTime: "",
        group_id: 0,
      },
    })),
  setNewMessage: (data) =>
    set((state) => ({
      newMessage: { ...state.newMessage, ...data },
    })),
}));
