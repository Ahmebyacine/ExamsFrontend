import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Trimesters from "../../../Data/Trimesters";
import difficulty from "../../../Data/difficulty";
import ExerciseCard from "./ExerciseCard";
import useFetchData from "../../utils/useFetchData";
import { Filters } from "../../UI/Filters";
import Pagination from "../../UI/Pagination";
import { useLanguage } from "../../utils/LanguageContext";

export default function Exercises() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState({
    level: "All",
    trimester: "All",
    material: "All",
    unit: "All",
    difficulty: "All",
  });

  const {
    levels,
    exercises,
    setSelectedLevel,
    setSelectedMatriel,
    filteredMatriels,
    filteredUnits,
    totalPages,
    currentPage, 
    setCurrentPage,
    loading,
    error,
    refetch,
  } = useFetchData();

  const goToAddExercise = () => navigate("/addExercise");

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <Filters
        levels={levels}
        trimesters={Trimesters}
        materials={filteredMatriels}
        units={filteredUnits}
        difficulties={difficulty}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
        {t("Exercises")}
      </h1>

      <button
        onClick={goToAddExercise}
        className="fixed bottom-4 bg-indigo-700 right-4 inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-white h-10 pr-2 py-2"
      >
        <span className="text-xl px-2">+</span>
        {t("Add_Exercise")}
      </button>

      <div className="w-full">
        {filteredExercises.map((exercise) => (
          <ExerciseCard
            key={exercise._id}
            exercise={exercise}
            RenderComponent={refetch}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page)=>setCurrentPage(page)}
      />
    </div>
  );
}