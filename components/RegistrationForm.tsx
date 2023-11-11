// RegistrationForm.js
"use client";
import React from 'react';
import useForm from '@/utils/registerForm'

import Link from 'next/link';
import ErrorMessage from '@/utils/errorMessage';

const RegistrationForm = () => {
    const { formData, handleInputChange, handleSubmit, error, successMessage } = useForm();

    return (
        <div className="container mx-auto p-4 flex flex-wrap bg-white rounded mt-4 text-black">
            <div className="w-full md:w-1/2 p-4">
                <p className="text-xl text-center m-auto text-black font-bold">
                    Register to Add your favorite daily verse
                </p>
            </div>
            <div className="w-full lg:w-1/4 md:w-1/2 p-4">
                <div className="flex flex-col items-center md:items-start">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-2"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded mb-2"
                    />
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className="w-full p-2 border rounded mb-2"
                    />
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2"
                    >
                        Register
                    </button>
                    <ErrorMessage error={error} successMessage={successMessage} />
                    <Link
                        href="/user/login"
                        className="w-full text-center bg-blue-500 hover:bg-blue-600 text-blue-900 hover:text-white py-2 px-4 rounded opacity-50 hover:opacity-100"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
