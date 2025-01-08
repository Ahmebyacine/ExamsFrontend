import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import api from '../../Services/api'
import { getTokenPayload } from '../../Services/getTokenPayload';
import { useLanguage } from '../../Contexts/LanguageContext';
const Login = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response=await api.post(`/api/auth/login`, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      const tokenPayload = getTokenPayload();
      const userRole = tokenPayload?.role;
      if (userRole === 'admin') {
        navigate('/');
      } else {
        navigate('/user');
      }
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
        <h2 className="text-2xl font-bold mb-2">{t("login")}</h2>
        <p className="text-gray-500 text-sm mb-6">
          {t("loginMsg")}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          {error && (
            <div className="text-red-600 text-sm flex items-center gap-2">
              <span>{error}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 text-white rounded-md ${
              isLoading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? t("loadingLogin") : t("login")}
          </button>
          <div className="text-blue-600 my-2 underline">
          <Link to='/signup'> {t("toSignUpMsg")}</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;