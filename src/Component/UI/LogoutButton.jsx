import { Power } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from "../utils/LanguageContext";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button
     onClick={handleLogout}
     className="flex items-center w-full px-4 py-2 text-sm rounded-md hover:bg-indigo-600 transition-colors duration-200"
   >
     <Power className="mr-3 h-5 w-5" />
     {t("Logout")}  
   </button>
  )
};

export default LogoutButton;
