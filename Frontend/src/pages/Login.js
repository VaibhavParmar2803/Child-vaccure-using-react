import React from 'react'
import { CForm, CFormInput, CRow, CButton } from '@coreui/react'
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div className='authentication'>
            <div className='authentication-header'>
                <div className='overlay'></div>
                <img src='/vaccines.png' />
                <div className='title'>
                    Login
                </div>
            </div>
            <div className='authentication-body'>
                <div className='title'>
                    Login
                    <div className='line'></div>
                </div>
                <div className='form'>
                    <CForm>
                        <CRow className='mb-4 mt-4'>
                            <CFormInput
                                type="email"
                                placeholder="Enter Email"
                            />
                        </CRow>
                        <CRow className='mb-4'>
                            <CFormInput
                                type="password"
                                placeholder="Enter Password"
                            />
                        </CRow>
                        <CRow>
                            <CButton className='submit-button mb-4' type='submit'>
                                Login
                            </CButton>
                        </CRow>
                    </CForm>
                    <div className='mb-3 text-center'>
                        Don't have an account ? <Link to='/sign-up'><span className='link'>Register Here</span></Link>
                    </div>
                    <div className='mb-3 text-center'>
                        Forgot Password ? <Link to='/forgot-password'><span className='link'>Forgot Password</span></Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Login