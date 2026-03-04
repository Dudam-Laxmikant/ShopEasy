import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Tools/Header';
import AccountSidebar from './AccountSidebar';

const AccountLayout = () => {
    return (
        <div className="flex flex-col h-screen bg-[#FDFDFD] overflow-hidden">
            <Header />
            <main className="flex-1 w-full overflow-y-auto scroll-smooth">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

                    <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                        {/* Sidebar Container */}
                        <div className="md:sticky md:top-24 h-fit">
                            <AccountSidebar />
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 min-w-0">
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-10 min-h-[600px]">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};



export default AccountLayout;
