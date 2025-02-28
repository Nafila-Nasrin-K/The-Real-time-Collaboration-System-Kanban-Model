import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { Shield } from 'lucide-react';
import AdminLoginForm from './AdminLoginForm';

const AdminLogin: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Shield className="h-12 w-12 text-indigo-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminLogin;