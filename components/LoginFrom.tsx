// LoginForm.js
"use client";
import React from 'react';
import useForm from '@/utils/loginForm'; // You need to create a loginForm utility function

import Link from 'next/link';
// import ErrorMessage from '@/utils/ErrorMessage';


const LoginForm = () => {
    const { formData, handleInputChange, handleSubmit, error, successMessage } = useForm();

    return (
        <div className="container mx-auto p-4 flex flex-wrap bg-white rounded mt-4 text-black">
            <div className="w-full md:w-1/2 p-4">
                <p className="text-xl text-center m-auto text-black font-bold">
                    Login to your account
                </p>
            </div>
            <div className="w-full md:w-1/2 p-4 flex">
                <div className="flex flex-col items-center md:items-start w-full">
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

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2"
                    >
                        Login
                    </button>

                    {/* <ErrorMessage error={error} successMessage={successMessage} /> */}

                    <Link
                        href="/user/register"
                        className="w-full text-center bg-blue-500 hover:bg-blue-600 text-blue-900 hover:text-white py-2 px-4 rounded opacity-50 hover:opacity-100"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
