import React, { useState, useEffect } from 'react';
import { 
    Users, 
    UserPlus, 
    Shield, 
    Mail, 
    Lock, 
    Check, 
    X, 
    Plus, 
    ChevronRight,
    Search,
    Filter,
    MoreVertical,
    Trash2,
    Edit2,
    Eye,
    EyeOff,
    Phone,
    MapPin,
    FileText,
    Upload
} from 'lucide-react';

const ManageSubSellers = () => {
    const [subSellers, setSubSellers] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        permissions: [],
        resume: null,
        aadhar: null
    });
    const [showPassword, setShowPassword] = useState(false);

    const categories = ['Men', 'Women', 'Electronics', 'Others'];

    useEffect(() => {
        const savedSubSellers = localStorage.getItem('shopeasy_sub_sellers');
        if (savedSubSellers) {
            setSubSellers(JSON.parse(savedSubSellers));
        }
    }, []);

    const handleAddSeller = (e) => {
        e.preventDefault();
        const newSeller = {
            id: Date.now().toString(),
            ...formData,
            joinedDate: new Date().toLocaleDateString('en-GB'),
            status: 'Active'
        };
        const updatedSellers = [...subSellers, newSeller];
        setSubSellers(updatedSellers);
        localStorage.setItem('shopeasy_sub_sellers', JSON.stringify(updatedSellers));
        setShowAddModal(false);
        setFormData({ name: '', email: '', phone: '', address: '', password: '', permissions: [], resume: null, aadhar: null });
    };

    const handleFileUpload = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            // Simplified for prototype: normally you'd use URL.createObjectURL or upload to a server
            setFormData({ ...formData, [field]: file.name });
        }
    };

    const togglePermission = (category) => {
        const updatedPermissions = formData.permissions.includes(category)
            ? formData.permissions.filter(p => p !== category)
            : [...formData.permissions, category];
        setFormData({ ...formData, permissions: updatedPermissions });
    };

    const handleDeleteSeller = (id) => {
        const updatedSellers = subSellers.filter(s => s.id !== id);
        setSubSellers(updatedSellers);
        localStorage.setItem('shopeasy_sub_sellers', JSON.stringify(updatedSellers));
    };

    const filteredSellers = subSellers.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Team Management</h1>
                    <p className="text-gray-400 text-sm font-medium mt-1">Manage your sub-sellers and their category permissions</p>
                </div>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-2xl shadow-xl shadow-blue-200 transition-all border-none cursor-pointer flex items-center justify-center gap-3 group transform hover:-translate-y-1 active:translate-y-0"
                >
                    <UserPlus className="w-5 h-5" />
                    <span className="uppercase tracking-widest text-xs">Add New Seller</span>
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Team', value: subSellers.length, icon: Users, color: 'blue' },
                    { label: 'Active Now', value: subSellers.filter(s => s.status === 'Active').length, icon: Shield, color: 'green' },
                    { label: 'Avg. Products', value: '124', icon: Check, color: 'purple' },
                    { label: 'New This Month', value: '2', icon: Plus, color: 'orange' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`w-12 h-12 bg-${stat.color}-50 rounded-2xl flex items-center justify-center`}>
                            <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1">{stat.label}</p>
                            <p className="text-2xl font-black text-gray-900 leading-none">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sellers Table / List */}
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="relative flex-1 max-w-md">
                        <input 
                            type="text" 
                            placeholder="Search by name or email..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 outline-none text-sm transition-all"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-4 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-2xl transition-all border-none cursor-pointer">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-[2px] text-gray-400">
                                <th className="px-8 py-6">User Details</th>
                                <th className="px-8 py-6">Permissions</th>
                                <th className="px-8 py-6">Joined Date</th>
                                <th className="px-8 py-6">Status</th>
                                <th className="px-8 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredSellers.length > 0 ? (
                                filteredSellers.map((seller) => (
                                    <tr key={seller.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 font-black text-lg">
                                                    {seller.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">{seller.name}</p>
                                                    <p className="text-xs text-gray-400">{seller.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-wrap gap-2">
                                                {seller.permissions.map(p => (
                                                    <span key={p} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                                        {p}
                                                    </span>
                                                ))}
                                                {seller.permissions.length === 0 && (
                                                    <span className="text-xs text-gray-300 italic">No permissions</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-gray-500">{seller.joinedDate}</td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                seller.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                            }`}>
                                                {seller.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all border-none bg-transparent cursor-pointer">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border-none bg-transparent cursor-pointer">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => handleDeleteSeller(seller.id)}
                                                    className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border-none bg-transparent cursor-pointer"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                                <Users className="w-10 h-10 text-gray-200" />
                                            </div>
                                            <p className="text-gray-900 font-bold">No sub-sellers found</p>
                                            <p className="text-gray-400 text-sm mt-1">Start building your team by adding a new seller</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Seller Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
                    <div className="relative w-full max-w-2xl bg-white rounded-[48px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
                        <div className="p-8 pb-4 flex items-center justify-between border-b border-gray-50 bg-white z-10">
                            <div>
                                <h2 className="text-xl font-black text-gray-900 tracking-tight">Create Sub-Seller</h2>
                                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mt-1">Setup login & assign specific category access</p>
                            </div>
                            <button 
                                onClick={() => setShowAddModal(false)}
                                className="w-10 h-10 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 hover:text-gray-900 transition-all border-none cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-gray-200">
                            <form onSubmit={handleAddSeller} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest text-[10px]">Full Name</label>
                                        <div className="relative">
                                            <input 
                                                type="text" 
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                placeholder="e.g. Rahul Sharma"
                                                autoComplete="name"
                                                className="w-full px-6 py-5 pl-14 bg-gray-50 border-none rounded-[24px] focus:ring-4 focus:ring-blue-500/10 outline-none text-sm transition-all"
                                            />
                                            <Users className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest text-[10px]">Mobile Number</label>
                                        <div className="relative">
                                            <input 
                                                type="tel" 
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                placeholder="+91 98765 43210"
                                                autoComplete="tel"
                                                className="w-full px-6 py-5 pl-14 bg-gray-50 border-none rounded-[24px] focus:ring-4 focus:ring-blue-500/10 outline-none text-sm transition-all"
                                            />
                                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest text-[10px]">Work Email</label>
                                    <div className="relative">
                                        <input 
                                            type="email" 
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            placeholder="rahul@yourcompany.com"
                                            autoComplete="email"
                                            className="w-full px-6 py-5 pl-14 bg-gray-50 border-none rounded-[24px] focus:ring-4 focus:ring-blue-500/10 outline-none text-sm transition-all"
                                        />
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest text-[10px]">Residential Address</label>
                                    <div className="relative">
                                        <textarea 
                                            required
                                            value={formData.address}
                                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                                            placeholder="Street, City, State, ZIP..."
                                            rows="2"
                                            autoComplete="street-address"
                                            className="w-full px-6 py-5 pl-14 bg-gray-50 border-none rounded-[24px] focus:ring-4 focus:ring-blue-500/10 outline-none text-sm transition-all resize-none"
                                        />
                                        <MapPin className="absolute left-5 top-8 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest text-[10px]">Resume (PDF/DOC)</label>
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                id="resume-upload"
                                                className="hidden"
                                                onChange={(e) => handleFileUpload(e, 'resume')}
                                            />
                                            <label htmlFor="resume-upload" className="w-full flex items-center gap-3 px-6 py-5 bg-gray-50 rounded-[24px] cursor-pointer hover:bg-gray-100 transition-all">
                                                <FileText className="w-5 h-5 text-gray-400" />
                                                <span className="text-xs text-gray-500 truncate">{formData.resume || 'Upload Resume'}</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest text-[10px]">Aadhar Card (Image/PDF)</label>
                                        <div className="relative">
                                            <input 
                                                type="file" 
                                                id="aadhar-upload"
                                                className="hidden"
                                                onChange={(e) => handleFileUpload(e, 'aadhar')}
                                            />
                                            <label htmlFor="aadhar-upload" className="w-full flex items-center gap-3 px-6 py-5 bg-gray-50 rounded-[24px] cursor-pointer hover:bg-gray-100 transition-all">
                                                <Shield className="w-5 h-5 text-gray-400" />
                                                <span className="text-xs text-gray-500 truncate">{formData.aadhar || 'Upload Aadhar'}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest text-[10px]">Login Password</label>
                                    <div className="relative">
                                        <input 
                                            type={showPassword ? "text" : "password"} 
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                            placeholder="••••••••"
                                            autoComplete="new-password"
                                            className="w-full px-6 py-5 pl-14 pr-14 bg-gray-50 border-none rounded-[24px] focus:ring-4 focus:ring-blue-500/10 outline-none text-sm transition-all"
                                        />
                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <button 
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-5 top-1/2 -translate-y-1/2 border-none bg-transparent cursor-pointer text-gray-400 hover:text-gray-900"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-black text-gray-700 ml-1 uppercase tracking-widest text-[10px]">Permission Controls</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                type="button"
                                                onClick={() => togglePermission(cat)}
                                                className={`flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border-none cursor-pointer ${
                                                    formData.permissions.includes(cat)
                                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                                        : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
                                                }`}
                                            >
                                                <span>{cat}</span>
                                                {formData.permissions.includes(cat) && <Check className="w-4 h-4" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button 
                                        type="submit"
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-6 rounded-[28px] shadow-2xl shadow-blue-200 transition-all border-none cursor-pointer uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3"
                                    >
                                        Enable Team Access
                                        <Plus className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageSubSellers;
