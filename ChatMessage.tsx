import React from 'react';
import { File } from 'lucide-react';
import { Message } from '../../store/chatStore';

interface ChatMessageProps {
  message: Message;
  isOwnMessage: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage }) => {
  return (
    <div
      className={`flex mb-4 ${
        isOwnMessage ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`max-w-xs md:max-w-md ${
          isOwnMessage ? 'bg-indigo-600 text-white' : 'bg-gray-100'
        } px-4 py-2 rounded-lg`}
      >
        <p className="text-sm font-medium mb-1">{message.sender}</p>
        <p>{message.text}</p>
        {message.attachments?.map((attachment, index) => (
          <div key={index} className="mt-2">
            {attachment.type === 'image' ? (
              <img
                src={attachment.url}
                alt={attachment.name}
                className="max-w-full rounded"
              />
            ) : (
              <a
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm underline"
              >
                <File size={16} />
                <span>{attachment.name}</span>
              </a>
            )}
          </div>
        ))}
        <p className="text-xs mt-1 opacity-75">
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;