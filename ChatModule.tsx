import React, { useState, useRef, useEffect } from 'react';
import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';
import ChatSidebar from './chat/ChatSidebar';
import ChatMessage from './chat/ChatMessage';
import MessageInput from './chat/MessageInput';
import CreateGroupModal from './CreateGroupModal';

const ChatModule: React.FC = () => {
  const { chats, activeChat, setActiveChat, addMessage } = useChatStore();
  const { user } = useAuthStore();
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find((chat) => chat.id === activeChat);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  const handleSendMessage = (text: string, attachments: File[]) => {
    if (!activeChat) return;

    const message = {
      text: text.trim(),
      sender: user?.name || 'Anonymous',
      senderId: user?.id || '1',
      attachments: attachments.map((file) => ({
        type: file.type.startsWith('image/') ? 'image' : 'document',
        url: URL.createObjectURL(file),
        name: file.name,
      })),
    };

    addMessage(activeChat, message);
  };

  return (
    <div className="flex h-[calc(100vh-7rem)] bg-white rounded-lg shadow-lg overflow-hidden">
      <ChatSidebar
        chats={chats}
        activeChat={activeChat}
        onChatSelect={setActiveChat}
        onCreateGroup={() => setShowCreateGroup(true)}
      />

      {activeChat ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="px-6 py-4 border-b">
            <div className="flex items-center space-x-3">
              <img
                src={currentChat?.avatar}
                alt={currentChat?.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h3 className="font-medium">{currentChat?.name}</h3>
                <p className="text-sm text-gray-500">
                  {currentChat?.type === 'group'
                    ? `${currentChat.participants.length} members`
                    : 'Direct Message'}
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            {currentChat?.messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isOwnMessage={message.senderId === user?.id}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Select a chat to start messaging</p>
        </div>
      )}

      {showCreateGroup && (
        <CreateGroupModal onClose={() => setShowCreateGroup(false)} />
      )}
    </div>
  );
};

export default ChatModule;