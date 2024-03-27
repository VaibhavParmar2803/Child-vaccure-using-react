import React from 'react'
import Layout2 from '../components/Layout2'
import { CCol, CFormLabel, CRow } from '@coreui/react'
import { Avatar } from 'primereact/avatar'
import { Icon } from '@iconify/react'

function Profile() {
    return (
        <Layout2>
            <div className='profile'>
                <div className='overlay'></div>
                <img src='/vaccines.png' className='profile-header-img' />
                <div className='profile_title'>
                    Profile
                </div>
                <CRow className='profile-box'>
                    <CCol lg={4} className='left-side'>
                        <Avatar image={'/profile.png'} className='avatar' shape="circle" />
                        <CFormLabel>John Doe</CFormLabel>
                    </CCol>
                    <CCol lg={8} className='right-side'>
                        <div className='heading'>
                            Information
                        </div>
                        <div className='d-flex justify-content-between top-side'>
                            <div className='profile-detail'>
                                <div className='title'><Icon icon="fontisto:email" className='icons' />Email</div>
                                <div className='sub_title'>john@gmail.com</div>
                            </div>
                            <div className='profile-detail'>
                                <div className='title'><Icon icon="iconoir:phone" className='icons' />Phone</div>
                                <div className='sub_title'>9876598765</div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div className='profile-detail'>
                                <div className='title'><Icon icon="mdi:address-marker" className='icons' />Address</div>
                                <div className='sub_title'>Ahmedabd</div>
                            </div>
                            <div className='profile-detail'>
                                <div className='title'><Icon icon="covid:vaccine-protection-virus" className='icons' />Vaccine</div>
                                <div className='sub_title'>AD-TX-44233</div>
                            </div>
                        </div>
                    </CCol>
                </CRow>
            </div>
        </Layout2>
    )
}

export default Profile