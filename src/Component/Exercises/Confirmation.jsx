// Confirmation.js
import React from 'react';
import { useFormContext } from './FormContext';

const Confirmation = ({ onPrev }) => {
  const { formData,sections } = useFormContext();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Confirmation</h2>
      <p className="mb-4">Please review your information before submitting:</p>
      <ul className="list-disc list-inside mb-4">
        <li>level: {formData.level}</li>
        <li>Trimester: {formData.Trimester}</li>
        <li>material: {formData.material}</li>
        <li>unit: {formData.unit}</li>
        <li>difficulty: {formData.difficulty}</li>
      </ul>
      <div className="p-4">
      <h2 className="text-xl font-bold mb-4">The Exercise</h2>
      
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="p-4 mb-4 bg-gray-100 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Section {sectionIndex + 1}</h3>
          
          <p><strong>Content:</strong> {section.content || 'No content provided'}</p>
          
          <p><strong>Image Position:</strong> {section.imagePosition}</p>
          
          <p><strong>Image:</strong> {section.image ? <img src={section.image} alt="Section" /> : 'No image uploaded'}</p>
          
          <div className="mt-4">
            <h4 className="font-medium">Questions:</h4>
            {section.questions.length > 0 ? (
              section.questions.map((q, questionIndex) => (
                <div key={questionIndex} className="ml-4 my-2">
                  <p><strong>Question {questionIndex + 1}:</strong> {q.question}</p>
                  <p><strong>Answer:</strong> {q.answer}</p>
                </div>
              ))
            ) : (
              <p>No questions available</p>
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
          Previous
        </button>
        <button
          onClick={() => alert('Form submitted!')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Confirmation;