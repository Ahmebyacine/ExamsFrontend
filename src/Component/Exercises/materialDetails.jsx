// AccountDetails.js
import React from 'react';
import { useFormContext } from './FormContext';

const MaterialDetails = ({ onNext, onPrev }) => {
  
  const { formData, handleChange } = useFormContext();

  const materials = [
    { label: 'math', value: 'math' },
    { label: 'physique', value: 'physique' },
    { label: 'chemical', value: 'chemical' }
  ];
  const units = [
    { label: 'unit 1', value: 'unit1' },
    { label: 'unit 2', value: 'unit2' },
    { label: 'unit 3', value: 'unit3' }
  ];
  const difficulty = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Material Details</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">Select material:</label>
        <select
          onChange={(e) => handleChange('material', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.material}
        >
          {materials.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">Select unit:</label>
        <select
          onChange={(e) => handleChange('unit', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          {units.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">Select difficulty:</label>
        <select
          onChange={(e) => handleChange('difficulty', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          {difficulty.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

export default MaterialDetails;
