import React from 'react';
import {
    TrendingUp,
    ShoppingBag,
    Wallet,
    AlertTriangle,
    ArrowUpRight,
    ArrowDownRight,
    Package,
    Users,
    ChevronRight,
    MoreVertical
} from 'lucide-react';

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-2xl ${color} bg-opacity-10 transition-colors`}>
                <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
            </div>
            <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400 border-none bg-transparent cursor-pointer">
                <MoreVertical className="w-4 h-4" />
            </button>
        </div>
        <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
                <span className={`flex items-center text-xs font-bold leading-none ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                    {change}
                </span>
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const stats = [
        { title: 'Total Revenue', value: '₹2,45,600', change: '12.5%', isPositive: true, icon: Wallet, color: 'bg-blue-600' },
        { title: 'Orders Received', value: '456', change: '8.2%', isPositive: true, icon: ShoppingBag, color: 'bg-purple-600' },
        { title: 'Avg. Order Value', value: '₹538', change: '2.1%', isPositive: false, icon: TrendingUp, color: 'bg-orange-600' },
        { title: 'Store Visitors', value: '12,890', change: '15.3%', isPositive: true, icon: Users, color: 'bg-green-600' },
    ];

    const recentOrders = [
        { id: '#ORD-7892', customer: 'Sarah Jenkins', product: 'Premium Cotton Shirt', date: '2 mins ago', status: 'Pending', price: '₹1,699' },
        { id: '#ORD-7891', customer: 'Mike Ross', product: 'Smart Watch S7', date: '15 mins ago', status: 'Shipped', price: '₹4,299' },
        { id: '#ORD-7890', customer: 'Harvey Specter', product: 'Leather Sneakers', date: '45 mins ago', status: 'Delivered', price: '₹2,899' },
        { id: '#ORD-7889', customer: 'Donna Paulsen', product: 'Wireless Headphones', date: '1 hour ago', status: 'Processing', price: '₹1,999' },
    ];

    return (
        <div className="space-y-8 pb-12">
            {/* Greeting */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back, John! 👋</h1>
                    <p className="text-gray-500 mt-1">Here's what's happening with your store today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-white text-gray-700 font-bold py-2.5 px-4 rounded-xl border border-gray-200 shadow-sm hover:bg-gray-50 transition-all cursor-pointer text-sm">
                        Download Report
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl shadow-lg shadow-blue-200 transition-all border-none cursor-pointer text-sm">
                        Add Product
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <StatCard key={idx} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
                        <button className="text-blue-600 font-bold text-sm hover:underline border-none bg-transparent cursor-pointer">
                            View All
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {recentOrders.map((order, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-bold text-gray-900">{order.id}</p>
                                            <p className="text-xs text-gray-500">{order.date}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                                            <p className="text-xs text-gray-500">{order.product}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold
                                                ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                            {order.price}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 border-none bg-transparent cursor-pointer transition-colors">
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Side Panels */}
                <div className="space-y-8">
                    {/* Low Stock Alert */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-red-100 rounded-xl">
                                <AlertTriangle className="w-5 h-5 text-red-600" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Inventory Status</h2>
                        </div>
                        <p className="text-sm text-gray-500">The following items are running low on stock. Restock soon to avoid lost sales.</p>
                        <div className="space-y-3 pt-2">
                            {[
                                { name: 'Cotton Shirt Blue', stock: 5, color: 'text-red-600' },
                                { name: 'Smart Watch S7', stock: 12, color: 'text-orange-600' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-2xl">
                                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                    <span className={`text-xs font-bold ${item.color}`}>Only {item.stock} left</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full bg-gray-900 text-white font-bold py-3 px-4 rounded-xl text-sm hover:bg-black transition-all border-none cursor-pointer mt-2">
                            Manage Inventory
                        </button>
                    </div>

                    {/* Quick Tips */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl shadow-lg relative overflow-hidden group">
                        <div className="relative z-10 space-y-4 text-white">
                            <h2 className="text-lg font-bold">Seller Tip of the Day</h2>
                            <p className="text-sm text-blue-100 leading-relaxed">
                                Products with high-quality white background images see a 35% higher conversion rate. Update your photos today!
                            </p>
                            <button className="bg-white text-blue-600 font-bold py-2 px-4 rounded-xl text-xs hover:bg-blue-50 transition-all border-none cursor-pointer">
                                Learn More
                            </button>
                        </div>
                        <TrendingUp className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
