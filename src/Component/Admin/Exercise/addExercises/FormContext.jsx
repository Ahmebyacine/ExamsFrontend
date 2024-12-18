import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import useFetchData from '../../../utils/useFetchData';
import Trimesters from '../../../../Data/Trimesters';
import api from '../../../utils/api';

// Create the context for form data
const FormContext = createContext();

// Custom hook to use form data context
export const useFormContext = () => {
  return useContext(FormContext);
};

// FormProvider to manage form data
export const FormProvider = ({ children }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title:'',
    level: '',
    Trimester: Trimesters[0],
    material: '',
    unit: '',
    difficulty: '1',
  });

  // sections state moved here
  const [sections, setSections] = useState([
    {
      content: '',
      questions: [{ question: '', answer: '' }],
      image: null,
      secondImage: null,
      imagePosition: 'bottom',
    },
  ]);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [errorAdding, setErrorAdding] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // fetchs the data from APIs
  const {  
     levels,
     loading, 
     error,
     setSelectedLevel,
     setSelectedMatriel,
     filteredMatriels,
     filteredUnits  } = useFetchData();

  // set the fisrt value in inputs
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      level: prevData.level || levels[0]?._id || '',
    }));
  }, [levels]);
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      material: filteredMatriels[0]?._id || '',
    }));
  },[filteredMatriels]);
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      unit: filteredUnits[0]?._id || '',
    }));
  }, [filteredUnits]);
  
  const navigateTo=()=> navigate('/ExamsFrontend');

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const exerciseData = {
        title: formData.title,
        exercise: sections,
        level: formData.level,
        Trimester: formData.Trimester,
        difficulty: formData.difficulty,
        material: formData.material,
        unit: formData.unit,
      };

      // Post the form data to the backend API
      await api.post('/api/exercises', exerciseData, { headers: { 'Content-Type': 'multipart/form-data' }});
      setSnackbarOpen(true);
      setSnackbarMessage('Exercise added successfully');
      setTimeout(navigateTo,1500);
    } catch (error) {
      // Handle error response
      console.error('Error adding exercise:', error);
      setIsErrorOpen(true);
      setErrorAdding('Error adding exercise');
    }
  };

  return (
    <FormContext.Provider value={{ 
      formData, 
      handleChange, 
      sections, 
      setSections, 
      handleSubmit,
      levels,
      loading, 
      error,
      setSelectedLevel,
      setSelectedMatriel,
      filteredMatriels,
      filteredUnits,
      snackbarOpen,
      errorAdding,
      snackbarMessage,
      setSnackbarOpen,
      isErrorOpen,
      setIsErrorOpen
     }
      }>
      {children}
    </FormContext.Provider>
  );
};