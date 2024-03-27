import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CBadge } from '@coreui/react';
import PropTypes from 'prop-types';

const AppSidebarNav = ({ items }) => {
  const location = useLocation();

  const navLink = (name, icon, badge) => (
    <>
      {icon && icon}
      {name && name}
      {badge && (
        <CBadge color={badge.color} className="ms-auto">
          {badge.text}
        </CBadge>
      )}
    </>
  );

  const navItem = (item, index) => {
    const { component: Component, name, badge, icon, ...rest } = item;
    return (
      <Component
        {...(rest.to && !rest.items && {
          component: NavLink,
        })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    );
  };

  const navGroup = (item, index) => {
    const { component: Component, name, icon, to, ...rest } = item;
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((subItem, subIndex) =>
          subItem.items ? navGroup(subItem, subIndex) : navItem(subItem, subIndex),
        )}
      </Component>
    );
  };

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default AppSidebarNav;
