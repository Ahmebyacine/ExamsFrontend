import { useLanguage } from '../../../utils/LanguageContext';
import ExecriseInput from './ExecriseInput';

const ExerciseDetails = ({ onNext, onPrev }) => {
  const { t } = useLanguage();
  
  return (
    <div>
      <ExecriseInput/>
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {t("Previous")}
        </button>
        <button
          onClick={onNext}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {t("Next")}
        </button>
      </div>
    </div>
  );
};

export default ExerciseDetails;