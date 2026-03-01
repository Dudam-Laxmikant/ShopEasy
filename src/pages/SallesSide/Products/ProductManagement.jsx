import React, { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    Download,
    Upload,
    MoreHorizontal,
    Edit,
    Trash2,
    ExternalLink,
    ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductManagement = () => {
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('All');

    const [productList, setProductList] = useState([
        { id: 1, name: 'Premium Cotton Formal Shirt', category: 'Fashion', price: 1699, stock: 45, sales: 128, status: 'Active', image: 'https://theformalclub.in/cdn/shop/files/TealFormalShirt_4.jpg?v=1751886662&width=600', createdAt: '2024-01-01' },
        { id: 2, name: 'Smart Watch Series 7', category: 'Electronics', price: 4299, stock: 12, sales: 56, status: 'Active', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60', createdAt: '2024-01-05' },
        { id: 3, name: 'Wireless Headphones XT', category: 'Electronics', price: 1999, stock: 0, sales: 89, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60', createdAt: '2024-01-10' },
        { id: 4, name: 'Leather Sneakers', category: 'Fashion', price: 2899, stock: 24, sales: 34, status: 'Inactive', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=60', createdAt: '2024-01-15' },
    ]);

    const [activeMenuId, setActiveMenuId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('Newest');

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProductList(productList.filter(p => p.id !== id));
            setActiveMenuId(null);
        }
    };

    const toggleMenu = (e, id) => {
        e.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    const handleBulkUpload = () => {
        alert('Bulk Upload feature coming soon! You can upload CSV/Excel files here.');
    };

    const handleDownload = () => {
        alert('Downloading product report as CSV...');
    };

    const handleFilter = () => {
        alert('Advanced Filters: Feature coming soon!');
    };

    // Filter and Sort Logic
    const filteredProducts = productList
        .filter(p => {
            const matchesTab = selectedTab === 'All' || p.status === selectedTab;
            const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === 'Newest') return new Date(b.createdAt) - new Date(a.createdAt);
            if (sortBy === 'Oldest') return new Date(a.createdAt) - new Date(b.createdAt);
            if (sortBy === 'Price: Low to High') return a.price - b.price;
            if (sortBy === 'Price: High to Low') return b.price - a.price;
            return 0;
        });

    return (
        <div className="space-y-8 pb-12" onClick={() => setActiveMenuId(null)}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
                    <p className="text-gray-500 mt-1">Manage your inventory, pricing and listing details.</p>
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                        onClick={handleBulkUpload}
                        className="flex-1 sm:flex-none border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer text-sm"
                    >
                        <Upload className="w-4 h-4" />
                        Bulk Upload
                    </button>
                    <button
                        onClick={() => navigate('/seller/add-product')}
                        className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200 border-none cursor-pointer text-sm"
                    >
                        <Plus className="w-4 h-4" />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center justify-between border-b border-gray-200 mt-4 overflow-x-auto scrollbar-hide">
                <div className="flex gap-8">
                    {['All', 'Active', 'Out of Stock', 'Inactive', 'Archived'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`pb-4 text-sm font-bold transition-all relative border-none bg-transparent cursor-pointer whitespace-nowrap outline-none
                                ${selectedTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {tab}
                            {selectedTab === tab && (
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full animate-in slide-in-from-bottom-1 duration-300"></div>
                            )}
                        </button>
                    ))}
                </div>
                <div className="hidden md:flex items-center gap-4 pb-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sort By:</p>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="text-sm font-bold text-gray-700 hover:text-blue-600 border-none bg-transparent cursor-pointer outline-none"
                    >
                        <option value="Newest">Newest First</option>
                        <option value="Oldest">Oldest First</option>
                        <option value="Price: Low to High">Price: Low to High</option>
                        <option value="Price: High to Low">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {/* Search & Bulk Actions */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by product name or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-sans"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={handleFilter}
                        className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-all cursor-pointer"
                    >
                        <Filter className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleDownload}
                        className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-600 transition-all cursor-pointer"
                    >
                        <Download className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((p) => (
                        <div key={p.id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-in fade-in zoom-in-95">
                            <div className="relative aspect-square overflow-hidden bg-gray-50">
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                                {/* Action Button - Three Dots */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                                    <button
                                        onClick={(e) => toggleMenu(e, p.id)}
                                        className={`p-2 rounded-xl shadow-lg border-none cursor-pointer transition-all ${activeMenuId === p.id ? 'bg-blue-600 text-white' : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-blue-600 hover:text-white'}`}
                                    >
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {activeMenuId === p.id && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                            <button
                                                onClick={() => navigate(`/seller/edit-product/${p.id}`)}
                                                className="w-full px-4 py-2.5 text-left text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-3 border-none bg-transparent cursor-pointer"
                                            >
                                                <Edit className="w-4 h-4" /> Edit Product
                                            </button>
                                            <button className="w-full px-4 py-2.5 text-left text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-3 border-none bg-transparent cursor-pointer">
                                                <ExternalLink className="w-4 h-4" /> View Store
                                            </button>
                                            <div className="h-px bg-gray-100 my-1 mx-2"></div>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="w-full px-4 py-2.5 text-left text-sm font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 border-none bg-transparent cursor-pointer"
                                            >
                                                <Trash2 className="w-4 h-4" /> Delete Product
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="absolute bottom-3 left-3">
                                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider
                                            ${p.status === 'Active' ? 'bg-green-500 text-white' :
                                            p.status === 'Out of Stock' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'}`}>
                                        {p.status}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5 space-y-4">
                                <div>
                                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">{p.category}</p>
                                    <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">{p.name}</h3>
                                </div>
                                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-2xl">
                                    <div className="text-center">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-1">Stock</p>
                                        <p className="text-sm font-bold text-gray-900">{p.stock}</p>
                                    </div>
                                    <div className="w-px h-8 bg-gray-200"></div>
                                    <div className="text-center">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-1">Price</p>
                                        <p className="text-sm font-bold text-gray-900">{p.price}</p>
                                    </div>
                                    <div className="w-px h-8 bg-gray-200"></div>
                                    <div className="text-center">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-1">Sales</p>
                                        <p className="text-sm font-bold text-gray-900">{p.sales}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2 pt-2">
                                    <button
                                        onClick={() => navigate(`/seller/edit-product/${p.id}`)}
                                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-100 bg-white text-gray-600 text-xs font-bold hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all border-none cursor-pointer"
                                    >
                                        <Edit className="w-3.5 h-3.5" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-100 bg-white text-gray-600 text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all border-none cursor-pointer"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-20 bg-white rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center justify-center space-y-4">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                            <Plus className="w-10 h-10 text-gray-200" />
                        </div>
                        <div className="text-center">
                            <p className="text-lg font-bold text-gray-900">No {selectedTab !== 'All' ? selectedTab : ''} products found</p>
                            <p className="text-gray-500 text-sm">There are no products in this category at the moment.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};

export default ProductManagement;
