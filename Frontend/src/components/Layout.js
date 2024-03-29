import React from 'react';
import AppSidebar from './AppSidebar';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contaxt/AuthContext';

const Layout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }
  return (
    <div className='d-flex flex-column  overflow-hidden'>
      <div className='layout-header border-bottom'>
        <div className='logo'>
          CHILD VACCURE
        </div>
        <div className='logout'>
          <button className='appointment_button me-4' onClick={() => navigate('/book-appointment')}>Book Appointment</button>
          Logout <Icon icon="line-md:logout" style={{ color: 'black' }} onClick={() => handleLogout()} />
        </div>
      </div>
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column children">
          {/* <Toast /> */}
          <div className="body flex-grow-1 px-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
