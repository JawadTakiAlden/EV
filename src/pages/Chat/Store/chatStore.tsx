import { create } from "zustand";
import { Record } from "../components/UserChatRow";
import { MessageResponse } from "../components/MessageRenderer";

export interface ChatStore {
  selectedUser: Record["user"] | null;
  selectedChat: number | null;
  messages: MessageResponse[] | null;
  selectUser: (user: Record["user"] | null) => void;
  selectChat: (user: number | null) => void;
  unSelectChat: () => void;
  setMessages: (messages: MessageResponse[] | null) => void;
}

export const useChat = create<ChatStore>((set, get) => ({
  selectedUser: null,
  selectedChat: null,
  messages: null,
  selectUser: (user) => {
    set({ selectedUser: user });
  },
  selectChat: (chatId) => {
    set({ selectedChat: chatId });
  },
  unSelectChat: () => {
    set({ selectedChat: null, selectedUser: null, messages: [] });
  },
  setMessages: (messages) => {
    set({ messages: messages });
  },
}));
