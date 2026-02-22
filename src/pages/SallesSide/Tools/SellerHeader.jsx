import React, { useState } from 'react';
import {
    Bell,
    Search,
    User,
    ChevronDown,
    Store,
    Menu,
    X,
    LogOut,
    Settings,
    HelpCircle
} from 'lucide-react';

const SellerHeader = ({ toggleSidebar }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40 px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-gray-100 rounded-lg lg:hidden transition-colors border-none bg-transparent cursor-pointer"
                >
                    <Menu className="w-5 h-5 text-gray-600" />
                </button>

                <div className="flex items-center gap-2">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <Store className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hidden sm:block">
                        SellerHub
                    </span>
                </div>
            </div>

            {/* Search - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search orders, products, analytics..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sans"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                {/* Notifications */}
                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors border-none bg-transparent cursor-pointer">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-6 w-px bg-gray-200 mx-2 hidden sm:block"></div>

                {/* Profile */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-xl transition-all border-none bg-transparent cursor-pointer"
                    >
                        <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-700 font-bold text-sm">
                            JD
                        </div>
                        <div className="hidden sm:block text-left mr-1">
                            <p className="text-xs font-bold text-gray-900 leading-none">John Doe</p>
                            <p className="text-[10px] text-gray-500 mt-0.5">Fashion Hub Inc.</p>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in zoom-in-95 duration-200">
                            <div className="px-4 py-3 border-b border-gray-50">
                                <p className="text-sm font-bold text-gray-900">John Doe</p>
                                <p className="text-xs text-gray-500">marcos@fashionhub.com</p>
                            </div>
                            <div className="p-1">
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border-none bg-transparent cursor-pointer">
                                    <User className="w-4 h-4" />
                                    <span>Store Profile</span>
                                </button>
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border-none bg-transparent cursor-pointer">
                                    <Settings className="w-4 h-4" />
                                    <span>Account Settings</span>
                                </button>
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border-none bg-transparent cursor-pointer">
                                    <HelpCircle className="w-4 h-4" />
                                    <span>Support & FAQ</span>
                                </button>
                            </div>
                            <div className="p-1 border-t border-gray-50 mt-1">
                                <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border-none bg-transparent cursor-pointer font-medium">
                                    <LogOut className="w-4 h-4" />
                                    <span>Sign out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default SellerHeader;
