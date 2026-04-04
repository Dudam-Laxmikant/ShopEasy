import React, { useState } from 'react';
import {
    Search,
    Users,
    Mail,
    MapPin,
    Calendar,
    Hash,
    MoreVertical
} from 'lucide-react';

const ClientsList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [clients] = useState([
        { id: 'CLI-1024', name: 'Alex Thompson', email: 'alex.t@gmail.com', joined: 'Jan 10, 2025', city: 'Mumbai' },
        { id: 'CLI-1025', name: 'Sarah Miller', email: 'sarah.miller@outlook.com', joined: 'Feb 15, 2025', city: 'Bangalore' },
        { id: 'CLI-1026', name: 'John Doe', email: 'j.doe@protonmail.com', joined: 'Nov 22, 2024', city: 'Delhi' },
        { id: 'CLI-1027', name: 'Emily Chen', email: 'emily.chen@icloud.com', joined: 'Mar 05, 2026', city: 'Pune' },
        { id: 'CLI-1028', name: 'Michael Brown', email: 'm.brown@fastmail.com', joined: 'Mar 20, 2026', city: 'Chennai' },
    ]);

    const filteredClients = clients.filter(c => 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-20">
            {/* Simple Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">Customer <span className="text-indigo-600">Base</span></h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Global Client Directory</p>
                </div>
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find client in the registry..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 transition-all shadow-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Client Table Card */}
            <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/40">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><Hash className="w-3 h-3" /> ID</div></th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><Users className="w-3 h-3" /> Name</div></th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><Mail className="w-3 h-3" /> Email</div></th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><Calendar className="w-3 h-3" /> Joined Date</div></th>
                                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"><div className="flex items-center gap-2"><MapPin className="w-3 h-3" /> City</div></th>
                                <th className="px-8 py-5 w-10"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredClients.map((client) => (
                                <tr key={client.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-8 py-6 font-black text-xs text-slate-900 tracking-wider">
                                        {client.id}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[14px] font-bold text-slate-800">{client.name}</span>
                                    </td>
                                    <td className="px-8 py-6 text-sm text-slate-500 font-medium whitespace-nowrap">
                                        {client.email}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-[13px] font-black text-slate-700 uppercase italic whitespace-nowrap">{client.joined}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                                            {client.city}
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

                {filteredClients.length === 0 && (
                    <div className="p-20 text-center text-slate-400 font-black uppercase text-[10px] tracking-widest">
                        Zero clients matching the search criteria
                    </div>
                )}

                <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center px-8">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Database Nodes: {filteredClients.length}</span>
                    <div className="flex gap-2">
                        <button className="p-2 w-8 h-8 rounded-lg bg-indigo-600 text-white font-black text-[10px] flex items-center justify-center shadow-lg shadow-indigo-100">1</button>
                        <button className="p-2 w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-400 font-black text-[10px] flex items-center justify-center hover:text-slate-900 transition-colors">2</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientsList;
