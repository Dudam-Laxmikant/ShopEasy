import React from 'react';
import { Package, Search, ChevronRight, ExternalLink } from 'lucide-react';

const Orders = () => {
    const orders = [
        {
            id: 'ORD-8923412',
            date: 'March 01, 2024',
            status: 'Delivered',
            total: '$129.00',
            items: [
                { name: 'Premium Cotton Shirt', image: 'https://placehold.co/100x100?text=Shirt' },
                { name: 'Slim Fit Denim', image: 'https://placehold.co/100x100?text=Denim' }
            ]
        },
        {
            id: 'ORD-7721094',
            date: 'Feb 24, 2024',
            status: 'In Transit',
            total: '$85.50',
            items: [
                { name: 'Leather Wallet', image: 'https://placehold.co/100x100?text=Wallet' }
            ]
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Orders</h1>
                    <p className="text-gray-500 mt-1 font-medium">View and track your previous orders</p>
                </div>

                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        className="pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-sm"
                    />
                </div>
            </div>

            {orders.length > 0 ? (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div key={order.id} className="group border border-gray-100 rounded-2xl hover:border-indigo-100 hover:shadow-lg transition-all duration-300">
                            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-gray-50 bg-gray-50/30 group-hover:bg-indigo-50/10 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-gray-100 shadow-sm">
                                        <Package className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 tracking-tight">{order.id}</h4>
                                        <p className="text-sm font-medium text-gray-500 mt-0.5">{order.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 self-end sm:self-center">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                    <button className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors ml-2">
                                        Details <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex -space-x-3 overflow-hidden">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="relative inline-block border-2 border-white rounded-xl overflow-hidden shadow-sm">
                                            <img src={item.image} alt={item.name} className="w-14 h-14 object-cover" />
                                        </div>
                                    ))}
                                    {order.items.length > 2 && (
                                        <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-white text-xs font-bold text-gray-500">
                                            +{order.items.length - 2}
                                        </div>
                                    )}
                                </div>

                                <div className="text-center sm:text-right">
                                    <p className="text-sm font-bold text-gray-400">Total Amount</p>
                                    <p className="text-xl font-black text-gray-900 mt-0.5">{order.total}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <Package className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">No orders yet</h3>
                    <p className="text-gray-500 mt-2 max-w-xs font-medium">When you buy something, your orders will appear here.</p>
                    <button className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                        Start Shopping
                    </button>
                </div>
            )}
        </div>
    );
};

export default Orders;
