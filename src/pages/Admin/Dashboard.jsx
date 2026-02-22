import React from 'react';
import {
    DollarSign,
    ShoppingCart,
    Users,
    Store,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Globe,
    Zap,
    PieChart,
    ChevronRight,
    MoreHorizontal,
    Box
} from 'lucide-react';

const AdminStatCard = ({ title, value, change, isPositive, icon: Icon, color, trend }) => (
    <div className="bg-white border border-slate-200 p-8 rounded-[32px] relative overflow-hidden group hover:border-indigo-100 transition-all duration-500 shadow-sm hover:shadow-md">
        <div className={`absolute top-0 right-0 w-32 h-32 ${color} opacity-[0.03] blur-3xl group-hover:opacity-[0.08] transition-opacity`}></div>
        <div className="flex justify-between items-start relative z-10 mb-6">
            <div className={`p-4 rounded-2xl ${color} bg-opacity-10`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            <div className={`flex items-center px-3 py-1.5 rounded-xl text-[11px] font-black tracking-wider uppercase
                ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {change}
            </div>
        </div>
        <div className="space-y-1 relative z-10">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h3>
            <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black text-slate-900 tracking-tighter">{value}</p>
            </div>
            <div className="pt-4 flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: trend }}></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{trend}</span>
            </div>
        </div>
    </div>
);

const AdminDashboard = () => {
    const mainStats = [
        { title: 'Gross Revenue', value: '₹12.8M', change: '24.5%', isPositive: true, icon: DollarSign, color: 'bg-indigo-500', trend: '82%' },
        { title: 'Global Orders', value: '84,290', change: '18.2%', isPositive: true, icon: ShoppingCart, color: 'bg-blue-500', trend: '65%' },
        { title: 'Total Customers', value: '1.2M', change: '12.4%', isPositive: true, icon: Users, color: 'bg-emerald-500', trend: '74%' },
        { title: 'Active Sellers', value: '12,450', change: '2.1%', isPositive: false, icon: Store, color: 'bg-purple-500', trend: '48%' },
    ];

    const liveMetrics = [
        { name: 'Server Load', value: '24%', status: 'Healthy', color: 'text-emerald-600' },
        { name: 'Active Sessions', value: '45.2K', status: 'Peaking', color: 'text-blue-600' },
        { name: 'Gateway Latency', value: '12ms', status: 'Optimal', color: 'text-indigo-600' },
    ];

    const topSellingSellers = [
        { name: 'Fashion Hub Inc.', revenue: '₹4.2M', sales: 12450, growth: '+15%', logo: 'FH' },
        { name: 'ElectroNexus', revenue: '₹3.8M', sales: 8200, growth: '+12%', logo: 'EN' },
        { name: 'PureHome Décor', revenue: '₹1.9M', sales: 4500, growth: '-2%', logo: 'PH' },
    ];

    return (
        <div className="space-y-10 pb-20">
            {/* Header Content */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center border border-indigo-100">
                            <Activity className="w-5 h-5 text-indigo-600" />
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase">Network <span className="text-indigo-600">Summary</span></h1>
                    </div>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] ml-1">Real-time Node Performance & Commerce Analytics</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all border-none cursor-pointer shadow-sm">
                        Export Genesis Report
                    </button>
                    <button className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-lg shadow-slate-200 transition-all border-none cursor-pointer">
                        Global Settings
                    </button>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                {mainStats.map((stat, idx) => (
                    <AdminStatCard key={idx} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                {/* Visual Analytics Placeholder */}
                <div className="xl:col-span-2 space-y-8">
                    <div className="bg-white border border-slate-200 rounded-[40px] p-10 relative overflow-hidden min-h-[500px] flex flex-col shadow-sm">
                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic mb-1">Commerce <span className="text-indigo-600">Flux</span></h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue Flow over 24-Hour Cycle</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-6 px-6 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase">Gross</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                                        <span className="text-[10px] font-black text-slate-500 uppercase">Net</span>
                                    </div>
                                </div>
                                <button className="p-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 transition-all border-none cursor-pointer">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Chart Area Graphic */}
                        <div className="flex-1 flex items-end justify-between gap-4 py-6">
                            {[45, 62, 54, 85, 92, 70, 65, 80, 55, 60, 48, 75].map((val, idx) => (
                                <div key={idx} className="flex-1 group relative">
                                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-indigo-600 text-[10px] font-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {val}%
                                    </div>
                                    <div
                                        className="w-full bg-gradient-to-t from-indigo-50 via-slate-50 to-transparent rounded-t-xl group-hover:from-indigo-100 transition-all duration-700"
                                        style={{ height: `${val}%` }}
                                    >
                                        <div className="w-full h-1 bg-indigo-500 rounded-full group-hover:h-2 transition-all"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-slate-100 flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            <span>04:00 AM</span>
                            <span>08:00 AM</span>
                            <span>12:00 PM</span>
                            <span>04:00 PM</span>
                            <span>08:00 PM</span>
                            <span>12:00 AM</span>
                        </div>
                    </div>

                    {/* Pending Actions */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white border border-slate-200 p-8 rounded-[32px] shadow-sm group hover:border-orange-100 transition-all">
                            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-3">
                                <div className="p-2 bg-orange-50 rounded-xl">
                                    <Box className="w-5 h-5 text-orange-600" />
                                </div>
                                <span className="uppercase italic tracking-tight">Rapid <span className="text-orange-600">Moderation</span></span>
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group-hover:border-slate-200 transition-all">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">45 New Products</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Awaiting Identity Verification</p>
                                    </div>
                                    <button className="px-4 py-2 bg-indigo-600 text-[10px] font-black text-white rounded-xl uppercase tracking-widest border-none cursor-pointer hover:bg-indigo-500 transition-all">Scan</button>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center group-hover:border-slate-200 transition-all">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">12 Seller Permits</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">High-Risk Business Models</p>
                                    </div>
                                    <button className="px-4 py-2 bg-slate-200 text-[10px] font-black text-slate-600 rounded-xl uppercase tracking-widest border-none cursor-pointer hover:bg-slate-300 transition-all">Review</button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8">
                                <Zap className="w-12 h-12 text-indigo-500/10 animate-bounce" />
                            </div>
                            <h3 className="text-lg font-black text-slate-900 mb-4 uppercase italic tracking-tight">System <span className="text-indigo-600">Vitals</span></h3>
                            <div className="space-y-6 mt-8">
                                {liveMetrics.map((mt, idx) => (
                                    <div key={idx} className="flex flex-col gap-2">
                                        <div className="flex justify-between items-end">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{mt.name}</span>
                                            <span className={`text-[11px] font-black uppercase ${mt.color}`}>{mt.status}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-600 rounded-full" style={{ width: mt.value.includes('.') ? '65%' : mt.value }}></div>
                                            </div>
                                            <span className="text-sm font-black text-slate-900">{mt.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side Panel: Top Performers & Activity */}
                <div className="space-y-10">
                    <div className="bg-white border border-slate-200 rounded-[40px] p-8 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase italic">Elite <span className="text-indigo-600">Sellers</span></h2>
                            <PieChart className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="space-y-6">
                            {topSellingSellers.map((s, idx) => (
                                <div key={idx} className="p-4 bg-slate-50 rounded-3xl border border-slate-100 hover:border-indigo-100 transition-all group flex items-center gap-4">
                                    <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-indigo-600 font-black text-lg group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                                        {s.logo}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="text-sm font-black text-slate-900">{s.name}</h4>
                                            <span className={`text-[10px] font-black ${s.growth.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>{s.growth}</span>
                                        </div>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{s.sales.toLocaleString()} Sales</p>
                                        <p className="text-lg font-black text-slate-900 tracking-tight mt-1">{s.revenue}</p>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-slate-300" />
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl transition-all border-none cursor-pointer">
                            Browse Global Directory
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-[40px] shadow-xl relative overflow-hidden group">
                        <div className="relative z-10 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                                    <Globe className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-sm font-black text-white uppercase tracking-widest">Global Scale</h3>
                            </div>
                            <p className="text-indigo-100 text-sm font-medium leading-relaxed">
                                You are managing nodes across 12 countries. Current uptime is 99.98% for all commerce gateways.
                            </p>
                            <div className="pt-2">
                                <button className="bg-white text-indigo-600 font-black px-6 py-3 rounded-2xl text-[10px] uppercase tracking-widest hover:shadow-xl transition-all border-none cursor-pointer">
                                    Network Topology
                                </button>
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
