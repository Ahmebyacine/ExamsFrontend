import { useState} from 'react'
import Trimesters from '../../Data/Trimesters'
import difficulty from '../../Data/difficulty'
import ExerciseCard from './ExerciseCard'
import useFetchData from '../utils/useFetchDataUser'
import { Filters } from '../UI/Filters'
import Pagination from '../UI/Pagination'
import { useLanguage } from '../utils/LanguageContext'

export default function ExercisesUser() {
  const { t } = useLanguage();

  const [selectedFilters, setSelectedFilters] = useState({
    level: "All",
    trimester: "All",
    material: "All",
    unit: "All",
    difficulty: "All",
  });

  //fetch data from api
  const {
    levels,
    exercises,
    favexercises,
    addedExercises,
    setSelectedLevel,
    setSelectedMatriel,
    matriels,
    filteredUnits,
    currentPage,
    totalPages,
    setCurrentPage,
    setFavexercises,
    setAddedExercises,
    loading, 
    error,
   refetch } = useFetchData();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));

    // Additional updates for specific filters
    if (filterType === "level") setSelectedLevel(value);
    if (filterType === "material") setSelectedMatriel(value);
  };

  const filteredExercises = exercises.filter(
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
           setAddedExercises={setAddedExercises} 
           RenderComponent={refetch} />
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