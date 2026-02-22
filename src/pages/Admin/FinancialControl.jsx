import React, { useState } from 'react';
import {
    Wallet,
    ArrowUpRight,
    ArrowDownRight,
    Download,
    FileText,
    Calendar,
    ChevronRight,
    PieChart,
    TrendingUp,
    ShieldCheck,
    RefreshCcw,
    ExternalLink,
    History,
    Search,
    CreditCard,
    DollarSign,
    MoreHorizontal
} from 'lucide-react';

const FinancialControl = () => {
    const financialRecords = [
        { id: '#FIN-8821', type: 'Settlement', entity: 'ElectroNexus', amount: '₹12,45,290', date: 'Feb 22, 2026', status: 'Completed', fee: '₹1,24,529' },
        { id: '#REF-402', type: 'Refund', entity: 'Customer #9021', amount: '₹1,299', date: 'Feb 21, 2026', status: 'Processing', fee: '₹0' },
        { id: '#FIN-8820', type: 'Commission', entity: 'Network Fees', amount: '₹84,200', date: 'Feb 21, 2026', status: 'Credited', fee: '₹0' },
        { id: '#FIN-8819', type: 'Settlement', entity: 'Fashion Hub', amount: '₹4,12,000', date: 'Feb 20, 2026', status: 'Completed', fee: '₹41,200' },
    ];

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase mb-1">Fiscal <span className="text-indigo-600">Center</span></h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] ml-1">Economic Reconciliation & Reserve Management</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all border-none cursor-pointer flex items-center gap-2 shadow-sm">
                        Download Tax Report (FY26)
                    </button>
                    <button className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-slate-200 transition-all border-none cursor-pointer">
                        Process Batch Payouts
                    </button>
                </div>
            </div>

            {/* Financial Ledger Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 bg-white border border-slate-200 p-10 rounded-[40px] shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-50 blur-[100px] pointer-events-none"></div>
                    <div className="flex flex-col md:flex-row justify-between gap-10 relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Total Network Liquidity</h3>
                                <p className="text-5xl font-black text-slate-900 tracking-tighter italic">₹84.2<span className="text-indigo-600">M</span></p>
                                <div className="flex items-center gap-2 mt-4 text-emerald-600 text-xs font-black uppercase tracking-widest">
                                    <TrendingUp className="w-4 h-4" /> +12.4% From Previous Cycle
                                </div>
                            </div>
                            <div className="flex gap-10">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">In Reserve</p>
                                    <p className="text-2xl font-black text-slate-900 italic">₹12.5M</p>
                                </div>
                                <div className="w-px h-10 bg-slate-100"></div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Awaiting Settlement</p>
                                    <p className="text-2xl font-black text-slate-900 italic">₹6.8M</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 max-w-[300px] flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-slate-400">Settlement Progress</span>
                                    <span className="text-indigo-600">82%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full" style={{ width: '82%' }}></div>
                                </div>
                            </div>
                            <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl mt-10 shadow-sm">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Next Scheduled Payout</p>
                                <div className="flex items-center justify-between">
                                    <p className="text-lg font-black text-slate-900 tracking-tight uppercase italic">Feb 28, 2026</p>
                                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-slate-200 p-8 rounded-[40px] shadow-sm flex flex-col justify-between group hover:border-indigo-100 transition-all">
                    <div>
                        <div className="flex justify-between items-center mb-10">
                            <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-[24px]">
                                <RefreshCcw className="w-7 h-7 text-indigo-600 animate-spin-slow" />
                            </div>
                            <button className="p-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border-none cursor-pointer">
                                <ExternalLink className="w-4 h-4 text-slate-400" />
                            </button>
                        </div>
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-2">Pending Refunds</h3>
                        <p className="text-4xl font-black text-slate-900 tracking-tighter">124<span className="text-lg text-slate-400 not-italic ml-2 uppercase tracking-normal">Requests</span></p>
                        <p className="text-[11px] font-bold text-red-600 mt-2 italic">Requires Manual Validation</p>
                    </div>
                    <button className="w-full mt-10 py-5 bg-red-600 hover:bg-red-500 text-white font-black text-[10px] uppercase tracking-widest rounded-3xl shadow-lg shadow-red-100 transition-all border-none cursor-pointer">
                        Access Refund Vault
                    </button>
                </div>
            </div>

            {/* Transaction Ledger */}
            <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/50 mt-12">
                <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 bg-slate-50/30">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Financial <span className="text-indigo-600">Ledger</span></h2>
                    <div className="flex items-center gap-3 w-full md:w-auto text-[11px] font-black uppercase tracking-widest">
                        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm">
                            {['Today', 'Cycle', 'History'].map(tab => (
                                <button key={tab} className={`px-4 py-2 rounded-xl transition-all border-none cursor-pointer ${tab === 'Cycle' ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <button className="p-3 bg-slate-50 hover:bg-emerald-600 hover:text-white rounded-xl text-slate-400 transition-all border-none cursor-pointer shadow-sm">
                            <Download className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Transaction Matrix</th>
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Related Entity</th>
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Economic Flow</th>
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Commission Logic</th>
                                <th className="px-8 py-6 text-[11px] font-black text-slate-400 uppercase tracking-widest">Node Status</th>
                                <th className="px-8 py-6"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {financialRecords.map((rec, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-7">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-white rounded-2xl border border-slate-100 group-hover:border-indigo-100 transition-all shadow-sm">
                                                {rec.type === 'Refund' ? <History className="w-5 h-5 text-red-600" /> : <CreditCard className="w-5 h-5 text-indigo-600" />}
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{rec.id}</p>
                                                <p className="text-sm font-black text-slate-900 italic">{rec.type}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase">{rec.date}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-7">
                                        <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">{rec.entity}</p>
                                        <button className="text-[10px] font-black text-indigo-600 hover:underline border-none bg-transparent cursor-pointer">Trace Entity</button>
                                    </td>
                                    <td className="px-8 py-7">
                                        <p className={`text-lg font-black italic tracking-tight ${rec.type === 'Refund' ? 'text-red-600' : 'text-slate-900'}`}>
                                            {rec.type === 'Refund' ? '-' : ''}{rec.amount}
                                        </p>
                                    </td>
                                    <td className="px-8 py-7 text-[11px] font-black uppercase tracking-widest text-slate-400">
                                        {rec.fee !== '₹0' ? (
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-3 h-3 text-emerald-600" /> {rec.fee}
                                            </div>
                                        ) : '—'}
                                    </td>
                                    <td className="px-8 py-7">
                                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm
                                            ${rec.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' :
                                                rec.status === 'Processing' ? 'bg-orange-50 text-orange-600' :
                                                    'bg-indigo-50 text-indigo-600'}`}>
                                            {rec.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-7 text-right">
                                        <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-slate-600 rounded-xl transition-all border-none cursor-pointer">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FinancialControl;
