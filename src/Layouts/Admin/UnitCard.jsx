import { useState  } from 'react';
import api from '../../Services/api';
import {useLanguage} from '../../Contexts/LanguageContext';
import {Pencil,Trash } from 'lucide-react';
import StatusModal from '../../Component/StatusModal';
import { Snackbar } from '@mui/material';
import ConfirmationModal from '../../Component/ConfirmationModal';
import Trimesters from '../../Assets/Data/Trimesters';

const UnitCard = ({ _id, name ,Level,Matirel,Trimester, onRender,levels,matirels}) => {
  const { t } = useLanguage();

 const [formData, setFormData] = useState({
     name ,
     Level:Level._id,
     Matirel:Matirel._id
     ,Trimester });
 const [originalData, setOriginalData] = useState({
    name ,
    Level,
    Matirel,
    Trimester });

    
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setOriginalData(formData);
  };

  const handleSave = async () => {
    try {
      await api.put(`/api/units/${_id}`, formData);
      onRender();
      setIsEditing(false);
      setIsUpdateModalOpen(false);
      setSnackbarMessage('Service has been Updated successfully.');
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating service:", error);
      setError('Service has not updating');
      setIsErrorOpen(true);
    }
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/units/${_id}`);
      setSnackbarMessage('Service deleted successfully.');
      setSnackbarOpen(true);
      setTimeout(onRender,3000);
    } catch (error) {
      console.error("Error deleting service:", error);
      setError('Service has not deleted');
      setIsErrorOpen(true);
    }
  };

  return (
    <>
    <div className="rounded-lg border bg-card text-card-foreground shadow-lg hover:shadow-xl transition-all flex flex-col h-full">
      <div className="p-6 flex-1 space-y-4">
        {isEditing ? (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">{t("Name")}:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="block w-full mb-2 border border-muted p-2 rounded"
                />
            </div>
             <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">{t("Select_Level")}:</label>
                <select
                  onChange={(e) => handleChange('Level', e.target.value)}
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
              <label className="block text-sm font-bold text-gray-700 mb-2">{t("Select_Matriel")}:</label>
                <select
                  onChange={(e) => handleChange('Matirel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.Matirel}
                >
                  {matirels.map((option) => (
                    <option key={option._id} value={option._id}>
                      {option.name}
                    </option>
                  ))}
                </select>
             </div>
             <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">{t("Select_Trimester")}:</label>
                <select
                  onChange={(e) => handleChange('Trimester', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={formData.Trimester}
                >
                  {Trimesters.map((option,i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
             </div>
           </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold">{formData.name}</h3>
            <p>{Level.name}</p>
            <p>{Matirel.name}</p>
            <p>{formData.Trimester}</p>
          </div>
        )}
      </div>
      <div className="flex justify-end gap-2 p-4 border-t border-muted">
        {isEditing ? (
          <>
            <button
              onClick={()=> setIsUpdateModalOpen(true)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-blue-400 hover:bg-bink-600 text-white h-8 w-20"
            >
              {t("Save")}
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-gray-500 hover:bg-gray-600 text-white h-8 w-20"
            >
              {t("Cancel")}
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={handleEdit}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondColor hover:border-firstColor hover:text-accent-foreground h-10 w-10">
              <Pencil />
            </button>
            <button 
              onClick={()=> setIsDeleteModalOpen(true)}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-secondColor hover:border-firstColor hover:text-accent-foreground h-10 w-10">
              <Trash />
            </button>
          </>
        )}
        { error && (
            <StatusModal
              type="error"
              title="Error Occurredr"
              message={error}
              isOpen={isErrorOpen}
              onClose={() => setIsErrorOpen(false)}
            />
             )}
      </div>
    </div>
    <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        confirmColor="#f44336"
      />

      <ConfirmationModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleSave}
        title="Confirm Update"
        message="Are you sure you want to change this service?"
        confirmText="Update"
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
    </>
  );
};

export default UnitCard;