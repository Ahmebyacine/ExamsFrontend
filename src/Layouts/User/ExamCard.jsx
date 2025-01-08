import React, {useState,useRef,useEffect} from 'react';
import ExerciseView from '../../Component/ExerciseView';
import { useLanguage } from '../../Contexts/LanguageContext';
import {ChevronDown, ChevronUp } from 'lucide-react';

const ExamCard = ({exam}) => {
  const { t } = useLanguage();
  const divRef = useRef(null);
  const [fontSize, setFontSize] = useState(15.5);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

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

  const createdAtDate = new Date(exam.created_at);
  const formattedCreatedAt = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-0">{formattedCreatedAt}</h1>
      </div>
      {exam.exercises.map((exercise, i) => (
      <>
        <div className="rounded-md overflow-hidden">
              <button
                onClick={toggleDropdown}
                className="w-full px-4 sm:px-8 py-4 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-gray-400"
                aria-expanded={isOpen}
              >
                <span className="text-lg font-medium text-black">
                  <h4 className="ml-2 sm:text-2xl font-semibold mb-4 sm:mb-0" style={{ fontSize: `${fontSize + 2}px` }}>
                    {t("Exercise")}:{i + 1}
                  </h4>
                </span>
                {isOpen ? <ChevronUp className="h-5 w-5 text-gray-600" /> : <ChevronDown className="h-5 w-5 text-gray-600" />}
              </button>
              <div
                className={`px-4 sm:px-8 transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'
                } overflow-hidden`}
              >
                <div>
                  {exercise.exercise.map((item, itemIndex) => (
                    <React.Fragment key={itemIndex}>
                      <ExerciseView key={itemIndex} item={item} rtl={exercise.rtl} itemIndex={itemIndex} />
                    </React.Fragment>
                      ))}
                </div>
              </div>
        </div>
      </>
      ))}
      </div>
      </div>
      
    </>
  );
  
};

export default ExamCard;