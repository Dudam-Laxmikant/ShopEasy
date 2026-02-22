import React, { useState } from 'react';
import {
    Cpu,
    ShieldCheck,
    Database,
    Globe,
    Key,
    Zap,
    Lock,
    Smartphone,
    CreditCard,
    Truck,
    Activity,
    Terminal,
    Settings,
    Save,
    RefreshCw,
    ExternalLink,
    Search,
    ChevronDown,
    Wifi
} from 'lucide-react';

const SystemManagement = () => {
    const [isSaving, setIsSaving] = useState(false);

    const toggleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase mb-1">Cortex <span className="text-indigo-600">Core</span></h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] ml-1">Infrastructure Configuration & Security Protocols</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-red-50 text-red-600 border border-red-100 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all border-none cursor-pointer flex items-center gap-2 shadow-sm">
                        <Lock className="w-4 h-4" /> Lockdown Node
                    </button>
                    <button
                        onClick={toggleSave}
                        disabled={isSaving}
                        className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-slate-200 transition-all border-none cursor-pointer flex items-center gap-2 min-w-[180px] justify-center"
                    >
                        {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSaving ? 'Syncing...' : 'Deploy Changes'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* Visual Status Console */}
                <div className="xl:col-span-2 space-y-10">
                    {/* Payment Gateways */}
                    <div className="bg-white border border-slate-200 rounded-[40px] p-10 shadow-sm space-y-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 blur-3xl rounded-full translate-x-32 -translate-y-32"></div>
                        <div className="flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-3xl">
                                    <CreditCard className="w-8 h-8 text-indigo-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Payment <span className="text-indigo-600">Nodes</span></h2>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gateway Reconciliation & API Management</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm">
                                <Activity className="w-4 h-4 text-emerald-600" />
                                <span className="text-[10px] font-black text-emerald-600 uppercase">Latency: 42ms</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                            {[
                                { name: 'Razorpay Global', status: 'Live', mode: 'Production', logo: 'RZ' },
                                { name: 'Stripe Network', status: 'Standby', mode: 'Test Mode', logo: 'ST' },
                                { name: 'PayPal Hub', status: 'Live', mode: 'Production', logo: 'PP' },
                                { name: 'Crypto Liquidity', status: 'Offline', mode: 'Dev Mode', logo: 'CX' },
                            ].map((gw, idx) => (
                                <div key={idx} className="p-6 bg-slate-50 border border-slate-100 rounded-3xl hover:border-indigo-100 transition-all group flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center font-black text-indigo-600 border border-slate-200 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                            {gw.logo}
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black text-slate-900">{gw.name}</h4>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{gw.mode}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-2">
                                        <div className={`w-2.5 h-2.5 rounded-full ${gw.status === 'Live' ? 'bg-emerald-500 shadow-sm shadow-emerald-200' : gw.status === 'Offline' ? 'bg-red-500' : 'bg-orange-500 animate-pulse'}`}></div>
                                        <button className="text-[10px] font-black text-indigo-600 hover:text-indigo-400 border-none bg-transparent cursor-pointer uppercase tracking-widest">Config</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping Partners */}
                    <div className="bg-white border border-slate-200 rounded-[40px] p-10 shadow-sm space-y-10">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-blue-50 border border-blue-100 rounded-3xl">
                                    <Truck className="w-8 h-8 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Logistic <span className="text-blue-600">Entities</span></h2>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Carrier Integration & Tracking Hub</p>
                                </div>
                            </div>
                            <button className="px-6 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest transition-all cursor-pointer shadow-sm">Bridge New Partner</button>
                        </div>

                        <div className="space-y-4">
                            {[
                                { name: 'Delhivery Network', api: 'REST API v4.2', coverage: 'Domestic (98%)', status: 'Integrated' },
                                { name: 'BlueDart Prime', api: 'SOAP Protocol', coverage: 'Global (Express)', status: 'Integrated' },
                                { name: 'Ecom Express', api: 'Webhooks v1', coverage: 'Regional', status: 'Maintenance' },
                            ].map((ship, idx) => (
                                <div key={idx} className="p-5 flex items-center justify-between hover:bg-slate-50 rounded-3xl transition-colors border border-transparent hover:border-slate-100 group">
                                    <div className="flex items-center gap-8">
                                        <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm"></div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{ship.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{ship.api}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-12">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{ship.coverage}</p>
                                        <span className={`px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-black uppercase tracking-widest ${ship.status === 'Integrated' ? 'text-emerald-600' : 'text-orange-600'}`}>{ship.status}</span>
                                        <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors border-none bg-transparent cursor-pointer">
                                            <Settings className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Security & Backup */}
                <div className="space-y-10">
                    <div className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-indigo-600 shadow-sm animate-pulse"></div>
                        <h3 className="text-lg font-black text-slate-900 italic uppercase tracking-tight mb-8">Sentinel <span className="text-indigo-600">Security</span></h3>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center shadow-sm">
                                    <ShieldCheck className="w-8 h-8 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">State: Maximum</p>
                                    <p className="text-lg font-black text-slate-900 italic uppercase">Vault Shield Active</p>
                                </div>
                            </div>

                            <div className="space-y-6 pt-4">
                                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                                    <span className="text-slate-400">Threat Monitoring</span>
                                    <span className="text-emerald-600 font-bold">No Incidents</span>
                                </div>
                                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                                    <span className="text-slate-400">SSL Certificate</span>
                                    <span className="text-blue-600 italic font-bold">284 Days Left</span>
                                </div>
                                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                                    <span className="text-slate-400">Two-Factor Force</span>
                                    <span className="px-2 py-0.5 bg-emerald-600 text-[9px] text-white rounded italic shadow-sm">Enabled For All</span>
                                </div>
                            </div>

                            <button className="w-full mt-6 py-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] transition-all cursor-pointer shadow-sm">
                                Security Audit History
                            </button>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm">
                                <Database className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-lg font-black text-slate-900 italic uppercase tracking-tight">Data <span className="text-indigo-600">Archives</span></h3>
                        </div>

                        <div className="space-y-6">
                            <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl space-y-4 shadow-sm">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Global Backup</p>
                                        <p className="text-sm font-black text-slate-900 uppercase italic">Feb 22, 02:00 AM</p>
                                    </div>
                                    <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg shadow-sm">
                                        <Wifi className="w-4 h-4" />
                                    </div>
                                </div>
                                <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border-none cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-indigo-100">
                                    Trigger Manual Snapshot
                                </button>
                            </div>

                            <div className="flex justify-between items-center px-2">
                                <div className="flex flex-col">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Disk Usage (Cloud)</p>
                                    <p className="text-lg font-black text-slate-900 italic">4.2 TB <span className="text-[9px] text-slate-400 not-italic">/ 10 TB</span></p>
                                </div>
                                <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-indigo-600 flex items-center justify-center text-[9px] font-black text-slate-900 shadow-sm">42%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SystemManagement;
