import React, { useState } from 'react';
import {
    Search,
    Users,
    Mail,
    MapPin,
    Calendar,
    Hash,
    MoreVertical,
    X,
    ShieldCheck,
    Briefcase,
    Phone,
    UserCircle
} from 'lucide-react';

const SellersList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSeller, setSelectedSeller] = useState(null);
    const [sellers] = useState([
        { id: 'SEL-001', name: 'Fashion Hub Inc.', email: 'sarah@fashionhub.com', joined: 'Jan 12, 2025', city: 'Mumbai', progress: 75, adminName: 'Admin Alpha', adminId: 'ADM-101', phone: '+91 98765 43210', products: 124, revenue: '₹4.5L' },
        { id: 'SEL-002', name: 'ElectroNexus', email: 'mike@electronexus.io', joined: 'Feb 05, 2025', city: 'Bangalore', progress: 45, adminName: 'Admin Beta', adminId: 'ADM-102', phone: '+91 87654 32109', products: 89, revenue: '₹3.2L' },
        { id: 'SEL-003', name: 'PureHome Décor', email: 'harvey@purehome.com', joined: 'Nov 20, 2024', city: 'Delhi', progress: 90, adminName: 'Admin Gamma', adminId: 'ADM-103', phone: '+91 76543 21098', products: 256, revenue: '₹8.9L' },
        { id: 'SEL-004', name: 'Beauty Blends', email: 'donna@beautyblending.com', joined: 'Mar 01, 2026', city: 'Pune', progress: 20, adminName: 'Admin Delta', adminId: 'ADM-104', phone: '+91 65432 10987', products: 45, revenue: '₹1.1L' },
        { id: 'SEL-005', name: 'Urban Sole', email: 'louis@urbansole.in', joined: 'Mar 15, 2026', city: 'Chennai', progress: 60, adminName: 'Admin Epsilon', adminId: 'ADM-105', phone: '+91 54321 09876', products: 67, revenue: '₹2.4L' },
    ]);

    const filteredSellers = sellers.filter(s => 
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.adminName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-20">
            {/* Simple Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Registered <span className="text-indigo-600">Sellers</span></h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Simplified Partner Directory</p>
                </div>
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find seller by any field..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Simple Table Card */}
            <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/40">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><Hash className="w-3 h-3" /> ID</div></th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Admin Name</th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><Users className="w-3 h-3" /> Name</div></th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><Mail className="w-3 h-3" /> Email</div></th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><Calendar className="w-3 h-3" /> Joined Date</div></th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><MapPin className="w-3 h-3" /> City</div></th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Progress</th>
                                <th className="px-8 py-5 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredSellers.map((seller) => (
                                <tr key={seller.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-8 py-6 font-black text-xs text-indigo-600 tracking-wider">
                                        {seller.id}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[13px] font-bold text-slate-600 italic">@{seller.adminName}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[14px] font-bold text-slate-800">{seller.name}</span>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-slate-500 font-medium lowercase">
                                        {seller.email}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[13px] font-black text-slate-700 uppercase italic whitespace-nowrap">{seller.joined}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                                            {seller.city}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-indigo-600 rounded-full transition-all duration-1000 shadow-sm shadow-indigo-100" 
                                                    style={{ width: `${seller.progress}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[10px] font-black text-indigo-600 tracking-tighter w-8">{seller.progress}%</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button 
                                            onClick={() => setSelectedSeller(seller)}
                                            className="p-2 text-slate-300 hover:text-indigo-600 transition-colors border-none bg-transparent cursor-pointer"
                                        >
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredSellers.length === 0 && (
                    <div className="p-20 text-center text-slate-400 font-black uppercase text-xs tracking-widest">
                        No sellers found in the matrix
                    </div>
                )}

                <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center px-8">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Viewing {filteredSellers.length} Nodes</span>
                    <div className="flex gap-2">
                        <button className="p-2 w-8 h-8 rounded-lg bg-white border border-slate-200 text-indigo-600 font-black text-[10px] flex items-center justify-center shadow-sm">1</button>
                        <button className="p-2 w-8 h-8 rounded-lg bg-transparent text-slate-400 font-black text-[10px] flex items-center justify-center hover:text-slate-900 transition-colors">2</button>
                    </div>
                </div>
            </div>

            {/* View Details Modal */}
            {selectedSeller && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-[40px] shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[100px] pointer-events-none"></div>

                        <div className="p-10 space-y-8 relative z-10">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-100 italic tracking-tighter">
                                        {selectedSeller.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter mb-1">Seller <span className="text-indigo-600">Profile</span></h2>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Record: {selectedSeller.id}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedSeller(null)} className="p-3 hover:bg-slate-100 rounded-3xl text-slate-400 border-none bg-transparent cursor-pointer transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Seller Details */}
                                <div className="space-y-4">
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Business Information</h3>
                                    <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400 font-bold uppercase tracking-widest">Email</span>
                                            <span className="text-slate-900 font-black">{selectedSeller.email}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400 font-bold uppercase tracking-widest">Phone</span>
                                            <span className="text-slate-900 font-black tracking-tight">{selectedSeller.phone}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400 font-bold uppercase tracking-widest">City</span>
                                            <span className="text-indigo-600 font-black uppercase italic">{selectedSeller.city}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-400 font-bold uppercase tracking-widest">Joined</span>
                                            <span className="text-slate-900 font-black uppercase italic tracking-tighter">{selectedSeller.joined}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center gap-1">
                                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Assets</span>
                                            <span className="text-xl font-black text-emerald-700 tracking-tighter">{selectedSeller.products}</span>
                                        </div>
                                        <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex flex-col items-center justify-center gap-1">
                                            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Revenue</span>
                                            <span className="text-xl font-black text-indigo-700 tracking-tighter">{selectedSeller.revenue}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Admin Assigned Info */}
                                <div className="space-y-4">
                                    <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Assigned Authority</h3>
                                    <div className="bg-slate-900 rounded-3xl p-8 space-y-6 shadow-xl shadow-slate-200">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-sm">
                                                <ShieldCheck className="w-6 h-6 text-indigo-400" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-0.5">Admin Head</p>
                                                <p className="text-lg font-black text-white italic uppercase tracking-tighter">{selectedSeller.adminName}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-4 pt-4 border-t border-white/10">
                                            <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                                                <span className="text-slate-400">Admin ID</span>
                                                <span className="text-white bg-indigo-600 px-2.5 py-1 rounded-lg italic">{selectedSeller.adminId}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-widest">
                                                <span className="text-slate-400">Verification Status</span>
                                                <span className="text-emerald-400 flex items-center gap-1 italic"><ShieldCheck className="w-3 h-3" /> Verified</span>
                                            </div>
                                        </div>
                                        
                                        <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-[0.2em] transition-all cursor-pointer">
                                            Contact Admin Node
                                        </button>
                                    </div>
                                    
                                    <div className="p-6 border border-slate-200 rounded-3xl space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verification Progress</span>
                                            <span className="text-[10px] font-black text-indigo-600">{selectedSeller.progress}%</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${selectedSeller.progress}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellersList;
