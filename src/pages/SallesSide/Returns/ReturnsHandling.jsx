import React, { useState } from 'react';
import {
    RotateCcw,
    Search,
    Filter,
    CheckCircle2,
    AlertTriangle,
    Clock,
    Image as ImageIcon,
    User,
    ChevronDown,
    MapPin,
    ArrowRight,
    ClipboardCheck,
    Truck
} from 'lucide-react';

const ReturnsHandling = () => {
    const [selectedTab, setSelectedTab] = useState('Pending');

    const returns = [
        { id: '#RET-401', orderId: '#ORD-9010', customer: 'John Smith', reason: 'Defective / Damaged', date: 'Feb 21, 2026', status: 'Pending', item: 'Cotton Formal Shirt - XL', image: 'https://theformalclub.in/cdn/shop/files/TealFormalShirt_4.jpg?v=1751886662&width=600' },
        { id: '#RET-400', orderId: '#ORD-9005', customer: 'Alice Wong', reason: 'Wrong Size Delivered', date: 'Feb 19, 2026', status: 'In Inspection', item: 'Smart Watch Series 7', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60' },
        { id: '#RET-399', orderId: '#ORD-8998', customer: 'Robert Brown', reason: 'Quality Not as Expected', date: 'Feb 18, 2026', status: 'Approved', item: 'Leather Sneakers - White', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=60' },
    ];

    return (
        <div className="space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Returns & Refunds</h1>
                <p className="text-gray-500 mt-1">Manage product returns, inspections and customer refunds.</p>
            </div>

            {/* Warning Alert */}
            <div className="bg-orange-50 border border-orange-100 p-6 rounded-3xl flex items-start gap-4">
                <div className="p-2 bg-orange-100 rounded-xl">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                    <h3 className="text-sm font-bold text-orange-900">Return Policy Reminder</h3>
                    <p className="text-sm text-orange-700 mt-1 leading-relaxed">
                        Per our seller agreement, returns must be reviewed within 48 hours of receipt at your warehouse. Unresolved returns will be auto-approved for refund.
                    </p>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Pending Approval', count: 3, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
                    { label: 'In Inspection', count: 5, icon: ClipboardCheck, color: 'text-blue-600', bg: 'bg-blue-100' },
                    { label: 'Pickup Arranged', count: 2, icon: Truck, color: 'text-purple-600', bg: 'bg-purple-100' },
                    { label: 'Resolved (30d)', count: 124, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${stat.bg}`}>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                            <p className="text-xl font-bold text-gray-900">{stat.count}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-between border-b border-gray-200">
                <div className="flex gap-8 overflow-x-auto">
                    {['All', 'Pending', 'In Inspection', 'Approved', 'Rejected'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`pb-4 text-sm font-bold transition-all relative border-none bg-transparent cursor-pointer whitespace-nowrap
                                ${selectedTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {tab}
                            {selectedTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full"></div>}
                        </button>
                    ))}
                </div>
            </div>

            {/* Returns Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {returns.map((ret, idx) => (
                    <div key={idx} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group">
                        <div className="p-6 md:p-8 flex flex-col sm:flex-row gap-6">
                            {/* Product & Detail */}
                            <div className="flex flex-col md:flex-row gap-6 flex-1">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0">
                                    <img src={ret.image} alt={ret.item} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="space-y-3 flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none mb-1">{ret.id}</p>
                                            <h3 className="font-bold text-gray-900">{ret.item}</h3>
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                            ${ret.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                ret.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {ret.status}
                                        </span>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <User className="w-4 h-4" /> <span className="font-medium text-gray-700">{ret.customer}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <RotateCcw className="w-4 h-4" /> Reason: <span className="font-bold text-red-600">{ret.reason}</span>
                                        </div>
                                    </div>
                                    <div className="pt-2">
                                        <button className="flex items-center gap-1.5 text-xs text-blue-600 font-bold hover:underline border-none bg-transparent cursor-pointer">
                                            View Order History <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Action Area */}
                            <div className="sm:w-48 flex flex-col gap-2 justify-center border-t sm:border-t-0 sm:border-l border-gray-100 pt-6 sm:pt-0 sm:pl-6">
                                <button className="w-full py-3 px-4 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all border-none cursor-pointer">
                                    Approve Return
                                </button>
                                <button className="w-full py-3 px-4 bg-white text-gray-700 border border-gray-200 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all cursor-pointer">
                                    Reject
                                </button>
                                <button className="w-full py-2 text-[11px] font-bold text-gray-400 hover:text-gray-600 border-none bg-transparent cursor-pointer">
                                    Chat with Buyer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReturnsHandling;
