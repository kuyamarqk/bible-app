// BreadcrumbHeader.js
import Link from 'next/link';
import React from 'react';

interface BreadcrumbHeaderProps {
    breadcrumbText: string; // Specify the type of breadcrumbText prop
}

const BreadcrumbHeader: React.FC<BreadcrumbHeaderProps> = ({ breadcrumbText }) => {
    return (
        <h1 className="text-2xl lg:text-3xl xl:text-4xl mb-4 bg-white text-black px-2 py-4 rounded">
            <Link className="text-blue-500 hover:underline" href="/">
                Home
            </Link>{' '}
            / {breadcrumbText}
        </h1>
    );
};

export default BreadcrumbHeader;
