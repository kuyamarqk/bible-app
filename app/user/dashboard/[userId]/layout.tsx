// components/Layout.tsx
"use client";
import React, { ReactNode, useState } from 'react';
import Link from 'next/link';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [showMainSection, setShowMainSection] = useState(false);

    const handleToggleMainSection = () => {
        setShowMainSection(!showMainSection);
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white p-4">
                <div className="mb-4">
                    <button onClick={handleToggleMainSection} className="text-white">
                        Toggle Main Section
                    </button>
                </div>
                <div className="mb-4">
                    <Link
                        href="/dashboard"
                        className="text-white"
                    >
                        Dashboard
                    </Link>
                </div>
                <div className="mb-4">
                    <Link
                        href="/favorite-verses"
                        className="text-white"
                    >
                        Favorite Verses
                    </Link>
                </div>
                <div className="mb-4">
                    <Link
                        href="/my-reflection"
                        className="text-white"
                    >
                        My Reflection
                    </Link>
                </div>
                <div className="mb-4" >
                    <Link
                        href="/replies"
                        className="text-white"
                    >
                        Replies
                    </Link>
                </div>
                <div className="mb-4">
                    <Link href="/comments"
                        className="text-white">
                        Comments
                    </Link>
                </div>
                <div className="mb-4">
                    <Link href="/settings" className="text-white">
                        Settings
                    </Link>
                </div>
                <div className="mt-auto mb-4">
                    <Link href="/account" className="text-white">
                        Account
                    </Link>
                </div>
                <div className="mb-4">
                    <Link href="/logout" className="text-white">
                        Log Out
                    </Link>
                </div>
            </div>

            {/* Main Section */}
            <div className={`flex-grow p-4 ${showMainSection ? 'block' : 'hidden'}`}>
                {children}
            </div>
        </div>
    );
};

export default Layout;
