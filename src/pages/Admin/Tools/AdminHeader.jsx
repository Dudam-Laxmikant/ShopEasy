import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import {
    Bell,
    Shield,
    ChevronDown,
    Menu,
    Eye,
    UserPlus,
    CheckCircle,
    XCircle,
    Loader2
} from 'lucide-react';
import {
    getAdminToken,
    getUnseenSellers,
    markSellersSeen,
    approveSeller,
    rejectSeller
} from '../../../services/adminApi';

const SOCKET_URL = 'http://localhost:5000';

const AdminHeader = ({ toggleSidebar }) => {
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [actionLoading, setActionLoading] = useState({});
    const socketRef = useRef(null);

    // ─── Socket.IO Setup + Initial Fetch ────────────────────────────────
    useEffect(() => {
        const token = getAdminToken();

        // 1. Initial unseen sellers fetch karo
        if (token) {
            getUnseenSellers(token)
                .then((data) => setNotifications(data || []))
                .catch(() => {});
        }

        // 2. Socket.IO connect
        socketRef.current = io(SOCKET_URL, { transports: ['websocket'] });

        socketRef.current.on('connect', () => {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const roomId = payload.sub_admin_id || payload.admin_id;
                if (roomId) {
                    socketRef.current.emit('register_sub_admin', {
                        sub_admin_id: roomId,
                        admin_id: payload.admin_id
                    });
                }
            } catch (_) {}
        });

        // Real-time new seller notification
        socketRef.current.on('new_seller_notification', (sellerData) => {
            setNotifications((prev) => {
                if (prev.find((n) => n.seller_id === sellerData.seller_id)) return prev;
                return [sellerData, ...prev];
            });
        });

        return () => { socketRef.current?.disconnect(); };
    }, []);

    // ─── Mark as Seen jab dropdown open ho ──────────────────────────────
    useEffect(() => {
        if (!isNotificationOpen || notifications.length === 0) return;
        const token = getAdminToken();
        if (!token) return;
        const ids = notifications.map((n) => n.seller_id || n._id);
        markSellersSeen(ids, token).catch(() => {});
    }, [isNotificationOpen]);

    // ─── Approve ────────────────────────────────────────────────────────
    const handleApprove = async (seller) => {
        const token = getAdminToken();
        const sid = seller.seller_id;
        setActionLoading((prev) => ({ ...prev, [sid]: 'approve' }));
        try {
            await approveSeller(sid, token);
            setNotifications((prev) => prev.filter((n) => n.seller_id !== sid));
        } catch (err) {
            alert(err.message);
        } finally {
            setActionLoading((prev) => { const s = { ...prev }; delete s[sid]; return s; });
        }
    };

    // ─── Reject ─────────────────────────────────────────────────────────
    const handleReject = async (seller) => {
        const reason = prompt('Rejection reason:');
        if (!reason) return;
        const token = getAdminToken();
        const sid = seller.seller_id;
        setActionLoading((prev) => ({ ...prev, [sid]: 'reject' }));
        try {
            await rejectSeller(sid, reason, token);
            setNotifications((prev) => prev.filter((n) => n.seller_id !== sid));
        } catch (err) {
            alert(err.message);
        } finally {
            setActionLoading((prev) => { const s = { ...prev }; delete s[sid]; return s; });
        }
    };

    return (
        <header className="sticky top-0 z-30 w-full h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-6 lg:px-10">
            {/* Mobile Menu Toggle */}
            <button onClick={toggleSidebar} className="lg:hidden p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-all border-none cursor-pointer">
                <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                    <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block text-left">
                    <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">Admin<span className="text-indigo-600">Root</span></h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Global Controller</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 lg:gap-5 ml-auto">
                <div className="hidden lg:flex items-center gap-4 border-r border-slate-200 pr-5">
                    {/* Live Ops badge */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-100 transition-all border-none cursor-pointer">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        Live Ops
                    </button>

                    {/* ── Notification Bell ── */}
                    <div className="relative">
                        <button
                            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                            className="w-11 h-11 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-indigo-600 rounded-2xl transition-all border border-slate-200 relative cursor-pointer group"
                        >
                            <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            {notifications.length > 0 && (
                                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-indigo-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white leading-none shadow-sm">
                                    {notifications.length}
                                </span>
                            )}
                        </button>

                        {isNotificationOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsNotificationOpen(false)} />
                                <div className="absolute top-full right-0 mt-3 w-[420px] bg-white border border-slate-200 rounded-[32px] shadow-2xl shadow-indigo-600/10 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                    {/* Dropdown Header */}
                                    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                        <h2 className="text-sm font-black text-slate-900 uppercase tracking-tighter italic">New Seller Requests</h2>
                                        <span className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">
                                            {notifications.length} Pending
                                        </span>
                                    </div>

                                    {/* Notification List */}
                                    <div className="max-h-[480px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                                        {notifications.length === 0 ? (
                                            <div className="py-14 text-center text-slate-400">
                                                <Bell className="w-8 h-8 mx-auto mb-3 opacity-30" />
                                                <p className="text-xs font-bold uppercase tracking-widest">No new requests</p>
                                            </div>
                                        ) : (
                                            notifications.map((notif) => {
                                                const sid = notif.seller_id;
                                                const loading = actionLoading[sid];
                                                return (
                                                    <div key={sid || notif._id} className="p-5 border-b border-slate-50 hover:bg-slate-50/80 transition-colors group">
                                                        <div className="flex gap-4 text-left">
                                                            <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                                                                <UserPlus className="w-6 h-6" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-[13px] font-black text-slate-900 leading-none">New Seller Request</p>
                                                                <p className="text-[11px] font-bold text-slate-500 mt-1.5 truncate">
                                                                    {notif.store_display_name || notif.legal_company_name || notif.seller_id}
                                                                </p>
                                                                <p className="text-[10px] text-slate-400 mt-0.5 truncate">{notif.work_email}</p>

                                                                {/* Action Buttons */}
                                                                <div className="flex items-center gap-2 mt-4">
                                                                    <button
                                                                        disabled={!!loading}
                                                                        onClick={() => handleApprove(notif)}
                                                                        className="flex-1 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200 border-none cursor-pointer active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-1"
                                                                    >
                                                                        {loading === 'approve'
                                                                            ? <Loader2 className="w-3 h-3 animate-spin" />
                                                                            : <CheckCircle className="w-3 h-3" />}
                                                                        Accept
                                                                    </button>
                                                                    <button
                                                                        disabled={!!loading}
                                                                        onClick={() => handleReject(notif)}
                                                                        className="flex-1 py-3 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-200 border-none cursor-pointer active:scale-95 transition-all disabled:opacity-60 flex items-center justify-center gap-1"
                                                                    >
                                                                        {loading === 'reject'
                                                                            ? <Loader2 className="w-3 h-3 animate-spin" />
                                                                            : <XCircle className="w-3 h-3" />}
                                                                        Reject
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            navigate(`/admin/seller-approval/${sid}`);
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
                                                );
                                            })
                                        )}
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
