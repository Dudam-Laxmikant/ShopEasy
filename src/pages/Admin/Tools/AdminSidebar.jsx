import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    ShoppingCart,
    ShieldCheck,
    BarChart3,
    Settings,
    Image,
    CreditCard,
    Cpu,
    Lock,
    HelpCircle,
    ChevronRight,
    Search,
    Megaphone,
    Ticket,
    Database,
    Zap,
    Terminal,
    X,
    BookOpen
} from 'lucide-react';

const AdminSidebar = ({ isOpen, onClose }) => {
    const [openCollapsible, setOpenCollapsible] = useState({
        Sellers: false,
        Products: false,
        Customers: false,
        Orders: false
    });

    const toggleCollapsible = (name) => {
        setOpenCollapsible(prev => ({
            ...prev,
            [name]: !prev[name]
        }));
    };

    const mainNavigation = [
        {
            title: 'Control Center',
            links: [
                { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
            ]
        },
        {
            title: 'Management',
            links: [
                {
                    name: 'Sellers',
                    icon: Users,
                    isCollapsible: true,
                    subLinks: [
                        { name: 'All Sellers', path: '/admin/sellers-list' },
                        { name: 'Seller Verification', path: '/admin/sellers', badge: '12' },
                        { name: 'Seller Documents', path: '/admin/sellers' },
                        { name: 'Seller Payouts', path: '/admin/finances' },
                        { name: 'Seller Performance', path: '/admin/analytics' }
                    ]
                },
                {
                    name: 'Customers',
                    icon: Users,
                    isCollapsible: true,
                    subLinks: [
                        { name: 'Customers', path: '/admin/clients-list' },
                        { name: 'Blocked Customers', path: '/admin/clients-list' }
                    ]
                },
                { name: 'Admins', path: '/admin/admins-list', icon: ShieldCheck },
            ]
        },
        {
            title: 'Product Management',
            links: [
                {
                    name: 'Products',
                    icon: ShoppingCart,
                    isCollapsible: true,
                    subLinks: [
                        { name: 'All Products', path: '/admin/moderation' },
                        { name: 'Product Approval', path: '/admin/moderation', badge: '45' },
                        { name: 'Reported Products', path: '/admin/moderation' }
                    ]
                }
            ]
        },
        {
            title: 'Global Data',
            links: [
                { name: 'Categories', path: '/admin/categories', icon: BookOpen },
                { name: 'Sub Categories', path: '/admin/categories', icon: BookOpen },
                { name: 'Brands', path: '/admin/brands', icon: BookOpen },
                { name: 'Units', path: '/admin/categories', icon: BookOpen },
                { name: 'Colors', path: '/admin/categories', icon: BookOpen },
                { name: 'Sizes', path: '/admin/categories', icon: BookOpen },
                { name: 'Tags', path: '/admin/categories', icon: BookOpen },
            ]
        },
        {
            title: 'Order Management',
            links: [
                {
                    name: 'Orders',
                    icon: ShoppingCart,
                    isCollapsible: true,
                    subLinks: [
                        { name: 'All Orders', path: '/admin/orders' },
                        { name: 'Pending', path: '/admin/orders' },
                        { name: 'Processing', path: '/admin/orders' },
                        { name: 'Shipped', path: '/admin/orders' },
                        { name: 'Delivered', path: '/admin/orders' },
                        { name: 'Cancelled', path: '/admin/orders' },
                        { name: 'Returns', path: '/admin/orders' },
                        { name: 'Refunds', path: '/admin/orders' }
                    ]
                }
            ]
        },
        // {
        //     title: 'Growth & Marketing',
        //     links: [
        //         { name: 'Banner Control', path: '/admin/marketing/banners', icon: Image },
        //         { name: 'Campaign/Coupons', path: '/admin/marketing/coupons', icon: Ticket },
        //         { name: 'Promotions', path: '/admin/marketing/promotions', icon: Megaphone },
        //     ]
        // },
        // {
        //     title: 'Core Infrastructure',
        //     links: [
        //         { name: 'System Config', path: '/admin/system', icon: Cpu },
        //         { name: 'Access Control', path: '/admin/security', icon: Lock },
        //         { name: 'Global Settings', path: '/admin/settings', icon: Settings },
        //     ]
        // },
        // {
        //     title: 'Core Infrastructure',
        //     links: [
        //         { name: 'System Config', path: '/admin/system', icon: Cpu },
        //         { name: 'Access Control', path: '/admin/security', icon: Lock },
        //         { name: 'Global Settings', path: '/admin/settings', icon: Settings },
        //     ]
        // },

    ];

    return (
        <aside className={`
            fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white border-r border-slate-200 transform transition-transform duration-500 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            flex flex-col shadow-2xl lg:shadow-none
        `}>
            {/* Header / Brand */}
            <div className="h-20 flex items-center px-8 border-b border-slate-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100">
                        <Terminal className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-black text-slate-800 uppercase tracking-widest italic">Nexus <span className="text-indigo-600">OS</span></span>
                </div>
                <button onClick={onClose} className="lg:hidden ml-auto p-2 hover:bg-slate-100 rounded-xl transition-colors border-none bg-transparent cursor-pointer">
                    <X className="w-5 h-5 text-slate-400" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-8 px-4 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
                {mainNavigation.map((group, groupIdx) => (
                    <div key={groupIdx} className={`${groupIdx !== 0 ? 'mt-10' : ''}`}>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-4">
                            {group.title}
                        </h3>
                        <div className="space-y-1">
                            {group.links.map((link) => {
                                if (link.isCollapsible) {
                                    const isOpenMenu = openCollapsible[link.name];
                                    return (
                                        <div key={link.name} className="space-y-1">
                                            <button
                                                onClick={() => toggleCollapsible(link.name)}
                                                className={`w-full flex items-center justify-between group px-4 py-3 rounded-2xl text-[13px] font-bold transition-all duration-300 border-none bg-transparent cursor-pointer
                                                    ${isOpenMenu 
                                                        ? 'bg-indigo-50/40 text-indigo-600' 
                                                        : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <link.icon className={`w-5 h-5 transition-colors ${isOpenMenu ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                                                    <span>{link.name}</span>
                                                </div>
                                                <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${isOpenMenu ? 'rotate-90 text-indigo-600' : 'group-hover:text-slate-600'}`} />
                                            </button>
                                            
                                            {isOpenMenu && (
                                                <div className="pl-6 space-y-1 mt-1 border-l-2 border-slate-100 ml-6">
                                                    {link.subLinks.map((subLink) => (
                                                        <NavLink
                                                            key={subLink.name}
                                                            to={subLink.path}
                                                            className={({ isActive }) => `
                                                                flex items-center justify-between px-4 py-2.5 rounded-xl text-[12px] font-bold transition-all duration-250 no-underline
                                                                ${isActive
                                                                    ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                                                                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                                                                }
                                                            `}
                                                        >
                                                            <span>{subLink.name}</span>
                                                            {subLink.badge && (
                                                                <span className="px-2 py-0.5 rounded-lg text-[9px] font-black bg-indigo-600 text-[#EFECE3]">
                                                                    {subLink.badge}
                                                                </span>
                                                            )}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }

                                return (
                                    <NavLink
                                        key={link.name}
                                        to={link.path}
                                        className={({ isActive }) => `
                                            flex items-center justify-between group px-4 py-3 rounded-2xl text-[13px] font-bold transition-all duration-300 no-underline
                                            ${isActive
                                                ? 'bg-indigo-50 text-indigo-600 border border-indigo-100 shadow-sm'
                                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                                            }
                                        `}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                <div className="flex items-center gap-3">
                                                    <link.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                                                    <span>{link.name}</span>
                                                </div>
                                                {link.badge && (
                                                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                                        {link.badge}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </NavLink>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer / Docs */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                <button className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-600/5 transition-all text-left border-none bg-transparent cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-indigo-50 transition-colors">
                            <BookOpen className="w-4 h-4 text-slate-500 group-hover:text-indigo-600" />
                        </div>
                        <span className="text-[13px] font-bold text-slate-700">Documentation</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-all" />
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
