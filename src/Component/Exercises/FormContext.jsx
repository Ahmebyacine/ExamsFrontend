// FormContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context for form data
const FormContext = createContext();

// Create a custom hook to use form data context
export const useFormContext = () => {
  return useContext(FormContext);
};

// FormProvider to manage form data
export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <FormContext.Provider value={{ formData, handleChange }}>
      {children}
    </FormContext.Provider>
  );
};
