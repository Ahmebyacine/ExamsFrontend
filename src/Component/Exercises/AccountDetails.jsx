// AccountDetails.js
import React from 'react';
import { useFormContext } from './FormContext';

const AccountDetails = ({ onNext, onPrev }) => {
  const { formData, handleChange } = useFormContext();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Account Details</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Choose a username"
          value={formData.username}
          onChange={(e) => handleChange('username', e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Choose a password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
        />
      </div>
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AccountDetails;
