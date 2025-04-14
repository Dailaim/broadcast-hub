import { useQuery } from '@tanstack/react-query';
import { messageService } from '../services/messages'; // Asegúrate de que este servicio esté configurado
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Message, NewMessage } from '../types';
import { MessageResponse } from '../types/messages';

export const useGetMessages = () => {
  return useQuery({
    queryKey: ["messages"],
    queryFn: () =>  messageService.getAll(),
    select: (data) =>
      data.map((message) => ({
        ...message,
        scheduledTime: message.scheduled_time,
      })),
  });
};


// Crear
export const useCreateMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<MessageResponse, Error, NewMessage, {
    previousMessages: Message[];
  }>({
    mutationFn: (newMessage) =>{
      if (!newMessage.group_id) throw new Error("Group Not found");
      return messageService.create({
        content: newMessage.content,
        scheduled_time: newMessage.scheduledTime,
        group_id: newMessage.group_id,
      })},

    onMutate: async (newMessage) => {
      await queryClient.cancelQueries({
        queryKey: ['messages'],
      });
      
      const previousMessages = queryClient.getQueryData<Message[]>(['messages']) || [];
      if (!newMessage.group_id) throw new Error("Group Not found");

      const optimisticMessage: Message = {
        ...newMessage,
        id: Math.random(), // temporal
        status: "pending",
        group_id: newMessage.group_id,
      };

      queryClient.setQueryData<Message[]>(['messages'], [...previousMessages, optimisticMessage]);

      return { previousMessages };
    },

    onError: (_err, _newMessage, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(['messages'], context.previousMessages);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },
  });
};

export const useDeleteMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<MessageResponse, Error, number, {
      previousMessages: Message[];
  }>
    ({
    mutationFn: (id: number) => messageService.delete(id),

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["messages"],
      });

      const previousMessages = queryClient.getQueryData<Message[]>(['messages']) || [];

      queryClient.setQueryData<Message[]>(['messages'], previousMessages.filter((msg) => msg.id !== id));

      return { previousMessages };
    },

    onError: (_err, _id, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(['messages'], context.previousMessages);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },
  });
};

// Editar
export const useEditMessageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    MessageResponse,
    Error,
    Message,
    {
      previousMessages: Message[];
    }
  >({
    mutationFn: (message: Message) =>
      messageService.update(message.id, message),

    onMutate: async (updatedMessage) => {
      await queryClient.cancelQueries();

      const previousMessages =
        queryClient.getQueryData<Message[]>(["messages"]) || [];

      queryClient.setQueryData<Message[]>(
        ["messages"],
        previousMessages.map((msg) =>
          msg.id === updatedMessage.id ? { ...msg, ...updatedMessage } : msg
        )
      );

      return { previousMessages };
    },

    onError: (_err, _updatedMessage, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(["messages"], context.previousMessages);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages"],
      });
    },
  });
};
