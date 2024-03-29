import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useAuth } from '../contaxt/AuthContext';

function Navbar() {
    const { auth, logout } = useAuth();
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate("/")
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-white border-bottom">
            <div className="container-fluid d-flex justify-between">
                <div className='logo2'>
                    CHILD VACCURE
                </div>
                <div className="collapse navbar-collapse align-right navbar-right" id="navbarSupportedContent">
                    <ul className="nav navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <HashLink className="nav-link" smooth to="/#home">Home</HashLink>
                        </li>
                        <li className="nav-item">
                            <HashLink className="nav-link" smooth to="/#about">About Us</HashLink>
                        </li>
                        <li className="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">Services</div>
                            <ul className="dropdown-menu">
                                <li><HashLink className="dropdown-item" smooth to="/#services">Vaccine List</HashLink></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/book-appointment">Book Appointment</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <HashLink className="nav-link" smooth to="/#faq">FAQ</HashLink>
                        </li>
                        <li className="nav-item">
                            <HashLink className="nav-link" smooth to="/#contact">Contact Us</HashLink>
                        </li>
                        {
                            !auth.user ? (
                                <li className="nav-item">
                                    <button className="user-button w-100" type="submit" onClick={() => navigate('/login')}>Register/Sign in</button>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <div className="nav-link dropdown-toggle user-button" role="button" data-bs-toggle="dropdown">{auth.user.fullName}</div>
                                    <ul className="dropdown-menu">
                                        <li className="ps-2" onClick={() => navigate('/profile')}>Profile</li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li className="ps-2" onClick={() => handleLogout()}>Logout</li>
                                    </ul>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
