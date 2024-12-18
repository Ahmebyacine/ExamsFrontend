import { useState, useEffect } from "react";
import api from "../utils/api";
import Modal from "../UI/Modal";
import StatusModal from "../UI/StatusModal";
import { Snackbar } from "@mui/material";
import ConfirmationModal from "../UI/ConfirmationModal";
import ErrorPage from "../UI/ErrorPage";
import UnitCard from "./UnitCard";
import Trimesters from "../../Data/Trimesters";
import useFetchData from "../utils/useFetchData";
import {useLanguage} from "../utils/LanguageContext";

const Unit = () => {
  const { t } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [errorModal, setErrorModal] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    Level: '',
    Matirel: '',
    Trimester: Trimesters[0], 
  });

  
  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const { 
    units, 
    levels, 
    matriels, 
    loading, 
    error, 
    refetch,
    setSelectedLevel,
    setSelectedMatriel,
    filteredMatriels } = useFetchData();

  useEffect(() => {
    if (levels.length > 0 && matriels.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        Level: levels[0]?._id || '',
        Matirel: matriels[0]?._id || '',
      }));
    }
  }, [levels, matriels]);
    
  const handleAddService = async () => {
    try {
      await api.post("/api/units", formData);
      refetch();
      setFormData({
        name: '',
        Level: levels[0]?._id,
        Matirel: matriels[0]?._id,
        Trimester: Trimesters[0],
      });
      setIsModalOpen(false);
      setIsAddModalOpen(false);
      setSnackbarMessage("Add unit Success!.");
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setErrorModal("An error whene adding your init");
      setIsErrorOpen(true);
    }
  };

  const handleOpenSubmite = (event) => {
    event.preventDefault();
    setIsAddModalOpen(true);
  };
  const OnChangeLevel=(e)=>{
    const value =e.target.value;
    handleChange('Level', value);
    setSelectedLevel(value);
  }
  const OnChangeMatriel =(e) => {
    const value = e.target.value;
    handleChange("Matirel", value);
    setSelectedMatriel(value);
  }
  if (error) {
    return <ErrorPage error={error} />;
  }
  if (loading) {
    return "loading ...";
  }
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="">
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-4 right-4 inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-indigo-700 text-white h-10 pr-2 py-2"
        >
          <span className="text-xl px-2">+</span>
          {t("Create_unit")}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {units.map((item, index) => (
          <UnitCard
            key={index}
            {...item}
            onRender={refetch}
            levels={levels}
            matirels={matriels}
          />
        ))}
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="popover-content sm:min-w-[300px] sm:max-w-[500px]">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{t("Add_New_Service")}</h3>
              </div>
              <form className="grid gap-4" onSubmit={handleOpenSubmite}>
                <div>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
                      {t("name")}:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}setSelectedMatriel
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="block w-full mb-2 border border-muted p-2 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {t("Select_Level")}:
                    </label>
                    <select
                      onChange={OnChangeLevel}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.Level}
                    >
                      {levels.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {t("Select_Matriel")}:
                    </label>
                    <select
                      onChange={OnChangeMatriel}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.Matirel}
                    >
                      {filteredMatriels.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      {t("Select_Trimester")}:
                    </label>
                    <select
                      onChange={(e) =>
                        handleChange("Trimester", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={formData.Trimester}
                    >
                      {Trimesters.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded text-sm text-white font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-indigo-700 hover:text-black h-10"
                >
                  {t("Save")}
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}
      {errorModal && (
        <StatusModal
          type="error"
          title="Error Occurredr"
          message={errorModal}
          isOpen={isErrorOpen}
          onClose={() => setIsErrorOpen(false)}
        />
      )}
      <ConfirmationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={handleAddService}
        title="Confirm Add"
        message="Are you sure you want to add this service?"
        confirmText="Add"
        confirmColor="#db2777"
      />

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Unit;