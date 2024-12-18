import { useState, useEffect, useCallback } from "react";
import api from "./api";

const useFetchData = () => {

  const [levels, setLevels] = useState([]);
  const [matriels, setMatriels] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [levelsResponse, matrielResponse] = await Promise.all([
        api.get("/api/levels"),
        api.get("/api/matriels"),
      ]);

      setLevels(levelsResponse.data);
      setMatriels(matrielResponse.data);
    } catch (error) {
      setError(error.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  //refetch Data
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    levels,
    matriels,
    loading,
    error,
    refetch: fetchData,
  };
};

export default useFetchData;