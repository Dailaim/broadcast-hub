import { Clock, Send } from "lucide-react";
import type React from "react";
import type { NewMessage } from "../types";

interface MessageFormProps {
  message: NewMessage;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (message: NewMessage) => void;
}

export function MessageForm({ message, onSubmit, onChange }: MessageFormProps) {
  return (
    <div className="backdrop-blur-xl bg-white/50 dark:bg-slate-900/50 rounded-lg shadow-lg shadow-slate-200/50 dark:shadow-purple-900/20 p-8 border border-slate-200 dark:border-purple-900/50">
      <h2 className="text-xl font-semibold mb-6 text-slate-800 dark:text-purple-100">
        Create Broadcast
      </h2>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Message Content
          </label>
          <textarea
            name="content"
            value={message.content}
            onChange={(e) => onChange({ ...message, content: e.target.value })}
            className="w-full h-32 px-4 py-3 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 backdrop-blur-sm border border-slate-200 dark:border-purple-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
            placeholder="Type your broadcast message here..."
            required
          />
        </div>

        <div>
          <label
            htmlFor="scheduledTime"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
          >
            Schedule Time
          </label>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-slate-400" />
            <input
              name="scheduledTime"
              type="datetime-local"
              value={message.scheduledTime}
              onChange={(e) =>
                onChange({ ...message, scheduledTime: e.target.value })
              }
              className="flex-1 px-4 py-2 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-slate-200 backdrop-blur-sm border border-slate-200 dark:border-purple-900/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-white bg-purple-600 hover:bg-purple-700 dark:bg-gradient-to-r dark:from-purple-600 dark:to-pink-600 dark:hover:from-purple-700 dark:hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:scale-[1.02]"
        >
          <Send className="h-5 w-5 mr-2" />
          Schedule Broadcast
        </button>
      </form>
    </div>
  );
}
