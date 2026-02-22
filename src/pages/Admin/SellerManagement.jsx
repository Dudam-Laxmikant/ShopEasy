import React, { useState } from 'react';
import {
    Users,
    Search,
    Filter,
    ShieldCheck,
    ShieldAlert,
    MoreVertical,
    ExternalLink,
    CheckCircle2,
    XCircle,
    AlertOctagon,
    Percent,
    ArrowRight,
    FileText,
    Check,
    X,
    Eye
} from 'lucide-react';

const SellerManagement = () => {
    const [selectedTab, setSelectedTab] = useState('Pending');
    const [showCommissionModal, setShowCommissionModal] = useState(false);
    const [reviewingSeller, setReviewingSeller] = useState(null);
    const [sellerNodes, setSellerNodes] = useState([
        { id: 'SEL-451', name: 'Fashion Hub Inc.', owner: 'Sarah Jenkins', type: 'Private Ltd', date: 'Feb 21, 2026', status: 'Pending', commission: '10%', revenue: '₹0', email: 'sarah@fashionhub.com' },
        { id: 'SEL-450', name: 'ElectroNexus', owner: 'Mike Ross', type: 'Individual', date: 'Feb 20, 2026', status: 'Active', commission: '12%', revenue: '₹3.8M', email: 'mike@electronexus.io' },
        { id: 'SEL-449', name: 'PureHome Décor', owner: 'Harvey Specter', type: 'Partnership', date: 'Feb 19, 2026', status: 'Suspended', commission: '8%', revenue: '₹1.2M', email: 'harvey@purehome.com' },
        { id: 'SEL-448', name: 'Beauty Blends', owner: 'Donna Paulsen', type: 'Sole Prop', date: 'Feb 18, 2026', status: 'Active', commission: '15%', revenue: '₹850K', email: 'donna@beautyblending.com' },
    ]);

    const handleVerify = (id) => {
        setSellerNodes(prev => prev.map(s => s.id === id ? { ...s, status: 'Active' } : s));
        setReviewingSeller(null);
    };

    const handleReject = (id) => {
        setSellerNodes(prev => prev.map(s => s.id === id ? { ...s, status: 'Suspended' } : s));
        setReviewingSeller(null);
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase mb-2">Seller <span className="text-indigo-600">Nexus</span></h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] ml-1">Entity Verification & Economic Control</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowCommissionModal(true)}
                        className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-indigo-600 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all border-none cursor-pointer flex items-center gap-2 shadow-sm"
                    >
                        <Percent className="w-4 h-4" /> Global Commissions
                    </button>
                    <button className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all border-none cursor-pointer shadow-lg shadow-slate-200">
                        Audit Logs
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Pending Approval', count: sellerNodes.filter(s => s.status === 'Pending').length, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: 'Active Entities', count: sellerNodes.filter(s => s.status === 'Active').length, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Suspended Node', count: sellerNodes.filter(s => s.status === 'Suspended').length, color: 'text-red-600', bg: 'bg-red-50' },
                    { label: 'Top Tier (Pro)', count: 320, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-6 rounded-3xl group hover:border-indigo-100 transition-all shadow-sm hover:shadow-md">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                        <div className="flex justify-between items-end">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{stat.count.toLocaleString()}</h3>
                            <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                                <Users className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Hub */}
            <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
                    <div className="flex gap-8 overflow-x-auto w-full md:w-auto">
                        {['All', 'Pending', 'Active', 'Suspended'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                className={`pb-4 text-sm font-black transition-all relative border-none bg-transparent cursor-pointer whitespace-nowrap uppercase tracking-widest
                                    ${selectedTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {tab} Nodes
                                {selectedTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full shadow-[0_0_10px_rgba(79,70,229,0.3)]"></div>}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by Entity ID or Name..."
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 transition-all font-sans"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Global Entity</th>
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Economic Data</th>
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Verification Status</th>
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Registry Date</th>
                                <th className="px-8 py-6"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {sellerNodes.filter(s => selectedTab === 'All' || s.status === selectedTab).map((s, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-8 py-7">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center group-hover:border-indigo-200 transition-all overflow-hidden relative">
                                                <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                <span className="text-indigo-600 font-black text-lg group-hover:scale-110 transition-transform">{s.name.charAt(0)}</span>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">{s.id}</p>
                                                <h4 className="text-[15px] font-black text-slate-900 mb-1">{s.name}</h4>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">{s.owner} • {s.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="flex flex-col gap-1 text-[11px] font-black uppercase tracking-widest">
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <Percent className="w-3 h-3 text-indigo-600" /> Commission: <span className="text-slate-900">{s.commission}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <ArrowRight className="w-3 h-3 text-emerald-600" /> Revenue: <span className="text-emerald-600">{s.revenue}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest
                                            ${s.status === 'Active' ? 'bg-emerald-50 text-emerald-600' :
                                                s.status === 'Pending' ? 'bg-orange-50 text-orange-600' :
                                                    'bg-red-50 text-red-600'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${s.status === 'Active' ? 'bg-emerald-600 animate-pulse' : s.status === 'Pending' ? 'bg-orange-600' : 'bg-red-600'}`}></div>
                                            {s.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="space-y-1 text-slate-400">
                                            <p className="text-sm font-bold text-slate-900 uppercase italic">{s.date}</p>
                                            <p className="text-[10px] font-black tracking-widest uppercase">Verified Node</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            {s.status === 'Pending' ? (
                                                <>
                                                    <button
                                                        onClick={() => setReviewingSeller(s)}
                                                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border-none cursor-pointer flex items-center gap-2 shadow-lg shadow-indigo-100"
                                                    >
                                                        <ShieldCheck className="w-4 h-4" /> Review
                                                    </button>
                                                    <button
                                                        onClick={() => handleReject(s.id)}
                                                        className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all border-none cursor-pointer flex items-center justify-center shadow-sm"
                                                        title="Quick Reject"
                                                    >
                                                        <XCircle className="w-5 h-5" />
                                                    </button>
                                                </>
                                            ) : (
                                                <button className="p-2.5 bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl transition-all border-none cursor-pointer">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center text-[11px] font-black text-slate-400 uppercase tracking-widest">
                    <p>Total Verifiable Nodes: 12,507</p>
                    <div className="flex gap-4">
                        <button className="hover:text-slate-900 transition-colors border-none bg-transparent cursor-pointer">Previous Session</button>
                        <button className="hover:text-slate-900 transition-colors border-none bg-transparent cursor-pointer">Security Protocol</button>
                        <button className="hover:text-slate-900 transition-colors border-none bg-transparent cursor-pointer">Next Session</button>
                    </div>
                </div>
            </div>

            {/* Review Modal (The Verification Feature) */}
            {reviewingSeller && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-[40px] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] pointer-events-none"></div>

                        <div className="p-10 space-y-8">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-100">
                                        {reviewingSeller.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter mb-1">Entity <span className="text-indigo-600">Scan</span></h2>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Reviewing: {reviewingSeller.name} ({reviewingSeller.id})</p>
                                    </div>
                                </div>
                                <button onClick={() => setReviewingSeller(null)} className="p-3 hover:bg-slate-100 rounded-3xl text-slate-400 border-none bg-transparent cursor-pointer transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Document Review */}
                                <div className="space-y-4">
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Submitted Data</h3>
                                    <div className="space-y-2">
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-indigo-600" />
                                                <span className="text-xs font-bold text-slate-600">GST Registration.pdf</span>
                                            </div>
                                            <Eye className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 cursor-pointer" />
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-indigo-600" />
                                                <span className="text-xs font-bold text-slate-600">PAN Card Copy.png</span>
                                            </div>
                                            <Eye className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 cursor-pointer" />
                                        </div>
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <FileText className="w-5 h-5 text-indigo-600" />
                                                <span className="text-xs font-bold text-slate-600">Bank Statement.pdf</span>
                                            </div>
                                            <Eye className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 cursor-pointer" />
                                        </div>
                                    </div>
                                </div>

                                {/* Information Review */}
                                <div className="space-y-4">
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Identity Details</h3>
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400 font-bold">Owner</span>
                                            <span className="text-slate-900 font-black uppercase tracking-tighter">{reviewingSeller.owner}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400 font-bold">Entity Email</span>
                                            <span className="text-slate-900 font-black tracking-tight">{reviewingSeller.email}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400 font-bold">Business Type</span>
                                            <span className="text-indigo-600 font-black uppercase italic">{reviewingSeller.type}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400 font-bold">Risk Assessment</span>
                                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded font-black uppercase tracking-widest text-[9px]">Low Risk</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => handleReject(reviewingSeller.id)}
                                    className="flex-1 py-5 bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-100 rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all cursor-pointer flex items-center justify-center gap-2 group"
                                >
                                    <XCircle className="w-5 h-5" /> Reject Entity
                                </button>
                                <button
                                    onClick={() => handleVerify(reviewingSeller.id)}
                                    className="flex-[2] py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 transition-all border-none cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <Check className="w-6 h-6" /> Verify & Grant Access
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Commissions Modal Placeholder */}
            {showCommissionModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="bg-white border border-slate-200 w-full max-w-lg rounded-[40px] shadow-2xl p-10 text-center space-y-6">
                        <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-600">
                            <Percent className="w-10 h-10" />
                        </div>
                        <h2 className="text-slate-900 text-2xl font-black uppercase italic tracking-tight">Commission System</h2>
                        <button onClick={() => setShowCommissionModal(false)} className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl border-none cursor-pointer transition-colors">Close Control</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerManagement;
