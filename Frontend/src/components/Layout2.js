import React from 'react'
import Navbar from './Navbar'

function Layout2({ children }) {
    return (
        <div>
            <Navbar />
            <div className="wrapper d-flex flex-column min-vh-100 bg-white">
                {/* <Toast /> */}
                <div className="body flex-grow-1">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout2