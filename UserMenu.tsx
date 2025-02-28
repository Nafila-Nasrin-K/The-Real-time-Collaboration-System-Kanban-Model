import React, { useState, useRef, useEffect } from 'react';
import { LogOut, UserCircle } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, users, logout, switchAccount } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <img
          src={user?.avatar}
          alt={user?.name}
          className="h-8 w-8 rounded-full"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <div className="px-4 py-2 text-sm text-gray-700">
              Signed in as<br />
              <span className="font-medium">{user?.email}</span>
            </div>
            <hr className="my-1" />
            <div className="py-1">
              <p className="px-4 py-2 text-xs font-semibold text-gray-500">
                Switch account
              </p>
              {users.map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    switchAccount(u.id);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="h-6 w-6 rounded-full"
                  />
                  <span>{u.name}</span>
                </button>
              ))}
            </div>
            <hr className="my-1" />
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 flex items-center space-x-2"
            >
              <LogOut size={16} />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;