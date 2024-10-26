// resources/js/Components/Sidebar.jsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { 
    ChevronDown, 
    ChevronRight, 
    Book, 
    Search, 
    MenuIcon,
    Calendar,
    Users,
    FileText
} from 'lucide-react';

export default function Sidebar({ collapsed, setCollapsed }) {
    const [openMenus, setOpenMenus] = useState({
        search: false,
        schedule: false
    });

    const toggleMenu = (menu) => {
        setOpenMenus(prev => ({
            ...prev,
            [menu]: !prev[menu]
        }));
    };

    return (
        <div className={`bg-gray-800 text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} min-h-screen fixed left-0 top-0`}>
            {/* Header/Logo Section */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {!collapsed && <span className="text-xl font-bold">ProjectATC</span>}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 rounded-lg hover:bg-gray-700 transition-colors"
                >
                    <MenuIcon size={20} />
                </button>
            </div>

            {/* Menu Items */}
            <nav className="mt-4">
                {/* Logbook Menu */}
                <Link 
                    href="/logbook" 
                    className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-4 hover:bg-gray-700 transition-colors`}
                >
                    <div className="flex items-center gap-3">
                        <Book size={20} />
                        {!collapsed && <span>Logbook</span>}
                    </div>
                </Link>

                {/* Search Logbook Menu Group */}
                <div>
                    <button
                        onClick={() => toggleMenu('search')}
                        className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-4 hover:bg-gray-700 transition-colors`}
                    >
                        <div className="flex items-center gap-3">
                            <Search size={20} />
                            {!collapsed && <span>Search Logbook</span>}
                        </div>
                        {!collapsed && (
                            openMenus.search ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                        )}
                    </button>

                    {/* Search Submenu */}
                    {openMenus.search && !collapsed && (
                        <div className="bg-gray-900">
                            <Link href="/search/daily" className="flex items-center pl-12 pr-4 py-2 hover:bg-gray-700">
                                Daily Search
                            </Link>
                            <Link href="/search/date" className="flex items-center pl-12 pr-4 py-2 hover:bg-gray-700">
                                Date Search
                            </Link>
                            <Link href="/search/note" className="flex items-center pl-12 pr-4 py-2 hover:bg-gray-700">
                                Note Search
                            </Link>
                        </div>
                    )}
                </div>

                {/* Schedule Menu Group */}
                <div>
                    <button
                        onClick={() => toggleMenu('schedule')}
                        className={`w-full flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-4 hover:bg-gray-700 transition-colors`}
                    >
                        <div className="flex items-center gap-3">
                            <Calendar size={20} />
                            {!collapsed && <span>Schedule</span>}
                        </div>
                        {!collapsed && (
                            openMenus.schedule ? <ChevronDown size={16} /> : <ChevronRight size={16} />
                        )}
                    </button>

                    {/* Schedule Submenu */}
                    {openMenus.schedule && !collapsed && (
                        <div className="bg-gray-900">
                            <Link href="/schedule" className="flex items-center pl-12 pr-4 py-2 hover:bg-gray-700">
                                Schedule
                            </Link>
                            <Link href="/schedule/actual" className="flex items-center pl-12 pr-4 py-2 hover:bg-gray-700">
                                Actual Schedule
                            </Link>
                            <Link href="/schedule/change" className="flex items-center pl-12 pr-4 py-2 hover:bg-gray-700">
                                Change Schedule
                            </Link>
                        </div>
                    )}
                </div>

                {/* Member Data Menu */}
                <Link 
                    href="/member-data" 
                    className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-4 hover:bg-gray-700 transition-colors`}
                >
                    <div className="flex items-center gap-3">
                        <Users size={20} />
                        {!collapsed && <span>Member Data</span>}
                    </div>
                </Link>

                {/* Document Menu */}
                <Link 
                    href="/document" 
                    className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-4 hover:bg-gray-700 transition-colors`}
                >
                    <div className="flex items-center gap-3">
                        <FileText size={20} />
                        {!collapsed && <span>Document</span>}
                    </div>
                </Link>
            </nav>
        </div>
    );
}