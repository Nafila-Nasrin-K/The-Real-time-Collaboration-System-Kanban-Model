import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Admin {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AdminState {
  admin: Admin | null;
  isAdminAuthenticated: boolean;
  admins: Admin[];
  loginAdmin: (email: string, password: string) => { success: boolean; error?: string };
  logoutAdmin: () => void;
}

const ADMIN_CREDENTIALS = {
  email: 'admin@teamflow.com',
  password: 'admin123',
  name: 'System Admin',
  id: 'admin-1',
};

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      admin: null,
      isAdminAuthenticated: false,
      admins: [ADMIN_CREDENTIALS],
      loginAdmin: (email, password) => {
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
          set({
            admin: {
              id: ADMIN_CREDENTIALS.id,
              name: ADMIN_CREDENTIALS.name,
              email: ADMIN_CREDENTIALS.email,
              avatar: `https://api.dicebear.com/7.x/avatars/svg?seed=${ADMIN_CREDENTIALS.email}`,
            },
            isAdminAuthenticated: true,
          });
          return { success: true };
        }
        return { success: false, error: 'Invalid admin credentials' };
      },
      logoutAdmin: () => {
        set({ admin: null, isAdminAuthenticated: false });
      },
    }),
    {
      name: 'admin-storage',
    }
  )
);