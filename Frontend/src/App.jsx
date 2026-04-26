import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Academics from './pages/Academics';
import Admission from './pages/Admission';
import Announcements from './pages/Announcements';
import Gallery from './pages/Gallery';
import ContactUs from './pages/ContactUs';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageAnnouncements from './pages/admin/ManageAnnouncements';
import ManageAdmissions from './pages/admin/ManageAdmissions';
import ManageEnquiries from './pages/admin/ManageEnquiries';
import ManageSchool from './pages/admin/ManageSchool';
import ManageGallery from './pages/admin/ManageGallery';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { AuthProvider } from './context/AuthContext';
import { SchoolProvider } from './context/SchoolContext';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutUs /> },
      { path: '/academics', element: <Academics /> },
      { path: '/admission', element: <Admission /> },
      { path: '/announcements', element: <Announcements /> },
      { path: '/gallery', element: <Gallery /> },
      { path: '/contact', element: <ContactUs /> },
      
      // Admin Login Route (PublicOnly)
      {
        element: <PublicRoute />,
        children: [
          { path: '/admin/login', element: <AdminLogin /> },
        ],
      },
    ],
  },
  // Protected Admin Routes with Sidebar Layout
  {
    path: '/admin',
    element: <ProtectedRoute adminOnly={true} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: 'dashboard', element: <AdminDashboard /> },
          { path: 'announcements', element: <ManageAnnouncements /> },
          { path: 'admissions', element: <ManageAdmissions /> },
          { path: 'enquiries', element: <ManageEnquiries /> },
          { path: 'gallery', element: <ManageGallery /> },
          { path: 'school-settings', element: <ManageSchool /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <SchoolProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </SchoolProvider>
  );
}

export default App;
