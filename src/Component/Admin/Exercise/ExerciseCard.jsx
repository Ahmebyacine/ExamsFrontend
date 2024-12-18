import {useState,useRef,useEffect} from 'react';
import api from '../../utils/api';
import {Pencil,Trash,ChevronDown, ChevronUp } from 'lucide-react';
import StatusModal from '../../UI/StatusModal';
import  {Snackbar}  from '@mui/material';
import ConfirmationModal from '../../UI/ConfirmationModal';
import EditExercise from './EditExercise';
import ExerciseView from '../../UI/ExerciseView';
import { useLanguage } from '../../utils/LanguageContext';

const ExerciseCard = ({exercise, RenderComponent}) => {
  const { t } = useLanguage();
  const divRef = useRef(null);
  const [fontSize, setFontSize] = useState(15.5);

  useEffect(() => {
    const updateFontSize = () => {
      if (divRef.current) {
        const divWidth = divRef.current.offsetWidth;
        const a4Width = 780;
        const newFontSize = 15.5 * (divWidth / a4Width);
        setFontSize(newFontSize);
      }
    };

    updateFontSize();
    window.addEventListener('resize', updateFontSize);
    return () => window.removeEventListener('resize', updateFontSize);
  }, [divRef]);

  const [formData, setFormData] = useState(exercise);
  const [originalData, setOriginalData] = useState(exercise);

  const [isEditing, setIsEditing] = useState(false);

  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleEdit = () => {
    setIsEditing(true);
    setOriginalData(formData);
  };


  const handleSave = async () => {
    try {
      await api.put(`/api/exercises/${exercise._id}`, formData);
      setOriginalData(formData);
      setIsEditing(false);
      setIsUpdateModalOpen(false);
      setSnackbarMessage('Exercises has been Updated successfully.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating service:", error);
      setError('Exercises has not updating');
      setIsErrorOpen(true);
    }
  };


  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/exercises/${exercise._id}`);
      setSnackbarMessage('Exercises deleted successfully.');
      setSnackbarOpen(true);
      setTimeout(RenderComponent,1500);
    } catch (error) {
      console.error("Error deleting Exercises:", error);
      setError('Exercises has not deleted');
      setIsErrorOpen(true);
    }
  };
    return (
       <>
        <div 
          key={exercise._id}
          ref={divRef}
          className="w-full max-w-[794px] mx-auto bg-white border border-gray-300 rounded-lg shadow-lg mb-8"
          style={{ fontSize: `${fontSize}px` }}>
            <div className="exercise-section pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6">
              <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">{originalData.title}</h1>
              {isEditing ? (
               <div className='mr-8'>
                 <button
                   onClick={()=> setIsUpdateModalOpen(true)}
                   className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-blue-400 hover:bg-bink-600 text-white h-8 w-20"
                 >
                   {t("Save")}
                 </button>
                 <button
                   onClick={handleCancel}
                   className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-gray-500 hover:bg-gray-600 text-white h-8 w-20"
                 >
                   {t("Cancel")}
                 </button>
               </div>
             ) : (
               <div className='mr-8'>
                 <button 
                   onClick={handleEdit}
                   className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondColor hover:border-firstColor hover:text-accent-foreground h-10 w-10">
                   <Pencil />
                 </button>
                 <button 
                   onClick={()=> setIsDeleteModalOpen(true)}
                   className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondColor hover:border-firstColor hover:text-accent-foreground h-10 w-10">
                   <Trash />
                 </button>
               </div>
             )}
              </div>
              {isEditing ? (
                <EditExercise key={exercise._id} formData={formData} setFormData={setFormData} />
              ) : (
                <div>
                  {originalData.exercise.map((item, itemIndex) => (
                    <>
                    <ExerciseView key={itemIndex} item={item} itemIndex={itemIndex} />
                    </>
                  ))}
                  <div className="bg-gray-300 rounded-md overflow-hidden">
              <button
                onClick={toggleDropdown}
                className="w-full px-4 sm:px-8 py-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-expanded={isOpen}
              >
                <span className="text-lg font-medium text-black">{t("Exercise_Details")}</span>
                {isOpen ? <ChevronUp className="h-5 w-5 text-gray-600" /> : <ChevronDown className="h-5 w-5 text-gray-600" />}
              </button>
              <div
                className={`px-4 sm:px-8 transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-600">{t("Level")}</dt>
                    <dd className="text-base sm:text-lg text-black mt-1">{exercise.level.name}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-600">{t("Matriel")}</dt>
                    <dd className="text-base sm:text-lg text-black mt-1">{exercise.material.name}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-600">{t("Difficulty")}</dt>
                    <dd className="text-base sm:text-lg text-black mt-1">{exercise.difficulty}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-600">{t("Trimester")}</dt>
                    <dd className="text-base sm:text-lg text-black mt-1">{exercise.Trimester}</dd>
                  </div>
                  <div className="flex flex-col">
                    <dt className="text-sm font-medium text-gray-600">{t("Unit")}</dt>
                    <dd className="text-base sm:text-lg text-black mt-1">{exercise.unit.name}</dd>
                  </div>
                </dl>
              </div>
            </div>
                </div>
              )}
            </div>
        </div>
        { error && (
            <StatusModal
              type="error"
              title="Error Occurredr"
              message={error}
              isOpen={isErrorOpen}
              onClose={() => setIsErrorOpen(false)}
            />
             )}
        <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        confirmColor="#f44336"
      />

      <ConfirmationModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleSave}
        title="Confirm Update"
        message="Are you sure you want to change this service?"
        confirmText="Update"
        confirmColor="#db2777"
      />
       
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
      </>
      );
};

export default ExerciseCard;