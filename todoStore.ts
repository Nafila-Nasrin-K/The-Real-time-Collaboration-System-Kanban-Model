import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Todo {
  id: string;
  content: string;
  assignee?: string;
  assigneeId?: string;
  status: 'todo' | 'inProgress' | 'done';
  completed: boolean;
  createdAt: Date;
  createdBy: string;
  dueDate?: Date;
  priority: 'low' | 'medium' | 'high';
}

interface TodoState {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  editTodo: (id: string, content: string) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodoStatus: (id: string, status: Todo['status']) => void;
  getTodosByAssignee: (assigneeId: string) => Todo[];
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: (todo) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              ...todo,
              id: Date.now().toString(),
              createdAt: new Date(),
            },
          ],
        })),
      editTodo: (id, content) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, content } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed, status: !todo.completed ? 'done' : 'todo' }
              : todo
          ),
        })),
      updateTodoStatus: (id, status) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, status } : todo
          ),
        })),
      getTodosByAssignee: (assigneeId) => {
        return get().todos.filter((todo) => todo.assigneeId === assigneeId);
      },
    }),
    {
      name: 'todo-storage',
    }
  )
);