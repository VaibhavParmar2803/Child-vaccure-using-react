import React from 'react'
import { CForm, CFormInput, CRow, CButton, CCol, CFormSelect } from '@coreui/react'
import { Link } from 'react-router-dom'

const timeOptions = [
    { label: '9:00 AM - 10:00 AM', value: '9:00 AM - 10:00 AM' },
    { label: '10:00 AM - 11:00 AM', value: '10:00 AM - 11:00 AM' },
    { label: '11:00 AM - 12:00 PM', value: '11:00 AM - 12:00 PM' },
    { label: '12:00 PM - 1:00 PM', value: '12:00 PM - 1:00 PM' },
    { label: '1:00 PM - 2:00 PM', value: '1:00 PM - 2:00 PM' },
    { label: '2:00 PM - 3:00 PM', value: '2:00 PM - 3:00 PM' },
    { label: '3:00 PM - 4:00 PM', value: '3:00 PM - 4:00 PM' },
    { label: '4:00 PM - 5:00 PM', value: '4:00 PM - 5:00 PM' },
    { label: '5:00 PM - 6:00 PM', value: '5:00 PM - 6:00 PM' },
];

const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
]

const ageOptions = [
    { label: '1 to 6 Months', value: '1 to 6 Months' },
    { label: '6 to 12 Months', value: '6 to 12 Months' },
    { label: '1 to 2 Year', value: '1 to 2 Year' },
    { label: '2 to 3 Year', value: '2 to 3 Year' },
    { label: '3 to 4 Year', value: '3 to 4 Year' },
    { label: '4 to 5 Year', value: '4 to 5 Year' },
]

function BookAppointment() {
    return (
        <div className='authentication'>
            <div className='authentication-header'>
                <div className='overlay'></div>
                <img src='/vaccines.png' />
                <div className='book-appointment-title'>
                    Book Appointment
                </div>
            </div>
            <div className='aurhentication-body'>
                <div className='title'>
                    Book Appointment
                    <div className='line'></div>
                </div>
                <div className='form'>
                    <CForm>
                        <CRow className='mb-4 mt-4'>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    placeholder="Enter Full Name"
                                />
                            </CCol>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    placeholder="Enter Vaccine Name"
                                />
                            </CCol>
                        </CRow>
                        <CRow className='mb-4'>
                            <CCol>
                                <CFormInput
                                    type="email"
                                    placeholder="Enter Email"
                                />
                            </CCol>
                            <CCol>
                                <CFormInput
                                    type="password"
                                    placeholder="Enter Password"
                                />
                            </CCol>
                        </CRow>
                        <CRow className='mb-4'>
                            <CCol>
                                <CFormInput
                                    type="date"
                                    placeholder="Enter Email"
                                />
                            </CCol>
                            <CCol>
                                <CFormSelect >
                                    <option value="" disabled>Select time</option>
                                    {timeOptions.map((o) => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                        </CRow>
                        <CRow className='mb-4'>
                            <CCol>
                                <CFormSelect >
                                    <option value="" disabled>Select Gender</option>
                                    {genderOptions.map((o) => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol>
                                <CFormSelect >
                                    <option value="" disabled>Select Age</option>
                                    {ageOptions.map((o) => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                        </CRow>
                        <CRow className='mb-4'>
                            <CCol>
                                <CFormInput
                                    type='text'
                                    placeholder='Address' />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol>
                                <CButton className='submit-button mb-4' type='submit'>
                                    Book Now
                                </CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </div>
            </div>
        </div >
    )
}

export default BookAppointment