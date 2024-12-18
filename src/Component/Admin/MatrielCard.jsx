import { useState} from 'react';
import Multiselect from "multiselect-react-dropdown";
import api from '../utils/api';
import {Pencil,Trash } from 'lucide-react';
import StatusModal from '../UI/StatusModal';
import { Snackbar } from '@mui/material';
import ConfirmationModal from '../UI/ConfirmationModal';
import { useLanguage } from '../utils/LanguageContext';


const MatrielCard = ({ _id, name,levels, RenderComponent ,allLevels}) => {
  const { t } = useLanguage();

  const [selectedOptions, setSelectedOptions] = useState(levels);
  const [formData, setFormData] = useState({ name ,levels });
  const [originalData, setOriginalData] = useState({ name ,levels});

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleEdit = () => {
    setIsEditing(true);
    setOriginalData(formData);
  };

  const handleMultiselectChange = (selectedList) => {
    selectedList.map((item) => item._id);
    setSelectedOptions(selectedList);
    setFormData({
      ...formData,
      levels: selectedList,
    });
  };

  const handleSave = async () => {
    try {
      await api.put(`/api/matriels/${_id}`, formData);
      setOriginalData(formData);
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
      await api.delete(`/api/matriels/${_id}`);
      setSnackbarMessage('Service deleted successfully.');
      setSnackbarOpen(true);
      setTimeout(RenderComponent,3000);
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
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full mb-2 border border-muted p-2 rounded"
            />
             <Multiselect
               options={allLevels}
               selectedValues={selectedOptions}
               onSelect={handleMultiselectChange} 
               onRemove={handleMultiselectChange} 
               displayValue="name" // Property name to display in the dropdown
               placeholder="Select options"
               style={{
                 multiselectContainer: { backgroundColor: "white" },
                 chips: { background: "#6366F1", color: "white" },
                 optionContainer: { backgroundColor: "#F3F4F6" },
                 option: { color: "#4B5563" },
               }}
             />
           </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold">{originalData.name}</h3>
            {originalData.levels.map((level,i)=>(
              <div key={i}>
              <p>{level.name}</p>
              </div>
            ))}
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

export default MatrielCard;