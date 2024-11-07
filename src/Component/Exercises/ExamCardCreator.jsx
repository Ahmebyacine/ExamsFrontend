import React from 'react';
import { useFormContext } from './FormContext';

export default function ExamCardCreator() {
  const { formData, sections, setSections } = useFormContext();

  const positionOptions = [
    { label: 'Top Left', value: 'top-left' },
    { label: 'Top Right', value: 'top-right' },
    { label: 'Bottom Left', value: 'bottom-left' },
    { label: 'Bottom Right', value: 'bottom-right' },
  ];

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

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const updatedSections = sections.map((section, i) =>
          i === index ? { ...section, image: e.target.result } : section
        );
        setSections(updatedSections);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSection = () => {
    setSections([
      ...sections,
      { content: '', questions: [{ question: '', answer: '' }], image: null, imagePosition: 'top-left' },
    ]);
  };

  const handleRemoveSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ formData, sections });
    // Send this data to your backend or state management system
  };

  return (
    <div className="mx-auto my-10 py-8 bg-white rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create Exam Questions</h2>
      <form onSubmit={handleSubmit} className="space-y-8">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-6 rounded-lg shadow-inner">
            <div>
              <h1 className='text-xl font-bold text-center'>section {sectionIndex+1}</h1>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content:</label>
              <textarea
                value={section.content}
                onChange={(e) => handleSectionChange(sectionIndex, 'content', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Enter content"
              />
            </div>
  
            {section.questions.map((q, questionIndex) => (
              <div key={questionIndex} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Question {questionIndex+1}:</label>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => handleQuestionChange(sectionIndex, questionIndex, 'question', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter question"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Answer {questionIndex+1}:</label>
                  <textarea
                    value={q.answer}
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
                  Remove Question {questionIndex+1}
                </button>
              </div>
            ))}
  
            <button
              type="button"
              onClick={() => handleAddQuestion(sectionIndex)}
              className="text-sm text-blue-600 hover:text-blue-800 mt-4"
            >
              Add Question {section.questions.length+1}
            </button>
  
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(sectionIndex, e)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
            {section.image && (
              <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image Position:</label>
              <select
                value={section.imagePosition}
                onChange={(e) => handleSectionChange(sectionIndex, 'imagePosition', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                {positionOptions.map((option) => (
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
                 Remove Section {sectionIndex + 1}
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
          Add Section
        </button>
      </form>
    </div>
  );
  
}
