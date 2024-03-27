import React from 'react'
import { CForm, CFormInput, CRow, CButton } from '@coreui/react'
import { Link } from 'react-router-dom'

function ForgotPassword() {
    return (
        <div>
            <div className='authentication'>
                <div className='authentication-header '>
                    <div className='overlay'></div>
                    <img src='/vaccines.png' />
                    <div className='forgot-password-title'>
                        Forgot Password
                    </div>
                </div>
                <div className='aurhentication-body'>
                    <div className='title'>
                        Forgot Password
                        <div className='line'></div>
                    </div>
                    <div className='form'>
                        <CForm>
                            <CRow className='mb-4 mt-4'>
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
                            <CRow>
                                <CButton className='submit-button mb-4' type='submit'>
                                    Submit
                                </CButton>
                            </CRow>
                        </CForm>
                        <div className='mb-3 text-center'>
                            Have already an account ? <Link to='/'><span className='link'>Login Here</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword