import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initializeAdminSocket } from '../adminService';
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

    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [socket, setSocket] = useState(null);

    const fetchNotifications = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            if (!token) return;
            const response = await fetch('http://127.0.0.1:8000/api/v1/admin/admins/unseen', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setNotifications(data);
                setUnreadCount(data.length);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    useEffect(() => {
        fetchNotifications();

        const token = localStorage.getItem('adminToken');
        const subAdminStr = localStorage.getItem('subAdminDetails');
        let sub_admin_id = null;
        if (subAdminStr) {
            try {
                const subAdminDetails = JSON.parse(subAdminStr);
                sub_admin_id = subAdminDetails.sub_admin_id;
            } catch (e) { }
        }

        if (token && sub_admin_id) {
            const newSocket = initializeAdminSocket(sub_admin_id, (newNotif) => {
                setNotifications(prev => [newNotif, ...prev]);
                setUnreadCount(prev => prev + 1);
            });
            setSocket(newSocket);

            // Listen for global signal to clear notifications (from AdminNotification page)
            const handleClearSignal = () => setUnreadCount(0);
            window.addEventListener('clearAdminNotifications', handleClearSignal);

            return () => {
                newSocket.disconnect();
                window.removeEventListener('clearAdminNotifications', handleClearSignal);
            };
        }
    }, []);

    const handleBellClick = async () => {
        if (unreadCount > 0 && notifications.length > 0) {
            // Clear the badge immediately
            setUnreadCount(0);
        }
        
        // Navigate to the new notifications page and pass the existing notifications.
        // We will do the mark-seen API call from the notifications page to avoid double firing.
        navigate('/admin/notifications', { state: { initialRequests: notifications } });
    };

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
                            onClick={handleBellClick}
                            className="w-11 h-11 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-indigo-600 rounded-2xl transition-all border border-slate-200 relative cursor-pointer group"
                        >
                            <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            {unreadCount > 0 && (
                                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-indigo-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white leading-none shadow-sm">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
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
