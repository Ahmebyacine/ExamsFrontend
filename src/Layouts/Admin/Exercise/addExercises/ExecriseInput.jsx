import React from 'react';
import ImageManager from '../../../../Component/ImageManager';
import { useFormContext } from '../../../../Contexts/FormExerciseContext';
import { useLanguage } from '../../../../Contexts/LanguageContext';
import Switch from '@mui/material/Switch';

const positionOptions = [
  { label: 'Left', value: 'left' },
  { label: 'Right', value: 'right' },
  { label: 'Bottom', value: 'bottom' },
  { label: 'Top', value: 'top' },
];

const twoImageOptions = [
  { label: 'Bottom', value: 'bottom' },
  { label: 'Top', value: 'top' },
];

const ExecriseInput=() => {
  const { t } = useLanguage();
  const { sections, setSections,formData, handleChange } = useFormContext();

  const handleSectionChange = (index, field, value) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  const handleQuestionChange = (sectionIndex, questionIndex, field, value) => {
    const updatedSections = sections.map((section, i) => {
      if (i === sectionIndex) {
        const updatedQuestions = section.questions.map((q, j) =>
          j === questionIndex ? { ...q, [field]: value } : q
        );
        return { ...section, questions: updatedQuestions };
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleAddQuestion = (sectionIndex) => {
    const updatedSections = sections.map((section, i) =>
      i === sectionIndex
        ? { ...section, questions: [...section.questions, { question: '', answer: '' }] }
        : section
    );
    setSections(updatedSections);
  };

  const handleRemoveQuestion = (sectionIndex, questionIndex) => {
    const updatedSections = sections.map((section, i) => {
      if (i === sectionIndex) {
        const updatedQuestions = section.questions.filter((_, j) => j !== questionIndex);
        return { ...section, questions: updatedQuestions };
      }
      return section;
    });
    setSections(updatedSections);
  };
  const handleImageUpload = (index,imageKey, event) => {  
    const files = event.target.files;
  
    if (files && files.length > 0) {
      const updatedSections = [...sections];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        updatedSections[index] = {
          ...updatedSections[index],
          [imageKey]: e.target.result,
        };
        setSections(updatedSections);
      };
      reader.readAsDataURL(files[0]);
    }
  };
  const handleDeleteImage = (index, imageKey) => {
    const updatedSections = [...sections];
    updatedSections[index] = {
      ...updatedSections[index],
      [imageKey]: null,
    };
  
    setSections(updatedSections);
  };
  const handleAddSection = () => {
    setSections([
      ...sections,
      { content: '', 
      questions: [{ question: '', answer: '' }],
      image: null,
      secondImage:null, 
      imagePosition: 'bottom' },
    ]);
  };

  const handleRemoveSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };
 const exerciseDirection = formData.rtl ?"rtl" : "ltr";
  return (
    <div className="mx-auto my-10 py-8 bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{t("addExercise")}</h2>
      <form className="space-y-8">
        <div className='flex items-center justify-between'>
        <div>Arabic direction(Right to Left)</div>
        <Switch
          checked={formData.rtl}
          onChange={(e) => handleChange('rtl', e.target.checked)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        </div>
        <div>
           <label className="block text-sm font-medium text-gray-700 mb-2">{t("Title")}:</label>
           <input
             type="text"
             value={formData.title}
             dir={exerciseDirection}
             onChange={(e) => handleChange('title', e.target.value)}
             className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
             placeholder="Enter content"
           />
         </div>
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-6 rounded-lg shadow-inner">
            <div>
              <h1 className='text-xl font-bold text-center'>{t("Section")} {sectionIndex+1}</h1>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t("Content")}:</label>
              <textarea
                value={section.content}
                dir={exerciseDirection}
                onChange={(e) => handleSectionChange(sectionIndex, 'content', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Enter content"
              />
            </div>
  
            {section.questions.map((q, questionIndex) => (
              <div key={questionIndex} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("Question")} {questionIndex+1}:</label>
                  <textarea
                    value={q.question}
                    dir={exerciseDirection}
                    onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, 'question', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows="1"
                    placeholder="Enter question"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t("Answer")} {questionIndex+1}:</label>
                  <textarea
                    value={q.answer}
                    dir={exerciseDirection}
                    onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, 'answer', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows="1"
                    placeholder="Enter answer"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(sectionIndex, questionIndex)}
                  className="text-sm text-red-600 hover:text-red-800 mt-2"
                >
                  {t("rmQuestion")} {questionIndex+1}
                </button>
              </div>
            ))}
  
            <button
              type="button"
              onClick={() => handleAddQuestion(sectionIndex)}
              className="text-sm text-blue-600 hover:text-blue-800 mt-4"
            >
              {t("Add_Question")} {section.questions.length+1}
            </button>
            <div className="flex justify-center">
              <div className="m-3 my-auto">
               <ImageManager
                 image={section.image}
                 onDelete={() => handleDeleteImage(sectionIndex, 'image')}
                 onUpload={(event) => handleImageUpload(sectionIndex, 'image', event)}
               />
              </div>
              <div className="m-3 my-auto">
               <ImageManager
                 image={section.secondImage}
                 onDelete={() => handleDeleteImage(sectionIndex, 'secondImage')}
                 onUpload={(event) => handleImageUpload(sectionIndex, 'secondImage', event)}
               />
              </div>
            </div>
            {section.image && (
              <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">{t("Image_Position")}:</label>
              <select
                value={section.imagePosition}
                onChange={(e) => handleSectionChange(sectionIndex, 'imagePosition', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                {section.secondImage
                 ? twoImageOptions.map((option) => (
                   <option key={option.value} value={option.value}>
                     {option.label}
                   </option>
                 ))
                 : positionOptions.map((option) => (
                   <option key={option.value} value={option.value}>
                     {option.label}
                   </option>
                 ))}
              </select>
            </div>
            )}
           {
             sectionIndex !== 0 && (
               <button
                 type="button"
                 onClick={() => handleRemoveSection(sectionIndex)}
                 className="text-sm text-red-600 hover:text-red-800 mt-4"
               >
                 {t("rmSection")} {sectionIndex + 1}
               </button>
             )
           }
            
          </div>
        ))}
  
        <button
          type="button"
          onClick={handleAddSection}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
        >
          {t("Add_Section")}
        </button>
      </form>
    </div>
  );
  
}
export default ExecriseInput;