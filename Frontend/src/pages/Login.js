import React, { useEffect, useState } from 'react'
import { Toast } from 'primereact/toast';
import { CForm, CFormInput, CRow, CButton } from '@coreui/react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contaxt/AuthContext';

function Login() {
    const { auth, login, toast } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [credential, setCredential] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credential);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (auth?.token) {
            location.pathname !== '/login' ? navigate(location.pathname) : (auth.user.role === "user" ? navigate('/') : navigate('/admin/dashboard'))
        }
    }, [auth?.token, navigate])

    return (
        <div>
            <Toast ref={toast} />
            <div className='authentication'>
                <div className='authentication-header '>
                    <div className='overlay'></div>
                    <img src='/vaccines.png' />
                    <div className='title'>
                        Login
                    </div>
                </div>
                <div className='aurhentication-body'>
                    <div className='title'>
                        Login
                        <div className='line'></div>
                    </div>
                    <div className='form'>
                        <CForm onSubmit={handleSubmit} >
                            <CRow className='mb-4 mt-4'>
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
            </div>
        </div>
    )
}

export default Login