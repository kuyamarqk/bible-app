// pages/registration.js (or the appropriate path for your registration page)
import React from 'react';
import RegistrationForm from '@/components/RegistrationForm';

const RegistrationPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl mb-4 bg-white text-black px-2 py-4 rounded">
                <a className="text-blue-500 hover:underline" href="/">
                    Home
                </a>{' '}
                / Registration
            </h1>

            <RegistrationForm />
        </div>
    );
};

export default RegistrationPage;
