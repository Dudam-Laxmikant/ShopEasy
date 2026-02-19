import React, { useState } from 'react';
import {
    Search,
    MapPin,
    ShoppingCart,
    User,
    Menu,
    ChevronDown,
    Globe,
    Heart,
    Package,
    Headphones,
    LogOut,
    X,
    ChevronRight,
} from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchCategory, setSearchCategory] = useState('All');
    const [cartCount, setCartCount] = useState(3);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState('EN');

    const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Beauty', 'Toys'];
    const languages = [
        { code: 'EN', name: 'English', flag: '🇺🇸' },
        { code: 'HI', name: 'हिन्दी', flag: '🇮🇳' },
        { code: 'ES', name: 'Español', flag: '🇪🇸' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full font-sans">
            {/* Top Banner / Main Header Area */}
            <div className="bg-yellow-400 text-gray-900 shadow-md">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-4">

                        {/* Top Section: Logo, Mobile Menu, Cart/Account (Mobile) */}
                        <div className="flex items-center justify-between w-full md:w-auto">
                            <div className="flex items-center gap-2">
                                {/* Mobile Menu Trigger (Visible only on mobile) */}
                                <button className="md:hidden p-1" onClick={() => setIsMenuOpen(true)}>
                                    <Menu className="h-6 w-6" />
                                </button>

                                {/* Logo */}
                                <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
                                    <div className="p-2 bg-white rounded-full">
                                        <Package className="h-6 w-6 text-yellow-500" />
                                    </div>
                                    <span className="text-xl md:text-2xl font-bold tracking-tight">ShopEasy</span>
                                </div>
                            </div>

                            {/* Mobile Cart & Account (Visible only on mobile) */}
                            <div className="flex items-center gap-4 md:hidden">
                                <button onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}>
                                    <User className="h-6 w-6" />
                                </button>
                                <div className="relative">
                                    <ShoppingCart className="h-6 w-6" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-gray-900 text-yellow-400 text-[10px] font-bold rounded-full">
                                            {cartCount}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="flex flex-1 w-full max-w-2xl">
                            <div className="flex w-full bg-white rounded-md overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-yellow-600 transition-shadow">
                                {/* Category Dropdown */}
                                <div className="relative hidden sm:block border-r border-gray-200">
                                    <select
                                        value={searchCategory}
                                        onChange={(e) => setSearchCategory(e.target.value)}
                                        className="h-full bg-gray-50 text-sm text-gray-700 px-3 py-2 pr-8 outline-none cursor-pointer hover:bg-gray-100 border-none appearance-none font-medium w-fit min-w-[80px]"
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                                </div>

                                {/* Input */}
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="flex-1 px-4 py-2.5 text-gray-900 outline-none w-full min-w-0"
                                />

                                {/* Search Button */}
                                <button className="bg-yellow-500 hover:bg-yellow-600 px-5 text-gray-900 transition-colors">
                                    <Search className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Desktop Right Actions (Hidden on Mobile) */}
                        <div className="hidden md:flex items-center gap-4">

                            {/* Language Selector */}
                            <div
                                className="relative group"
                                onMouseEnter={() => setIsLangDropdownOpen(true)}
                                onMouseLeave={() => setIsLangDropdownOpen(false)}
                            >
                                <button
                                    className="flex items-center gap-1 p-2 hover:bg-yellow-500 rounded font-semibold text-sm transition-colors bg-transparent border-none text-gray-900"
                                >
                                    <span className="text-lg">{languages.find(l => l.code === selectedLang)?.flag}</span>
                                    <span>{selectedLang}</span>
                                    <ChevronDown className="h-4 w-4 opacity-70" />
                                </button>

                                {/* Language Dropdown Content */}
                                {isLangDropdownOpen && (
                                    <div
                                        className="absolute top-full right-0 w-40 bg-white shadow-xl rounded-md overflow-hidden py-1 text-gray-800 border border-gray-100 animate-in fade-in zoom-in-95 duration-100 z-50"
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => { setSelectedLang(lang.code); setIsLangDropdownOpen(false); }}
                                                className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-gray-50 text-left bg-white border-none text-gray-800"
                                            >
                                                <span>{lang.flag}</span>
                                                <span className={`${selectedLang === lang.code ? 'font-bold text-yellow-600' : ''}`}>{lang.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Account Dropdown */}
                            <div
                                className="relative group"
                                onMouseEnter={() => setIsAccountDropdownOpen(true)}
                                onMouseLeave={() => setIsAccountDropdownOpen(false)}
                            >
                                <button
                                    className="flex flex-col items-start p-2 leading-tight hover:bg-yellow-500 rounded transition-colors bg-transparent border-none text-gray-900"
                                >
                                    <span className="text-xs text-gray-700 w-full pl-1">Hello, Sign in</span>
                                    <div className="flex items-center gap-1 font-bold">
                                        <span>Account & Lists</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </div>
                                </button>

                                {/* Account Dropdown Content */}
                                {isAccountDropdownOpen && (
                                    <div
                                        className="absolute top-full right-0 w-64 bg-white shadow-xl rounded-md overflow-hidden text-gray-800 border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-100"
                                    >
                                        <div className="p-4 bg-gray-50 border-b border-gray-100 text-center">
                                            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded shadow-sm transition-colors mb-2">
                                                Sign in
                                            </button>
                                            <p className="text-xs text-gray-500">
                                                New customer? <a href="#" className="text-blue-600 hover:underline">Start here.</a>
                                            </p>
                                        </div>
                                        <div className="py-2">
                                            <div className="px-4 py-2">
                                                <h3 className="font-bold text-gray-900 mb-2">Your Account</h3>
                                                <ul className="space-y-1 text-sm text-gray-600">
                                                    <li><a href="#" className="block hover:text-yellow-600 hover:underline">Your Orders</a></li>
                                                    <li><a href="#" className="block hover:text-yellow-600 hover:underline">Your Wish List</a></li>
                                                    <li><a href="#" className="block hover:text-yellow-600 hover:underline">Memberships & Subscriptions</a></li>
                                                </ul>
                                            </div>
                                            <div className="border-t border-gray-100 my-1"></div>
                                            <div className="px-4 py-2">
                                                <a href="#" className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 hover:underline">
                                                    <LogOut className="h-4 w-4" />
                                                    Sign Out
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Returns & Orders */}
                            <div className="hidden xl:flex flex-col items-start p-2 hover:bg-yellow-500 rounded cursor-pointer transition-colors">
                                <span className="text-xs text-gray-700">Returns</span>
                                <span className="font-bold">& Orders</span>
                            </div>

                            {/* Cart */}
                            <div className="relative flex items-end p-2 cursor-pointer hover:bg-yellow-500 rounded transition-colors group">
                                <div className="relative">
                                    <ShoppingCart className="h-8 w-8 text-gray-900" />
                                    <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center bg-gray-900 text-yellow-400 text-xs font-bold rounded-full border-2 border-yellow-400">
                                        {cartCount}
                                    </span>
                                </div>
                                <span className="font-bold text-lg hidden md:block pl-1 mb-0.5">Cart</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Nav (Hidden on Mobile) */}
            <div className="bg-gray-800 text-white hidden md:block">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-6 overflow-x-auto text-sm font-medium py-2 scrollbar-hide">
                        <button
                            className="flex items-center gap-1 hover:text-yellow-400 transition-colors whitespace-nowrap"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <Menu className="h-5 w-5" />
                            <span>All</span>
                        </button>
                        {['Today\'s Deals', 'Customer Service', 'Registry', 'Gift Cards', 'Sell'].map((item) => (
                            <a key={item} href="#" className="hover:text-yellow-400 transition-colors whitespace-nowrap">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex">
                    <div className="w-4/5 max-w-sm h-full bg-white shadow-xl animate-in slide-in-from-left duration-200 overflow-y-auto">
                        <div className="bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0">
                            <div className="flex items-center gap-2">
                                <User className="h-6 w-6" />
                                <span className="font-bold text-lg">Hello, Sign In</span>
                            </div>
                            <button onClick={() => setIsMenuOpen(false)}>
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-4 pb-20 space-y-6">

                            {/* Categories Group */}
                            <div>
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Categories</h3>
                                <ul className="space-y-1">
                                    {categories.map(cat => (
                                        <li key={cat} className="text-gray-700 hover:bg-gray-50 hover:text-yellow-700 cursor-pointer flex justify-between items-center px-2 py-2 rounded-lg text-sm font-medium">
                                            {cat}
                                            <ChevronRight className="h-4 w-4 text-gray-400" />
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100"></div>

                            {/* Shop Group */}
                            <div>
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Shop</h3>
                                <ul className="space-y-1">
                                    {['Today\'s Deals', 'New Arrivals', 'Best Sellers', 'Offers & Coupons'].map(item => (
                                        <li key={item} className="text-gray-700 hover:bg-gray-50 hover:text-yellow-700 cursor-pointer flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium">
                                            {item === "Today's Deals" || item === 'Offers & Coupons' ? <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div> : <div className="w-1.5 h-1.5"></div>}
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100"></div>

                            {/* Account Group */}
                            <div>
                                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Account</h3>
                                <ul className="space-y-1">
                                    {['My Orders', 'My Wishlist', 'My Addresses', 'My Payments'].map(item => (
                                        <li key={item} className="text-gray-700 hover:bg-gray-50 hover:text-yellow-700 cursor-pointer flex justify-between items-center px-2 py-2 rounded-lg text-sm font-medium">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray-100"></div>

                            {/* Logout */}
                            <div>
                                <button className="w-full flex items-center gap-2 px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left">
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </button>
                            </div>

                        </div>
                    </div>
                    {/* Click outside to close */}
                    <div className="flex-1" onClick={() => setIsMenuOpen(false)}></div>
                </div>
            )}
        </header>
    );
};

export default Header;
