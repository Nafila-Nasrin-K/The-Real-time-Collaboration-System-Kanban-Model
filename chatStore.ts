import { create } from 'zustand';

export interface Message {
  id: string;
  text: string;
  sender: string;
  senderId: string;
  timestamp: Date;
  read: boolean;
  attachments?: Array<{
    type: 'image' | 'document' | 'pdf';
    url: string;
    name: string;
  }>;
}

export interface Chat {
  id: string;
  name: string;
  type: 'direct' | 'group';
  participants: string[];
  avatar?: string;
  messages: Message[];
  unreadCount: number;
  lastMessage?: Message;
}

interface ChatState {
  chats: Chat[];
  activeChat: string | null;
  setActiveChat: (chatId: string) => void;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp' | 'read'>) => void;
  createGroupChat: (name: string, participants: string[]) => void;
  markChatAsRead: (chatId: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chats: [
    {
      id: '1',
      name: 'Development Team',
      type: 'group',
      participants: ['1', '2', '3'],
      unreadCount: 2,
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      messages: [
        {
          id: '1',
          text: "Hey team, how is the progress on the new features?",
          sender: 'John Doe',
          senderId: '1',
          timestamp: new Date('2024-03-10T10:00:00'),
          read: false,
        },
      ],
    },
    {
      id: '2',
      name: 'Marketing Team',
      type: 'group',
      participants: ['1', '4', '5'],
      unreadCount: 0,
      avatar: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      messages: [],
    },
    {
      id: '3',
      name: 'Sarah Wilson',
      type: 'direct',
      participants: ['1', '2'],
      unreadCount: 3,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      messages: [],
    },
  ],
  activeChat: null,
  setActiveChat: (chatId) => 
    set((state) => {
      // Mark all messages as read when opening the chat
      const updatedChats = state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              unreadCount: 0,
              messages: chat.messages.map((msg) => ({ ...msg, read: true })),
            }
          : chat
      );
      return { activeChat: chatId, chats: updatedChats };
    }),
  addMessage: (chatId, message) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                {
                  ...message,
                  id: Date.now().toString(),
                  timestamp: new Date(),
                  read: chat.id === state.activeChat,
                },
              ],
              unreadCount:
                chat.id === state.activeChat
                  ? chat.unreadCount
                  : chat.unreadCount + 1,
            }
          : chat
      ).sort((a, b) => {
        const aTime = a.messages[a.messages.length - 1]?.timestamp.getTime() || 0;
        const bTime = b.messages[b.messages.length - 1]?.timestamp.getTime() || 0;
        return bTime - aTime;
      }),
    })),
  createGroupChat: (name, participants) =>
    set((state) => ({
      chats: [
        {
          id: Date.now().toString(),
          name,
          type: 'group',
          participants,
          messages: [],
          unreadCount: 0,
          avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        ...state.chats,
      ],
    })),
  markChatAsRead: (chatId) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              unreadCount: 0,
              messages: chat.messages.map((msg) => ({ ...msg, read: true })),
            }
          : chat
      ),
    })),
}));