import { useFormContext } from './FormContext';
import getFormName from '../../../utils/getFormName';
import StatusModal from '../../../UI/StatusModal';
import  {Snackbar}  from '@mui/material';
import { useLanguage } from '../../../utils/LanguageContext';

const Confirmation = ({ onPrev }) => {
  const { t } = useLanguage();
  const { 
    formData,
    sections,
    handleSubmit,
    levels,
    filteredMatriels,
    filteredUnits,
    errorAdding,
    snackbarOpen,
    setSnackbarOpen,
    snackbarMessage,
    isErrorOpen,
    setIsErrorOpen } = useFormContext();
  const levelName = getFormName(formData.level,levels);
  const materialName = getFormName(formData.material,filteredMatriels);
  const unitName = getFormName(formData.unit,filteredUnits);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{t("Confirmation")}</h2>
      <p className="mb-4">{t("confirmationMsg")}</p>
      <ul className="list-disc list-inside mb-4">
        <li>{t("Level")}: {levelName}</li>
        <li>{t("Trimester")}: {formData.Trimester}</li>
        <li>{t("Matriel")}: {materialName}</li>
        <li>{t("Unit")}: {unitName}</li>
        <li>{t("Difficulty")}: {formData.difficulty}</li>
      </ul>
      <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{t("The_Exercise")}</h2>
      
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="p-4 mb-4 bg-gray-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">{t("Section")} {sectionIndex + 1}</h3>
          
          <p><strong>{t("Content")}:</strong> {section.content || 'No content provided'}</p>
          
          <p><strong>{t("Image_Position")}:</strong> {section.imagePosition}</p>
          
          <p><strong>{t("images")}:</strong> 
          <div className="w-2/3 mx-auto flex">
          {section.image && 
          <img 
            className={`${section.image && section.secondImage ? 'w-1/2 m-3 my-auto' : 'w-2/3 mx-auto' }`}           
            src={section.image} 
            alt="Section" /> 
          }
          {section.secondImage && 
          <img 
            className={`${section.image && section.secondImage ? 'w-1/2 m-3 my-auto' : 'w-2/3 mx-auto' }`}
            src={section.secondImage} 
            alt="Section" /> 
          }
          </div>
          
          </p>
          
          <div className="mt-4">
            <h4 className="font-medium">{t("Questions")}:</h4>
            {section.questions.length > 0 ? (
              section.questions.map((q, questionIndex) => (
                <div key={questionIndex} className="ml-4 my-2">
                  <p><strong>{t("Question")} {questionIndex + 1}:</strong> {q.question}</p>
                  <p><strong>{t("Answer")}:</strong> {q.answer}</p>
                </div>
              ))
            ) : (
              <p>{t("noQuestion")}</p>
            )}
          </div>
        </div>
      ))}
    </div>
      <div className="flex justify-between">
        <button
          onClick={onPrev}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {t("Previous")}
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {t("Submit")}
        </button>
      </div>
      { isErrorOpen && (
            <StatusModal
              type="error"
              title="Error Occurredr"
              message={errorAdding}
              isOpen={isErrorOpen}
              onClose={() => setIsErrorOpen(false)}
            />
             )}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Confirmation;