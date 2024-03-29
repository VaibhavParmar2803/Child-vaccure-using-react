import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useAuth } from '../contaxt/AuthContext';

function Navbar() {
    const { auth } = useAuth();
    const navigate = useNavigate()

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
                    </ul>
                    <div className='home-page'>
                        {
                            !auth.user ? (
                                <button className="submit-button w-100" type="submit" onClick={() => navigate('/login')}>Register/Sign in</button>
                            ) : (
                                <button className="submit-button w-100" type="submit" onClick={() => navigate('/profile')}>{auth.user.fullName}</button>
                            )
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
