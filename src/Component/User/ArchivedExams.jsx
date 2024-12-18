import { useState, useEffect} from 'react'
import api from '../utils/api'
import {useLanguage} from '../utils/LanguageContext'
import ExamCard from './ExamCard';

export default function ArchivedExams() {
  const { t } = useLanguage();
  
  const [exercises, setExercises] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


    useEffect(() => {
      // Define the fetch function
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/api/exercises/archivedExams`);
          
          setExercises(response.data.archivedExams);
        } catch (err) {
          setError(err.message || "Something went wrong!");
          console.log(err) 
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  console.log(exercises)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">{t("Archived_Exams")}</h1>
      <div className="w-full">
        {exercises.map(exercise => (
          <>
          <ExamCard key={exercise._id} 
           exam={exercise} />
          </>
        ))}
      </div>
    </div>
  )
}