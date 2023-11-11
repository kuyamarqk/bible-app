// pages/registration.js (or the appropriate path for your registration page)
import React from 'react';
import BreadcrumbHeader from '@/components/BreadcrumbHeaderComponent';
import LoginForm from '@/components/LoginFrom';

const RegistrationPage = () => {
    return (
        <div className="container mx-auto p-4">
            <BreadcrumbHeader breadcrumbText="Login" />

            <LoginForm />
        </div>
    );
};

export default RegistrationPage;
