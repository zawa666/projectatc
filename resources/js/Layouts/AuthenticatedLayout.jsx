// resources/js/Layouts/AuthenticatedLayout.jsx
import React, { useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import { Head } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }) {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Dashboard" />
            
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            <div className={`transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main>{children}</main>
            </div>
        </div>
    );
}