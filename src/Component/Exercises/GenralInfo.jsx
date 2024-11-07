import { useFormContext } from './FormContext';

const GenralInfo = ({ onNext }) => {
  const { formData, handleChange } = useFormContext();

  const Levels = [
    { label: 'Primary 1', value: 'PR1' },
    { label: 'Primary 2', value: 'PR2' },
    { label: 'Primary 3', value: 'PR3' },
    { label: 'Primary 4', value: 'PR4' }
  ];
  const Trimesters = [
    { label: 'Trimester 1', value: 'Tri1' },
    { label: 'Trimester 2', value: 'Tri2' },
    { label: 'Trimester 3', value: 'Tri3' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Genral Information</h2>
      <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">Select Level:</label>
              <select
                onChange={(e) => handleChange('level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.level}
              >
                {Levels.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
      </div>
      <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">Select Trimester:</label>
              <select
                onChange={(e) => handleChange('Trimester', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.Trimester}
              >
                {Trimesters.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
      </div>

      <div className="flex justify-end">
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

export default GenralInfo;
