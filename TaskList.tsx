import React from 'react';
import { useTodoStore } from '../../store/todoStore';
import TaskStatusBadge from '../shared/TaskStatusBadge';
import PriorityBadge from '../shared/PriorityBadge';

const TaskList: React.FC = () => {
  const { todos } = useTodoStore();

  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">All Tasks</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {todos.map((todo) => (
            <li key={todo.id} className="px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{todo.content}</p>
                  <p className="text-sm text-gray-500">Assigned to: {todo.assignee}</p>
                  {todo.dueDate && (
                    <p className="text-sm text-gray-500">
                      Due: {new Date(todo.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <PriorityBadge priority={todo.priority} />
                  <TaskStatusBadge status={todo.status} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;