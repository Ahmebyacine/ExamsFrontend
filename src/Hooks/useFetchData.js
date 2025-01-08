import { useState, useEffect, useCallback } from "react";
import api from "../Services/api";

const useFetchData = () => {

  const [units, setUnits] = useState([]);
  const [levels, setLevels] = useState([]);
  const [matriels, setMatriels] = useState([]);
  const [exercises, setExercises] = useState([]);

  const [filteredMatriels, setFilteredMatriels] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedMatriel, setSelectedMatriel] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [unitResponse, levelsResponse, matrielResponse,exercisesResponse] = await Promise.all([
        api.get("/api/units"),
        api.get("/api/levels"),
        api.get("/api/matriels"),
        api.get(`/api/exercises?page=${currentPage}`),
      ]);

      setUnits(unitResponse.data);
      setLevels(levelsResponse.data);
      setMatriels(matrielResponse.data);
      setExercises(exercisesResponse.data.exercises);
      setTotalPages(exercisesResponse.data.pages);
      setFilteredUnits(unitResponse.data);
      setFilteredMatriels(matrielResponse.data);
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
    filteredMatriels,
    filteredUnits,
    loading,
    error,
    setSelectedLevel,
    setSelectedMatriel,
    totalPages,
    currentPage, 
    setCurrentPage,
    refetch: fetchData,
  };
};

export default useFetchData;