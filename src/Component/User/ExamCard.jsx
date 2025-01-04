import React, {useState,useRef,useEffect} from 'react';
import ExerciseView from '../UI/ExerciseView';
import { useLanguage } from '../utils/LanguageContext';

const ExamCard = ({exam}) => {
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


  return (
    <>
      <div
      key={exam._id}
      ref={divRef}
      className="w-full max-w-[794px] mx-auto bg-white border border-gray-300 rounded-lg shadow-lg mb-8"
      style={{ fontSize: `${fontSize}px` }}
      >
      <div className="exam-section pt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">{exam.created_at}</h1>
      </div>
      {exam.exercises.map((exercise, i) => (
      <>
        <h4 className="ml-2 sm:text-2xl font-semibold mb-4 sm:mb-0"
        style={{ fontSize: `${fontSize + 2}px` }}
        >{t("Exercise")}:{i + 1}</h4>
        <div>
          {exercise.exercise.map((item, itemIndex) => (
            <React.Fragment key={itemIndex}>
              <ExerciseView key={itemIndex} item={item} rtl={exam.exerecise.rtl} itemIndex={itemIndex} />
            </React.Fragment>
              ))}
        </div>
      </>
      ))}
      </div>
      </div>
      
    </>
  );
  
};

export default ExamCard;