import ExamCardCreator from './ExamCardCreator';
import { useFormContext } from './FormContext';

const ExerciseDetails = ({ onNext, onPrev }) => {
  
  const { formData, handleChange } = useFormContext();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Material Details</h2>
      <ExamCardCreator/>
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

export default ExerciseDetails;