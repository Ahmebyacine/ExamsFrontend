import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
    <p className="mt-4">You do not have permission to view this page.</p>
    <Link to="/login" className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded">Go Home</Link>
  </div>
);

export default Unauthorized;