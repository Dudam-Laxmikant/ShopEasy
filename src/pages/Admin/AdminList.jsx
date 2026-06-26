import React, { useState } from 'react';
import {
    ShieldCheck,
    Mail,
    Hash,
    Users,
    Key,
    MoreVertical,
    UserCircle2,
    UserPlus,
    Lock,
    AtSign,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    ArrowLeft,
    Activity,
    Shield,
    Zap,
    Sparkles,
    Globe,
    ShoppingCart
} from 'lucide-react';

const AdminList = () => {
    // viewState: 'list' or 'add'
    const [viewState, setViewState] = useState('list');
    const [roleFilter, setRoleFilter] = useState('all');
    const [subRoleFilter, setSubRoleFilter] = useState('all');
    
    // In-memory local state of sub-admin and main admin nodes
    const [admins, setAdmins] = useState([
        { id: 'ADM-101', name: 'Admin Alpha', email: 'alpha@shopeasy.com', members: 42, role: 'main', subRole: 'all', permission: 'Full System Access', cluster: 'Primary Cluster' },
        { id: 'ADM-102', name: 'Admin Beta', email: 'beta@shopeasy.com', members: 12, role: 'subadmin', subRole: 'sellers', permission: 'Sellers Request Management', cluster: 'Regional Office' },
        { id: 'ADM-103', name: 'Admin Gamma', email: 'gamma@shopeasy.com', members: 8, role: 'subadmin', subRole: 'manager', permission: 'General Manager', cluster: 'Logistics Support' },
        { id: 'ADM-104', name: 'Admin Delta', email: 'delta@shopeasy.com', members: 24, role: 'subadmin', subRole: 'customer', permission: 'Customer Care Desk', cluster: 'Security Ops' },
        { id: 'ADM-105', name: 'Admin Epsilon', email: 'epsilon@shopeasy.com', members: 5, role: 'subadmin', subRole: 'products', permission: 'Product Verification', cluster: 'Regional Office' },
        { id: 'ADM-106', name: 'Admin Zeta', email: 'zeta@shopeasy.com', members: 15, role: 'subadmin', subRole: 'orders', permission: 'Order Controller', cluster: 'Warehouse Node B' },
        { id: 'ADM-107', name: 'Admin Eta', email: 'eta@shopeasy.com', members: 9, role: 'subadmin', subRole: 'security', permission: 'Security Officer', cluster: 'Data Center Alpha' },
    ]);

    // Form inputs state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [subRole, setSubRole] = useState('sellers');
    const [cluster, setCluster] = useState('Regional Office');

    const handleAddAdmin = (e) => {
        e.preventDefault();
        
        // Generate random ADM ID
        const randomId = `ADM-${Math.floor(100 + Math.random() * 900)}`;
        
        const newAdmin = {
            id: randomId,
            name: name,
            email: email,
            role: 'subadmin',
            subRole: subRole,
            members: 0,
            permission: subRole.charAt(0).toUpperCase() + subRole.slice(1) + ' Privilege',
            cluster: cluster
        };

        // Update state in memory
        setAdmins(prev => [newAdmin, ...prev]);

        // Reset fields
        setName('');
        setEmail('');
        setPassword('');
        setSubRole('sellers');
        setCluster('Regional Office');

        // Toggle back to list
        setViewState('list');
        alert(`Admin ${name} deployed successfully as sub-role: ${subRole}!`);
    };

    const handleRoleFilterChange = (role) => {
        setRoleFilter(role);
        setSubRoleFilter('all');
    };

    const filteredAdmins = admins.filter(a => {
        if (roleFilter === 'all') return true;
        if (roleFilter === 'super') return a.role === 'main';
        if (roleFilter === 'subadmin') {
            if (a.role !== 'subadmin') return false;
            if (subRoleFilter === 'all') return true;
            return a.subRole === subRoleFilter;
        }
        return true;
    });

    return (
        <div className="space-y-8 pb-20 font-sans text-slate-800">
            {/* Tab Content 1: Node Governance Dashboard */}
            {viewState === 'list' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                    {/* Top Metric Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1: Total Managed Nodes */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col justify-between min-h-[160px] text-left group hover:scale-[1.01] hover:shadow-2xl transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Managed Nodes</span>
                                <div className="p-2.5 bg-slate-800/80 border border-slate-700/55 rounded-2xl text-indigo-400">
                                    <Shield className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <span className="text-5xl font-black text-white leading-none tracking-tight">{admins.length + 1277}</span>
                                <p className="text-[10px] font-bold text-slate-400 mt-2 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                    Active authority nodes synchronized
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Active Admin Sessions (Highlighted Yellow) */}
                        <div className="relative overflow-hidden bg-gradient-to-br from-[#FCC618] to-[#E2B10E] border border-amber-400/30 p-6 rounded-3xl shadow-xl shadow-amber-500/15 flex flex-col justify-between min-h-[160px] text-left group hover:scale-[1.01] hover:shadow-2xl transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-all"></div>
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-black text-slate-950/70 uppercase tracking-widest">Active Admin Sessions</span>
                                <div className="p-2.5 bg-slate-950/10 rounded-2xl text-slate-950/80">
                                    <Zap className="w-5 h-5 animate-pulse" />
                                </div>
                            </div>
                            <div>
                                <span className="text-5xl font-black text-slate-950 leading-none tracking-tight">82</span>
                                <p className="text-[10px] font-bold text-slate-950/65 mt-2 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-slate-950/85"></span>
                                    Across global endpoints
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Network Health */}
                        <div className="relative overflow-hidden bg-white border border-slate-200 p-6 rounded-3xl shadow-lg flex flex-col justify-between min-h-[160px] text-left group hover:scale-[1.01] hover:shadow-xl transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all"></div>
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Network Health</span>
                                <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-600">
                                    <Activity className="w-5 h-5" />
                                </div>
                            </div>
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-slate-900 leading-none tracking-tight">99.8%</span>
                                    <span className="text-[10px] font-black text-emerald-600 flex items-center gap-0.5">
                                        ↑ 0.2%
                                    </span>
                                </div>
                                <p className="text-[10px] font-bold text-slate-400 mt-2 flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                    All subsystems fully operational
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Node Governance Card */}
                    <div className="bg-white border border-slate-200/80 rounded-[32px] overflow-hidden shadow-xl shadow-slate-100/40 p-6 md:p-8 space-y-6">
                        {/* Toolbar: Governance Title, Filters and Add Button */}
                        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
                            <div className="text-left">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">Node Governance</h3>
                                    <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-[9px] font-black uppercase text-slate-500 tracking-wider">
                                        {filteredAdmins.length} active
                                    </span>
                                </div>
                                <p className="text-xs font-semibold text-slate-400 mt-1.5">Comprehensive list of administrative hierarchies.</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 items-center w-full xl:w-auto">
                                {/* Role Pill Selector */}
                                <div className="flex bg-slate-100/80 border border-slate-200/20 p-1 rounded-2xl w-full sm:w-auto shadow-inner">
                                    {[
                                        { id: 'all', label: 'ALL' },
                                        { id: 'super', label: 'SUPER' },
                                        { id: 'subadmin', label: 'SUBADMIN' }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => handleRoleFilterChange(tab.id)}
                                            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-none cursor-pointer
                                                ${roleFilter === tab.id 
                                                    ? 'bg-slate-950 text-[#FCC618] shadow-md shadow-slate-950/15' 
                                                    : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200/50'}`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Add Admin Button */}
                                <button
                                    onClick={() => setViewState('add')}
                                    className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border-none cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 hover:scale-[1.01]"
                                >
                                    <UserPlus className="w-3.5 h-3.5" />
                                    Add Admin
                                </button>
                            </div>
                        </div>

                        {/* Sub-Admin Custom Sub-Role Filter Tabs (only shows up when SUBADMIN filter is active) */}
                        {roleFilter === 'subadmin' && (
                            <div className="flex flex-wrap gap-2 bg-slate-50/50 p-2 rounded-2xl border border-slate-200/60 animate-in fade-in slide-in-from-top-2 duration-300">
                                {[
                                    { id: 'all', label: 'All Sub-Admins', icon: Globe },
                                    { id: 'sellers', label: 'Sellers', icon: Users },
                                    { id: 'manager', label: 'Managers', icon: ShieldCheck },
                                    { id: 'customer', label: 'Customer Care', icon: Mail },
                                    { id: 'products', label: 'Products', icon: ShoppingCart },
                                    { id: 'orders', label: 'Orders', icon: Hash },
                                    { id: 'security', label: 'Security', icon: Lock }
                                ].map((subTab) => {
                                    const Icon = subTab.icon;
                                    return (
                                        <button
                                            key={subTab.id}
                                            onClick={() => setSubRoleFilter(subTab.id)}
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border-none cursor-pointer
                                                ${subRoleFilter === subTab.id 
                                                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10' 
                                                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50 bg-slate-100/30'}`}
                                        >
                                            <Icon className="w-3.5 h-3.5" />
                                            {subTab.label}
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Node Governance Table */}
                        <div className="overflow-x-auto border border-slate-100 rounded-2xl scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/75 border-b border-slate-100">
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ADMIN ID</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">ADMIN NAME</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">ROLE</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">SUB-ROLE</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">EMAIL</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">MEMBERS</th>
                                        <th className="px-6 py-4 w-10"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {filteredAdmins.map((admin) => (
                                        <tr key={admin.id} className="hover:bg-indigo-50/10 transition-colors group">
                                            <td className="px-6 py-5 font-black text-xs text-indigo-600 tracking-wider">
                                                {admin.id}
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs border
                                                        ${admin.role === 'main' 
                                                            ? 'bg-slate-950 text-[#FCC618] border-amber-400/20' 
                                                            : 'bg-indigo-50/50 text-indigo-600 border-indigo-100/50'}`}>
                                                        {admin.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div className="text-left">
                                                        <p className="text-sm font-black text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">{admin.name}</p>
                                                        <p className="text-[9px] font-bold text-slate-400 mt-1.5 uppercase tracking-wider">{admin.cluster}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest italic inline-block
                                                    ${admin.role === 'main' ? 'bg-slate-950 text-[#FCC618] border border-amber-400/25' : 'bg-slate-100 text-slate-400 border border-slate-200/50'}`}>
                                                    {admin.role === 'main' ? 'SUPER' : 'SUBADMIN'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-center">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider inline-block border
                                                    ${admin.role === 'main' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                                      admin.subRole === 'sellers' ? 'bg-emerald-50/80 text-emerald-700 border-emerald-200 bg-emerald-50' :
                                                      admin.subRole === 'manager' ? 'bg-blue-50/80 text-blue-700 border-blue-200 bg-blue-50' :
                                                      admin.subRole === 'customer' ? 'bg-purple-50/80 text-purple-700 border-purple-200 bg-purple-50' :
                                                      admin.subRole === 'products' ? 'bg-rose-50/80 text-rose-700 border-rose-200 bg-rose-50' :
                                                      admin.subRole === 'orders' ? 'bg-amber-50/80 text-amber-700 border-amber-200 bg-amber-50' :
                                                      'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                                    {admin.role === 'main' ? 'system root' : admin.subRole}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-sm text-slate-500 font-semibold whitespace-nowrap">
                                                {admin.email}
                                            </td>
                                            <td className="px-6 py-5 text-right font-black text-slate-900 text-sm">
                                                {admin.members}
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors border-none bg-transparent cursor-pointer">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredAdmins.length === 0 && (
                            <div className="p-20 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                                <Globe className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                                    Zero administrative nodes matching filter
                                </span>
                            </div>
                        )}

                        {/* Pagination Footer */}
                        <div className="pt-6 border-t border-slate-100 flex justify-between items-center px-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Showing 1-{filteredAdmins.length} of {filteredAdmins.length} admins
                            </span>
                            <div className="flex items-center gap-2">
                                <button className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-500 cursor-pointer transition-colors shadow-sm">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button className="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-500 cursor-pointer transition-colors shadow-sm">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab Content 2: Add Admin Form View */}
            {viewState === 'add' && (
                <div className="max-w-2xl mx-auto bg-white border border-slate-200/85 rounded-[36px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-6 duration-400 p-8 md:p-10 relative">
                    {/* Visual glowing header gradient line */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400"></div>
                    
                    {/* Back to Governance */}
                    <button
                        onClick={() => setViewState('list')}
                        className="absolute left-8 top-10 flex items-center gap-2 text-xs font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest border-none bg-transparent cursor-pointer group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                        Back to governance
                    </button>
 
                    <div className="space-y-3.5 mb-8 text-left mt-12">
                        <div className="flex items-center gap-3 text-indigo-600">
                            <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-2xl">
                                <UserPlus className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black tracking-tight uppercase text-slate-900 leading-none">Register Admin Node</h2>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Deploy a new administrator with specific role authority.</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleAddAdmin} className="space-y-6">
                        {/* Name Input */}
                        <div className="space-y-2 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Name</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                    <UserCircle2 className="w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter full name"
                                    className="w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 text-xs font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 focus:bg-white transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                    <AtSign className="w-4 h-4" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@shopeasy.com"
                                    className="w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 text-xs font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 focus:bg-white transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Initial Password</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••"
                                    className="w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 text-xs font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 focus:bg-white transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Cluster Location Input */}
                        <div className="space-y-2 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Office / Cluster location</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                    <ShieldCheck className="w-4 h-4" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={cluster}
                                    onChange={(e) => setCluster(e.target.value)}
                                    placeholder="e.g. Regional Office, Logistics Support"
                                    className="w-full pl-11 pr-4 py-4 bg-slate-50/50 border border-slate-200 rounded-2xl text-slate-900 text-xs font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 focus:bg-white transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Sub-Role Selector */}
                        <div className="space-y-2 text-left">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sub-Role Assignment</label>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                    <Key className="w-4 h-4" />
                                </div>
                                <select
                                    value={subRole}
                                    onChange={(e) => setSubRole(e.target.value)}
                                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-xs font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 focus:bg-white transition-all cursor-pointer appearance-none shadow-sm"
                                >
                                    <option value="sellers">Sellers Manager</option>
                                    <option value="manager">General Manager</option>
                                    <option value="customer">Customer Support</option>
                                    <option value="products">Product Verifier</option>
                                    <option value="orders">Order Controller</option>
                                    <option value="security">Security Officer</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-[#FCC618] hover:bg-[#E2B10E] text-slate-950 font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all border-none cursor-pointer uppercase tracking-widest text-[11px] shadow-lg shadow-amber-500/10 group mt-4 hover:scale-[1.01]"
                        >
                            Deploy Admin Node
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminList;
