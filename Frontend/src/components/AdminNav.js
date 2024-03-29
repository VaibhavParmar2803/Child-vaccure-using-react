import React from 'react'
import { CNavItem } from '@coreui/react'
import { Icon } from '@iconify/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <Icon icon="ic:round-dashboard" style={{ color: 'white' }} className='me-2' />
  },
  {
    component: CNavItem,
    name: 'Book Appointment',
    to: '/admin/bookings',
    icon: <Icon icon="mdi:account-student" style={{ color: 'white' }} className='me-2' />
  },
  // {
  //   component: CNavItem,
  //   name: 'Vaccination',
  //   to: '/admin/vaccination',
  //   icon: <Icon icon="ph:chalkboard-teacher-fill" style={{ color: 'white' }} className='me-2' />,
  // },
  {
    component: CNavItem,
    name: 'Pending Vaccination',
    to: '/admin/vaccination/pending',
    icon: <Icon icon="fa6-solid:users" style={{ color: 'white' }} className='me-2' />,
  },
  {
    component: CNavItem,
    name: 'Full Vaccination',
    to: '/admin/vaccination/full',
    icon: <Icon icon="mdi:graph-bar" style={{ color: 'white' }} className='me-2' />,
  },
  {
    component: CNavItem,
    name: 'Contact us',
    to: '/admin/contact-us',
    icon: <Icon icon="uiw:setting" style={{ color: 'white' }} className='me-2' />,
  }
]

export default _nav
