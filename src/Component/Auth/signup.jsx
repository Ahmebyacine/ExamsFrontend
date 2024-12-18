import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import Multiselect from "multiselect-react-dropdown";
import api from '../utils/api'
import useFetchData from '../utils/useFetchDataSingup';
import { useLanguage } from '../utils/LanguageContext';
const Signup = () => {
  const { t } = useLanguage();
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedMatriels, setSelectedMatriels] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
 
  
  const { levels, matriels, loading, errorAPI } = useFetchData();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response=await api.post(`/api/auth/signup`, { name,email, password,phone,levels:selectedLevels,matirels:selectedMatriels });
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/ExamsFrontend/user');
    } catch (err) {
        setError(
            err.response?.data?.message || 'Something went wrong. Please try again.'
          );
    } finally {
      setIsLoading(false);
    }
  };
 

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">{t("signup")}</h2>
        <p className="text-gray-500 text-sm mb-6">
          {t("signupMsg")}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">
              {t("name")}
            </label>
            <input
              id="name"
              type="text"
              placeholder=" You Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              {t("email")}
            </label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              {t("phone")}
            </label>
            <input
              id="phone"
              type="text"
              placeholder="876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              {t("Password")}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              {t("Levels")}
            </label>
            <Multiselect
              options={levels}
              selectedValues={selectedLevels}
              onSelect={(selectedList) => {
                selectedList.map((item) => item._id);
                setSelectedLevels(selectedList);
              }}
              onRemove={(selectedList) => {
                selectedList.map((item) => item._id);
                setSelectedLevels(selectedList);
              }}
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
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
             {t("Matriels")}
            </label>
            <Multiselect
              options={matriels}
              selectedValues={selectedMatriels}
              onSelect={(selectedList) => {
                selectedList.map((item) => item._id);
                setSelectedMatriels(selectedList);
              }}
              onRemove={(selectedList) => {
                selectedList.map((item) => item._id);
                setSelectedMatriels(selectedList);
              }}
              displayValue="name"
              placeholder="Select matriels"
              style={{
                multiselectContainer: { backgroundColor: "white" },
                chips: { background: "#6366F1", color: "white" },
                optionContainer: { backgroundColor: "#F3F4F6" },
                option: { color: "#4B5563" },
              }}
            />
          </div>
          {(error || errorAPI) && (
            <div className="text-red-600 text-sm flex items-center gap-2">
              <span>{error}</span>
              <span>{errorAPI}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading || loading}
            className={`w-full py-2 text-white rounded-md ${
              isLoading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading || loading? t("loadingMsg") : t("signup")}
          </button>
          <div className="text-blue-600 my-2 underline">
          <Link to='/login'>{t("toLoginMsg")}</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;