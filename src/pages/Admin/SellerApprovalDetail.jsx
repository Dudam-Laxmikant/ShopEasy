import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, 
    Shield, 
    Check, 
    X, 
    Mail, 
    Phone, 
    MapPin, 
    FileText, 
    Clock,
    Eye,
    Download,
    Lock,
    Building2,
    Calendar,
    Globe,
    Hash
} from 'lucide-react';

const SellerApprovalDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [seller, setSeller] = useState(null);
    const [activeDoc, setActiveDoc] = useState('pan');

    // Fetch seller data (Matching your DB Columns exactly)
    useEffect(() => {
        // Mock data based on your DB screenshot
        setSeller({
            seller_id: id || "SLR-18116",
            legal_company_name: "Rahul Electronics",
            store_display_name: "Rahul Gadgets",
            work_email: "rr@gmail.com",
            phone_number: "7418529637",
            gstin_number: "22AAAAA0000A1Z5",
            pan_number: "ABCDE1234F",
            address: "123, Electronic City, Phase 1",
            country: "India",
            state: "Karnataka",
            city: "Bangalore",
            pincode: "560100",
            aadhar_number: "123456789012",
            pan_imge: "https://images.unsplash.com/photo-1621252179027-94459d278660?w=800",
            aadhar_img: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=800",
            status: "pending"
        });
    }, [id]);

    if (!seller) return <div className="h-screen bg-slate-50 flex items-center justify-center font-bold text-slate-400">Loading Intelligence Path...</div>;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Main Content Area */}
            <div className="flex-1 p-6 max-w-[1440px] mx-auto w-full space-y-6">
                
                {/* Back Navigation Bar (Internal) */}
                <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-slate-200 mb-2">
                    <div className="flex items-center gap-4 text-left">
                        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center bg-slate-50 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 rounded-xl transition-all border border-slate-100 cursor-pointer">
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">Authentication Portal</p>
                            <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight mt-1 italic">Reviewing Seller: <span className="text-indigo-600">{seller.seller_id}</span></h2>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-amber-100 flex items-center gap-2 italic">
                            <Clock className="w-3 h-3" /> Status: Pending
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Side: DB Fields (Col-5) */}
                    <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                        {/* Company & Contact Profile */}
                        <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 p-8 relative overflow-hidden group">
                            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-100">
                                <Building2 className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase leading-tight">{seller.legal_company_name}</h2>
                            <p className="text-[11px] font-bold text-indigo-500 mt-1 uppercase tracking-tight italic">Store: {seller.store_display_name}</p>
                            
                            <div className="grid grid-cols-2 gap-6 mt-10">
                                <InfoBlock icon={Mail} label="work_email" value={seller.work_email} />
                                <InfoBlock icon={Phone} label="phone_number" value={seller.phone_number} />
                                <InfoBlock icon={Hash} label="seller_id" value={seller.seller_id} />
                                <InfoBlock icon={Globe} label="country" value={seller.country} />
                            </div>
                        </div>

                        {/* Legal & Fiscal Data (DB Based) */}
                        <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 p-8">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2 italic">
                                <Lock className="w-3.5 h-3.5" /> Database Authentication
                            </h3>
                            <div className="space-y-3">
                                <DataRow label="gstin_number" value={seller.gstin_number} />
                                <DataRow label="pan_number" value={seller.pan_number} />
                                <DataRow label="aadhar_number" value={seller.aadhar_number} />
                                
                                <div className="mt-6 space-y-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                                    <div className="grid grid-cols-2 gap-4">
                                        <MiniBlock label="state" value={seller.state} />
                                        <MiniBlock label="city" value={seller.city} />
                                        <MiniBlock label="pincode" value={seller.pincode} />
                                        <MiniBlock label="country" value={seller.country} />
                                    </div>
                                    <div className="pt-2">
                                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">address</p>
                                        <p className="text-[11px] font-bold text-slate-700 leading-snug">{seller.address}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Document Visualizer (Col-7/8) */}
                    <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-6">
                        <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 p-4 flex-1 flex flex-col min-h-[550px]">
                            {/* Tab Selectors for DB Image Columns */}
                            <div className="flex gap-2 p-1.5 bg-slate-50 rounded-[22px] mb-4">
                                <TabBtn active={activeDoc === 'pan'} onClick={() => setActiveDoc('pan')} label="pan_imge" icon={FileText} />
                                <TabBtn active={activeDoc === 'aadhar'} onClick={() => setActiveDoc('aadhar')} label="aadhar_img" icon={Shield} />
                            </div>

                            {/* Viewport for images */}
                            <div className="flex-1 bg-slate-900 rounded-[28px] overflow-hidden relative group">
                                <img 
                                    src={activeDoc === 'pan' ? seller.pan_imge : seller.aadhar_img} 
                                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-all duration-700"
                                    alt="DB Image Column"
                                />
                                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-lg border border-white/10">
                                    <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse"></div>
                                    <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">{activeDoc === 'pan' ? 'pan_imge' : 'aadhar_img'} - RECORD</span>
                                </div>
                            </div>

                            {/* Action Control Bar */}
                            <div className="mt-4 p-5 bg-indigo-600 rounded-[28px] shadow-2xl shadow-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4 text-white">
                                    <div className="w-10 h-10 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center border border-white/20">
                                        <Shield className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-black uppercase leading-none opacity-80">Manual Override Active</p>
                                        <p className="text-[12px] font-bold uppercase tracking-tight mt-1 italic">Verify & Commit to Core DB</p>
                                    </div>
                                </div>

                                <div className="flex gap-3 w-full sm:w-auto">
                                    <button onClick={() => navigate(-1)} className="flex-1 sm:flex-none px-6 py-4 bg-white/10 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest border border-white/20 hover:bg-white/20 transition-all cursor-pointer">Discard</button>
                                    <button className="flex-1 sm:flex-none px-8 py-4 bg-rose-500 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest border-none hover:bg-rose-600 transition-all cursor-pointer shadow-lg shadow-rose-900/20">Deny Access</button>
                                    <button className="flex-1 sm:flex-none px-12 py-4 bg-white text-indigo-600 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] border-none hover:bg-slate-50 transition-all cursor-pointer italic text-center shadow-lg">Approve Seller</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-components for DB Fields
const InfoBlock = ({ icon: Icon, label, value }) => (
    <div className="text-left">
        <div className="flex items-center gap-2 mb-1.5">
            <Icon className="w-3.5 h-3.5 text-indigo-500" />
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">{label}</p>
        </div>
        <p className="text-xs font-black text-slate-800 truncate tracking-tight">{value}</p>
    </div>
);

const DataRow = ({ label, value }) => (
    <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-tight">{label}</p>
        <code className="text-[13px] font-black text-slate-900 tracking-tight italic">{value}</code>
    </div>
);

const MiniBlock = ({ label, value }) => (
    <div className="text-left max-w-full">
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-[11px] font-bold text-slate-800 truncate italic">{value}</p>
    </div>
);

const TabBtn = ({ active, onClick, label, icon: Icon }) => (
    <button 
        onClick={onClick}
        className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[18px] text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${active ? 'bg-white shadow-xl text-indigo-600' : 'text-slate-400 hover:text-slate-600'}`}
    >
        <Icon className="w-4 h-4" />
        {label}
    </button>
);

export default SellerApprovalDetail;
