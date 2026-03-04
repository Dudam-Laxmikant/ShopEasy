import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    ShoppingBag,
    Heart,
    MapPin,
    CreditCard,
    Clock,
    User,
    ChevronRight
} from 'lucide-react';

const AccountSidebar = () => {
    const menuItems = [
        { name: 'My Orders', path: '/account/orders', icon: ShoppingBag },
        { name: 'My Wishlist', path: '/account/wishlist', icon: Heart },
        // { name: 'My Addresses', path: '/account/addresses', icon: MapPin },
        // { name: 'My Payments', path: '/account/payments', icon: CreditCard },
        // { name: 'Recently Viewed', path: '/account/recently-viewed', icon: Clock },
    ];

    return (
        <aside className="w-full md:w-80 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden self-start">
            <div className="p-6 border-b border-gray-50 flex items-center gap-4 bg-gradient-to-r from-gray-50 to-white">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-md">
                    <User className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-900">John Doe</h3>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Premium Member</p>
                </div>
            </div>

            <nav className="p-3">
                <ul className="space-y-1">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group
                                    ${isActive
                                        ? 'bg-[#A37B3C]/10 text-[#A37B3C]'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-indigo-600'}
                                `}
                            >
                                <div className="flex items-center gap-4">
                                    <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110`} />
                                    <span className="font-semibold text-[15px]">{item.name}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" />
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="p-6 mt-4 border-t border-gray-50">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                    <p className="text-[13px] text-slate-500 font-medium leading-relaxed">
                        Manage your preferences, orders, and saved items easily in your dashboard.
                    </p>
                </div>
            </div>
        </aside>
    );
};

export default AccountSidebar;
