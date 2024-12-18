import { useState } from 'react';
import Multiselect from "multiselect-react-dropdown";
import api from '../utils/api';
import useFetchData from "../utils/useFetchData";
import Modal from '../UI/Modal';
import StatusModal from '../UI/StatusModal';
import ConfirmationModal from '../UI/ConfirmationModal';
import ErrorPage from '../UI/ErrorPage';
import { Snackbar } from '@mui/material';
import MatrielCard from './MatrielCard';
import { useLanguage } from '../utils/LanguageContext';

const Matriel = () => {
  const { t } = useLanguage();

  const [selectedLevels, setSelectedLevels] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorModal, setErrorModal] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    levels:[],
  });
  const {  levels, matriels, loading, error, refetch  } = useFetchData();
  
  const handleAddService = async () => {
    try {
      await api.post('/api/matriels', formData);
      refetch();
      setFormData({
        name: '',
        levels:[],
      });
      setIsModalOpen(false);
      setSnackbarMessage('Add Matrieil Success!.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setErrorModal('An error whene adding your service');
      setIsErrorOpen(true);
    }
  };

  const handleOpenSubmite = (event) => {
    event.preventDefault();
    setIsAddModalOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleMultiselectChange = (selectedList) => {
    selectedList.map((item) => item._id);
    setSelectedLevels(selectedList);
    setFormData({
      ...formData,
      levels: selectedList,
    });
  };
  if (error){ return <ErrorPage error={error} />}
  if (loading){ return 'loading ...'}
  return (
    <div className="container mx-auto py-8 px-4">
        <div >
          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-4 bg-indigo-700 right-4 inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-white h-10 pr-2 py-2"
          >
            <span className='text-xl px-2'>+</span>
            {t("Create_Matriel")}
          </button>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {matriels.map((item, index) => (
          <MatrielCard 
          key={index} 
          {...item} 
          RenderComponent={refetch} 
          allLevels={levels}/>
        ))}
      </div>
      {isModalOpen && (
        <Modal onClose={() =>setIsModalOpen(false)}>
          <div className="popover-content sm:min-w-[300px] sm:max-w-[500px]">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{t("Add_New_Matriel")}</h3>
              </div>
              <form className="grid gap-4" onSubmit={handleOpenSubmite}>
                <div className="grid gap-2">
                  <label htmlFor="name">{t("Matriel_Name")}</label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-10 block w-full mb-2 border border-muted p-2 rounded"
                    placeholder="Enter matriel name"
                  />
                </div>
                <div className="grid gap-2">
                  <Multiselect
                    options={levels}
                    selectedValues={selectedLevels}
                    onSelect={handleMultiselectChange}
                    onRemove={handleMultiselectChange}
                    displayValue="name"
                    placeholder="Select levels"
                    style={{
                      multiselectContainer: { backgroundColor: "white" },
                      chips: { background: "#6366F1", color: "white" },
                      optionContainer: { backgroundColor: "#F3F4F6" },
                      option: { color: "#4B5563" },
                    }}
                  />
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
      { errorModal && (
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
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </div>
  );
};

export default Matriel;