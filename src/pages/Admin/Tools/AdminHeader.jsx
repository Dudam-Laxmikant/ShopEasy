import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    Power,
    Check,
    X,
    Eye,
    UserPlus,
    Clock
} from 'lucide-react';

const AdminHeader = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

    // Placeholder notifications
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            seller_name: "Rahul Electronics",
            email: "rahul@shop.com",
            time: "2 mins ago"
        },
        {
            id: 2,
            seller_name: "Sneha Fashion",
            email: "sneha@store.com",
            time: "15 mins ago"
        }
    ]);

    return (
        <header className="sticky top-0 z-30 w-full h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-6 lg:px-10">
            {/* Mobile Menu Toggle */}
            <button onClick={toggleSidebar} className="lg:hidden p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all border-none cursor-pointer">
                <Menu className="w-6 h-6" />
            </button>

            {/* Logo Section */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                    <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                    <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">Admin<span className="text-indigo-600">Root</span></h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Global Controller</p>
                </div>
            </div>

            {/* Tactical Actions */}
            <div className="flex items-center gap-3 lg:gap-5 ml-auto">
                <div className="hidden lg:flex items-center gap-4 border-r border-slate-200 pr-5">
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all border-none cursor-pointer">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        Live Ops
                    </button>
                    
                    {/* Notification Dropdown */}
                    <div className="relative">
                        <button 
                            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            className="w-11 h-11 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-indigo-600 rounded-2xl transition-all border border-slate-200 relative cursor-pointer group"
                        >
                            <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            {notifications.length > 0 && <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-indigo-600 rounded-full border-2 border-white"></span>}
                        </button>

                        {isNotificationOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsNotificationOpen(false)}></div>
                                <div className="absolute top-full right-0 mt-3 w-[420px] bg-white border border-slate-200 rounded-[32px] shadow-2xl shadow-indigo-600/10 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                        <h2 className="text-sm font-black text-slate-900 uppercase tracking-tighter italic">Intelligence Alerts</h2>
                                        <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">{notifications.length} Pending</span>
                                    </div>
                                    <div className="max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                                        {notifications.map((notif) => (
                                            <div key={notif.id} className="p-5 border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
                                                <div className="flex gap-4 text-left">
                                                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                                                        <UserPlus className="w-6 h-6" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[13px] font-black text-slate-900 leading-none">New Seller Request</p>
                                                        <p className="text-[11px] font-bold text-slate-500 mt-1.5 truncate">{notif.seller_name}</p>
                                                        <div className="flex items-center gap-2 mt-4">
                                                            <button className="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200 border-none cursor-pointer active:scale-95 transition-all">Accept</button>
                                                            <button className="flex-1 py-3 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-200 border-none cursor-pointer active:scale-95 transition-all">Reject</button>
                                                            <button 
                                                                onClick={() => {
                                                                    navigate(`/admin/seller-approval/${notif.id}`);
                                                                    setIsNotificationOpen(false);
                                                                }}
                                                                className="w-11 h-11 flex items-center justify-center bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 rounded-xl transition-all border-none cursor-pointer"
                                                            >
                                                                <Eye className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Profile Widget */}
                <div className="relative">
                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3 p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all cursor-pointer">
                        <div className="w-9 h-9 bg-slate-200 rounded-xl overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&auto=format&fit=crop" alt="Admin" className="w-full h-full object-cover" />
                        </div>
                        <div className="hidden sm:block text-left px-1">
                            <p className="text-[11px] font-black text-slate-900 leading-none tracking-tight">LEX_CORP_01</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Super User</p>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
