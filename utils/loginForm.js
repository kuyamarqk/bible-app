// utils/loginForm.js
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const useLoginForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        userId: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            setError('');
            const response = await axios.post('/api/login', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Login successful, you can redirect the user to their dashboard or another page
                const { userId } = response.data;
                console.log(response);
                // Check if userId is available in the response
                if (userId) {
                    // Login successful, you can redirect the user to their dashboard or another page
                    setSuccessMessage('Login successful.');
                    setFormData({
                        userId: '',
                        email: '',
                        password: '',
                    });

                    // Use the userId from the response directly
                    router.push(`/user/dashboard/${userId}`);
                } else {
                    // Handle the case where userId is not available in the response
                    setError('User ID not found in the response');
                }
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return {
        formData,
        handleInputChange,
        handleSubmit,
        error,
        successMessage,
    };
};

export default useLoginForm;
