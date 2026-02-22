import React, { useState } from 'react';
import {
    Megaphone,
    Image as ImageIcon,
    Ticket,
    Zap,
    Plus,
    Search,
    Filter,
    Trash2,
    Edit,
    ExternalLink,
    Play,
    Clock,
    TrendingUp,
    ChevronDown,
    LayoutDashboard,
    Star
} from 'lucide-react';

const MarketingControl = () => {
    const [selectedTab, setSelectedTab] = useState('Banners');

    const banners = [
        { id: 'BN-101', name: 'Summer Festival 2026', position: 'Home Page Hero', status: 'Active', clicks: '45.2K', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60' },
        { id: 'BN-102', name: 'Tech Unleashed Expo', position: 'Electronics Category', status: 'Scheduled', clicks: '-', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60' },
    ];

    const coupons = [
        { code: 'SHOPFREE30', discount: '30% OFF', usage: '1.2K / 5K', expiry: 'Mar 15, 2026', status: 'Active' },
        { code: 'WELCOMEROCKET', discount: '₹500 Flat', usage: '450 / 1K', expiry: 'Apr 01, 2026', status: 'Active' },
    ];

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase mb-1">Growth <span className="text-indigo-600">Engine</span></h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] ml-1">Campaign Orchestration & Conversion Optimization</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-indigo-600 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all border-none cursor-pointer flex items-center gap-2 shadow-sm">
                        <Plus className="w-4 h-4" /> New Campaign
                    </button>
                    <button className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-slate-200 transition-all border-none cursor-pointer">
                        Analytics Portal
                    </button>
                </div>
            </div>

            {/* Sub-Navigation Hub */}
            <div className="flex gap-10 border-b border-slate-100">
                {['Banners', 'Coupons', 'Featured Selection', 'Email Automation'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`pb-6 text-sm font-black transition-all relative border-none bg-transparent cursor-pointer whitespace-nowrap uppercase tracking-widest
                            ${selectedTab === tab ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        {tab}
                        {selectedTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full shadow-[0_0_10px_rgba(79,70,229,0.3)]"></div>}
                    </button>
                ))}
            </div>

            {selectedTab === 'Banners' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {banners.map((bn, idx) => (
                            <div key={idx} className="bg-white border border-slate-200 rounded-[40px] overflow-hidden group shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row">
                                <div className="sm:w-1/2 aspect-video sm:aspect-auto overflow-hidden relative">
                                    <img src={bn.image} alt={bn.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                                        <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm ${bn.status === 'Active' ? 'bg-emerald-600 text-white' : 'bg-orange-500 text-white'}`}>{bn.status}</span>
                                    </div>
                                </div>
                                <div className="sm:w-1/2 p-10 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">
                                            <ImageIcon className="w-3.5 h-3.5" /> {bn.position}
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 italic mb-1 uppercase tracking-tight line-clamp-2">{bn.name}</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{bn.id}</p>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-slate-100 space-y-6">
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Click Performance</p>
                                                <p className="text-2xl font-black text-slate-900">{bn.clicks}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border-none cursor-pointer text-slate-400 hover:text-slate-900 shadow-sm">
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button className="p-3 bg-red-50 hover:bg-red-600 rounded-xl transition-all border-none cursor-pointer text-red-400 hover:text-white shadow-sm">
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedTab === 'Coupons' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500">
                    <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50">
                        <div className="p-10 border-b border-slate-100 flex justify-between items-center text-[11px] font-black uppercase tracking-widest bg-slate-50/30">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Active <span className="text-indigo-600">Vouchers</span></h2>
                            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl shadow-xl shadow-indigo-100 transition-all border-none cursor-pointer">Create Flash Sale</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Protocol Code</th>
                                        <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Economic Impact</th>
                                        <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Usage Quota</th>
                                        <th className="px-10 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Expiry Window</th>
                                        <th className="px-10 py-6"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {coupons.map((cp, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-600 font-mono font-black tracking-widest text-lg shadow-sm">
                                                        {cp.code}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <p className="text-xl font-black text-slate-900 italic uppercase">{cp.discount}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Applicability</p>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="space-y-2 max-w-[150px]">
                                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-slate-400">
                                                        <span>Usage</span>
                                                        <span>{cp.usage.split(' / ')[0]}</span>
                                                    </div>
                                                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                        <div className="h-full bg-indigo-600 rounded-full shadow-[0_0_8px_rgba(79,70,229,0.3)]" style={{ width: '25%' }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8">
                                                <div className="flex items-center gap-2 text-slate-500 text-sm font-bold uppercase italic tracking-tighter">
                                                    <Clock className="w-4 h-4 text-orange-500" /> {cp.expiry}
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 text-right">
                                                <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border-none cursor-pointer text-slate-400 shadow-sm">
                                                    <MoreHorizontal className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {selectedTab === 'Featured Selection' && (
                <div className="bg-white border border-slate-200 rounded-[40px] p-12 text-center space-y-8 animate-in fade-in zoom-in-95 duration-500 shadow-sm">
                    <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto border border-indigo-100 shadow-sm">
                        <Star className="w-10 h-10 text-indigo-600 fill-indigo-600 animate-pulse" />
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">Product <span className="text-indigo-600">Curator</span></h2>
                        <p className="text-slate-500 font-medium max-w-lg mx-auto text-sm leading-relaxed">
                            Control which products are featured on the global storefront. Curate collections for seasonal events, holidays, or trend spikes.
                        </p>
                    </div>
                    <button className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-[24px] shadow-xl shadow-indigo-100 transition-all border-none cursor-pointer uppercase tracking-[0.2em] text-xs">
                        Open Global Curation Engine
                    </button>
                </div>
            )}
        </div>
    );
};

export default MarketingControl;
