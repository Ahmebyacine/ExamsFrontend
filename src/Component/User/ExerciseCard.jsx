import React, {useState,useRef,useEffect} from 'react';
import {Heart,Plus,Check,ChevronDown, ChevronUp } from 'lucide-react';
import  {Snackbar}  from '@mui/material';
import StatusModal from '../UI/StatusModal';
import ExerciseView from '../UI/ExerciseView';
import api from '../utils/api';
import { useLanguage } from '../utils/LanguageContext';

const ExerciseCard = ({exercise,favexercises,setFavexercises,setAddedExercises, addedExercises}) => {
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


  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleAddFavorit = async () => {
    try {
      await api.post('/api/user/favorites/add', {exerciseId: exercise._id});
      setSnackbarMessage('added to favorit successfully.');
      setSnackbarOpen(true);
      setFavexercises((prevIds) => {
        if (!prevIds.includes(exercise._id)) {
          return [...prevIds, exercise._id];
        }
        return prevIds;
      });
    } catch (error) {
      console.error("Error added to favorit service:", error);
      setError('Exercises has not added to favorit');
      setIsErrorOpen(true);
    }
  };
  const handleDeleteFavorit = async () => {
    try {
      await api.post('/api/user/favorites/delete', {exerciseId: exercise._id});
      setSnackbarMessage('deleted from favorit successfully.');
      setSnackbarOpen(true);
      setFavexercises((prevIds) => prevIds.filter((existingId) => existingId !== exercise._id));
    } catch (error) {
      console.error("Error added to favorit service:", error);
      setError('Exercises has not delete from favorit');
      setIsErrorOpen(true);
    }
  };


  const handleAddExam = async () => {
    try {
      await api.post('/api/user/current/add',{exerciseId: exercise._id});
      setSnackbarMessage('the exercise add to exam successfully!');
      setSnackbarOpen(true);
      setAddedExercises((prevIds) => {
        if (!prevIds.includes(exercise._id)) {
          return [...prevIds, exercise._id];
        }
        return prevIds;
      });
    } catch (error) {
      console.error("Error Aadded in your exam Exercises:", error);
      setError('Exercise has not Aadded in your exam');
      setIsErrorOpen(true);
    }
  };
  const handleDeleteExam = async () => {
    try {
      await api.post('/api/user/current/delete',{exerciseId: exercise._id});
      setSnackbarMessage('the exercise from from exam successfully!');
      setSnackbarOpen(true);
      setAddedExercises((prevIds) => prevIds.filter((existingId) => existingId !== exercise._id));
    } catch (error) {
      console.error("Error Aadded in your exam Exercises:", error);
      setError('Exercise has not deleted from your exam');
      setIsErrorOpen(true);
    }
  };
  return (
    <>
      <div
        key={exercise._id}
        ref={divRef}
        className="w-full max-w-[794px] mx-auto bg-white border border-gray-300 rounded-lg shadow-lg mb-8"
        style={{ fontSize: `${fontSize}px` }}
      >
        <div className="exercise-section pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">{exercise.title}</h1>
          <div className="flex gap-2">
            {favexercises.includes(exercise._id) ? (
              <button
                onClick={handleDeleteFavorit}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-secondColor hover:border-firstColor hover:text-accent-foreground h-12 w-12 sm:h-10 sm:w-10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none transition-colors"
                aria-label="Remove from favorites"
              >
                <Heart color="#f50000" fill="red" />
              </button>
            ) : (
              <button
                onClick={handleAddFavorit}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-secondColor hover:border-firstColor hover:text-accent-foreground h-12 w-12 sm:h-10 sm:w-10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none transition-colors"
                aria-label="Add to favorites"
              >
                <Heart />
              </button>
            )}
            {addedExercises.includes(exercise._id) ? (
              <button
                onClick={handleDeleteExam}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-secondColor hover:border-firstColor hover:text-accent-foreground h-12 w-12 sm:h-10 sm:w-10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none transition-colors"
                aria-label="Remove from exam"
              >
                <Check />
              </button>
            ) : (
              <button
                onClick={handleAddExam}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-secondColor hover:border-firstColor hover:text-accent-foreground h-12 w-12 sm:h-10 sm:w-10 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none transition-colors"
                aria-label="Add to exam"
              >
                <Plus />
              </button>
            )}
          </div>
        </div>
          <div>
            {exercise.exercise.map((item, itemIndex) => (
              <React.Fragment key={itemIndex}>
                <ExerciseView key={itemIndex} item={item} rtl={exercise.rtl} itemIndex={itemIndex} />
              </React.Fragment>
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
        </div>
      </div>
      {error && (
        <StatusModal
          type="error"
          title="Error Occurred"
          message={error}
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
    </>
  );
  
};

export default ExerciseCard;