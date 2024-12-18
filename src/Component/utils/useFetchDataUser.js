import { useState, useEffect, useCallback } from "react";
import api from "./api";

const useFetchData = () => {

  const [units, setUnits] = useState([]);
  const [levels, setLevels] = useState([]);
  const [matriels, setMatriels] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [current, setCurrent] = useState([]);

  const [favexercises, setFavexercises] = useState([]);
  const [addedExercises, setAddedExercises] = useState([]);

  const [filteredMatriels, setFilteredMatriels] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedMatriel, setSelectedMatriel] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [unitResponse, levelsResponse, matrielResponse,exercisesResponse,currentResponse] = await Promise.all([
        api.get("/api/units"),
        api.get("/api/levels/user"),
        api.get("/api/matriels/user"),
        api.get(`/api/exercises/user?page=${currentPage}`),
        api.get(`/api/exercises/user/current-exam`),
      ]);
      setUnits(unitResponse.data);
      setLevels(levelsResponse.data);
      setMatriels(matrielResponse.data);
      setExercises(exercisesResponse.data.exercises);
      setFavexercises(exercisesResponse.data.favoriteIds);
      setTotalPages(exercisesResponse.data.pages);
      setAddedExercises(exercisesResponse.data.addedExercise);
      setFilteredUnits(unitResponse.data);
      setFilteredMatriels(matrielResponse.data);
      setCurrent(currentResponse.data.exercises);
    } catch (error) {
      setError(error.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);
  //refetch Data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // set the first level and matriel
  useEffect(() => {
    if (levels.length > 0 && matriels.length > 0) {
      setSelectedLevel(levels[0]._id);
      setSelectedMatriel(matriels[0]?._id);
    }
  }, [levels, matriels]);
  // Filter matriels when a level is selected
  useEffect(() => {
    if (selectedLevel) {
      setFilteredMatriels(
        matriels.filter(parent =>
          parent.levels.some(level => level._id === selectedLevel)
        ));
      setSelectedMatriel(null);
    } else {
      setFilteredMatriels(matriels);
    }
  }, [selectedLevel, matriels]);

  // Filter units when a matriel ou level selected is selected
  useEffect(() => {
    if (selectedMatriel) {
      setFilteredUnits(
        units.filter((parent) => parent.Matirel._id === selectedMatriel)
      );
    } else if (selectedLevel) {
      setFilteredUnits(units.filter((unit) => unit.Level._id === selectedLevel));
    } else {
      setFilteredUnits(units);
    }
  }, [selectedMatriel, selectedLevel, units]);
  return {
    levels,
    matriels,
    units,
    exercises,
    totalPages,
    currentPage, 
    addedExercises,
    favexercises,
    setFavexercises,
    setAddedExercises,
    setCurrentPage,
    filteredMatriels,
    filteredUnits,
    setSelectedLevel,
    setSelectedMatriel,
    current,
    loading,
    error,
    setError,
    setLoading,
    refetch: fetchData,
  };
};

export default useFetchData;