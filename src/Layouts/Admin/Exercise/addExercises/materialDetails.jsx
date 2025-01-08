import difficulty from '../../../../Assets/Data/difficulty';
import { useLanguage } from '../../../../Contexts/LanguageContext';
import { useFormContext } from '../../../../Contexts/FormExerciseContext';

const MaterialDetails = ({ onNext, onPrev }) => {
  const { t } = useLanguage();
  
  const { formData, handleChange,filteredMatriels, filteredUnits,setSelectedMatriel } = useFormContext();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t("Material_Details")}</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">{t("Select_material")}:</label>
        <select
          onChange={(e)=> {
            const value =e.target.value;
            handleChange('material',value);
            setSelectedMatriel(value);
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={formData.material}
        >
          {filteredMatriels.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">{t("Select_unit")}:</label>
        <select
          onChange={(e) => handleChange('unit', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          {filteredUnits.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">{t("Select_difficulty")}:</label>
        <select
          onChange={(e) => handleChange('difficulty', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          {difficulty.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
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

export default MaterialDetails;