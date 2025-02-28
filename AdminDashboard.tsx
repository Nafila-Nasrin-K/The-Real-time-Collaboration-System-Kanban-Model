import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { useTodoStore } from '../../store/todoStore';
import { useAuthStore } from '../../store/authStore';
import { Plus, Shield, LogOut } from 'lucide-react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const AdminDashboard: React.FC = () => {
  const { admin, logoutAdmin } = useAdminStore();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold">Admin Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{admin?.name}</span>
              <button
                onClick={logoutAdmin}
                className="flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <TaskForm />
          <TaskList />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;