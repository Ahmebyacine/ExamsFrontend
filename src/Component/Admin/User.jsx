import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import {useLanguage} from '../utils/LanguageContext';
import UserCard from './UserCard';

const User= () => {
  const { t } = useLanguage();
  const [users, setUsers] = useState([]);
  const [allLevels, setAllLevels] = useState([]);
  const [allMatriels, setAllMatriels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersResponse, levelsResponse, matrielsResponse] = await Promise.all([
          api.get('/api/user'),
          api.get('/api/levels'),
          api.get('/api/matriels'),
        ]);
  
        setUsers(usersResponse.data);
        setAllLevels(levelsResponse.data);
        setAllMatriels(matrielsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  const handleUserUpdate = (updatedUser) => {
    setUsers((prev) =>
      prev.map((user) => (user._id === updatedUser._id ? updatedUser : user))
    );
  };

  const handleUserDelete = (deletedUserId) => {
    setUsers((prev) => prev.filter((user) => user.id !== deletedUserId));
  };

  return (
    <div className="p-6 space-y-4">
      {loading ? (
        <p>{t("loadingMsg")}</p>
      ) : (
        users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            allLevels={allLevels}
            allMatriels={allMatriels}
            onUserUpdate={handleUserUpdate}
            onUserDelete={handleUserDelete}
          />
        ))
      )}
    </div>
  );
};

export default User;