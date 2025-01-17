import { useState } from 'react';
import { Routes, Route, Link  } from 'react-router-dom';
import { X, BookOpen, Calendar, Boxes, ChartNoAxesGantt, Heart, Plus, Users,Archive } from 'lucide-react';
import AddExecrise from '../Pages/Admin/addExecrise';
import Header from '../Component/Header';
import Exercises from '../Pages/Admin/Exercises';
import Levels from '../Pages/Admin/Levels';
import Matriel from '../Pages/Admin/Matriel';
import Unit from '../Pages/Admin/Unit';
import User from '../Pages/Admin/User';
import ExercisesUser from '../Pages/User/ExercisesUser';
import LogoutButton from '../Component/LogoutButton'
import { getTokenPayload } from './../Services/getTokenPayload';
import ProtectedRoute from './../Services/ProtectedRoute';
import FavoritesExercise from '../Pages/User/FavoritesExercise';
import CurrentExam from '../Pages/User/CurrentExam';
import ArchivedExams from '../Pages/User/ArchivedExams';
import { useLanguage } from "../Contexts/LanguageContext";

const navItemsAdmin = [
  { name: 'Exercises', link: '/', icon: Calendar },
  { name: 'Levels', link: '/levels', icon: ChartNoAxesGantt },
  { name: 'Matriel', link: '/matriel', icon: BookOpen },
  { name: 'Unit', link: '/unit', icon: Boxes },
  { name: 'User', link: '/users', icon: Users },
];
const navItemsUser = [
  { name: 'Exercises', link: '/user', icon: Calendar },
  { name: 'Favorites_Exercise', link: '/FavoritesExercise', icon: Heart },
  { name: 'Current_Exam', link: '/CurrentExam', icon: Plus },
  { name: 'Archived_Exams', link: '/ArchivedExams', icon: Archive  },
];

const Dashboard = () => {
  const { t } = useLanguage();
  const tokenPayload = getTokenPayload();
  const userRole = tokenPayload?.role;

  
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-indigo-700 text-white transition-transform duration-300 ease-in-out lg:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-indigo-600">
          <h2 className="text-xl font-bold">{t("logoName")}</h2>
          <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-indigo-600 lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
           {(userRole === 'admin' ? navItemsAdmin : navItemsUser).map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  className="flex items-center px-4 py-2 text-sm rounded-md hover:bg-indigo-600 transition-colors duration-200"
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {t(item.name)}
                </Link>
              </li>)
            )}
            <li>
              <LogoutButton/>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="lg:ml-64">
        <Header toggleSidebar={toggleSidebar} />
        <Routes>
          <Route 
          path="/addExercise" 
          element={
             <ProtectedRoute allowedRoles={['admin']}>
                <AddExecrise />
              </ProtectedRoute>} />
          <Route path="/" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Exercises />
            </ProtectedRoute>
          } /> 
             
          <Route path="/user" element={
             <ProtectedRoute allowedRoles={['user']}>
               <ExercisesUser />
             </ProtectedRoute>
              } />
          <Route path="/FavoritesExercise" element={
             <ProtectedRoute allowedRoles={['user']}>
               <FavoritesExercise />
             </ProtectedRoute>
              } />
          <Route path="/CurrentExam" element={
             <ProtectedRoute allowedRoles={['user']}>
               <CurrentExam />
             </ProtectedRoute>
              } />
          <Route path="/ArchivedExams" element={
             <ProtectedRoute allowedRoles={['user']}>
               <ArchivedExams />
             </ProtectedRoute>
              } />
          <Route path="/levels" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Levels />
            </ProtectedRoute>
          } />
          <Route path="/matriel" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Matriel />
            </ProtectedRoute>
            } />
          <Route path="/unit" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Unit />
            </ProtectedRoute>
          } />
          <Route path="/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <User />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  );
};

export default Dashboard;