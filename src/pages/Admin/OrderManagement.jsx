import React, { useState } from 'react';
import {
    ShoppingCart,
    Search,
    Filter,
    Truck,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Clock,
    Eye,
    MoreHorizontal,
    MessageSquare,
    MapPin,
    Calendar,
    ArrowRight,
    Gavel,
    Shield
} from 'lucide-react';

const OrderManagement = () => {
    const [selectedTab, setSelectedTab] = useState('All');

    const globalOrders = [
        { id: '#GLO-2045', customer: 'Sarah Jenkins', seller: 'Fashion Hub', amount: '₹3,398', date: 'Feb 22, 2026', status: 'Shipped', risk: 'Safe' },
        { id: '#GLO-2044', customer: 'Mike Ross', seller: 'ElectroNexus', amount: '₹14,299', date: 'Feb 22, 2026', status: 'Payment Pending', risk: 'Medium' },
        { id: '#GLO-2043', customer: 'Harvey Specter', seller: 'FutureTech', amount: '₹48,597', date: 'Feb 21, 2026', status: 'Disputed', risk: 'High' },
        { id: '#GLO-2042', customer: 'Donna Paulsen', seller: 'Beauty Blends', amount: '₹1,999', date: 'Feb 21, 2026', status: 'Delivered', risk: 'Safe' },
    ];

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase mb-1">Global <span className="text-indigo-600">Logistics</span></h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] ml-1">Cross-Entity Order Monitoring & Reconciliation</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-red-50 text-red-600 border border-red-100 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all border-none cursor-pointer flex items-center gap-2 shadow-sm">
                        <Gavel className="w-4 h-4" /> Active Disputes (12)
                    </button>
                    <button className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-slate-200 transition-all border-none cursor-pointer">
                        Export Manifest
                    </button>
                </div>
            </div>

            {/* Logistics Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                    { label: 'Active Shipments', count: 1245, trend: '+5.4', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Network Delay', count: '1.2%', trend: '-0.2', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
                    { label: 'Success Rate', count: '99.4%', trend: '+0.1', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Dispute Volume', count: 48, trend: '+12', icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white border border-slate-200 p-7 rounded-[32px] group hover:border-indigo-100 transition-all shadow-sm hover:shadow-md">
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <span className={`text-[11px] font-black ${stat.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                                {stat.trend}%
                            </span>
                        </div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black text-slate-900 tracking-widest leading-none">{stat.count}</h3>
                    </div>
                ))}
            </div>

            {/* Orders Data Hub */}
            <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
                    <div className="flex gap-8 overflow-x-auto w-full md:w-auto">
                        {['All', 'Disputed', 'In Transit', 'Fulfilled'].map((tab) => (
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
                        <input type="text" placeholder="Global Scan ID..." className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500/10 font-sans shadow-sm" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Order Matrix</th>
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Economic Value</th>
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Network Status</th>
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Global Risk</th>
                                <th className="px-8 py-6"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {globalOrders.map((order, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-all group">
                                    <td className="px-8 py-7">
                                        <div className="flex flex-col">
                                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">{order.id}</p>
                                            <h4 className="text-[15px] font-black text-slate-900 mb-2">{order.customer}</h4>
                                            <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg border border-slate-100 shadow-sm">
                                                    <Store className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" /> {order.seller}
                                                </div>
                                                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg border border-slate-100 shadow-sm">
                                                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {order.date}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="space-y-1">
                                            <p className="text-xl font-black text-slate-900 italic">{order.amount}</p>
                                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Settled to Node</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm
                                            ${order.status === 'Disputed' ? 'bg-red-600 text-white shadow-red-200' :
                                                order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' :
                                                    order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                                            <div className={`w-2 h-2 rounded-full ${order.status === 'Disputed' ? 'bg-white animate-ping' : 'bg-current opacity-40'}`}></div>
                                            {order.status}
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-3 h-3 rounded-full ${order.risk === 'High' ? 'bg-red-500' : order.risk === 'Medium' ? 'bg-orange-500' : 'bg-emerald-500 shadow-sm shadow-emerald-200'}`}></div>
                                            <p className="text-xs font-black text-slate-900 uppercase tracking-widest">{order.risk}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                            {order.status === 'Disputed' && (
                                                <button className="p-3 bg-red-600 text-white rounded-xl shadow-lg shadow-red-100 hover:bg-red-500 transition-all border-none cursor-pointer">
                                                    <Gavel className="w-5 h-5" />
                                                </button>
                                            )}
                                            <button className="p-3 bg-white border border-slate-200 text-slate-900 rounded-xl shadow-sm hover:bg-slate-50 transition-all border-none cursor-pointer">
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            <button className="p-3 bg-slate-100 text-slate-400 hover:text-slate-600 rounded-xl transition-all border-none cursor-pointer">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center -space-x-3">
                            <div className="w-10 h-10 border-4 border-white rounded-full bg-slate-200"></div>
                            <div className="w-10 h-10 border-4 border-white rounded-full bg-indigo-100"></div>
                            <div className="w-10 h-10 border-4 border-white rounded-full bg-emerald-100"></div>
                            <div className="w-10 h-10 border-4 border-white rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600">+8</div>
                        </div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Active Resolution Specialists Live</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 hover:border-indigo-100 transition-all border-none cursor-pointer shadow-sm">
                            View Logistics Topology
                        </button>
                        <div className="flex gap-2">
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
        </div>
    );
};

export default OrderManagement;
