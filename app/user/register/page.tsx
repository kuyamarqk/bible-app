"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
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

    const handleRegistration = async () => {
        try {
            setError('');
            const response = await axios.post('/app/api/register', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Registration successful, you can display a success message or redirect the user
                setSuccessMessage('Registration successful. You can now log in.');
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    image: '',
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
                        onClick={handleRegistration}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-2"
                    >
                        Register
                    </button>
                    <p className="text-red-500">{error}</p>
                    <p className="text-green-500">{successMessage}</p>
                    <Link
                        href="/user/login"
                        className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white hover:text-white py-2 px-4 rounded"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
