import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';

const AdminDashboard = () => {
    return (
      <AdminLayout>
        <h1 className="text-2xl font-bold text-indigo-700 mb-4">Dashboard</h1>
        <p>Welcome to the Admin Panel!</p>
      </AdminLayout>
    );
};

export default AdminDashboard;