import React, { useState } from 'react';
import {
    Package, Search, ChevronRight, CheckCircle2, Truck,
    ShoppingBag, Box, Clock, ChevronDown, X, Info
} from 'lucide-react';

const Orders = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);

    const statusSteps = [
        { label: 'Placed', icon: Clock },
        { label: 'Confirmed', icon: ShoppingBag },
        { label: 'Shipped', icon: Truck },
        { label: 'Delivered', icon: CheckCircle2 }
    ];

    const orders = [
        {
            id: 'ORD-8923412',
            date: 'March 01, 2024',
            status: 'Delivered',
            currentStep: 3, // Delivered
            total: '$129.00',
            shippingAddress: '123 Fashion St, Design City, 10001',
            paymentMethod: 'Credit Card (**** 4242)',
            items: [
                {
                    id: 1,
                    name: 'Premium Cotton Shirt',
                    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=200',
                    price: '$45.00',
                    qty: 1,
                    color: 'White',
                    size: 'L'
                },
                {
                    id: 2,
                    name: 'Slim Fit Denim',
                    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=200',
                    price: '$84.00',
                    qty: 1,
                    color: 'Dark Blue',
                    size: '32'
                }
            ]
        },
        {
            id: 'ORD-7721094',
            date: 'Feb 24, 2024',
            status: 'In Transit',
            currentStep: 2, // Shipped
            total: '$85.50',
            shippingAddress: '456 Modern Ave, Tech Town, 20002',
            paymentMethod: 'Wallet',
            items: [
                {
                    id: 3,
                    name: 'Leather Wallet',
                    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=200',
                    price: '$85.50',
                    qty: 1,
                    color: 'Brown',
                    size: 'One Size'
                }
            ]
        }
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
            case 'In Transit': return 'bg-amber-50 text-amber-700 border-amber-100';
            case 'Cancelled': return 'bg-rose-50 text-rose-700 border-rose-100';
            default: return 'bg-indigo-50 text-indigo-700 border-indigo-100';
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Orders</h1>
                    <p className="text-gray-500 mt-1 font-medium">Track your shipments and view order history</p>
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

            {/* Orders List */}
            {orders.length > 0 ? (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500">
                            {/* Card Header */}
                            <div className="p-5 sm:p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
                                        <Box className="w-6 h-6 text-indigo-600" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h4 className="font-bold text-gray-900 tracking-tight text-lg">{order.id}</h4>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm font-medium text-gray-500 mt-0.5">Placed on {order.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all flex items-center gap-2"
                                    >
                                        Order Details <Info className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Tracking Stepper */}
                            <div className="px-5 sm:px-10 py-8 bg-gray-50/50">
                                <div className="relative flex justify-between">
                                    {/* Progress Line */}
                                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-indigo-500 transition-all duration-1000 ease-out"
                                            style={{ width: `${(order.currentStep / (statusSteps.length - 1)) * 100}%` }}
                                        />
                                    </div>

                                    {/* Steps */}
                                    {statusSteps.map((step, idx) => {
                                        const Icon = step.icon;
                                        const isActive = idx <= order.currentStep;
                                        const isCurrent = idx === order.currentStep;

                                        return (
                                            <div key={idx} className="relative flex flex-col items-center">
                                                <div className={`
                                                    w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-500
                                                    ${isActive ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-gray-300 border-2 border-gray-100'}
                                                    ${isCurrent ? 'scale-125 ring-4 ring-indigo-50' : ''}
                                                `}>
                                                    <Icon className="w-5 h-5" />
                                                </div>
                                                <span className={`absolute -bottom-8 whitespace-nowrap text-xs font-bold transition-colors ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                                                    {step.label}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Mini Item Preview & Footer */}
                            <div className="p-5 sm:p-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-4">
                                        {order.items.slice(0, 3).map((item) => (
                                            <div key={item.id} className="w-14 h-14 rounded-2xl border-4 border-white overflow-hidden shadow-sm bg-gray-100">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">{order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}</p>
                                        <button
                                            onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                                            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group/btn"
                                        >
                                            {expandedOrder === order.id ? 'Hide Items' : 'Quick View'}
                                            <ChevronDown className={`w-3 h-3 transition-transform ${expandedOrder === order.id ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                </div>

                                <div className="text-center sm:text-right">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Amount</p>
                                    <p className="text-2xl font-black text-gray-900 mt-1">{order.total}</p>
                                </div>
                            </div>

                            {/* Quick View Items */}
                            {expandedOrder === order.id && (
                                <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                                    <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                                        {order.items.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                                                <div className="flex items-center gap-3">
                                                    <img src={item.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900 leading-tight">{item.name}</p>
                                                        <p className="text-xs text-gray-500 font-medium">Qty: {item.qty} • Size: {item.size}</p>
                                                    </div>
                                                </div>
                                                <p className="font-bold text-gray-900">{item.price}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center mb-6 border border-gray-100">
                        <Package className="w-10 h-10 text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">No orders yet</h3>
                    <p className="text-gray-500 mt-2 max-w-xs font-medium">When you buy something, your orders will appear here.</p>
                    <button className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                        Start Shopping
                    </button>
                </div>
            )}

            {/* Detailed Order Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />

                    <div className="relative bg-white w-full max-w-2xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <div className="p-6 sm:p-8 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900">Order Particulars</h3>
                                <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest mt-1">{selectedOrder.id}</p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors group"
                            >
                                <X className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 scrollbar-thin">
                            {/* Summary Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Shipping Address</p>
                                    <p className="text-sm font-bold text-gray-700 leading-relaxed">{selectedOrder.shippingAddress}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Payment Method</p>
                                    <p className="text-sm font-bold text-gray-700 leading-relaxed">{selectedOrder.paymentMethod}</p>
                                </div>
                            </div>

                            {/* Items List */}
                            <div className="space-y-4">
                                <h4 className="text-lg font-black text-gray-900 border-b-2 border-indigo-500 w-fit pb-1">Items Details</h4>
                                <div className="space-y-4">
                                    {selectedOrder.items.map((item) => (
                                        <div key={item.id} className="flex gap-4 p-4 rounded-3xl bg-gray-50 border border-gray-100 group hover:border-indigo-200 transition-colors">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md bg-white flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between py-1">
                                                <div>
                                                    <h5 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{item.name}</h5>
                                                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                                                        <span className="text-xs font-medium text-gray-500 bg-white px-2 py-0.5 rounded-lg border border-gray-100">Color: {item.color}</span>
                                                        <span className="text-xs font-medium text-gray-500 bg-white px-2 py-0.5 rounded-lg border border-gray-100">Size: {item.size}</span>
                                                        <span className="text-xs font-medium text-gray-500 bg-white px-2 py-0.5 rounded-lg border border-gray-100">Qty: {item.qty}</span>
                                                    </div>
                                                </div>
                                                <p className="font-black text-gray-900 text-lg uppercase">{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Price Summary */}
                            <div className="bg-gray-900 rounded-[2rem] p-6 text-white space-y-3">
                                <div className="flex justify-between text-sm font-medium text-gray-400">
                                    <span>Subtotal</span>
                                    <span>{selectedOrder.total}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-gray-400">
                                    <span>Shipping</span>
                                    <span className="text-emerald-400">FREE</span>
                                </div>
                                <div className="pt-3 border-t border-gray-800 flex justify-between items-center">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-black text-2xl text-indigo-400">{selectedOrder.total}</span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 sm:p-8 bg-gray-50 sticky bottom-0 border-t border-gray-100 flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="px-6 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-100 transition-all"
                            >
                                Close
                            </button>
                            <button className="px-8 py-3 bg-indigo-600 text-white rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                                Need Help?
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;

