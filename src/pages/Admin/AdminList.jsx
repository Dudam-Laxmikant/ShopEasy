import React, { useState } from 'react';
import {
    Search,
    ShieldCheck,
    Mail,
    Hash,
    Users,
    Key,
    MoreVertical,
    Activity,
    CheckCircle2,
    Clock,
    UserCircle2,
    Filter
} from 'lucide-react';

const AdminList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [admins] = useState([
        { id: 'ADM-101', name: 'Admin Alpha', email: 'alpha@shopeasy.com', members: 42, role: 'main', permission: 'full' },
        { id: 'ADM-102', name: 'Admin Beta', email: 'beta@shopeasy.com', members: 12, role: 'subadmin', permission: 'sellers request' },
        { id: 'ADM-103', name: 'Admin Gamma', email: 'gamma@shopeasy.com', members: 8, role: 'subadmin', permission: 'accepts' },
        { id: 'ADM-104', name: 'Admin Delta', email: 'delta@shopeasy.com', members: 24, role: 'subadmin', permission: 'products cheking' },
        { id: 'ADM-105', name: 'Admin Epsilon', email: 'epsilon@shopeasy.com', members: 5, role: 'subadmin', permission: 'sellers request' },
    ]);

    const filteredAdmins = admins.filter(a => {
        const matchesSearch = 
            a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.permission.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = roleFilter === 'all' || a.role === roleFilter;
        
        return matchesSearch && matchesRole;
    });

    const getPermissionStyle = (perm) => {
        switch(perm) {
            case 'full':
                return 'bg-indigo-600 text-white shadow-indigo-100';
            case 'sellers request':
                return 'bg-orange-50 text-orange-600 border border-orange-100';
            case 'accepts':
                return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
            case 'products cheking':
                return 'bg-slate-900 text-white shadow-slate-200';
            default:
                return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Admin <span className="text-indigo-600">Authority</span></h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Global Administrative Network</p>
                </div>
                <div className="flex items-center gap-4 w-full lg:w-auto">
                    {/* Role Filter Tabs */}
                    <div className="flex bg-white/50 backdrop-blur-sm p-1 rounded-2xl border border-slate-200 shadow-sm">
                        {['all', 'main', 'subadmin'].map((role) => (
                            <button
                                key={role}
                                onClick={() => setRoleFilter(role)}
                                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-none cursor-pointer
                                    ${roleFilter === role 
                                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
                                        : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>

                    <div className="relative flex-1 lg:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search administrative network..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Admin Table Card */}
            <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/40">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><Hash className="w-3 h-3" /> Admin ID</div></th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> Admin Name</div></th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><UserCircle2 className="w-3 h-3" /> Role</div></th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><Mail className="w-3 h-3" /> Email</div></th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><Users className="w-3 h-3" /> Members</div></th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><Key className="w-3 h-3" /> Permission</div></th>
                                <th className="px-8 py-5 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredAdmins.map((admin) => (
                                <tr key={admin.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-8 py-6 font-black text-xs text-indigo-600 tracking-wider">
                                        {admin.id}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[14px] font-bold text-slate-800 tabular-nums">{admin.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest italic
                                                ${admin.role === 'main' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-slate-100 text-slate-400'}`}>
                                                {admin.role}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-slate-500 font-medium whitespace-nowrap">
                                        {admin.email}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[14px] font-black text-slate-800 tabular-nums italic">{admin.members}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-sm transition-all whitespace-nowrap
                                            ${getPermissionStyle(admin.permission)}`}>
                                            {admin.permission}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
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
                    <div className="p-20 text-center text-slate-400 font-black uppercase text-[10px] tracking-widest">
                        Zero administration nodes matching filters
                    </div>
                )}

                <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center px-8">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing {filteredAdmins.length} Authorities</span>
                    <div className="flex gap-1.5">
                        <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center shadow-lg shadow-indigo-100 border-none cursor-pointer">01</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminList;
