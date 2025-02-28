import React from 'react';
import { Trash2, Edit, Check, X, MoveRight, MoveLeft } from 'lucide-react';
import { useTodoStore, Todo } from '../store/todoStore';
import { useAuthStore } from '../store/authStore';

const TodoList: React.FC = () => {
  const { user } = useAuthStore();
  const { todos, editTodo, deleteTodo, toggleTodo, updateTodoStatus } = useTodoStore();
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editingContent, setEditingContent] = React.useState('');

  // Filter todos for the current user
  const userTodos = todos.filter(todo => todo.assigneeId === user?.id);

  const startEditing = (id: string, content: string) => {
    setEditingId(id);
    setEditingContent(content);
  };

  const saveEdit = (id: string) => {
    if (editingContent.trim()) {
      editTodo(id, editingContent);
      setEditingId(null);
    }
  };

  const moveTask = (todo: Todo, direction: 'forward' | 'backward') => {
    const statusOrder: Todo['status'][] = ['todo', 'inProgress', 'done'];
    const currentIndex = statusOrder.indexOf(todo.status);
    
    if (direction === 'forward' && currentIndex < statusOrder.length - 1) {
      updateTodoStatus(todo.id, statusOrder[currentIndex + 1]);
    } else if (direction === 'backward' && currentIndex > 0) {
      updateTodoStatus(todo.id, statusOrder[currentIndex - 1]);
    }
  };

  const filterTodosByStatus = (status: Todo['status']) => 
    userTodos.filter(todo => todo.status === status);

  const renderTodoColumn = (status: Todo['status'], title: string) => (
    <div className="flex-1 min-w-[300px] bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <div className="space-y-2">
        {filterTodosByStatus(status).map((todo) => (
          <div
            key={todo.id}
            className="bg-white p-4 rounded-lg shadow-sm"
          >
            {editingId === todo.id ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  className="flex-1 px-3 py-1 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="text-green-600 hover:text-green-700"
                >
                  <Check size={20} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleTodo(todo.id)}
                      className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                      {todo.content}
                    </span>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                    todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {todo.priority}
                  </span>
                </div>
                {todo.dueDate && (
                  <p className="text-sm text-gray-500 mt-1">
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    {status !== 'todo' && (
                      <button
                        onClick={() => moveTask(todo, 'backward')}
                        className="text-gray-600 hover:text-gray-700"
                      >
                        <MoveLeft size={18} />
                      </button>
                    )}
                    {status !== 'done' && (
                      <button
                        onClick={() => moveTask(todo, 'forward')}
                        className="text-gray-600 hover:text-gray-700"
                      >
                        <MoveRight size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        {renderTodoColumn('todo', 'To Do')}
        {renderTodoColumn('inProgress', 'In Progress')}
        {renderTodoColumn('done', 'Done')}
      </div>
    </div>
  );
};

export default TodoList;