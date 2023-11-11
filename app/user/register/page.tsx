// pages/registration.js (or the appropriate path for your registration page)
import React from 'react';
import RegistrationForm from '@/components/RegistrationForm';
import BreadcrumbHeader from '@/components/BreadcrumbHeaderComponent';

const RegistrationPage = () => {
    return (
        <div className="container mx-auto p-4">
            <BreadcrumbHeader breadcrumbText="Registration" />

            <RegistrationForm />
        </div>
    );
};

export default RegistrationPage;
