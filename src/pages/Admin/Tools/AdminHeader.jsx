import React, { useState } from 'react';
import {
    Bell,
    Search,
    Shield,
    ChevronDown,
    Grid,
    Menu,
    LogOut,
    Settings,
    Activity,
    Lock,
    User,
    Key,
    Globe,
    Power
} from 'lucide-react';

const AdminHeader = ({ toggleSidebar }) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-30 w-full h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-6 lg:px-10">
            {/* Mobile Menu Toggle */}
            <button
                onClick={toggleSidebar}
                className="lg:hidden p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all border-none cursor-pointer"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Logo Section */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                    <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                    <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">Admin<span className="text-indigo-600">Root</span></h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Global Controller</p>
                </div>
            </div>

            {/* Global Intelligence Search */}
            <div className="hidden md:flex flex-1 max-w-xl mx-12">
                <div className="relative w-full group">
                    <div className="absolute inset-0 bg-indigo-500/5 rounded-2xl blur-xl group-focus-within:bg-indigo-500/10 transition-all"></div>
                    <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2.5 group-focus-within:border-indigo-500/50 group-focus-within:bg-white transition-all">
                        <Search className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search entities, protocols, logs..."
                            className="w-full bg-transparent border-none text-slate-800 text-sm focus:ring-0 placeholder:text-slate-400 font-medium px-3 outline-none"
                        />
                        <div className="flex items-center gap-1">
                            <kbd className="px-2 py-1 bg-white text-slate-400 rounded text-[10px] font-bold uppercase tracking-widest border border-slate-200 shadow-sm">Ctrl</kbd>
                            <kbd className="px-2 py-1 bg-white text-slate-400 rounded text-[10px] font-bold uppercase tracking-widest border border-slate-200 shadow-sm">K</kbd>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tactical Actions */}
            <div className="flex items-center gap-3 lg:gap-5">
                <div className="hidden lg:flex items-center gap-4 border-r border-slate-200 pr-5">
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all border-none cursor-pointer">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        Live Ops
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center text-slate-400 relative">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-indigo-600 rounded-full border-2 border-white"></span>
                        </div>
                    </div>
                </div>

                {/* Profile Node */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all cursor-pointer group"
                    >
                        <div className="w-9 h-9 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl flex items-center justify-center text-slate-500 font-bold group-hover:scale-105 transition-transform overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&auto=format&fit=crop" alt="Admin" className="w-full h-full object-cover" />
                        </div>
                        <div className="hidden xl:block text-left px-1">
                            <p className="text-[11px] font-black text-slate-900 leading-none">LEX_CORP_01</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Super User</p>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Profile Dropdown */}
                    {isProfileOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                            <div className="absolute top-full right-0 mt-3 w-64 bg-white border border-slate-200 rounded-[32px] shadow-2xl shadow-indigo-600/10 p-4 z-20 animate-in fade-in zoom-in-95 duration-200">
                                <div className="space-y-1">
                                    {[
                                        { label: 'Tactical Settings', icon: User, color: 'text-indigo-600' },
                                        { label: 'Security Protocols', icon: Key, color: 'text-emerald-600' },
                                        { label: 'Global Audit', icon: Globe, color: 'text-blue-600' },
                                    ].map((item, idx) => (
                                        <button key={idx} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-50 rounded-2xl group transition-all border-none bg-transparent cursor-pointer">
                                            <div className={`p-2 bg-slate-50 group-hover:bg-white rounded-lg transition-colors ${item.color}`}>
                                                <item.icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-[13px] font-bold text-slate-700 group-hover:text-slate-900">{item.label}</span>
                                        </button>
                                    ))}
                                    <div className="h-px bg-slate-100 my-2 mx-4"></div>
                                    <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-red-50 text-red-600 rounded-2xl group transition-all border-none bg-transparent cursor-pointer">
                                        <div className="p-2 bg-red-50 group-hover:bg-white rounded-lg transition-colors">
                                            <Power className="w-4 h-4" />
                                        </div>
                                        <span className="text-[13px] font-black uppercase tracking-widest">Terminate Session</span>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
