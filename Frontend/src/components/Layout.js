import React from 'react';
import { Toast } from 'primereact/toast';
import AppSidebar from './AppSidebar';
import { Icon } from '@iconify/react';

const Layout = ({ children }) => {
  return (
    <div className='d-flex flex-column  overflow-hidden'>
      <div className='layout-header border-bottom'>
        <div className='logo'>
          CHILD VACCURE
        </div>
        <div className='logout'>
          Logout <Icon icon="line-md:logout"  style={{color: 'black'}} />
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
