import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, X, Eye, ShieldAlert, ChevronDown, UserPlus } from 'lucide-react';

const AdminNotification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // For Reject Modal/Dropdown
    const [rejectingId, setRejectingId] = useState(null);
    const [rejectReason, setRejectReason] = useState("");
    const [customReason, setCustomReason] = useState("");

    const markAsSeen = async (notificationsToMark) => {
        try {
            const token = localStorage.getItem('adminToken');
            const validIds = notificationsToMark
                .map(n => Number(n.id))
                .filter(id => !isNaN(id));

            if (validIds.length > 0) {
                await fetch('http://127.0.0.1:8000/api/v1/admin/admins/sellers/mark-seen', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ seller_ids: validIds })
                });
            }
        } catch (error) {
            console.error("Error marking as seen:", error);
        }
    };

    const fetchRequests = async () => {
        setIsLoading(true);
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
                setRequests(data);
                // Also mark them as seen since we are looking at them now
                if (data.length > 0) {
                    markAsSeen(data);
                }
            }
        } catch (error) {
            console.error("Error fetching seller requests:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // If we navigated from the bell icon, we already have the notifications
        if (location.state?.initialRequests) {
            setRequests(location.state.initialRequests);
            setIsLoading(false);
            
            // Mark them as seen in the background
            if (location.state.initialRequests.length > 0) {
                markAsSeen(location.state.initialRequests);
            }
        } else {
            // Only fetch if we came from sidebar
            fetchRequests();
        }
    }, [location.state]);

    const handleRejectClick = (id) => {
        setRejectingId(rejectingId === id ? null : id);
        setRejectReason("");
        setCustomReason("");
    };

    const submitReject = (id) => {
        const finalReason = rejectReason === "Other" ? customReason : rejectReason;
        console.log(`Rejecting seller ${id} for reason: ${finalReason}`);
        // TODO: Call API to actually reject the seller
        
        // Optimistically remove from list for now
        setRequests(requests.filter(req => req.id !== id));
        setRejectingId(null);
    };

    return (
        <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tighter uppercase italic">
                        Intelligence <span className="text-indigo-600">Alerts</span>
                    </h1>
                    <p className="text-sm font-bold text-slate-500 mt-2 uppercase tracking-widest">
                        Review pending notifications
                    </p>
                </div>
                <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
                    <UserPlus className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm font-black text-slate-900">{requests.length} Pending</span>
                </div>
            </div>

            {/* Table section */}
            <div className="bg-white rounded-[32px] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">ID</th>
                                <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Seller Info</th>
                                <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Email</th>
                                <th className="py-5 px-6 text-[11px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="py-10 text-center text-slate-500 font-bold text-sm">Loading alerts...</td>
                                </tr>
                            ) : requests.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-10 text-center text-slate-500 font-bold text-sm">No pending alerts found.</td>
                                </tr>
                            ) : (
                                requests.map((req) => (
                                    <React.Fragment key={req.id}>
                                        <tr className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="py-4 px-6 text-sm font-bold text-slate-600">
                                                {req.seller_id}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
                                                        <UserPlus className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[11px] font-bold text-slate-500 mb-0.5 uppercase tracking-widest">
                                                            New Seller Request
                                                        </p>
                                                        <p className="text-sm font-black text-slate-900 leading-none">
                                                            {req.store_display_name || req.legal_company_name || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm font-bold text-slate-500">
                                                {req.work_email}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button className="flex items-center justify-center w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all shadow-sm border-none cursor-pointer" title="Accept">
                                                        <Check className="w-5 h-5" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleRejectClick(req.id)}
                                                        className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all shadow-sm border-none cursor-pointer ${rejectingId === req.id ? 'bg-rose-500 text-white' : 'bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white'}`} 
                                                        title="Reject"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                    <button 
                                                        onClick={() => navigate(`/admin/seller-approval/${req.id}`)}
                                                        className="flex items-center justify-center w-10 h-10 bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-all shadow-sm border-none cursor-pointer" 
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>

                                        {/* Reject Dropdown Row */}
                                        {rejectingId === req.id && (
                                            <tr className="bg-rose-50/50">
                                                <td colSpan="4" className="py-6 px-6">
                                                    <div className="flex flex-col max-w-xl mx-auto bg-white p-6 rounded-2xl border border-rose-100 shadow-xl shadow-rose-100 animate-in fade-in zoom-in-95 duration-200">
                                                        <div className="flex items-center gap-3 mb-4 text-rose-600">
                                                            <ShieldAlert className="w-5 h-5" />
                                                            <h4 className="text-sm font-black uppercase tracking-widest">Reject Application</h4>
                                                        </div>
                                                        
                                                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                                                            Select Reason for Rejection
                                                        </label>
                                                        <div className="relative mb-4">
                                                            <select 
                                                                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all cursor-pointer"
                                                                value={rejectReason}
                                                                onChange={(e) => setRejectReason(e.target.value)}
                                                            >
                                                                <option value="" disabled>Choose a reason...</option>
                                                                <option value="Invalid Documents">Invalid or Fake Documents</option>
                                                                <option value="Incomplete Information">Incomplete Information</option>
                                                                <option value="Policy Violation">Company Policy Violation</option>
                                                                <option value="Other">Other (Specify below)</option>
                                                            </select>
                                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                                        </div>

                                                        {rejectReason === "Other" && (
                                                            <div className="mb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2 block">
                                                                    Custom Reason
                                                                </label>
                                                                <textarea 
                                                                    placeholder="Type the specific reason for rejection..."
                                                                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all min-h-[100px] resize-y"
                                                                    value={customReason}
                                                                    onChange={(e) => setCustomReason(e.target.value)}
                                                                ></textarea>
                                                            </div>
                                                        )}

                                                        <div className="flex gap-3 justify-end mt-2">
                                                            <button 
                                                                onClick={() => setRejectingId(null)}
                                                                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all border-none cursor-pointer"
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button 
                                                                onClick={() => submitReject(req.id)}
                                                                disabled={!rejectReason || (rejectReason === "Other" && !customReason.trim())}
                                                                className="px-6 py-3 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-300 disabled:cursor-not-allowed text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all border-none cursor-pointer shadow-lg shadow-rose-200"
                                                            >
                                                                Confirm Reject
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminNotification;
