import React from 'react'
import { CForm, CFormInput, CRow, CButton } from '@coreui/react'
import { Link } from 'react-router-dom'

function SignUp() {
    return (
        <div>
            <div className='authentication'>
                <div className='authentication-header '>
                    <div className='overlay'></div>
                    <img src='/vaccines.png' />
                    <div className='title'>
                        Register
                    </div>
                </div>
                <div className='aurhentication-body'>
                    <div className='title'>
                        Create Account
                        <div className='line'></div>
                    </div>
                    <div className='form'>
                        <CForm>
                            <CRow className='mb-4 mt-4'>
                                <CFormInput
                                    type="text"
                                    placeholder="Full Name"
                                />
                            </CRow>
                            <CRow className='mb-4 '>
                                <CFormInput
                                    type="email"
                                    placeholder="Email Address"
                                />
                            </CRow>
                            <CRow className='mb-4'>
                                <CFormInput
                                    type="password"
                                    placeholder="Password"
                                />
                            </CRow>
                            <CRow className='mb-4'>
                                <CFormInput
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </CRow>
                            <CRow className='mb-4'>
                                <CFormInput
                                    type="number"
                                    placeholder="Phone Number"
                                />
                            </CRow>
                            <CRow>
                                <CButton className='submit-button mb-4' type='submit'>
                                    Register Now
                                </CButton>
                            </CRow>
                        </CForm>
                        <div className='mb-3 text-center'>
                            Have already an account ? <Link to='/login'><span className='link'>Login Here</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp