import React, { useState } from 'react';
import Multiselect from "multiselect-react-dropdown";
import { User, Mail, Phone, Book, PenTool as Tool, Edit, Trash2, Save, X} from 'lucide-react';
import api from '../utils/api';
import {useLanguage} from '../utils/LanguageContext';

const UserCard = ({ user, allLevels, allMatriels, onUserUpdate, onUserDelete}) => {
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);

  const [editedUser, setEditedUser] = useState(user);
  const [selectedLevelOptions, setSelectedLevelOptions] = useState(user.levels);
  const [selectedMatrielsOptions, setSelectedMatrielsOptions] = useState(user.matirels);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdate = async () => {
    try {
      setLoading(true);
      await api.put(`/api/user/${user._id}`, editedUser);
      onUserUpdate(editedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await api.delete(`/api/user/${user._id}`);
      onUserDelete(user._id);
    } catch (error) {
      console.error('Failed to delete user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  const handleMultiselectChange = (selectedList) => {
    selectedList.map((item) => item._id);
    setSelectedLevelOptions(selectedList);
    setEditedUser({
      ...editedUser,
      levels: selectedList,
    });
  };
  const handleMultiselectMatrielsChange = (selectedList) => {
    selectedList.map((item) => item._id);
    setSelectedMatrielsOptions(selectedList);
    setEditedUser({
      ...editedUser,
      matirels: selectedList,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {isEditing ? (
        <div className="p-6 space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              value={editedUser.name}
              onChange={handleInputChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </div>
          <div>
          <Multiselect
               options={allLevels}
               selectedValues={selectedLevelOptions}
               onSelect={handleMultiselectChange} 
               onRemove={handleMultiselectChange} 
               displayValue="name"
               placeholder="Select Levels"
               style={{
                 multiselectContainer: { backgroundColor: "white" },
                 chips: { background: "#6366F1", color: "white" },
                 optionContainer: { backgroundColor: "#F3F4F6" },
                 option: { color: "#4B5563" },
                }}
             />
          </div>
          <div>
          <Multiselect
               options={allMatriels}
               selectedValues={selectedMatrielsOptions}
               onSelect={handleMultiselectMatrielsChange} 
               onRemove={handleMultiselectMatrielsChange} 
               displayValue="name"
               placeholder="Select Matriels"
               style={{
                 multiselectContainer: { backgroundColor: "white" },
                 chips: { background: "#6366F1", color: "white" },
                 optionContainer: { backgroundColor: "#F3F4F6" },
                 option: { color: "#4B5563" },
               }}
             />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="text"
              value={editedUser.phone}
              onChange={handleInputChange}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleUpdate}
              className={`bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 flex items-center ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={loading}
            >
              <Save className="h-5 w-5 mr-2" />
              {t("Save")}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-300 flex items-center"
            >
              <X className="h-5 w-5 mr-2" />
              {t("Cancel")}
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-gray-600 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {user.email}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="text-blue-500 hover:text-blue-600 transition-colors duration-300 p-2 rounded-full hover:bg-blue-100"
                aria-label="Edit user"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-600 transition-colors duration-300 p-2 rounded-full hover:bg-red-100"
                aria-label="Delete user"
                disabled={loading}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-100 px-4 py-2 rounded-md">
              <h3 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                <Book className="h-4 w-4 mr-2" />
                {t("Levels")}
              </h3>
              <p className="text-gray-600">
                {user.levels.map((l,i)=>
                <span key={i} className='mr-1'>{l.name}</span>)
                }</p>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-md">
              <h3 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                <Tool className="h-4 w-4 mr-2" />
                {t("Materials")}
              </h3>
              <p className="text-gray-600">
                {user.matirels.map((m,i)=>
                <span key={i} className='mr-1'>{m.name}</span>)
                }</p>
            </div>
            <div className="bg-gray-100 px-4 py-2 rounded-md">
              <h3 className="text-sm font-semibold text-gray-700 mb-1 flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                {t("Phone_Number")}
              </h3>
              <p className="text-gray-600">{user.phone}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;