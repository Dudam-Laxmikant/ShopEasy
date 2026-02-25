import React, { useState, useMemo, useEffect, useRef } from 'react';
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
    ExternalLink,
    AlertCircle,
    User,
    CreditCard,
    ShoppingBag,
    Eye,
    Edit3,
    Trash2,
    Mail,
    Phone,
    X
} from 'lucide-react';

const OrderProcessing = () => {
    const [selectedTab, setSelectedTab] = useState('New');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [activeActionMenu, setActiveActionMenu] = useState(null);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectReason, setRejectReason] = useState('');
    const modalRef = useRef(null);

    const [orders, setOrders] = useState([
        { id: '#ORD-9021', customer: 'Sarah Jenkins', items: 2, total: '₹3,398', date: 'Feb 22, 2026', time: '02:45 PM', status: 'New', address: 'Bandra West, Mumbai, MH', email: 'sarah.j@example.com', phone: '+91 98765 43210', payment: 'UPI', products: [{ name: 'Silk Floral Saree', price: '₹2,499', qty: 1 }, { name: 'Gold Bangle Set', price: '₹899', qty: 1 }] },
        { id: '#ORD-9020', customer: 'Mike Ross', items: 1, total: '₹4,299', date: 'Feb 22, 2026', time: '01:15 PM', status: 'In Process', address: 'Cyber City, Gurgaon, HR', email: 'mike.r@example.com', phone: '+91 87654 32109', payment: 'Credit Card', products: [{ name: 'Levi\'s Men\'s Jeans', price: '₹4,299', qty: 1 }] },
        { id: '#ORD-9019', customer: 'Harvey Specter', items: 3, total: '₹8,597', date: 'Feb 21, 2026', time: '11:30 AM', status: 'Shipped', address: 'Jubilee Hills, Hyderabad, TS', email: 'harvey@pearson.com', phone: '+91 76543 21098', payment: 'Bank Transfer', products: [{ name: 'Premium Cotton Suit', price: '₹5,999', qty: 1 }, { name: 'White Formal Shirt', price: '₹1,599', qty: 1 }, { name: 'Silk Tie', price: '₹999', qty: 1 }] },
        { id: '#ORD-9018', customer: 'Donna Paulsen', items: 1, total: '₹1,999', date: 'Feb 21, 2026', time: '09:45 AM', status: 'Delivered', address: 'Salt Lake, Kolkata, WB', email: 'donna.p@example.com', phone: '+91 65432 10987', payment: 'COD', products: [{ name: 'Canvas Handbag', price: '₹1,999', qty: 1 }] },
        { id: '#ORD-9017', customer: 'Louis Litt', items: 4, total: '₹12,450', date: 'Feb 20, 2026', time: '04:20 PM', status: 'New', address: 'Defence Colony, New Delhi, DL', email: 'louis.l@example.com', phone: '+91 54321 09876', payment: 'Credit Card', products: [{ name: 'Designer Blouse', price: '₹2,500', qty: 2 }, { name: 'Party Clutch', price: '₹3,450', qty: 1 }, { name: 'Heeled Sandals', price: '₹4,000', qty: 1 }] },
        { id: '#ORD-9016', customer: 'Rachel Zane', items: 2, total: '₹5,600', date: 'Feb 20, 2026', time: '10:10 AM', status: 'Return Requested', address: 'Koramangala, Bangalore, KA', email: 'rachel.z@example.com', phone: '+91 43210 98765', payment: 'UPI', products: [{ name: 'Embroidered Kaftan', price: '₹4,600', qty: 1 }, { name: 'Silver Jhumkas', price: '₹1,000', qty: 1 }] },
        { id: '#ORD-9015', customer: 'Robert Zane', items: 1, total: '₹2,100', date: 'Feb 19, 2026', time: '02:30 PM', status: 'Cancelled', cancelledBy: 'Customer', rejectReason: 'Order placed by mistake', address: 'Anna Nagar, Chennai, TN', email: 'robert.z@example.com', phone: '+91 32109 87654', payment: 'UPI', products: [{ name: 'Linen Trousers', price: '₹2,100', qty: 1 }] },
        { id: '#ORD-9014', customer: 'Jessica Pearson', items: 5, total: '₹15,800', date: 'Feb 19, 2026', time: '11:15 AM', status: 'In Process', address: 'Park Street, Kolkata, WB', email: 'jessica@pearson.com', phone: '+91 21098 76543', payment: 'Bank Transfer', products: [{ name: 'Sequined Gown', price: '₹12,800', qty: 1 }, { name: 'Statement Necklace', price: '₹3,000', qty: 1 }] },
        { id: '#ORD-9013', customer: 'Katrina Bennett', items: 2, total: '₹3,200', date: 'Feb 18, 2026', time: '09:00 AM', status: 'Shipped', address: 'Indiranagar, Bangalore, KA', email: 'katrina.b@example.com', phone: '+91 10987 65432', payment: 'Credit Card', products: [{ name: 'Floral Maxi Dress', price: '₹2,200', qty: 1 }, { name: 'Waist Belt', price: '₹1,000', qty: 1 }] },
        { id: '#ORD-9012', customer: 'Alex Williams', items: 3, total: '₹7,450', date: 'Feb 18, 2026', time: '01:45 PM', status: 'New', address: 'Vasant Vihar, New Delhi, DL', email: 'alex.w@example.com', phone: '+91 91234 56780', payment: 'UPI', products: [{ name: 'Casual Blazer', price: '₹4,999', qty: 1 }, { name: 'Oxford Shoes', price: '₹2,451', qty: 1 }] },
        { id: '#ORD-1111', customer: 'User Demo', items: 1, total: '₹500', date: 'Feb 25, 2026', time: '10:00 AM', status: 'Cancelled', cancelledBy: 'Customer', rejectReason: 'Change of mind', address: 'Bandra, Mumbai', email: 'user@demo.com', phone: '+91 00000 00000', payment: 'COD', products: [{ name: 'Test Product', price: '₹500', qty: 1 }] },
        { id: '#ORD-2222', customer: 'Seller Demo', items: 1, total: '₹999', date: 'Feb 25, 2026', time: '11:00 AM', status: 'Cancelled', cancelledBy: 'Seller', rejectReason: 'Product Out of Stock', address: 'Gurgaon, HR', email: 'seller@demo.com', phone: '+91 11111 11111', payment: 'Prepaid', products: [{ name: 'Demo Item', price: '₹999', qty: 1 }] },
    ]);

    // Dynamic Stats Calculation
    const stats = useMemo(() => {
        return [
            { label: 'Pending Orders', count: orders.filter(o => o.status === 'New').length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
            { label: 'Ready for Ship', count: orders.filter(o => o.status === 'In Process').length, icon: Package, color: 'text-blue-600', bg: 'bg-blue-100' },
            { label: 'In Transit', count: orders.filter(o => o.status === 'Shipped').length, icon: Truck, color: 'text-purple-600', bg: 'bg-purple-100' },
            { label: 'Returns Requested', count: orders.filter(o => o.status === 'Return Requested').length, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
        ];
    }, [orders]);

    // Filtering Logic
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesTab = selectedTab === 'All' || order.status === selectedTab;
            const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [orders, selectedTab, searchQuery]);

    const handleProcessOrder = (orderId) => {
        setOrders(prev => prev.map(order => {
            if (order.id === orderId) {
                if (order.status === 'New') return { ...order, status: 'In Process' };
                if (order.status === 'In Process') return { ...order, status: 'Shipped' };
                if (order.status === 'Shipped') return { ...order, status: 'Delivered' };
                return order;
            }
            return order;
        }));
        setActiveActionMenu(null);
    };

    const handleCancelOrder = () => {
        if (!selectedOrder || !rejectReason) return;

        setOrders(prev => prev.map(order =>
            order.id === selectedOrder.id
                ? { ...order, status: 'Cancelled', rejectReason: rejectReason }
                : order
        ));

        setShowRejectModal(false);
        setSelectedOrder(null);
        setActiveActionMenu(null);
        setRejectReason('');
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'New': return 'bg-blue-500 text-white';
            case 'In Process': return 'bg-orange-500 text-white';
            case 'Shipped': return 'bg-purple-500 text-white';
            case 'Delivered': return 'bg-green-500 text-white';
            case 'Cancelled': return 'bg-gray-500 text-white';
            case 'Return Requested': return 'bg-red-500 text-white';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Close action menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.action-menu-container')) {
                setActiveActionMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="space-y-8 pb-12 relative">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Order Processing</h1>
                <p className="text-gray-500 mt-1">Manage, process and ship your customer orders.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all cursor-default group">
                        <div className={`p-3 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform`}>
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
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20 font-sans"
                        />
                    </div>
                    <button className="p-2 border border-gray-200 bg-white rounded-xl hover:bg-gray-50 text-gray-600 transition-all cursor-pointer">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <div key={order.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group animate-in fade-in duration-500">
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
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(order.status)}`}>
                                                    {order.status} {order.status === 'Cancelled' && `(${order.cancelledBy || 'System'})`}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                                                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {order.date} at {order.time}</span>
                                                <span className="flex items-center gap-1.5 font-medium text-gray-700">{order.customer}</span>
                                                {order.status === 'Cancelled' && (
                                                    <span className={`text-[11px] font-bold ${order.cancelledBy === 'Seller' ? 'text-red-500' : 'text-orange-500'}`}>
                                                        Reason: {order.rejectReason}
                                                    </span>
                                                )}
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
                                    <div className="flex items-center gap-3 lg:border-l lg:pl-12 border-gray-50 relative action-menu-container">
                                        {['New', 'In Process', 'Shipped'].includes(order.status) && (
                                            <button
                                                onClick={() => handleProcessOrder(order.id)}
                                                className="flex-1 lg:flex-none py-3 px-6 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all border-none cursor-pointer flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                                {order.status === 'New' ? 'Process Order' : order.status === 'In Process' ? 'Mark as Shipped' : 'Mark as Delivered'}
                                            </button>
                                        )}
                                        <button className="p-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-gray-600 border border-gray-100 transition-all cursor-pointer">
                                            <Printer className="w-5 h-5" />
                                        </button>
                                        <div className="relative">
                                            <button
                                                onClick={() => setActiveActionMenu(activeActionMenu === order.id ? null : order.id)}
                                                className={`p-3 rounded-xl transition-all cursor-pointer border border-gray-100
                                                    ${activeActionMenu === order.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </button>

                                            {activeActionMenu === order.id && (
                                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
                                                    <div className="p-2 space-y-1">
                                                        <button
                                                            onClick={() => { setSelectedOrder(order); setActiveActionMenu(null); }}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all border-none bg-transparent cursor-pointer"
                                                        >
                                                            <Eye className="w-4 h-4 text-blue-500" /> View Details
                                                        </button>
                                                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all border-none bg-transparent cursor-pointer">
                                                            <Edit3 className="w-4 h-4 text-green-500" /> Edit Order
                                                        </button>
                                                        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all border-none bg-transparent cursor-pointer">
                                                            <Printer className="w-4 h-4 text-purple-500" /> Print Invoice
                                                        </button>
                                                        <div className="h-px bg-gray-100 my-1"></div>
                                                        <button
                                                            onClick={() => { setSelectedOrder(order); setShowRejectModal(true); setActiveActionMenu(null); }}
                                                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all border-none bg-transparent cursor-pointer"
                                                        >
                                                            <Trash2 className="w-4 h-4" /> Reject Order
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Address Expandable (Subtle) */}
                                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-xs font-medium text-gray-400">
                                        <MapPin className="w-3.5 h-3.5" />
                                        Shipping to: <span className="text-gray-600 font-semibold">{order.address}</span>
                                    </span>
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline border-none bg-transparent cursor-pointer transition-all"
                                    >
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

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div
                        ref={modalRef}
                        className="bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 duration-500"
                    >
                        {/* Modal Header */}
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusStyles(selectedOrder.status)}`}>
                                        {selectedOrder.status}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 font-medium">{selectedOrder.id} • Confirmed on {selectedOrder.date}</p>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-2.5 bg-white shadow-sm border border-gray-100 rounded-full hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-all cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 overflow-y-auto max-h-[70vh] space-y-8 scrollbar-hide">
                            {/* Customer & Payment Info */}
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Customer Information</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{selectedOrder.customer}</p>
                                                <p className="text-xs text-gray-500">Registered Customer</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <p className="text-sm text-gray-600">{selectedOrder.email}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                                <Phone className="w-5 h-5" />
                                            </div>
                                            <p className="text-sm text-gray-600">{selectedOrder.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Order Summary</h4>
                                    <div className="bg-gray-50 p-4 rounded-2xl space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Payment Method</span>
                                            <span className="font-bold text-gray-900 flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-default">
                                                <CreditCard className="w-4 h-4" /> {selectedOrder.payment}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Shipping Mode</span>
                                            <span className="font-bold text-gray-900">Express Delivery</span>
                                        </div>
                                        <div className="h-px bg-gray-200"></div>
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium text-gray-500">Total Amount</span>
                                            <span className="text-xl font-black text-blue-600">{selectedOrder.total}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address & Reject Reason */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Shipping Address</h4>
                                    <div className="flex items-start gap-4 p-5 bg-orange-50/50 border border-orange-100/50 rounded-3xl">
                                        <div className="w-10 h-10 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
                                            <MapPin className="w-5 h-5" />
                                        </div>
                                        <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                            {selectedOrder.address}, India
                                        </p>
                                    </div>
                                </div>
                                {selectedOrder.status === 'Cancelled' && (
                                    <div className="space-y-4">
                                        <h4 className={`text-[10px] font-bold uppercase tracking-[0.2em] ${selectedOrder.cancelledBy === 'Seller' ? 'text-red-400' : 'text-orange-400'}`}>
                                            Order Cancelled By {selectedOrder.cancelledBy}
                                        </h4>
                                        <div className={`flex items-start gap-4 p-5 border rounded-3xl ${selectedOrder.cancelledBy === 'Seller' ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100'}`}>
                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${selectedOrder.cancelledBy === 'Seller' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                                                <XCircle className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className={`text-[10px] font-bold uppercase mb-1 ${selectedOrder.cancelledBy === 'Seller' ? 'text-red-400' : 'text-orange-400'}`}>Reason: </p>
                                                <p className={`text-sm leading-relaxed font-bold ${selectedOrder.cancelledBy === 'Seller' ? 'text-red-800' : 'text-orange-800'}`}>
                                                    {selectedOrder.rejectReason || 'No reason provided'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Product List */}
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Ordered Items ({selectedOrder.items})</h4>
                                <div className="border border-gray-100 rounded-2xl overflow-hidden">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-gray-50/80 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                <th className="px-6 py-4">Product Name</th>
                                                <th className="px-6 py-4">Quantity</th>
                                                <th className="px-6 py-4 text-right">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-50">
                                            {selectedOrder.products.map((product, pidx) => (
                                                <tr key={pidx} className="text-sm group hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-white transition-colors">
                                                                <ShoppingBag className="w-5 h-5 text-gray-400" />
                                                            </div>
                                                            <span className="font-bold text-gray-900">{product.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600 font-medium">{product.qty} Units</td>
                                                    <td className="px-6 py-4 text-right font-bold text-gray-900">{product.price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-4">
                            {['New', 'In Process', 'Shipped'].includes(selectedOrder.status) && (
                                <button
                                    onClick={() => handleProcessOrder(selectedOrder.id)}
                                    className="flex-[2] py-4 bg-gray-900 text-white rounded-2xl text-sm font-bold hover:bg-black transition-all shadow-lg hover:shadow-black/20 flex items-center justify-center gap-2 border-none cursor-pointer"
                                >
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    {selectedOrder.status === 'New' ? 'Start Processing' : selectedOrder.status === 'In Process' ? 'Confirm Shipment' : 'Deliver Order'}
                                </button>
                            )}

                            {['New', 'In Process'].includes(selectedOrder.status) && (
                                <button
                                    onClick={() => setShowRejectModal(true)}
                                    className="flex-1 py-4 bg-red-50 text-red-600 border border-red-100 rounded-2xl text-sm font-bold hover:bg-red-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <XCircle className="w-5 h-5" /> Reject Order
                                </button>
                            )}

                            <button className="flex-1 py-4 bg-white border border-gray-200 text-gray-700 rounded-2xl text-sm font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                                <Printer className="w-5 h-5 text-purple-500" /> Invoice
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Rejection Reason Modal */}
            {showRejectModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="p-10 space-y-8">
                            <div className="text-center space-y-3">
                                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <AlertCircle className="w-10 h-10 text-red-500" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Reject Order?</h3>
                                <p className="text-gray-500 text-sm font-medium">Please select a reason for rejecting this order. This will be shared with the customer.</p>
                            </div>

                            <div className="space-y-3">
                                {[
                                    'Product Out of Stock',
                                    'Unable to deliver to this location',
                                    'Pricing error on product',
                                    'Damaged / Quality Issue',
                                    'Other (Contact Customer Support)'
                                ].map((reason) => (
                                    <button
                                        key={reason}
                                        onClick={() => setRejectReason(reason)}
                                        className={`w-full p-4 rounded-2xl text-sm font-bold text-left transition-all border-2 flex items-center justify-between
                                            ${rejectReason === reason
                                                ? 'bg-red-50 border-red-500 text-red-700'
                                                : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200 hover:bg-gray-50'}`}
                                    >
                                        {reason}
                                        {rejectReason === reason && <CheckCircle2 className="w-4 h-4 text-red-500" />}
                                    </button>
                                ))}
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => { setShowRejectModal(false); setRejectReason(''); }}
                                    className="flex-1 py-4 bg-gray-50 text-gray-600 rounded-2xl text-sm font-bold hover:bg-gray-100 transition-all cursor-pointer border-none"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleCancelOrder}
                                    disabled={!rejectReason}
                                    className={`flex-[2] py-4 rounded-2xl text-sm font-bold transition-all shadow-lg border-none cursor-pointer
                                        ${rejectReason ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                >
                                    Confirm Reject
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderProcessing;


