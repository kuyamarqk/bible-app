"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        try {
            setError('');
            const response = await axios.post('/api/user/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Login successful, you can redirect the user to their dashboard or another page
                setSuccessMessage('Login successful.');
                setFormData({
                    email: '',
                    password: '',
                });
            } else {
                setError(response.data.message);
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    return (
        <div className="container mx-auto p-4 flex flex-wrap bg-white rounded mt-4 text-black">
            <div className="w-full md:w-1/2 p-4">
                <p className="text-xl text-center m-auto text-black font-bold">
                    Login to your account
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
                    <button
                        onClick={handleLogin}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2"
                    >
                        Login
                    </button>
                    <p className="text-red-500">{error}</p>
                    <p className="text-green-500">{successMessage}</p>
                    <Link
                        href="/user/register"
                        className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white hover:text-white py-2 px-4 rounded"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
