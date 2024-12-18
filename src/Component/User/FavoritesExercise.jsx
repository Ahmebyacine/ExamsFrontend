import { useState, useEffect} from 'react'
import Trimesters from '../../Data/Trimesters'
import difficulty from '../../Data/difficulty'
import ExerciseCard from './ExerciseCard'
import useFetchData from '../utils/useFetchDataUser'
import { Filters } from '../UI/Filters'
import Pagination from '../UI/Pagination'
import api from '../utils/api'
import { getFilterExercises } from '../utils/GetFliterExercises'
import { useLanguage } from '../utils/LanguageContext'

export default function FavoritesExercise() {
  const { t } = useLanguage();

  const [selectedFilters, setSelectedFilters] = useState({
    level: "All",
    trimester: "All",
    material: "All",
    unit: "All",
    difficulty: "All",
  });
  
  const [exercises, setExercises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //fetch data from api
  const {
    levels,
    favexercises,
    addedExercises,
    setSelectedLevel,
    setSelectedMatriel,
    setAddedExercises,
    matriels,
    setFavexercises,
    filteredUnits } = useFetchData();

    useEffect(() => {
      // Define the fetch function
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/api/exercises/user?page=${currentPage}&favoritesOnly=true`);
          
          setExercises(response.data.exercises);
          setTotalPages(response.data.pages);
        } catch (err) {
          setError(err.message || "Something went wrong!");
          console.log(err) 
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [currentPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  const onlyFavorite =getFilterExercises(exercises,favexercises)
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));

    // Additional updates for specific filters
    if (filterType === "level") setSelectedLevel(value);
    if (filterType === "material") setSelectedMatriel(value);
  };
  const filteredExercises = onlyFavorite.filter(
    (exercise) =>
      (selectedFilters.level === "All" ||
        exercise.level._id === selectedFilters.level) &&
      (selectedFilters.trimester === "All" ||
        exercise.Trimester === selectedFilters.trimester) &&
      (selectedFilters.material === "All" ||
        exercise.material._id === selectedFilters.material) &&
      (selectedFilters.unit === "All" ||
        exercise.unit._id === selectedFilters.unit) &&
      (selectedFilters.difficulty === "All" ||
        exercise.difficulty === selectedFilters.difficulty)
  );

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <Filters
        levels={levels}
        trimesters={Trimesters}
        materials={matriels}
        units={filteredUnits}
        difficulties={difficulty}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">{t("Exercises")}</h1>
      <div className="w-full">
        {filteredExercises.map(exercise => (
          <>
          <ExerciseCard key={exercise._id} 
           exercise={exercise} 
           favexercises={favexercises}
           addedExercises={addedExercises} 
           setFavexercises={setFavexercises} 
           setAddedExercises={setAddedExercises} />
          </>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page)=>setCurrentPage(page)}
      />
    </div>
  )
}