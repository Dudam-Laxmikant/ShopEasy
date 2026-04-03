import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    Box,
    X
} from 'lucide-react';

const ProductModeration = () => {
    const [selectedTab, setSelectedTab] = useState('Queued');
    const [products, setProducts] = useState([
        { id: 'PRD-9021', name: 'Elite Carbon Fiber Case', seller: 'ElectroNexus', price: '₹2,499', date: '5 mins ago', risk: 'Low', status: 'Queued', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60' },
        { id: 'PRD-9020', name: 'Silk Blend Evening Gown', seller: 'Fashion Hub', price: '₹8,299', date: '15 mins ago', risk: 'Low', status: 'Queued', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60' },
        { id: 'PRD-9019', name: 'Health-Pro Multi-Vitamin', seller: 'VivaHealth', price: '₹1,200', date: '30 mins ago', risk: 'High', status: 'Flagged', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60' },
        { id: 'PRD-9018', name: 'Smart VR Headset X1', seller: 'FutureTech', price: '₹12,499', date: '1 hour ago', risk: 'Medium', status: 'Queued', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60' },
    ]);

    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [selectedViewProduct, setSelectedViewProduct] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');

    // Global Blur Effect for Sidebar & Header
    useEffect(() => {
        // Targets the main application container (usually #root in Vite/CRA)
        const rootElement = document.getElementById('root') || document.body.firstElementChild;
        
        if (isViewModalOpen || isRejectModalOpen) {
            document.body.style.overflow = 'hidden';
            if (rootElement) {
                rootElement.style.filter = 'blur(10px) brightness(0.9)';
                rootElement.style.transition = 'filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                rootElement.style.pointerEvents = 'none';
                rootElement.style.userSelect = 'none';
            }
        } else {
            document.body.style.overflow = 'unset';
            if (rootElement) {
                rootElement.style.filter = 'none';
                rootElement.style.pointerEvents = 'auto';
                rootElement.style.userSelect = 'auto';
            }
        }
        return () => {
            document.body.style.overflow = 'unset';
            if (rootElement) {
                rootElement.style.filter = 'none';
                rootElement.style.pointerEvents = 'auto';
                rootElement.style.userSelect = 'auto';
            }
        };
    }, [isViewModalOpen, isRejectModalOpen]);

    const handleApprove = (id) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, status: 'Approved' } : p));
        setIsViewModalOpen(false);
    };

    const openRejectModal = (id) => {
        setSelectedProductId(id);
        setIsRejectModalOpen(true);
        setIsViewModalOpen(false);
    };

    const openViewModal = (product) => {
        setSelectedViewProduct(product);
        setIsViewModalOpen(true);
    };

    const finalizeReject = () => {
        if (!rejectionReason.trim()) return alert("Please provide a reason for rejection.");

        setProducts(prev => prev.map(p => p.id === selectedProductId ? {
            ...p,
            status: 'Rejected',
            reason: rejectionReason
        } : p));

        setIsRejectModalOpen(false);
        setRejectionReason('');
        setSelectedProductId(null);
    };

    const filteredProducts = products.filter(p => p.status === selectedTab);

    const ViewModal = () => (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in slide-in-from-bottom-10 duration-500 max-h-[90vh]">
                <div className="md:w-1/2 bg-slate-100 overflow-hidden relative border-r border-slate-100">
                    <img src={selectedViewProduct.image} alt={selectedViewProduct.name} className="w-full h-full object-cover" />
                    <div className="absolute top-6 left-6 flex gap-3">
                        <span className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl ${selectedViewProduct.risk === 'High' ? 'bg-red-600' : 'bg-emerald-600'} text-white`}>Risk: {selectedViewProduct.risk}</span>
                        <span className="px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] bg-white text-indigo-600 shadow-xl">{selectedViewProduct.id}</span>
                    </div>
                </div>
                <div className="md:w-1/2 p-10 lg:p-14 overflow-y-auto custom-scrollbar flex flex-col justify-between">
                    <div className="space-y-8">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest italic animate-pulse">
                                    <Zap className="w-4 h-4" /> AI Policy Scanned
                                </div>
                                <h2 className="text-3xl font-black text-slate-900 italic uppercase italic tracking-tighter">{selectedViewProduct.name}</h2>
                            </div>
                            <button onClick={() => setIsViewModalOpen(false)} className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all border-none bg-transparent cursor-pointer">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-8 py-6 border-y border-slate-100">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Listed Price</p>
                                <p className="text-2xl font-black text-emerald-600">{selectedViewProduct.price}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Merchant</p>
                                <p className="text-xl font-black text-slate-900 flex items-center justify-end gap-2 uppercase italic tracking-tighter"><Store className="w-5 h-5 text-indigo-500" /> {selectedViewProduct.seller}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest italic border-l-4 border-indigo-500 pl-3">Audit Details</h4>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                This product was submitted {selectedViewProduct.date}. The automated risk assessment has flagged this asset as <span className="font-bold text-slate-900 italic">{selectedViewProduct.risk} Risk</span>. Please manually verify the images and descriptions for any policy violations.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-10">
                        <button
                            onClick={() => handleApprove(selectedViewProduct.id)}
                            className="flex-[2] py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem] text-sm font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-100 border-none cursor-pointer flex items-center justify-center gap-3"
                        >
                            <CheckCircle className="w-5 h-5" /> Approve Asset
                        </button>
                        <button
                            onClick={() => openRejectModal(selectedViewProduct.id)}
                            className="flex-1 py-5 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-[2rem] text-sm font-black uppercase tracking-widest transition-all border-none cursor-pointer flex items-center justify-center gap-3"
                        >
                            <Ban className="w-5 h-5" /> Reject
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const RejectModal = () => (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in slide-in-from-bottom-5 duration-500">
                <div className="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-red-100 rounded-2xl">
                            <Ban className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 uppercase italic">Confirm Rejection</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seller will be notified</p>
                        </div>
                    </div>
                    <button onClick={() => setIsRejectModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors border-none bg-transparent cursor-pointer">
                        <X className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
                <div className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Reason for Rejection</label>
                        <textarea
                            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent rounded-3xl focus:border-red-400 focus:bg-white font-bold transition-all outline-none min-h-[120px] resize-none"
                            placeholder="Enter details (e.g. Restricted items, low quality images, fake brand name...)"
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={() => { setIsRejectModalOpen(false); setRejectionReason(''); }}
                            className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border-none cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={finalizeReject}
                            className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-xl shadow-red-200 border-none cursor-pointer"
                        >
                            Confirm Reject
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-10 pb-20 relative">
            {isViewModalOpen && selectedViewProduct && createPortal(<ViewModal />, document.body)}
            {isRejectModalOpen && createPortal(<RejectModal />, document.body)}

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

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => (
                            <div key={item.id} className="bg-white border border-slate-200 rounded-3xl overflow-hidden group hover:border-indigo-100 transition-all duration-500 shadow-sm hover:shadow-md animate-in fade-in zoom-in duration-300">
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
                                        <button
                                            onClick={() => openViewModal(item)}
                                            className="p-2.5 bg-indigo-600 text-white rounded-xl shadow-xl shadow-indigo-100 hover:bg-indigo-500 transition-all border-none cursor-pointer"
                                        >
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
                                        {item.status === 'Rejected' && item.reason && (
                                            <div className="bg-red-50 p-2 rounded-lg border border-red-100 mt-2">
                                                <p className="text-[10px] text-red-600 font-black uppercase tracking-tighter">Rejection Reason:</p>
                                                <p className="text-[11px] text-red-500 font-medium leading-tight mt-1">{item.reason}</p>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center pt-1">
                                            <span className="text-emerald-600 font-black text-lg">{item.price}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">{item.date}</span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-2 flex items-center gap-2">
                                        {item.status !== 'Approved' && (
                                            <button
                                                onClick={() => handleApprove(item.id)}
                                                className="flex-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-600 hover:text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-none cursor-pointer flex items-center justify-center gap-2"
                                            >
                                                <CheckCircle className="w-4 h-4" /> Approve
                                            </button>
                                        )}
                                        {item.status !== 'Rejected' && (
                                            <button
                                                onClick={() => openRejectModal(item.id)}
                                                className="flex-1 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-none cursor-pointer flex items-center justify-center gap-2"
                                            >
                                                <Ban className="w-4 h-4" /> Reject
                                            </button>
                                        )}
                                        {(item.status === 'Approved' || item.status === 'Rejected') && (
                                            <button
                                                onClick={() => setProducts(prev => prev.map(p => p.id === item.id ? { ...p, status: 'Queued', reason: null } : p))}
                                                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-none cursor-pointer flex items-center justify-center gap-2"
                                            >
                                                Move to Queue
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400 gap-4">
                            <Box className="w-16 h-16 opacity-20" />
                            <p className="font-bold uppercase tracking-widest text-xs italic">No {selectedTab} assets found in current audit cycle</p>
                        </div>
                    )}
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
