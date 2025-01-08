export const getFilterExercises = (exercises, filterExerciseIds) => {
    return exercises.filter((exercise) => filterExerciseIds.includes(exercise._id));
  };