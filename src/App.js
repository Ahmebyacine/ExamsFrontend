import { HashRouter , Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/signup';
import Dashboard from './Routes/Dashboard';
import Unauthorized from './Component/Unauthorized';

const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;