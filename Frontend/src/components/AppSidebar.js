import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSidebar, CSidebarNav, CSidebarToggler } from '@coreui/react';
import SimpleBar from 'simplebar-react';
import adminNavigation from './AdminNav';
import AppSidebarNav from './AppSidebarNav';
import 'simplebar/dist/simplebar.min.css';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (

    <CSidebar
      position="fixed"
      className='sidebar'
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={adminNavigation} />
        </SimpleBar>
      </CSidebarNav>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);

