import { Calendar, Edit2, Trash2, Users } from "lucide-react";
import React from "react";
import type { Message } from "../types";

export interface MessageListProps {
  messages: Message[];
  onEdit: (message: Message) => void;
  onDelete: (id: string) => void;
}

export function MessageList({ messages, onDelete, onEdit }: MessageListProps) {
  return (
    <div className="backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 rounded-lg shadow-lg shadow-slate-200/50 dark:shadow-purple-900/20 p-8 border border-slate-200 dark:border-purple-900/50">
      <h2 className="text-xl font-semibold mb-6 text-slate-800 dark:text-purple-100">
        Scheduled Broadcasts
      </h2>
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="bg-white dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-purple-900/50 rounded-lg p-5 transition-all hover:bg-slate-50 dark:hover:bg-slate-700/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-slate-700 dark:text-slate-200">
                  {message.content}
                </p>
                <div className="mt-3 flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    {new Date(message.scheduledTime).toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1.5" />
                    {message.recipients.join(", ")}
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <div className="mb-2">
                  {message.status === "pending" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 backdrop-blur-sm border border-yellow-200 dark:border-yellow-900/50">
                      Pending
                    </span>
                  )}
                  {message.status === "sent" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 backdrop-blur-sm border border-green-200 dark:border-green-900/50">
                      Sent
                    </span>
                  )}
                  {message.status === "failed" && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 backdrop-blur-sm border border-red-200 dark:border-red-900/50">
                      Failed
                    </span>
                  )}
                </div>
                {message.status === "pending" && (
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => onEdit(message)}
                      className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 transition-colors"
                      title="Edit broadcast"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(message.id)}
                      className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50 transition-colors"
                      title="Delete broadcast"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
