import { useShallow } from "zustand/shallow";
import { MessageForm } from "../components/message-form";
import { MessageList } from "../components/message-list";
import { useMessageStore } from "../store/message-store";
import { Message } from "../types";
import {
  useCreateMessageMutation,
  useDeleteMessageMutation,
  useEditMessageMutation,
  useGetMessages,
} from "../hooks/messages-querys";
import { useGetGroups } from "../hooks/gruops-querys";

export const MessageScreen = () => {
  const { newMessage } = useMessageStore(
    useShallow((state) => ({
      newMessage: state.newMessage,
    }))
  );
  const { setNewMessage } = useMessageStore(
    useShallow((state) => ({
      setNewMessage: state.setNewMessage,
    }))
  );

  const { mutateAsync: createMessage } = useCreateMessageMutation();
  const { data: messages } = useGetMessages();
  const { mutate: deleteMessage } = useDeleteMessageMutation();
  const { mutate: editMessage } = useEditMessageMutation();
  const { data: groups } = useGetGroups();

  const handleSubmit: (e: React.FormEvent) => void = async (e) => {
    e.preventDefault();

    const message: Omit<Message, "id"> = {
      content: newMessage.content,
      scheduledTime: newMessage.scheduledTime,
      group_id: newMessage.group_id || 1,
      status: "pending",
    };

    await createMessage(message, {
      onSuccess: () => {
        setNewMessage({
          content: "",
          scheduledTime: "",
          group_id: 0,
        });
      },
    });
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <MessageForm
        message={newMessage}
        onSubmit={handleSubmit}
        onChange={setNewMessage}
        groups={groups}
      />
      <MessageList
        onEdit={editMessage}
        onDelete={deleteMessage}
        messages={messages}
      />
    </div>
  );
};
