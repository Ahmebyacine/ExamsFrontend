// FormContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context for form data
const FormContext = createContext();

// Custom hook to use form data context
export const useFormContext = () => {
  return useContext(FormContext);
};

// FormProvider to manage form data
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    level: '',
    Trimester: '',
    material: '',
    unit: '',
    difficulty: '',
  });

  // sections state moved here
  const [sections, setSections] = useState([
    {
      content: '',
      questions: [{ question: '', answer: '' }],
      image: null,
      imagePosition: 'top-left',
    },
  ]);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <FormContext.Provider value={{ formData, handleChange, sections, setSections }}>
      {children}
    </FormContext.Provider>
  );
};