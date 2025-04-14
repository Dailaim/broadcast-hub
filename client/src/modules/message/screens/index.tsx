import { useShallow } from "zustand/shallow";
import { MessageForm } from "../components/message-form";
import { MessageList } from "../components/message-list";
import { useMessageStore } from "../store/message-store";

export const MessageScreen = () => {
  const { messages, newMessage } = useMessageStore(
    useShallow((state) => ({
      messages: state.messages,
      newMessage: state.newMessage,
      editingMessage: state.editingMessage,
    }))
  );

  const { handleSubmit, handleDelete, handleEdit, setNewMessage } =
    useMessageStore(
      useShallow((state) => ({
        handleSubmit: state.handleSubmit,
        handleDelete: state.handleDelete,
        handleEdit: state.handleEdit,
        setNewMessage: state.setNewMessage,
      }))
    );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <MessageForm
        message={newMessage}
        onSubmit={handleSubmit}
        onChange={setNewMessage}
      />
      <MessageList
        onEdit={handleEdit}
        onDelete={handleDelete}
        messages={messages}
      />
    </div>
  );
};
