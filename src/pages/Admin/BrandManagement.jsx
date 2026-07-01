import React, { useState } from 'react';
import {
    Search,
    Hash,
    Layers,
    Tag,
    User,
    Shield,
    Trash2,
    Plus,
    Edit2,
    X
} from 'lucide-react';

const BrandManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [brandName, setBrandName] = useState('');
    const [addedById, setAddedById] = useState('ADM-101');
    const [addedByRole, setAddedByRole] = useState('Super Admin');

    const [brands, setBrands] = useState([
        { brand_id: 1, brand_name: 'Nike', added_by_id: 'ADM-101', added_by_role: 'Super Admin' },
        { brand_id: 2, brand_name: 'Adidas', added_by_id: 'SLR-29103', added_by_role: 'Seller' },
        { brand_id: 3, brand_name: 'Apple', added_by_id: 'SLR-11402', added_by_role: 'Seller' },
        { brand_id: 4, brand_name: 'Samsung', added_by_id: 'ADM-102', added_by_role: 'Admin' },
        { brand_id: 5, brand_name: 'Puma', added_by_id: 'SLR-30911', added_by_role: 'Seller' },
    ]);

    const [showEditModal, setShowEditModal] = useState(false);
    const [currentBrand, setCurrentBrand] = useState(null);

    const filteredBrands = brands.filter(b => 
        b.brand_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        String(b.brand_id).includes(searchTerm) ||
        b.added_by_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.added_by_role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateBrand = (e) => {
        e.preventDefault();
        if (!brandName.trim() || !addedById.trim()) return;

        const nextId = brands.length > 0 
            ? Math.max(...brands.map(b => b.brand_id)) + 1 
            : 1;

        const newBrand = {
            brand_id: nextId,
            brand_name: brandName.trim(),
            added_by_id: addedById.trim(),
            added_by_role: addedByRole
        };

        setBrands([...brands, newBrand]);
        setShowAddModal(false);
        setBrandName('');
        setAddedById('ADM-101');
        setAddedByRole('Super Admin');
    };

    const handleEditBrandSubmit = (e) => {
        e.preventDefault();
        if (!brandName.trim() || !addedById.trim() || !currentBrand) return;

        setBrands(brands.map(b => 
            b.brand_id === currentBrand.brand_id 
                ? { 
                    ...b, 
                    brand_name: brandName.trim(), 
                    added_by_id: addedById.trim(), 
                    added_by_role: addedByRole 
                  }
                : b
        ));
        setShowEditModal(false);
        setCurrentBrand(null);
        setBrandName('');
        setAddedById('ADM-101');
        setAddedByRole('Super Admin');
    };

    const handleDeleteBrand = (id) => {
        if (window.confirm("Are you sure you want to delete this brand?")) {
            setBrands(brands.filter(b => b.brand_id !== id));
        }
    };

    return (
        <div className="space-y-8 pb-20 px-4 md:px-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase italic">
                        Global <span className="text-[#4A70A9]">Brands</span>
                    </h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest mt-1">
                        Administrative Brand Registry
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                    {/* Search Field */}
                    <div className="relative flex-1 lg:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search brands..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-[13px] text-slate-900 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 transition-all shadow-sm font-semibold"
                        />
                    </div>
                    {/* Add Brand Button */}
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-[#EFECE3] bg-[#4A70A9] hover:bg-[#395c91] transition-all border-none cursor-pointer flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add Brand
                    </button>
                </div>
            </div>

            {/* Flat Table Layout */}
            <div className="bg-white border border-slate-200 rounded-[32px] overflow-hidden shadow-xl shadow-slate-200/40">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-400">
                                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em]">
                                    <div className="flex items-center gap-2"><Hash className="w-3.5 h-3.5 text-[#4A70A9]" /> Brand ID</div>
                                </th>
                                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em]">
                                    <div className="flex items-center gap-2"><Tag className="w-3.5 h-3.5 text-[#4A70A9]" /> Brand Name</div>
                                </th>
                                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em]">
                                    <div className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-[#4A70A9]" /> Added By ID</div>
                                </th>
                                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em]">
                                    <div className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-[#4A70A9]" /> Added By Role</div>
                                </th>
                                <th className="px-8 py-5 w-24 text-right text-[11px] font-black uppercase tracking-[0.2em] pr-12">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredBrands.map((b) => (
                                <tr key={b.brand_id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-8 py-6 font-black text-xs text-[#4A70A9] tracking-wider">
                                        {b.brand_id}
                                    </td>
                                    <td className="px-8 py-6 font-bold text-slate-800 text-sm">
                                        {b.brand_name}
                                    </td>
                                    <td className="px-8 py-6 text-sm text-slate-500 font-bold">
                                        {b.added_by_id}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-block px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                                            b.added_by_role.toLowerCase().includes('admin') 
                                                ? 'bg-[#4A70A9] text-[#EFECE3]' 
                                                : 'bg-[#8FABD4]/20 text-[#4A70A9]'
                                        }`}>
                                            {b.added_by_role}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right pr-12 space-x-1">
                                        <button 
                                            onClick={() => {
                                                setCurrentBrand(b);
                                                setBrandName(b.brand_name);
                                                setAddedById(b.added_by_id);
                                                setAddedByRole(b.added_by_role);
                                                setShowEditModal(true);
                                            }}
                                            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors border-none bg-transparent cursor-pointer"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteBrand(b.brand_id)}
                                            className="p-2 text-slate-400 hover:text-rose-600 transition-colors border-none bg-transparent cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredBrands.length === 0 && (
                    <div className="py-20 text-center text-slate-400 font-black uppercase text-[10px] tracking-widest">
                        No brands found in registry
                    </div>
                )}
            </div>

            {/* Add Brand Popup Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] w-full max-w-[420px] p-8 md:p-10 text-left animate-in fade-in zoom-in-95 duration-200 shadow-xl border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-black text-slate-900 uppercase italic">Add Brand</h3>
                                <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest mt-0.5">Brand Provisioning</p>
                            </div>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 border-none bg-transparent cursor-pointer font-bold text-lg">✕</button>
                        </div>
                        <form onSubmit={handleCreateBrand} className="space-y-5">
                            {/* Brand Name */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-[#4A70A9] uppercase tracking-widest ml-1">Brand Name</label>
                                <input
                                    type="text"
                                    required
                                    value={brandName}
                                    onChange={(e) => setBrandName(e.target.value)}
                                    placeholder="e.g. Nike"
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-[13px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-slate-100 transition-all font-semibold"
                                />
                            </div>

                            {/* Added By ID */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-[#4A70A9] uppercase tracking-widest ml-1">Creator ID</label>
                                <input
                                    type="text"
                                    required
                                    value={addedById}
                                    onChange={(e) => setAddedById(e.target.value)}
                                    placeholder="e.g. ADM-101 or SLR-29103"
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-[13px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-slate-100 transition-all font-semibold"
                                />
                            </div>

                            {/* Added By Role */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-[#4A70A9] uppercase tracking-widest ml-1">Creator Role</label>
                                <select
                                    value={addedByRole}
                                    onChange={(e) => setAddedByRole(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-[13px] text-slate-900 outline-none focus:bg-slate-100 transition-all font-semibold cursor-pointer"
                                >
                                    <option value="Super Admin">Super Admin</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Seller">Seller</option>
                                </select>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-4 pt-2">
                                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 py-3.5 border-none bg-slate-100 hover:bg-slate-200 text-slate-500 font-black rounded-2xl uppercase tracking-widest text-[10px] cursor-pointer">Cancel</button>
                                <button type="submit" className="flex-1 py-3.5 border-none bg-[#4A70A9] hover:bg-[#395c91] text-[#EFECE3] font-black rounded-2xl uppercase tracking-widest text-[10px] cursor-pointer">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Brand Popup Modal */}
            {showEditModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] w-full max-w-[420px] p-8 md:p-10 text-left animate-in fade-in zoom-in-95 duration-200 shadow-xl border border-slate-100">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-black text-slate-900 uppercase italic">Edit Brand</h3>
                                <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest mt-0.5">Brand Modification</p>
                            </div>
                            <button 
                                onClick={() => {
                                    setShowEditModal(false);
                                    setCurrentBrand(null);
                                    setBrandName('');
                                    setAddedById('ADM-101');
                                    setAddedByRole('Super Admin');
                                }} 
                                className="text-slate-400 hover:text-slate-600 border-none bg-transparent cursor-pointer font-bold text-lg"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleEditBrandSubmit} className="space-y-5">
                            {/* Brand Name */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-[#4A70A9] uppercase tracking-widest ml-1">Brand Name</label>
                                <input
                                    type="text"
                                    required
                                    value={brandName}
                                    onChange={(e) => setBrandName(e.target.value)}
                                    placeholder="Brand Name"
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-[13px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-slate-100 transition-all font-semibold"
                                />
                            </div>

                            {/* Creator ID */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-[#4A70A9] uppercase tracking-widest ml-1">Creator ID</label>
                                <input
                                    type="text"
                                    required
                                    value={addedById}
                                    onChange={(e) => setAddedById(e.target.value)}
                                    placeholder="e.g. ADM-101 or SLR-29103"
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-[13px] text-slate-900 placeholder:text-slate-400 outline-none focus:bg-slate-100 transition-all font-semibold"
                                />
                            </div>

                            {/* Creator Role */}
                            <div className="space-y-1.5">
                                <label className="text-[9px] font-black text-[#4A70A9] uppercase tracking-widest ml-1">Creator Role</label>
                                <select
                                    value={addedByRole}
                                    onChange={(e) => setAddedByRole(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl text-[13px] text-slate-900 outline-none focus:bg-slate-100 transition-all font-semibold cursor-pointer"
                                >
                                    <option value="Super Admin">Super Admin</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Seller">Seller</option>
                                </select>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-2">
                                <button 
                                    type="button" 
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setCurrentBrand(null);
                                        setBrandName('');
                                        setAddedById('ADM-101');
                                        setAddedByRole('Super Admin');
                                    }} 
                                    className="flex-1 py-3.5 border-none bg-slate-100 hover:bg-slate-200 text-slate-500 font-black rounded-2xl uppercase tracking-widest text-[10px] cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-3.5 border-none bg-[#4A70A9] hover:bg-[#395c91] text-[#EFECE3] font-black rounded-2xl uppercase tracking-widest text-[10px] cursor-pointer">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrandManagement;
