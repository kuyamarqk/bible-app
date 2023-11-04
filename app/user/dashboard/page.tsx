"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const Dashboard = () => {
    const [userData, setUserData] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        // Fetch user data or perform any necessary actions when the dashboard page loads
        // You can use an Axios request to retrieve user data here

        // Example Axios API call:
        // axios.get('/api/user/dashboard')
        //     .then((response) => {
        //         setUserData(response.data);
        //     })
        //     .catch((error) => {
        //         setError(error.message);
        //     });
    }, []);

    return (
        <div className="container mx-auto p-4 flex flex-wrap bg-white rounded mt-4 text-black">
            <div className="w-full p-4">
                <h2 className="text-2xl text-center font-bold mb-4">Dashboard</h2>
                {error && <p className="text-red-500">{error}</p>}
                {Object.keys(userData).length > 0 && (
                    <div>
                        <p>Welcome, !</p>
                        {/* Display user-specific dashboard content here */}
                    </div>
                )}
                <Link
                    href="/user/login"
                    className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white hover:text-white py-2 px-4 rounded mt-4"
                >
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;
