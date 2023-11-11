// useForm.js
"use client";
import { useState } from 'react';
import axios from 'axios';

const useForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        image: '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError(''); // Reset any previous errors

            // Validation logic
            if (!formData.email) {
                setError('Email is required');
                return; // Return early to prevent further execution
            }
            if (!formData.password) {
                setError('Password is required');
                return;
            }
            if (!formData.name) {
                setError('Name is required');
                return;
            }
            setSuccessMessage('');

            const response = await axios.post('/user', formData, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            if (response.status === 200) {
                setSuccessMessage('Registration successful. You can now log in.');
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    image: '',
                });

            } else if (response.status === 400) {
                // Handle client-side errors
                console.log('Response data:', response.data);
                setError(response.data.error);
            } else {
                // Handle other errors, e.g., server errors
                setError('An unknown error occurred');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('An error occurred:', error);
            setError('An error occurred: ' + error.message);
        }
    }
    return { formData, handleInputChange, handleSubmit, error, successMessage };
};

export default useForm;
