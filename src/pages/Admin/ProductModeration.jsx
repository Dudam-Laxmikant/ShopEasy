import React, { useState } from 'react';
import {
    ShieldCheck,
    Search,
    Filter,
    Eye,
    CheckCircle,
    Ban,
    MoreHorizontal,
    AlertTriangle,
    Flag,
    ExternalLink,
    Store,
    Tag,
    ChevronDown,
    Zap,
    Box
} from 'lucide-react';

const ProductModeration = () => {
    const [selectedTab, setSelectedTab] = useState('Queued');

    const productQueue = [
        { id: 'PRD-9021', name: 'Elite Carbon Fiber Case', seller: 'ElectroNexus', price: '₹2,499', date: '5 mins ago', risk: 'Low', status: 'Queued', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60' },
        { id: 'PRD-9020', name: 'Silk Blend Evening Gown', seller: 'Fashion Hub', price: '₹8,299', date: '15 mins ago', risk: 'Low', status: 'Queued', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60' },
        { id: 'PRD-9019', name: 'Health-Pro Multi-Vitamin', seller: 'VivaHealth', price: '₹1,200', date: '30 mins ago', risk: 'High', status: 'Flagged', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60' },
        { id: 'PRD-9018', name: 'Smart VR Headset X1', seller: 'FutureTech', price: '₹12,499', date: '1 hour ago', risk: 'Medium', status: 'Queued', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60' },
    ];

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase mb-1">Moderation <span className="text-indigo-600">Core</span></h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] ml-1">Asset Policy Compliance & AI-Assisted Audits</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all border-none cursor-pointer flex items-center gap-3 shadow-sm">
                        <Zap className="w-4 h-4 text-yellow-500" /> Auto-Approve Policy
                    </button>
                    <button className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-slate-200 transition-all border-none cursor-pointer">
                        Audit Dashboard
                    </button>
                </div>
            </div>

            {/* Quality Alerts */}
            <div className="bg-red-50 border border-red-100 p-8 rounded-[40px] flex items-start gap-6 relative overflow-hidden group shadow-sm">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-100/50 blur-3xl transform translate-x-32 -translate-y-32"></div>
                <div className="p-4 bg-red-100 rounded-3xl relative z-10">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                </div>
                <div className="relative z-10 space-y-2">
                    <h3 className="text-lg font-black text-slate-900 uppercase italic tracking-tight">Policy Violation Pulse</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-2xl">
                        A recurring pattern of "Restricted Substances" has been detected in 12 products from a single cluster. AI-Moderator has suspended auto-approval for the <span className="text-red-600 font-black">Health & Wellness</span> category until further review.
                    </p>
                    <div className="pt-4 flex gap-4">
                        <button className="text-xs font-black text-red-600 uppercase tracking-widest hover:underline border-none bg-transparent cursor-pointer">Investigate Cluster</button>
                        <button className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors border-none bg-transparent cursor-pointer">Acknowledge Alert</button>
                    </div>
                </div>
            </div>

            {/* Moderation Queue */}
            <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
                    <div className="flex gap-8 overflow-x-auto w-full md:w-auto">
                        {['Queued', 'Approved', 'Flagged', 'Rejected'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                className={`pb-4 text-sm font-black transition-all relative border-none bg-transparent cursor-pointer whitespace-nowrap uppercase tracking-widest
                                    ${selectedTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                {tab} Assets
                                {selectedTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full shadow-[0_0_10px_rgba(79,70,229,0.3)]"></div>}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {productQueue.map((item, idx) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:border-indigo-100 transition-all duration-500 shadow-sm hover:shadow-md">
                            <div className="relative aspect-square overflow-hidden bg-slate-100">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="absolute top-4 left-4 flex gap-2">
                                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm
                                        ${item.risk === 'High' ? 'bg-red-600 text-white' : item.risk === 'Medium' ? 'bg-orange-500 text-white' : 'bg-emerald-600 text-white'}`}>
                                        Risk: {item.risk}
                                    </span>
                                    {item.status === 'Flagged' && (
                                        <div className="p-1.5 bg-red-600 text-white rounded-lg shadow-sm">
                                            <Flag className="w-3 h-3" />
                                        </div>
                                    )}
                                </div>

                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 text-white">
                                    <button className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-xl shadow-indigo-100 hover:bg-indigo-500 transition-all border-none cursor-pointer">
                                        <Eye className="w-5 h-5 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                                        <Store className="w-3 h-3" /> {item.seller}
                                    </div>
                                    <h3 className="text-slate-900 font-bold leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1">{item.name}</h3>
                                    <div className="flex justify-between items-center pt-1">
                                        <span className="text-emerald-600 font-black text-lg">{item.price}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">{item.date}</span>
                                    </div>
                                </div>

                                <div className="pt-2 flex items-center gap-2">
                                    <button className="flex-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-none cursor-pointer flex items-center justify-center gap-2">
                                        <CheckCircle className="w-4 h-4" /> Approve
                                    </button>
                                    <button className="flex-1 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-none cursor-pointer flex items-center justify-center gap-2">
                                        <Ban className="w-4 h-4" /> Reject
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center">
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Moderation Queue Performance</span>
                            <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-600 rounded-full w-[85%]"></div>
                            </div>
                        </div>
                        <span className="text-lg font-black text-slate-900 italic">85<span className="text-[10px] text-slate-400 uppercase not-italic"> Assets/Hr</span></span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-500 transition-all border-none cursor-pointer">
                            <ChevronDown className="w-5 h-5 rotate-90" />
                        </button>
                        <button className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-500 transition-all border-none cursor-pointer">
                            <ChevronDown className="w-5 h-5 -rotate-90" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModeration;
