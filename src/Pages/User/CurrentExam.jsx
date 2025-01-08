import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical } from 'lucide-react';
import Trimesters from "../../Assets/Data/Trimesters";
import difficulty from "../../Assets/Data/difficulty";
import ExerciseCard from "../../Layouts/User/ExerciseCard";
import useFetchData from "../../Hooks/useFetchDataUser";
import ExamPdf from "./ExamPdf";
import { Filters } from "../../Component/Filters";
import { useLanguage } from "../../Contexts/LanguageContext";

export default function CurrentExam() {
  const { t } = useLanguage();
  const [selectedFilters, setSelectedFilters] = useState({
    level: "All",
    trimester: "All",
    material: "All",
    unit: "All",
    difficulty: "All",
  });

  const [reorderedExercises, setReorderedExercises] = useState([]);

  const {
    levels,
    favexercises,
    addedExercises,
    setSelectedLevel,
    setSelectedMatriel,
    setAddedExercises,
    matriels,
    filteredUnits,
    setFavexercises,
    current,
    loading,
    error,
  } = useFetchData();

  useEffect(() => {
    if (current.length) {
      setReorderedExercises(filterExercises(current, selectedFilters));
    }
  }, [current, selectedFilters]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));

    if (filterType === "level") setSelectedLevel(value);
    if (filterType === "material") setSelectedMatriel(value);
  };

  const filterExercises = (exercises, filters) => {
    return exercises.filter(
      (exercise) =>
        (filters.level === "All" || exercise.level._id === filters.level) &&
        (filters.trimester === "All" || exercise.Trimester === filters.trimester) &&
        (filters.material === "All" || exercise.material._id === filters.material) &&
        (filters.unit === "All" || exercise.unit._id === filters.unit) &&
        (filters.difficulty === "All" || exercise.difficulty === filters.difficulty)
    );
  };

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(reorderedExercises);
    const [movedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, movedItem);

    setReorderedExercises(items);
  };

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

      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="exercises">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="w-full space-y-2"
            >
              {reorderedExercises.map((exercise, index) => (
                <Draggable key={exercise._id} draggableId={exercise._id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`p-2 bg-white shadow rounded ${
                        snapshot.isDragging ? "shadow-lg bg-gray-300" : ""
                      }`}
                    >
                      <div className="flex items-center">
                        <div {...provided.dragHandleProps} className="mr-2 cursor-move">
                          <GripVertical className="text-gray-400" />
                        </div>
                        <ExerciseCard
                          exercise={exercise}
                          favexercises={favexercises}
                          addedExercises={addedExercises}
                          setFavexercises={setFavexercises}
                          setAddedExercises={setAddedExercises}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <ExamPdf exercises={reorderedExercises} />
    </div>
  );
}