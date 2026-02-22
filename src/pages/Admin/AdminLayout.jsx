import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './Tools/AdminHeader';
import AdminSidebar from './Tools/AdminSidebar';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans selection:bg-indigo-500 selection:text-white text-slate-900">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                    onClick={closeSidebar}
                />
            )}

            <AdminSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Visual Depth Background */}
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none"></div>

                {/* Header Component */}
                <AdminHeader toggleSidebar={toggleSidebar} />

                {/* Content Outlet */}
                <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent relative z-10">
                    <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
