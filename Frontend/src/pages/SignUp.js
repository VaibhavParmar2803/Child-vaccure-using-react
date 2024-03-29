import React, { useState } from 'react'
import { CForm, CFormInput, CRow, CButton } from '@coreui/react'
import { Link, useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useAuth } from '../contaxt/AuthContext';

function SignUp() {
    const { signUp, toast } = useAuth();
    const navigate = useNavigate();

    const [credential, setCredential] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",

    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await signUp(credential);
            if (!data.error) {
                navigate('/login')
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Toast ref={toast} />
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
                        <CForm onSubmit={handleSubmit}>
                            <CRow className='mb-4 mt-4'>
                                <CFormInput
                                    type="text"
                                    placeholder="Full Name"
                                    value={credential.fullName}
                                    onChange={(e) => setCredential({ ...credential, fullName: e.target.value })}
                                />
                            </CRow>
                            <CRow className='mb-4 '>
                                <CFormInput
                                    type="email"
                                    placeholder="Email Address"
                                    value={credential.email}
                                    onChange={(e) => setCredential({ ...credential, email: e.target.value })}
                                />
                            </CRow>
                            <CRow className='mb-4'>
                                <CFormInput
                                    type="password"
                                    placeholder="Password"
                                    value={credential.password}
                                    onChange={(e) => setCredential({ ...credential, password: e.target.value })}
                                />
                            </CRow>
                            <CRow className='mb-4'>
                                <CFormInput
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={credential.confirmPassword}
                                    onChange={(e) => setCredential({ ...credential, confirmPassword: e.target.value })}
                                />
                            </CRow>
                            <CRow className='mb-4'>
                                <CFormInput
                                    type="number"
                                    placeholder="Phone Number"
                                    value={credential.phone}
                                    onChange={(e) => setCredential({ ...credential, phone: e.target.value })}
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