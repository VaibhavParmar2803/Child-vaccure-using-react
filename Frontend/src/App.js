import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import './scss/style.scss'
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';
import MainPage from './pages/MainPage';
import BookingDetail from './pages/BookingDetail';
import VaccinationDetail from './pages/VaccinationDetail';
import PendingVaccination from './pages/PendingVaccination';
import FullVaccination from './pages/FullVaccination';
import ContactUs from './pages/ContactUs';
import BookAppointment from './pages/BookAppointment';
import Profile from './pages/Profile';
import AdminRoutes from './Routes/AdminRoutes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/book-appointment" element={<BookAppointment />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminRoutes />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="bookings" element={<BookingDetail />} />
        <Route path="vaccination" element={<VaccinationDetail />} />
        <Route path="vaccination/pending" element={<PendingVaccination />} />
        <Route path="vaccination/full" element={<FullVaccination />} />
        <Route path="contact-us" element={<ContactUs />} />
      </Route>
    </Routes>
  );
}

export default App;
