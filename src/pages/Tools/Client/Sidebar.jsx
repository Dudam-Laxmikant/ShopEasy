import React, { useState } from 'react';
import {
    LayoutGrid,
    Smartphone,
    Wrench,
    Watch,
    MoreHorizontal,
    Zap,
    Clock,
    Award,
    Ticket,
    Package,
    Heart,
    MapPin,
    CreditCard,
    Star,
    HelpCircle,
    LogOut,
    ChevronRight,
    Shirt,
    ShoppingBag
} from 'lucide-react';

const Sidebar = () => {
    const [activeItem, setActiveItem] = useState('All Categories');

    const menuGroups = [
        {
            title: 'Categories',
            items: [
                { name: 'All Categories', icon: LayoutGrid },
                { name: 'Men', icon: Shirt },
                { name: 'Women', icon: ShoppingBag },
                { name: 'Electronics', icon: Smartphone },
                { name: 'More...', icon: MoreHorizontal },
            ]
        }
    ];

    return (
        <aside className="w-64 flex-shrink-0 bg-white border-r border-gray-200 hidden md:block text-left h-full overflow-y-auto">
            <div className="p-4 space-y-6">
                {menuGroups.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                            {group.title}
                        </h3>
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const Icon = item.icon;
                                const isActive = activeItem === item.name;

                                return (
                                    <button
                                        key={item.name}
                                        onClick={() => setActiveItem(item.name)}
                                        className={`
                      w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border-none cursor-pointer
                      ${isActive
                                                ? 'bg-yellow-100 text-yellow-800 shadow-sm'
                                                : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                            }
                    `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Icon className={`h-5 w-5 ${isActive ? 'text-yellow-700' : 'text-gray-400'} ${item.highlight ? 'text-yellow-600' : ''}`} />
                                            <span>{item.name}</span>
                                        </div>
                                        {isActive && <ChevronRight className="h-4 w-4 text-yellow-700" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Filters Section */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">
                        Refine By
                    </h3>
                    <div className="space-y-6 px-2">
                        {/* Price Filter */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-medium text-gray-700">Price</h4>
                            <div className="space-y-3">
                                <input type="range" className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500" />
                                <div className="flex justify-between text-xs text-gray-500 font-medium">
                                    <span>$0</span>
                                    <span>$1000+</span>
                                </div>
                            </div>
                        </div>

                        {/* Colors Filter */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-medium text-gray-700">Colors</h4>
                            <div className="flex flex-wrap gap-2">
                                {['#ffffff', '#000000', '#486284', '#8B4513', '#ffdab9', '#2a2a2a'].map((color, idx) => (
                                    <button
                                        key={idx}
                                        className={`w-6 h-6 rounded-full border border-gray-200 shadow-sm hover:scale-110 transition-transform ${color === '#ffffff' ? 'bg-white' : ''}`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Sizes Filter */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-medium text-gray-700">Sizes</h4>
                            <div className="flex flex-wrap gap-2">
                                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                                    <button key={size} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-600 bg-gray-50 border border-gray-200 rounded hover:border-yellow-500 hover:text-yellow-600 transition-colors">
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Ratings Filter */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-medium text-gray-700">Customer Ratings</h4>
                            <div className="space-y-2">
                                {[4, 3, 2].map((rating) => (
                                    <label key={rating} className="flex items-center gap-2 cursor-pointer group hover:bg-gray-50 p-1 rounded">
                                        <input type="checkbox" className="w-3.5 h-3.5 rounded text-yellow-500 focus:ring-yellow-500 border-gray-300 accent-yellow-500" />
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                            ))}
                                            <span className="ml-2 text-xs text-gray-600">& Up</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Brands Filter */}
                        <div className="space-y-2">
                            <h4 className="text-xs font-medium text-gray-700">Brands</h4>
                            <div className="space-y-1">
                                {['Nike', 'Adidas', 'Puma', 'Zara', 'H&M', 'Levi\'s'].map((brand) => (
                                    <label key={brand} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                                        <input type="checkbox" className="w-3.5 h-3.5 rounded text-yellow-500 focus:ring-yellow-500 border-gray-300 accent-yellow-500" />
                                        <span className="text-xs text-gray-600">{brand}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Logout Section */}
                <div className="pt-4 mt-4 border-t border-gray-100">
                    <button className="w-full flex items-center gap-3 px-2 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <LogOut className="h-4 w-4" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
