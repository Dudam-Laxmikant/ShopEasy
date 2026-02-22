import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Wallet,
    RefreshCcw,
    UserPlus,
    ShieldCheck,
    BarChart3,
    Box,
    FileText,
    Truck,
    HelpCircle,
    ChevronRight
} from 'lucide-react';

const SellerSidebar = ({ isOpen, onClose }) => {
    const menuItems = [
        {
            title: 'Store Overview',
            links: [
                { name: 'Dashboard', path: '/seller/dashboard', icon: LayoutDashboard },
                { name: 'Analytics', path: '/seller/analytics', icon: BarChart3 },
            ]
        },
        {
            title: 'Inventory & Products',
            links: [
                { name: 'Products', path: '/seller/products', icon: Package },
                { name: 'Add New Product', path: '/seller/add-product', icon: Box },
                { name: 'Stock Levels', path: '/seller/stock', icon: BarChart3 },
            ]
        },
        {
            title: 'Order Management',
            links: [
                { name: 'Recent Orders', path: '/seller/orders', icon: ShoppingCart },
                { name: 'Shipments', path: '/seller/shipments', icon: Truck },
                { name: 'Invoices', path: '/seller/invoices', icon: FileText },
            ]
        },
        {
            title: 'Financials',
            links: [
                { name: 'Payments', path: '/seller/payments', icon: Wallet },
                { name: 'Settlement Reports', path: '/seller/settlements', icon: FileText },
            ]
        },
        {
            title: 'After-Sales',
            links: [
                { name: 'Returns', path: '/seller/returns', icon: RefreshCcw },
            ]
        },
        {
            title: 'Account Verification',
            links: [
                { name: 'Registration', path: '/seller/registration', icon: UserPlus },
                { name: 'Verification Status', path: '/seller/verification', icon: ShieldCheck },
            ]
        }
    ];

    return (
        <>
            {/* Overlay for Mobile */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={onClose}
            ></div>

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 w-72 bg-white border-r border-gray-100 z-50 transition-all duration-300 transform 
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>

                <div className="flex flex-col h-full">
                    {/* Sidebar Header - Mobile Only */}
                    <div className="flex items-center justify-between p-6 lg:hidden border-b border-gray-50">
                        <span className="text-xl font-bold text-blue-600">SellerHub</span>
                        <button onClick={onClose} className="p-2 border-none bg-transparent cursor-pointer">
                            <ChevronRight className="w-5 h-5 text-gray-400 rotate-180" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-gray-200">
                        {menuItems.map((group, groupIdx) => (
                            <div key={groupIdx} className={`${groupIdx !== 0 ? 'mt-8' : ''}`}>
                                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[2px] mb-4 px-3">
                                    {group.title}
                                </h3>
                                <div className="space-y-1">
                                    {group.links.map((link) => (
                                        <NavLink
                                            key={link.name}
                                            to={link.path}
                                            className={({ isActive }) => `
                                                flex items-center justify-between group px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                                                ${isActive
                                                    ? 'bg-blue-50 text-blue-700'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }
                                            `}
                                        >
                                            <div className="flex items-center gap-3">
                                                <link.icon className={`w-4 h-4 transition-colors ${link.icon === LayoutDashboard ? '' : 'group-hover:text-blue-600'}`} />
                                                <span>{link.name}</span>
                                            </div>
                                            <ChevronRight className={`w-4 h-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0`} />
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Utility */}
                    <div className="p-4 border-t border-gray-50 bg-gray-50/50">
                        <button className="w-full flex items-center gap-3 px-3 py-3 text-sm font-bold text-gray-600 hover:text-blue-600 rounded-xl transition-all border-none bg-transparent cursor-pointer">
                            <HelpCircle className="w-4 h-4" />
                            <span>Help Center</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default SellerSidebar;
