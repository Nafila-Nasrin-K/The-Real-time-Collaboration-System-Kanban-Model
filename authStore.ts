import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  users: User[];
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  switchAccount: (userId: string) => void;
}

interface StoredUser extends User {
  password: string;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      users: [],
      login: (email, password) => {
        const users = get().users as StoredUser[];
        const user = users.find(
          (u) => u.email === email && (u as StoredUser).password === password
        );

        if (!user) {
          return { success: false, error: 'Invalid email or password' };
        }

        const { password: _, ...userWithoutPassword } = user;
        set({ user: userWithoutPassword, isAuthenticated: true });
        return { success: true };
      },
      register: (name, email, password) => {
        const users = get().users as StoredUser[];
        
        if (users.some((u) => u.email === email)) {
          return { success: false, error: 'Email already registered' };
        }

        const newUser: StoredUser = {
          id: Date.now().toString(),
          name,
          email,
          password,
          avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${email}`,
        };

        set((state) => ({
          users: [...state.users, newUser],
          user: { id: newUser.id, name: newUser.name, email: newUser.email, avatar: newUser.avatar },
          isAuthenticated: true,
        }));

        return { success: true };
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      switchAccount: (userId) => {
        const users = get().users;
        const newUser = users.find((u) => u.id === userId);
        if (newUser) {
          set({ user: newUser, isAuthenticated: true });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);