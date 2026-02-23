import React, { useState } from 'react';
import {
    Search,
    Filter,
    Truck,
    Printer,
    Clock,
    CheckCircle2,
    XCircle,
    Package,
    ChevronDown,
    MoreVertical,
    MapPin,
    Calendar,
    ExternalLink
} from 'lucide-react';

const OrderProcessing = () => {
    const [selectedTab, setSelectedTab] = useState('New');

    const orders = [
        { id: '#ORD-9021', customer: 'Sarah Jenkins', items: 2, total: '₹3,398', date: 'Feb 22, 2026', time: '02:45 PM', status: 'New', address: 'Bandra West, Mumbai, MH' },
        { id: '#ORD-9020', customer: 'Mike Ross', items: 1, total: '₹4,299', date: 'Feb 22, 2026', time: '01:15 PM', status: 'In Process', address: 'Cyber City, Gurgaon, HR' },
        { id: '#ORD-9019', customer: 'Harvey Specter', items: 3, total: '₹8,597', date: 'Feb 21, 2026', time: '11:30 AM', status: 'Shipped', address: 'Jubilee Hills, Hyderabad, TS' },
        { id: '#ORD-9018', customer: 'Donna Paulsen', items: 1, total: '₹1,999', date: 'Feb 21, 2026', time: '09:45 AM', status: 'Delivered', address: 'Salt Lake, Kolkata, WB' },
    ];

    return (
        <div className="space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Order Processing</h1>
                <p className="text-gray-500 mt-1">Manage, process and ship your customer orders.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Pending Orders', count: 12, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
                    { label: 'Ready for Ship', count: 8, icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
                    { label: 'In Transit', count: 45, icon: Truck, color: 'text-purple-600', bg: 'bg-purple-100' },
                    { label: 'Returns Requested', count: 2, icon: XCircle, color: 'text-red-600', bg: 'bg-red-100' },
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

            {/* Tabs & Filters */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center border-b border-gray-200">
                <div className="flex gap-8 overflow-x-auto w-full md:w-auto scrollbar-hide">
                    {['All', 'New', 'In Process', 'Shipped', 'Delivered', 'Cancelled'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`pb-4 text-sm font-bold transition-all relative border-none bg-transparent cursor-pointer whitespace-nowrap outline-none
                                ${selectedTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {tab}
                            {selectedTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full animate-in slide-in-from-bottom-1 duration-300"></div>
                            )}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-3 pb-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search orders..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20 font-sans" />
                    </div>
                    <button className="p-2 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 text-gray-600 transition-all cursor-pointer">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {orders.filter(order => selectedTab === 'All' || order.status === selectedTab).length > 0 ? (
                    orders
                        .filter(order => selectedTab === 'All' || order.status === selectedTab)
                        .map((order, idx) => (
                            <div key={idx} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group animate-in fade-in duration-500">
                                <div className="p-6 md:p-8">
                                    <div className="flex flex-col lg:flex-row justify-between gap-6">
                                        {/* Left Side: Basic Info */}
                                        <div className="flex flex-col md:flex-row gap-6 md:items-center">
                                            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                                                <Package className="w-8 h-8 text-gray-300" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-lg font-bold text-gray-900">{order.id}</h3>
                                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                                        ${order.status === 'New' ? 'bg-blue-500 text-white' :
                                                            order.status === 'In Process' ? 'bg-orange-500 text-white' :
                                                                order.status === 'Shipped' ? 'bg-purple-500 text-white' : 'bg-green-500 text-white'}`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                                                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {order.date} at {order.time}</span>
                                                    <span className="flex items-center gap-1.5 font-medium text-gray-700">{order.customer}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Middle Side: Items & Total */}
                                        <div className="flex items-center gap-12 lg:border-l lg:pl-12 border-gray-50">
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Items</p>
                                                <p className="text-sm font-bold text-gray-900">{order.items} Products</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Order Value</p>
                                                <p className="text-lg font-bold text-blue-600">{order.total}</p>
                                            </div>
                                        </div>

                                        {/* Right Side: Actions */}
                                        <div className="flex items-center gap-3 lg:border-l lg:pl-12 border-gray-50">
                                            <button className="flex-1 lg:flex-none py-3 px-6 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all border-none cursor-pointer flex items-center justify-center gap-2">
                                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                                Process Order
                                            </button>
                                            <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-600 border border-gray-100 transition-all cursor-pointer">
                                                <Printer className="w-5 h-5" />
                                            </button>
                                            <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-600 border border-gray-100 transition-all cursor-pointer">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Address Expandable (Subtle) */}
                                    <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                                        <span className="flex items-center gap-2 text-xs font-medium text-gray-400">
                                            <MapPin className="w-3.5 h-3.5" />
                                            Shipping to: <span className="text-gray-600">{order.address}</span>
                                        </span>
                                        <button className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline border-none bg-transparent cursor-pointer">
                                            View Full Details <ExternalLink className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-gray-100 shadow-sm space-y-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                            <Package className="w-10 h-10 text-gray-200" />
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-gray-900">No {selectedTab !== 'All' ? selectedTab : ''} orders found</p>
                            <p className="text-gray-500 text-sm">There are no orders in this category at the moment.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderProcessing;
