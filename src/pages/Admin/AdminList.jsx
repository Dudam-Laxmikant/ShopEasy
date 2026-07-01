import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Search,
    Mail,
    Hash,
    User,
    Shield,
    ArrowRight,
    UserPlus
} from 'lucide-react';

const AdminList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    
    const [admins, setAdmins] = useState([
        { id: 'ADM-101', name: 'Admin Alpha', email: 'alpha@shopeasy.com', role: 'Super' },
        { id: 'ADM-102', name: 'Admin Beta', email: 'beta@shopeasy.com', role: 'Sub Admin' },
        { id: 'ADM-103', name: 'Admin Gamma', email: 'gamma@shopeasy.com', role: 'Sub Admin' },
        { id: 'ADM-104', name: 'Admin Delta', email: 'delta@shopeasy.com', role: 'Sub Admin' },
        { id: 'ADM-101', name: 'Admin Alpha', email: 'alpha@shopeasy.com', role: 'Super' },
        { id: 'ADM-102', name: 'Admin Beta', email: 'beta@shopeasy.com', role: 'Sub Admin' },
        { id: 'ADM-103', name: 'Admin Gamma', email: 'gamma@shopeasy.com', role: 'Sub Admin' },
        { id: 'ADM-104', name: 'Admin Delta', email: 'delta@shopeasy.com', role: 'Sub Admin' },
        { id: 'ADM-105', name: 'Admin Epsilon', email: 'epsilon@shopeasy.com', role: 'Sub Admin' },
    
        { id: 'ADM-105', name: 'Admin Epsilon', email: 'epsilon@shopeasy.com', role: 'Sub Admin' },
    
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newAdminName, setNewAdminName] = useState('');
    const [newAdminEmail, setNewAdminEmail] = useState('');
    const [newAdminPassword, setNewAdminPassword] = useState('');
    const [newAdminRole, setNewAdminRole] = useState('Sub Admin');

    const handleAddAdminSubmit = (e) => {
        e.preventDefault();
        if (!newAdminName || !newAdminEmail || !newAdminPassword) return;

        const randomId = `ADM-${Math.floor(100 + Math.random() * 900)}`;

        const newAdmin = {
            id: randomId,
            name: newAdminName,
            email: newAdminEmail,
            role: newAdminRole === 'super' ? 'Super' : 'Sub Admin'
        };

        setAdmins([newAdmin, ...admins]);
        setShowModal(false);
        setNewAdminName('');
        setNewAdminEmail('');
        setNewAdminPassword('');
        setNewAdminRole('Sub Admin');
    };

    const filteredAdmins = admins.filter(a => {
        const matchesSearch = 
            a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            a.role.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = roleFilter === 'all' || a.role === roleFilter;
        
        return matchesSearch && matchesRole;
    });

    return (
        <div className="space-y-8 pb-20 px-4 md:px-6">
            {/* Header section with flat control bar */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between w-full lg:w-auto">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">
                            Admin <span className="text-[#4A70A9]">Authority</span>
                        </h1>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">
                            Global Administrative Network Directory
                        </p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#EFECE3] bg-[#4A70A9] hover:bg-[#395c91] transition-all border-none cursor-pointer flex items-center gap-2 w-fit"
                    >
                        <UserPlus className="w-4 h-4" /> Add Admin
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                    {/* Role Filter Tabs */}
                    <div className="flex bg-slate-100 p-1 rounded-2xl">
                        {['all', 'Super', 'Sub Admin'].map((role) => (
                            <button
                                key={role}
                                onClick={() => setRoleFilter(role)}
                                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-none cursor-pointer
                                    ${roleFilter === role 
                                        ? 'bg-[#4A70A9] text-white' 
                                        : 'text-slate-400 hover:text-slate-700 bg-transparent'}`}
                            >
                                {role}
                            </button>
                        ))}
                    </div>

                    {/* Search Field */}
                    <div className="relative flex-1 lg:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search directory..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border-none rounded-2xl text-[13px] text-slate-900 outline-none focus:bg-slate-50 transition-all font-semibold"
                        />
                    </div>
                </div>
            </div>

            {/* Flat Table Layout (No borders, no shadows) */}
            <div className="bg-white rounded-[32px] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-400">
                                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em]">
                                    <div className="flex items-center gap-2">
                                        <Hash className="w-3.5 h-3.5 text-[#4A70A9]" /> Admin ID
                                    </div>
                                </th>
                                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em]">
                                    <div className="flex items-center gap-2">
                                        <User className="w-3.5 h-3.5 text-[#4A70A9]" /> Name
                                    </div>
                                </th>
                                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em]">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-3.5 h-3.5 text-[#4A70A9]" /> Email
                                    </div>
                                </th>
                                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em]">
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-3.5 h-3.5 text-[#4A70A9]" /> Role
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y-0">
                            {filteredAdmins.map((admin) => (
                                <tr key={admin.id} className="hover:bg-[#EFECE3]/30 transition-colors">
                                    <td className="px-8 py-6 font-black text-xs text-[#4A70A9] tracking-wider">
                                        {admin.id}
                                    </td>
                                    <td className="px-8 py-6 font-bold text-slate-800 text-sm">
                                        {admin.name}
                                    </td>
                                    <td className="px-8 py-6 text-sm text-slate-500 font-semibold">
                                        {admin.email}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-block px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                                            admin.role === 'Super' 
                                                ? 'bg-[#4A70A9] text-[#EFECE3]' 
                                                : 'bg-[#8FABD4]/20 text-[#4A70A9]'
                                        }`}>
                                            {admin.role}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredAdmins.length === 0 && (
                    <div className="py-20 text-center text-slate-400 font-black uppercase text-[10px] tracking-widest bg-white">
                        No administrative nodes match your query
                    </div>
                )}
            </div>

            {/* Popup Form Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] w-full max-w-[420px] p-8 md:p-10 text-left animate-in fade-in zoom-in-95 duration-200 shadow-xl border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-black text-slate-900 uppercase italic">Add New Admin</h3>
                                <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest mt-0.5">Administrative Provisioning</p>
                            </div>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-slate-400 hover:text-slate-600 border-none bg-transparent cursor-pointer font-bold text-lg p-1"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleAddAdminSubmit} className="space-y-5">
                            {/* Name */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-[#4A70A9] uppercase tracking-widest ml-1">Admin Name</label>
                                <input
                                    type="text"
                                    required
                                    value={newAdminName}
                                    onChange={(e) => setNewAdminName(e.target.value)}
                                    placeholder="Enter Admin Name"
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-[13px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-slate-100 transition-all font-semibold"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-[#4A70A9] uppercase tracking-widest ml-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={newAdminEmail}
                                    onChange={(e) => setNewAdminEmail(e.target.value)}
                                    placeholder="admin@shopeasy.com"
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-[13px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-slate-100 transition-all font-semibold"
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-[#4A70A9] uppercase tracking-widest ml-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={newAdminPassword}
                                    onChange={(e) => setNewAdminPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-[13px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-slate-100 transition-all font-semibold"
                                />
                            </div>

                            {/* Role Dropdown */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-[#4A70A9] uppercase tracking-widest ml-1">Role</label>
                                <select
                                    value={newAdminRole}
                                    onChange={(e) => setNewAdminRole(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-[13px] text-slate-900 outline-none focus:bg-slate-100 transition-all font-semibold cursor-pointer"
                                >
                                    <option value="super">Super</option>
                                    <option value="Sub Admin">Sub Admin</option>
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3.5 border-none bg-slate-100 hover:bg-slate-200 text-slate-500 font-black rounded-2xl uppercase tracking-widest text-[10px] cursor-pointer transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 py-3.5 border-none bg-[#4A70A9] hover:bg-[#395c91] text-[#EFECE3] font-black rounded-2xl uppercase tracking-widest text-[10px] cursor-pointer transition-all flex items-center justify-center gap-1.5"
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminList;
