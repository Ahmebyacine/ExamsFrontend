// Confirmation.js
import React from 'react';
import { useFormContext } from './FormContext';

const Confirmation = ({ onPrev }) => {
  const { formData } = useFormContext();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
      <p className="mb-4">Please review your information before submitting:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Name: {formData.name}</li>
        <li>Email: {formData.email}</li>
        <li>Username: {formData.username}</li>
      </ul>
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Previous
        </button>
        <button
          onClick={() => alert('Form submitted!')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
