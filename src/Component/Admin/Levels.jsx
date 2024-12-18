import React, { useState, useEffect } from 'react';
import LevelCard from './LevelCard';
import api from '../utils/api';
import Modal from '../UI/Modal';
import StatusModal from '../UI/StatusModal';
import { Snackbar } from '@mui/material';
import ConfirmationModal from '../UI/ConfirmationModal';
import ErrorPage from '../UI/ErrorPage';
import { useLanguage } from '../utils/LanguageContext';

const Levels = () => {
  const { t } = useLanguage();

  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [errorModal, setErrorModal] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
  });
  const fetchServices = async () => {
    try {
      const response = await api.get('/api/levels');
      setServices(response.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);
  const onDeleteRender =()=>{
    fetchServices();
  }
 
  const handleAddService = async () => {
    try {
      const response = await api.post('/api/levels', formData);
      setServices([...services, response.data]);
      setFormData({
        name: '',
      });
      setIsModalOpen(false);
      setSnackbarMessage('Add Service Success!.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);
      setErrorModal('An error whene adding your service');
      setIsErrorOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateServiceClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
  if (error){ return <ErrorPage error={error} />}
  if (loading){ return 'loading ...'}
  return (
    <div className="container mx-auto py-8 px-4">
        <div className="">
          <button
            onClick={handleCreateServiceClick}
            className="fixed bg-indigo-700 bottom-4 right-4 inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 text-white h-10 pr-2 py-2"
          >
            <span className='text-xl px-2'>+</span>
            {t("Create_Level")}l
          </button>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <LevelCard key={index} {...service} onDeleteRender={onDeleteRender}/>
        ))}
      </div>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <div className="popover-content sm:min-w-[300px] sm:max-w-[500px]">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{("Add_New_Level")}</h3>
              </div>
              <form className="grid gap-4" onSubmit={handleOpenSubmite}>
                <div className="grid gap-2">
                  <label htmlFor="name">{t("Level_Name")}:</label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-10 block w-full mb-2 border border-muted p-2 rounded"
                    placeholder="Enter level name"
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

export default Levels;