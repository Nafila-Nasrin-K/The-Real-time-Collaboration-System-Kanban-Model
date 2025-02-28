import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { useTodoStore } from '../../store/todoStore';
import { useAuthStore } from '../../store/authStore';
import { Plus } from 'lucide-react';

const TaskForm: React.FC = () => {
  const [newTask, setNewTask] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');

  const { admin } = useAdminStore();
  const { addTodo } = useTodoStore();
  const users = useAuthStore((state) => state.users);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() && selectedUser) {
      const user = users.find(u => u.id === selectedUser);
      addTodo({
        content: newTask,
        assignee: user?.name,
        assigneeId: selectedUser,
        status: 'todo',
        completed: false,
        createdBy: admin?.id || '',
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      });
      setNewTask('');
      setSelectedUser('');
      setDueDate('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Task Description
          </label>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter task description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Assign To
          </label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;