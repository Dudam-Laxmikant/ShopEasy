import React, { useState, useMemo, useEffect, useRef } from 'react';
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
    Truck,
    MoreVertical,
    Eye,
    X,
    MessageSquare,
    Ban,
    DollarSign,
    Calendar,
    ExternalLink,
    Camera,
    ShoppingBag
} from 'lucide-react';

const ReturnsHandling = () => {
    const [selectedTab, setSelectedTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedReturn, setSelectedReturn] = useState(null);
    const [activeActionMenu, setActiveActionMenu] = useState(null);
    const modalRef = useRef(null);

    const [returns, setReturns] = useState([
        {
            id: '#RET-401',
            orderId: '#ORD-9010',
            customer: 'John Smith',
            reason: 'Defective / Damaged',
            date: 'Feb 21, 2026',
            status: 'Pending',
            item: 'Cotton Formal Shirt - XL',
            image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=60',
            email: 'john.smith@example.com',
            price: '₹1,499',
            description: 'The stitching on the left sleeve is coming apart. Also has a small stain on the collar.',
            images: [
                'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=60',
                'https://theformalclub.in/cdn/shop/files/TealFormalShirt_4.jpg?v=1751886662&width=600'
            ]
        },
        {
            id: '#RET-400',
            orderId: '#ORD-9005',
            customer: 'Alice Wong',
            reason: 'Wrong Size Delivered',
            date: 'Feb 19, 2026',
            status: 'In Inspection',
            item: 'Smart Watch Series 7',
            image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60',
            email: 'alice.w@example.com',
            price: '₹24,999',
            description: 'I ordered size 44mm but received 41mm. The box was sealed but internal label says 41mm.',
            images: [
                'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60'
            ]
        },
        {
            id: '#RET-399',
            orderId: '#ORD-8998',
            customer: 'Robert Brown',
            reason: 'Quality Not Expected',
            date: 'Feb 18, 2026',
            status: 'Approved',
            item: 'Leather Sneakers - White',
            image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=60',
            email: 'rob.b@example.com',
            price: '₹4,599',
            description: 'The leather feels like synthetic material. Not worth the price mentioned.',
            images: [
                'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=60'
            ]
        },
        {
            id: '#RET-398',
            orderId: '#ORD-9022',
            customer: 'Sarah Miller',
            reason: 'Item Not as Described',
            date: 'Feb 17, 2026',
            status: 'Refunded',
            item: 'Denim Jacket - M',
            image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop&q=60',
            email: 'sarah.m@example.com',
            price: '₹2,299',
            description: 'Color is much lighter than shown in product images.',
            images: [
                'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&auto=format&fit=crop&q=60'
            ]
        },
        {
            id: '#RET-397',
            orderId: '#ORD-9015',
            customer: 'Mike Ross',
            reason: 'Defective / Damaged',
            date: 'Feb 16, 2026',
            status: 'Rejected',
            item: 'Bluetooth Headphones',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
            email: 'mike.ross@example.com',
            price: '₹5,499',
            description: 'Left side speaker not working.',
            images: [
                'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'
            ]
        },
    ]);

    // Dynamic Stats Calculation
    const stats = useMemo(() => {
        return [
            { label: 'Pending Approval', count: returns.filter(r => r.status === 'Pending').length, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100' },
            { label: 'In Inspection', count: returns.filter(r => r.status === 'In Inspection').length, icon: ClipboardCheck, color: 'text-blue-600', bg: 'bg-blue-100' },
            { label: 'Approved Returns', count: returns.filter(r => r.status === 'Approved').length, icon: CheckCircle2, color: 'text-purple-600', bg: 'bg-purple-100' },
            { label: 'Total Refunded', count: returns.filter(r => r.status === 'Refunded').length, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
        ];
    }, [returns]);

    // Filtering Logic
    const filteredReturns = useMemo(() => {
        return returns.filter(ret => {
            const matchesTab = selectedTab === 'All' || ret.status === selectedTab;
            const matchesSearch = ret.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ret.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                ret.customer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [returns, selectedTab, searchQuery]);

    const handleUpdateStatus = (returnId, newStatus) => {
        setReturns(prev => prev.map(ret => ret.id === returnId ? { ...ret, status: newStatus } : ret));
        setActiveActionMenu(null);
        if (selectedReturn && selectedReturn.id === returnId) {
            setSelectedReturn(prev => ({ ...prev, status: newStatus }));
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'Pending': return 'bg-orange-100 text-orange-700';
            case 'In Inspection': return 'bg-blue-100 text-blue-700';
            case 'Approved': return 'bg-purple-100 text-purple-700';
            case 'Refunded': return 'bg-green-100 text-green-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

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
        <div className="space-y-8 pb-12 relative font-sans">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Returns & Refunds</h1>
                <p className="text-gray-500 mt-1">Manage product returns, inspections and customer refunds.</p>
            </div>

            {/* Warning Alert */}
            <div className="bg-orange-50 border border-orange-100/50 p-6 rounded-3xl flex items-start gap-4">
                <div className="p-2.5 bg-orange-100 rounded-2xl">
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
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all group">
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

            {/* Tabs & Search */}
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center border-b border-gray-200">
                <div className="flex gap-8 overflow-x-auto w-full md:w-auto scrollbar-hide">
                    {['All', 'Pending', 'In Inspection', 'Approved', 'Refunded', 'Rejected'].map((tab) => (
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
                            placeholder="Search by ID, Order or Customer..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-2xl text-xs outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        />
                    </div>
                    <button className="p-2.5 border border-gray-200 bg-white rounded-2xl hover:bg-gray-50 text-gray-600 transition-all cursor-pointer shadow-sm">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Returns List */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {filteredReturns.length > 0 ? (
                    filteredReturns.map((ret) => (
                        <div key={ret.id} className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                            <div className="p-6 md:p-8">
                                <div className="flex flex-col sm:flex-row gap-8">
                                    {/* Product Image */}
                                    <div className="relative group cursor-pointer" onClick={() => setSelectedReturn(ret)}>
                                        <div className="w-24 h-24 sm:w-36 sm:h-36 bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 flex-shrink-0">
                                            <img src={ret.image} alt={ret.item} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        </div>
                                        <div className="absolute inset-x-0 bottom-[-10px] flex justify-center opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                            <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/20 flex items-center gap-2">
                                                <Camera className="w-3.5 h-3.5 text-blue-600" />
                                                <span className="text-[10px] font-black text-gray-900">{ret.images?.length || 1} Photos</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Info Area */}
                                    <div className="flex-1 space-y-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1.5">
                                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em]">{ret.id}</span>
                                                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{ret.orderId}</span>
                                                </div>
                                                <h3 className="text-lg font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">{ret.item}</h3>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyles(ret.status)}`}>
                                                {ret.status}
                                            </span>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2.5 text-sm">
                                                <div className="w-7 h-7 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
                                                    <User className="w-3.5 h-3.5" />
                                                </div>
                                                <p className="text-gray-600 font-medium">Customer: <span className="text-gray-900 font-bold">{ret.customer}</span></p>
                                            </div>
                                            <div className="flex items-center gap-2.5 text-sm">
                                                <div className="w-7 h-7 bg-red-50 rounded-lg flex items-center justify-center text-red-500">
                                                    <RotateCcw className="w-3.5 h-3.5" />
                                                </div>
                                                <p className="text-gray-600 font-medium">Reason: <span className="text-red-600 font-black">{ret.reason}</span></p>
                                            </div>
                                        </div>

                                        <div className="pt-2 flex items-center justify-between border-t border-gray-50">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => setSelectedReturn(ret)}
                                                    className="text-[11px] font-black text-blue-600 hover:text-blue-700 hover:underline border-none bg-transparent cursor-pointer flex items-center gap-1"
                                                >
                                                    View Case <ArrowRight className="w-3 h-3" />
                                                </button>
                                                <button className="text-[11px] font-black text-gray-400 hover:text-gray-600 border-none bg-transparent cursor-pointer flex items-center gap-1">
                                                    <MessageSquare className="w-3 h-3" /> Chat
                                                </button>
                                            </div>

                                            <div className="relative action-menu-container">
                                                <button
                                                    onClick={() => setActiveActionMenu(activeActionMenu === ret.id ? null : ret.id)}
                                                    className={`p-2 rounded-xl transition-all cursor-pointer border border-gray-100 ${activeActionMenu === ret.id ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                                                >
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                                {activeActionMenu === ret.id && (
                                                    <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
                                                        <div className="p-2 space-y-1">
                                                            <button
                                                                onClick={() => { setSelectedReturn(ret); setActiveActionMenu(null); }}
                                                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all border-none bg-transparent cursor-pointer"
                                                            >
                                                                <Eye className="w-4 h-4 text-blue-500" /> Full Inspection
                                                            </button>
                                                            {ret.status === 'Pending' && (
                                                                <button
                                                                    onClick={() => handleUpdateStatus(ret.id, 'In Inspection')}
                                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all border-none bg-transparent cursor-pointer"
                                                                >
                                                                    <ClipboardCheck className="w-4 h-4 text-blue-400" /> Start Inspection
                                                                </button>
                                                            )}
                                                            {(ret.status === 'Pending' || ret.status === 'In Inspection') && (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleUpdateStatus(ret.id, 'Approved')}
                                                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all border-none bg-transparent cursor-pointer"
                                                                    >
                                                                        <CheckCircle2 className="w-4 h-4 text-green-500" /> Approve Return
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleUpdateStatus(ret.id, 'Rejected')}
                                                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-all border-none bg-transparent cursor-pointer"
                                                                    >
                                                                        <Ban className="w-4 h-4" /> Reject Case
                                                                    </button>
                                                                </>
                                                            )}
                                                            {ret.status === 'Approved' && (
                                                                <button
                                                                    onClick={() => handleUpdateStatus(ret.id, 'Refunded')}
                                                                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-700 hover:bg-green-50 rounded-lg transition-all border-none bg-transparent cursor-pointer font-bold"
                                                                >
                                                                    <DollarSign className="w-4 h-4" /> Issue Refund
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20 bg-white rounded-[40px] border border-gray-100 shadow-sm space-y-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                            <RotateCcw className="w-10 h-10 text-gray-200" />
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-gray-900">No {selectedTab !== 'All' ? selectedTab : ''} returns found</p>
                            <p className="text-gray-500 text-sm">There are no return requests in this category.</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Return Details Modal */}
            {selectedReturn && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-300">
                    <div
                        ref={modalRef}
                        className="bg-white w-full max-w-3xl rounded-[40px] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-12 duration-500"
                    >
                        {/* Modal Header */}
                        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-blue-600">
                                    <RotateCcw className="w-8 h-8" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h2 className="text-2xl font-black text-gray-900">Return Details</h2>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyles(selectedReturn.status)}`}>
                                            {selectedReturn.status}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">{selectedReturn.id} • Order {selectedReturn.orderId}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedReturn(null)}
                                className="p-3 bg-white shadow-sm border border-gray-100 rounded-2xl hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-all cursor-pointer"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-8 overflow-y-auto max-h-[75vh] space-y-10 scrollbar-hide">
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                                {/* Left Side: Product & Photos */}
                                <div className="lg:col-span-5 space-y-6">
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Returned Item</h4>
                                        <div className="p-4 bg-gray-50 rounded-[32px] border border-gray-100 space-y-4">
                                            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-inner border border-gray-100">
                                                <img src={selectedReturn.image} alt={selectedReturn.item} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-black text-gray-900">{selectedReturn.item}</p>
                                                <p className="text-blue-600 font-black text-lg">{selectedReturn.price}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Evidence Photos */}
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Customer Photos ({selectedReturn.images?.length || 1})</h4>
                                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                            {(selectedReturn.images || [selectedReturn.image]).map((img, i) => (
                                                <div key={i} className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all cursor-zoom-in shrink-0">
                                                    <img src={img} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side: Information */}
                                <div className="lg:col-span-7 space-y-8">
                                    {/* Reason Card */}
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Return Reason</h4>
                                        <div className="p-6 bg-red-50/40 border border-red-100/50 rounded-[32px] space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                                                    <RotateCcw className="w-4 h-4" />
                                                </div>
                                                <p className="text-red-700 font-black">{selectedReturn.reason}</p>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed italic font-medium">"{selectedReturn.description}"</p>
                                        </div>
                                    </div>

                                    {/* Customer & Order Cards */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100 space-y-3 font-medium">
                                            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</h5>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-900 font-bold">{selectedReturn.customer}</p>
                                                <p className="text-xs text-gray-500 truncate">{selectedReturn.email}</p>
                                            </div>
                                        </div>
                                        <div className="p-5 bg-gray-50 rounded-3xl border border-gray-100 space-y-3 font-medium">
                                            <h5 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Requested On</h5>
                                            <div className="space-y-1">
                                                <p className="text-sm text-gray-900 font-bold">{selectedReturn.date}</p>
                                                <p className="text-xs text-gray-500">10:45 AM (IST)</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order History link */}
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Quick Timeline</h4>
                                        <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                                            <div className="flex items-center gap-5 relative z-10">
                                                <div className="w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-sm flex items-center justify-center">
                                                    <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                                                </div>
                                                <p className="text-xs text-gray-600 font-bold">Return Requested <span className="text-gray-400 ml-2 font-medium">Feb 21, 10:45 AM</span></p>
                                            </div>
                                            <div className="flex items-center gap-5 relative z-10">
                                                <div className={`w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center ${selectedReturn.status !== 'Pending' ? 'bg-blue-500' : 'bg-gray-200'}`}>
                                                    <ClipboardCheck className={`w-2.5 h-2.5 text-white ${selectedReturn.status === 'Pending' ? 'hidden' : ''}`} />
                                                </div>
                                                <p className={`text-xs font-bold ${selectedReturn.status === 'Pending' ? 'text-gray-400' : 'text-gray-600'}`}>Inspection Complete <span className="text-gray-400 ml-2 font-medium">Feb 22, 02:30 PM</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex gap-4">
                            {['Pending', 'In Inspection'].includes(selectedReturn.status) ? (
                                <>
                                    <button
                                        onClick={() => handleUpdateStatus(selectedReturn.id, 'Approved')}
                                        className="flex-1 py-4 bg-gray-900 text-white rounded-2xl text-sm font-black hover:bg-black transition-all shadow-xl hover:shadow-black/20 flex items-center justify-center gap-2 border-none cursor-pointer"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-green-400" /> Approve Return
                                    </button>
                                    <button
                                        onClick={() => handleUpdateStatus(selectedReturn.id, 'Rejected')}
                                        className="flex-1 py-4 bg-white border border-gray-200 text-red-600 rounded-2xl text-sm font-black hover:bg-red-50 hover:border-red-200 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                                    >
                                        <Ban className="w-5 h-5" /> Reject Request
                                    </button>
                                </>
                            ) : selectedReturn.status === 'Approved' ? (
                                <button
                                    onClick={() => handleUpdateStatus(selectedReturn.id, 'Refunded')}
                                    className="flex-1 py-4 bg-green-600 text-white rounded-2xl text-sm font-black hover:bg-green-700 transition-all shadow-xl hover:shadow-green-600/20 flex items-center justify-center gap-2 border-none cursor-pointer"
                                >
                                    <DollarSign className="w-5 h-5" /> Issue Refund Now
                                </button>
                            ) : (
                                <div className="flex-1 text-center py-4 bg-gray-100 rounded-2xl text-gray-500 font-black text-sm uppercase tracking-widest">
                                    Case {selectedReturn.status}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReturnsHandling;

