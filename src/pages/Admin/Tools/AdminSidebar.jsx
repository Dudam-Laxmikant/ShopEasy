import React from 'react';
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
    const mainNavigation = [
        {
            title: 'Control Center',
            links: [
                { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
                { name: 'System Logs', path: '/admin/logs', icon: Database },
                { name: 'Analytics', path: '/admin/analytics', icon: Zap },
            ]
        },
        {
            title: 'Entity Management',
            links: [
                { name: 'Sellers Verification', path: '/admin/sellers', icon: Users, badge: '12' },
                { name: 'Product Moderation', path: '/admin/moderation', icon: ShieldCheck, badge: '45' },
                { name: 'User Directory', path: '/admin/users', icon: Search },
            ]
        },
        {
            title: 'Business Engine',
            links: [
                { name: 'Global Orders', path: '/admin/orders', icon: ShoppingCart },
                { name: 'Financial Hub', path: '/admin/finances', icon: CreditCard },
                { name: 'Settlement Control', path: '/admin/settlements', icon: BarChart3 },
            ]
        },
        {
            title: 'Growth & Marketing',
            links: [
                { name: 'Banner Control', path: '/admin/marketing/banners', icon: Image },
                { name: 'Campaign/Coupons', path: '/admin/marketing/coupons', icon: Ticket },
                { name: 'Promotions', path: '/admin/marketing/promotions', icon: Megaphone },
            ]
        },
        {
            title: 'Core Infrastructure',
            links: [
                { name: 'System Config', path: '/admin/system', icon: Cpu },
                { name: 'Access Control', path: '/admin/security', icon: Lock },
                { name: 'Global Settings', path: '/admin/settings', icon: Settings },
            ]
        }
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
                            {group.links.map((link) => (
                                <NavLink
                                    key={link.name}
                                    to={link.path}
                                    className={({ isActive }) => `
                                        flex items-center justify-between group px-4 py-3 rounded-2xl text-[13px] font-bold transition-all duration-300
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
                            ))}
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
