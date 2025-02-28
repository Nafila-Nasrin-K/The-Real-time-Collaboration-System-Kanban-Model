import React from 'react';
import { Plus, Search } from 'lucide-react';
import { Chat } from '../../store/chatStore';
import { format } from 'date-fns';

interface ChatSidebarProps {
  chats: Chat[];
  activeChat: string | null;
  onChatSelect: (chatId: string) => void;
  onCreateGroup: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  chats,
  activeChat,
  onChatSelect,
  onCreateGroup,
}) => {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200">
      <div className="p-4">
        <button
          onClick={onCreateGroup}
          className="w-full mb-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          <span>New Group</span>
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
      </div>
      <div className="overflow-y-auto">
        {chats.map((chat) => {
          const lastMessage = chat.messages[chat.messages.length - 1];
          
          return (
            <div
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              className={`px-4 py-3 cursor-pointer ${
                activeChat === chat.id ? 'bg-indigo-50' : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="h-10 w-10 rounded-full"
                  />
                  {chat.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="font-medium truncate">{chat.name}</p>
                    {lastMessage && (
                      <p className="text-xs text-gray-500">
                        {format(lastMessage.timestamp, 'HH:mm')}
                      </p>
                    )}
                  </div>
                  {lastMessage && (
                    <p className="text-sm text-gray-500 truncate">
                      {lastMessage.sender}: {lastMessage.text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSidebar;