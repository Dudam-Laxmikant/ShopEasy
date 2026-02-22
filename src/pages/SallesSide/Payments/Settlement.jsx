import React from 'react';
import {
    DollarSign,
    Wallet,
    ArrowUpRight,
    Download,
    FileText,
    Calendar,
    ChevronDown,
    ArrowRight,
    PieChart,
    TrendingUp,
    ShieldCheck
} from 'lucide-react';

const Settlement = () => {
    const transactions = [
        { id: '#TX-4521', date: 'Feb 20, 2026', orderId: '#ORD-9018', amount: '₹1,999', commission: '₹199', payout: '₹1,800', status: 'Settled' },
        { id: '#TX-4520', date: 'Feb 19, 2026', orderId: '#ORD-9017', amount: '₹2,500', commission: '₹250', payout: '₹2,250', status: 'Settled' },
        { id: '#TX-4519', date: 'Feb 18, 2026', orderId: '#ORD-9016', amount: '₹4,299', commission: '₹430', payout: '₹3,869', status: 'Processing' },
        { id: '#TX-4518', date: 'Feb 17, 2026', orderId: '#ORD-9015', amount: '₹1,200', commission: '₹120', payout: '₹1,080', status: 'Processing' },
    ];

    return (
        <div className="space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Payments & Settlements</h1>
                <p className="text-gray-500 mt-1">Track your earnings, commission deductions and payout history.</p>
            </div>

            {/* Financial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-xl shadow-blue-900/10 text-white relative overflow-hidden group">
                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest text-blue-100">Wallet Balance</span>
                        </div>
                        <div>
                            <h2 className="text-4xl font-extrabold tracking-tight">₹45,680.00</h2>
                            <p className="text-sm text-blue-100 mt-2 flex items-center gap-1.5 font-medium">
                                <ShieldCheck className="w-4 h-4 text-green-400" /> Secure for next payout
                            </p>
                        </div>
                        <button className="w-full bg-white text-blue-600 font-bold py-4 rounded-2xl hover:bg-blue-50 transition-all border-none cursor-pointer text-sm shadow-lg shadow-black/10">
                            Request Immediate Payout
                        </button>
                    </div>
                    <DollarSign className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 group-hover:scale-110 transition-transform duration-700" />
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between group">
                    <div className="flex justify-between items-start">
                        <div className="space-y-4">
                            <div className="p-3 bg-purple-100 rounded-2xl w-fit">
                                <PieChart className="w-6 h-6 text-purple-600" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Total Earnings</h3>
                                <p className="text-2xl font-bold text-gray-900">₹2,89,450</p>
                            </div>
                        </div>
                        <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                            <TrendingUp className="w-3 h-3 mr-1" /> +12.4%
                        </span>
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Commission Paid</span>
                        <span className="text-sm font-bold text-red-600">₹28,945</span>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="space-y-4">
                        <div className="p-3 bg-green-100 rounded-2xl w-fit">
                            <Calendar className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none mb-2">Next Payout Cycle</h3>
                            <p className="text-2xl font-bold text-gray-900">Feb 28, 2026</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <div className="bg-gray-50 rounded-2xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-medium text-gray-700">Automatic Weekly</span>
                            </div>
                            <button className="text-xs font-bold text-blue-600 hover:underline border-none bg-transparent cursor-pointer">Edit</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mt-12">
                <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h2 className="text-xl font-bold text-gray-900">Settlement Reports</h2>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-3 px-6 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all border-none cursor-pointer">
                            <Download className="w-4 h-4" /> Export All
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Transaction ID</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Order Info</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Sale Amount</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Net Payout</th>
                                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                                <th className="px-8 py-5"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.map((tx, idx) => (
                                <tr key={idx} className="hover:bg-gray-50 transition-all group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white transition-colors">
                                                <FileText className="w-4 h-4 text-gray-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{tx.id}</p>
                                                <p className="text-xs text-gray-500">{tx.date}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-medium text-gray-900">{tx.orderId}</p>
                                        <button className="text-[10px] font-bold text-blue-600 hover:underline border-none bg-transparent cursor-pointer">View Details</button>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-sm font-bold text-gray-900">{tx.amount}</p>
                                        <p className="text-[10px] text-red-500 font-bold leading-none mt-1">Fee: {tx.commission}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <p className="text-lg font-extrabold text-blue-600">{tx.payout}</p>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                                            ${tx.status === 'Settled' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2.5 hover:bg-white border-transparent hover:border-gray-200 border rounded-xl transition-all cursor-pointer bg-transparent text-gray-400 hover:text-blue-600">
                                            <ArrowRight className="w-4 h-4" />
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

export default Settlement;
