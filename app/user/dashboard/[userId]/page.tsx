// pages/user/[userId]/dashboard.tsx
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import BreadcrumbHeader from '@/components/BreadcrumbHeaderComponent';

type PageQuery = {
    userId: string;
    // add other query parameters if needed
};

const Dashboard: React.FC = () => {
    const router = useRouter();
    const userId = router.query as PageQuery;
    console.log(userId);

    return (

        <div className="container mx-auto">
            <BreadcrumbHeader breadcrumbText={`Dashboard for User ${userId}`} />
            {/* Your Dashboard Content Goes Here */}
        </div>

    );
};

export default Dashboard;
