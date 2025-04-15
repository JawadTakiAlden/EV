import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from "react";
import { request } from "../api/baseRequest";
import { AxiosResponse } from "axios";

export interface ConversationRow {
  id: number;
  user: {
    id: number;
    name: string;
    image: string;
  };
  lastMessage: {
    id: number;
    content: string;
    file: String;
    createdAt: string;
  };
  hasUnReadMessages?: boolean;
  unreadMessageCount?: number;
}

export interface Sender {
  id: number;
  name: string;
  role: string;
}

interface Message {
  id: number;
  content: string;
  file: string | null;
  chat_id: number;
  createdAt: string;
  updatedAt: string;
  sender: Sender;
}

interface ChatContextType {
  chats: ConversationRow[];
  messages: Message[];
  selectedChatId: number | undefined;
  isLoading: boolean;
  isError: boolean;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  resetUnreadMessages: (chatId: number) => void;
  incrementUnreadMessage: (chatId: number) => void;
  setSelectedChatId: (chatId: number | undefined) => void;
}

const chatContext = createContext<ChatContextType>({
  chats: [],
  messages: [],
  selectedChatId: undefined,
  isLoading: false,
  isError: false,
  setMessages: () => {},
  addMessage: () => {},
  resetUnreadMessages: () => {},
  incrementUnreadMessage: () => {},
  setSelectedChatId: () => {},
});

const UnreadMessageContext = createContext<number>(0);

const ChatProvider = ({ children }: { children: ReactNode }) => {
  const [chats, setChats] = useState<ConversationRow[]>([]);
  const [chatLoading, setChatLoading] = useState<boolean>(true);
  const [chatError, setChatError] = useState<boolean>(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | undefined>(
    undefined
  );

  // ✅ New: Cached messages by chat_id
  const [cachedMessages, setCachedMessages] = useState<
    Record<number, Message[]>
  >({});

  const getChats = async (): Promise<
    AxiosResponse<{ chats: ConversationRow[] }>
  > => {
    return request({ url: "/coach/chats" });
  };

  const fetchMessagesFromAPI = async (chatId: number): Promise<Message[]> => {
    const res = await request({ url: `/coach/messages?chat_id=${chatId}` });
    return res.data.messages;
  };

  useEffect(() => {
    getChats()
      .then((res) => {
        setChats(res?.data?.chats);
      })
      .catch((err) => {
        console.log(err);
        setChatError(true);
      })
      .finally(() => {
        setChatLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedChatId) return;

    const cached = cachedMessages[selectedChatId];
    if (cached) {
      setMessages(cached);
    } else {
      setMessages([]);
    }

    fetchMessagesFromAPI(selectedChatId)
      .then((fetchedMessages) => {
        const cachedString = JSON.stringify(cached ?? []);
        const fetchedString = JSON.stringify(fetchedMessages);

        if (cachedString !== fetchedString) {
          setMessages(fetchedMessages);
          setCachedMessages((prev) => ({
            ...prev,
            [selectedChatId]: fetchedMessages,
          }));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedChatId]);

  const addMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);

    // ✅ Update cache too
    setCachedMessages((prev) => {
      const prevMessages = prev[message.chat_id] || [];
      return {
        ...prev,
        [message.chat_id]: [...prevMessages, message],
      };
    });

    if (message.chat_id !== selectedChatId) {
      incrementUnreadMessage(message.chat_id);
    }
  };

  const resetUnreadMessages = (chatId: number) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? { ...chat, hasUnReadMessages: false, unreadMessageCount: 0 }
          : chat
      )
    );
  };

  const incrementUnreadMessage = (chatId: number) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              hasUnReadMessages: true,
              unreadMessageCount: (chat.unreadMessageCount || 0) + 1,
            }
          : chat
      )
    );
  };

  const totalUnreadCount = useMemo(
    () => chats.reduce((sum, chat) => sum + (chat.unreadMessageCount ?? 0), 0),
    [chats]
  );

  return (
    <chatContext.Provider
      value={{
        chats,
        messages,
        selectedChatId,
        isLoading: chatLoading,
        isError: chatError,
        setMessages,
        addMessage,
        resetUnreadMessages,
        incrementUnreadMessage,
        setSelectedChatId,
      }}
    >
      <UnreadMessageContext.Provider value={totalUnreadCount}>
        {children}
      </UnreadMessageContext.Provider>
    </chatContext.Provider>
  );
};

export const useChatContext = () => useContext(chatContext);
export const useUnreadMessageContext = () => useContext(UnreadMessageContext);

export default ChatProvider;
