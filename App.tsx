import React, { useState } from 'react';
import { MessageSquare, CheckSquare } from 'lucide-react';
import ChatModule from './components/ChatModule';
import TodoList from './components/TodoList';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import AdminLogin from './components/Admin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserMenu from './components/UserMenu';
import { useAuthStore } from './store/authStore';
import { useAdminStore } from './store/adminStore';

function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'todo'>('chat');
  const [showLogin, setShowLogin] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAdminAuthenticated = useAdminStore((state) => state.isAdminAuthenticated);

  if (isAdminAuthenticated) {
    return <AdminDashboard />;
  }

  if (!isAuthenticated && !isAdminAuthenticated) {
    if (isAdminLogin) {
      return (
        <div>
          <AdminLogin />
          <button
            onClick={() => setIsAdminLogin(false)}
            className="fixed bottom-4 right-4 text-sm text-indigo-600 hover:text-indigo-500"
          >
            Switch to User Login
          </button>
        </div>
      );
    }

    return (
      <div>
        {showLogin ? (
          <LoginForm onToggleForm={() => setShowLogin(false)} />
        ) : (
          <RegisterForm onToggleForm={() => setShowLogin(true)} />
        )}
        <button
          onClick={() => setIsAdminLogin(true)}
          className="fixed bottom-4 right-4 text-sm text-indigo-600 hover:text-indigo-500"
        >
          Admin Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold">TeamFlow</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                    activeTab === 'chat'
                      ? 'bg-indigo-700'
                      : 'hover:bg-indigo-500'
                  }`}
                >
                  <MessageSquare size={20} />
                  <span>Chat</span>
                </button>
                <button
                  onClick={() => setActiveTab('todo')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md ${
                    activeTab === 'todo'
                      ? 'bg-indigo-700'
                      : 'hover:bg-indigo-500'
                  }`}
                >
                  <CheckSquare size={20} />
                  <span>To-Do List</span>
                </button>
              </div>
            </div>
            <UserMenu />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'chat' ? <ChatModule /> : <TodoList />}
      </main>
    </div>
  );
}

export default App;