const getFormName = (id,colection) => {
    const item = colection.find((item) => item._id === id);
    return item ? item.name : 'Unknown';
  };
  export default getFormName;