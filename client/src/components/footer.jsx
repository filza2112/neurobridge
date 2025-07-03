import React from 'react';
import logo from '../assets/images/logo.png'; // Assuming you have the logo

const Footer = () => {
    return (
        <footer className="bg-deepBlue text-white p-10">
            <div className="w-11/12 max-w-[1080px] mx-auto text-center">
                <img src={logo} alt="Razorpay Logo" className="w-[125px] h-[30px] mx-auto mb-4" />
                <p className="font-mullish">© 2024 Razorpay. All Rights Reserved.</p>
                <p className="font-mullish text-sm text-gray-400 mt-2">
                    This is a clone for educational purposes only.
                </p>
            </div>
        </footer>
    );
};

export default Footer;