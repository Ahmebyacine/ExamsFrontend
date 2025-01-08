import Trimesters from '../../../../Assets/Data/Trimesters';
import { useFormContext } from '../../../../Contexts/FormExerciseContext';
import { useLanguage } from '../../../../Contexts/LanguageContext';

const GenralInfo = ({ onNext }) => {
  const { t } = useLanguage();
  const { formData, handleChange,levels,setSelectedLevel } = useFormContext();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t("Genral_Information")}</h2>
      <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">{t("Select_Level")}:</label>
              <select
                onChange={(e)=>{
                  const value =e.target.value;
                  handleChange('level', value);
                  setSelectedLevel(value);
              }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.level}
              >
                {levels.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
      </div>
      <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">{t("Select_Trimester")}:</label>
              <select
                onChange={(e) => handleChange('Trimester', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={formData.Trimester}
              >
                {Trimesters.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
      </div>

      <div className="flex justify-end">
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

export default GenralInfo;