import React, { useState } from 'react'
import { CForm, CFormInput, CRow, CButton, CCol, CFormSelect } from '@coreui/react'
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useAppointment } from '../contaxt/AppointmentContaxt';
import { useAuth } from '../contaxt/AuthContext';

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
    const { bookAppointment } = useAppointment()
    const { toast } = useAuth();
    const navigate = useNavigate();

    const [appointmentDetail, setAppointmentDetail] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        vaccine: "",
        date: "",
        time: "",
        gender: "",
        age: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await bookAppointment(appointmentDetail);
            if (!data.error) {
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className='authentication'>
            <Toast ref={toast} />
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
                    <CForm onSubmit={handleSubmit}>
                        <CRow className='mb-4 mt-4'>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    placeholder="Enter Full Name"
                                    value={appointmentDetail.fullName}
                                    onChange={(e) => setAppointmentDetail({ ...appointmentDetail, fullName: e.target.value })}
                                />
                            </CCol>
                            <CCol>
                                <CFormInput
                                    type="text"
                                    placeholder="Enter Vaccine Name"
                                    value={appointmentDetail.vaccine}
                                    onChange={(e) => setAppointmentDetail({ ...appointmentDetail, vaccine: e.target.value })}
                                />
                            </CCol>
                        </CRow>
                        <CRow className='mb-4'>
                            <CCol>
                                <CFormInput
                                    type="email"
                                    placeholder="Enter Email"
                                    value={appointmentDetail.email}
                                    onChange={(e) => setAppointmentDetail({ ...appointmentDetail, email: e.target.value })}
                                />
                            </CCol>
                            <CCol>
                                <CFormInput
                                    type="phone"
                                    placeholder="Enter phone number"
                                    value={appointmentDetail.phone}
                                    onChange={(e) => setAppointmentDetail({ ...appointmentDetail, phone: e.target.value })}
                                />
                            </CCol>
                        </CRow>
                        <CRow className='mb-4'>
                            <CCol>
                                <CFormInput
                                    type="date"
                                    placeholder="Enter Date"
                                    value={appointmentDetail.date}
                                    onChange={(e) => setAppointmentDetail({ ...appointmentDetail, date: e.target.value })}
                                />
                            </CCol>
                            <CCol>
                                <CFormSelect
                                    value={appointmentDetail.time}
                                    onChange={(e) => setAppointmentDetail({ ...appointmentDetail, time: e.target.value })}
                                >
                                    <option value="" disabled>Select time</option>
                                    {timeOptions.map((o) => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                        </CRow>
                        <CRow className='mb-4'>
                            <CCol>
                                <CFormSelect
                                    value={appointmentDetail.gender}
                                    onChange={(e) => setAppointmentDetail({ ...appointmentDetail, gender: e.target.value })}
                                >
                                    <option value="" disabled>Select Gender</option>
                                    {genderOptions.map((o) => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </CFormSelect>
                            </CCol>
                            <CCol>
                                <CFormSelect
                                    value={appointmentDetail.age}
                                    onChange={(e) => setAppointmentDetail({ ...appointmentDetail, age: e.target.value })}
                                >
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
                                    value={appointmentDetail.address}
                                    onChange={(e) => setAppointmentDetail({ ...appointmentDetail, address: e.target.value })}
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