import React, { useState, useMemo } from 'react';
import {
    FileText,
    Download,
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Send,
    CheckCircle2,
    Clock,
    AlertCircle,
    Printer,
    ArrowUpRight,
    DollarSign,
    Calendar,
    ChevronDown,
    X
} from 'lucide-react';

const InvoiceManagement = () => {
    const [selectedTab, setSelectedTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [activeMenuId, setActiveMenuId] = useState(null);

    const [invoices, setInvoices] = useState([
        {
            id: 'INV-2024-001',
            orderId: '#ORD-9021',
            customer: 'Sarah Jenkins',
            email: 'sarah.j@example.com',
            date: 'Feb 22, 2026',
            dueDate: 'Mar 08, 2026',
            amount: '₹3,398.00',
            status: 'Pending',
            items: [
                { name: 'Silk Floral Saree', qty: 1, price: '₹2,499.00', tax: '₹150.00' },
                { name: 'Gold Bangle Set', qty: 1, price: '₹899.00', tax: '₹50.00' }
            ],
            subtotal: '₹3,398.00',
            tax: '₹200.00',
            shipping: '₹0.00'
        },
        {
            id: 'INV-2024-002',
            orderId: '#ORD-9020',
            customer: 'Mike Ross',
            email: 'mike.r@example.com',
            date: 'Feb 22, 2026',
            dueDate: 'Mar 08, 2026',
            amount: '₹4,299.00',
            status: 'Pending',
            items: [
                { name: 'Levi\'s Men\'s Jeans', qty: 1, price: '₹4,299.00', tax: '₹0.00' }
            ],
            subtotal: '₹4,299.00',
            tax: '₹0.00',
            shipping: '₹0.00'
        },
        {
            id: 'INV-2024-003',
            orderId: '#ORD-9019',
            customer: 'Harvey Specter',
            email: 'harvey@pearson.com',
            date: 'Feb 21, 2026',
            dueDate: 'Mar 07, 2026',
            amount: '₹8,597.00',
            status: 'Paid',
            items: [
                { name: 'Premium Cotton Suit', qty: 1, price: '₹5,999.00', tax: '₹400.00' },
                { name: 'White Formal Shirt', qty: 1, price: '₹1,599.00', tax: '₹100.00' }
            ],
            subtotal: '₹7,598.00',
            tax: '₹500.00',
            shipping: '₹499.00'
        },
        {
            id: 'INV-2024-004',
            orderId: '#ORD-9018',
            customer: 'Donna Paulsen',
            email: 'donna.p@example.com',
            date: 'Feb 21, 2026',
            dueDate: 'Mar 07, 2026',
            amount: '₹1,999.00',
            status: 'Paid',
            items: [
                { name: 'Canvas Handbag', qty: 1, price: '₹1,999.00', tax: '₹0.00' }
            ],
            subtotal: '₹1,999.00',
            tax: '₹0.00',
            shipping: '₹0.00'
        }
    ]);

    const stats = useMemo(() => [
        { label: 'Total Revenue', value: '₹34,396.00', icon: DollarSign, color: 'text-blue-600', bg: 'bg-blue-100', trend: '+12.5%' },
        { label: 'Paid Invoices', value: '142', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100', trend: '85%' },
        { label: 'Pending Payments', value: '₹28,450.00', icon: Clock, color: 'text-orange-600', bg: 'bg-orange-100', trend: '12 active' },
        { label: 'Overdue', value: '3', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100', trend: 'Critical' },
    ], []);

    const filteredInvoices = useMemo(() => {
        return invoices.filter(inv => {
            const matchesTab = selectedTab === 'All' || inv.status === selectedTab;
            const matchesSearch = inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                inv.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                inv.customer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [invoices, selectedTab, searchQuery]);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Paid': return 'bg-green-100 text-green-700';
            case 'Pending': return 'bg-orange-100 text-orange-700';
            case 'Overdue': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Invoice Management</h1>
                    <p className="text-gray-500 font-medium">Generate, track and manage customer billing & tax receipts.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm cursor-pointer">
                        <Download className="w-4 h-4" /> Export All
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-2xl text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 border-none cursor-pointer">
                        <FileText className="w-4 h-4" /> New Invoice
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3.5 rounded-2xl ${stat.bg} group-hover:scale-110 transition-transform duration-500`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-full ${stat.color} ${stat.bg} opacity-80 uppercase tracking-wider`}>
                                {stat.trend}
                            </span>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                            <p className="text-2xl font-black text-gray-900 tracking-tight">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                {/* Tabs & Search */}
                <div className="p-8 border-b border-gray-50 flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div className="flex gap-8 overflow-x-auto w-full lg:w-auto scrollbar-hide">
                        {['All', 'Paid', 'Pending', 'Overdue'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                className={`pb-4 text-sm font-black transition-all relative border-none bg-transparent cursor-pointer whitespace-nowrap outline-none
                                    ${selectedTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                {tab}
                                {selectedTab === tab && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-t-full animate-in slide-in-from-bottom-1 duration-300"></div>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-4 w-full lg:w-96">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search Invoices..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                            />
                        </div>
                        <button className="p-3 bg-gray-50 border-none rounded-2xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all cursor-pointer">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Invoice ID</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Customer</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Amount</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredInvoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-gray-900">{inv.id}</span>
                                            <span className="text-[10px] font-bold text-gray-400">{inv.orderId}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold text-gray-700">{inv.customer}</td>
                                    <td className="px-8 py-6 text-sm font-bold text-gray-500">{inv.date}</td>
                                    <td className="px-8 py-6 text-sm font-black text-gray-900">{inv.amount}</td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(inv.status)}`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 relative">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setSelectedInvoice(inv)}
                                                className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-blue-600 hover:border-blue-100 hover:shadow-lg transition-all cursor-pointer"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-green-600 hover:border-green-100 hover:shadow-lg transition-all cursor-pointer">
                                                <Download className="w-4 h-4" />
                                            </button>
                                            <div className="relative">
                                                <button
                                                    onClick={() => setActiveMenuId(activeMenuId === inv.id ? null : inv.id)}
                                                    className="p-2.5 bg-white border border-gray-100 rounded-xl text-gray-400 hover:bg-gray-50 transition-all cursor-pointer"
                                                >
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Invoice Preview Modal */}
            {selectedInvoice && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-500">
                        {/* Modal Header */}
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 border border-gray-100">
                                    <FileText className="w-7 h-7" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Invoice Details</h2>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{selectedInvoice.id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedInvoice(null)}
                                className="p-3 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 hover:shadow-lg transition-all cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-hide">
                            <div className="flex justify-between items-start">
                                <div className="space-y-4 text-sm font-bold text-gray-600">
                                    <p className="text-[10px] uppercase font-black text-gray-400">Billed From</p>
                                    <p className="text-gray-900 font-black text-lg">ShopEasy Seller</p>
                                    <p>Warehouse HQ, Silicon Valley</p>
                                    <p>contact@shopeasy.com</p>
                                </div>
                                <div className="text-right space-y-4 text-sm font-bold text-gray-600">
                                    <p className="text-[10px] uppercase font-black text-gray-400">Invoice Status</p>
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-block ${getStatusStyle(selectedInvoice.status)}`}>
                                        {selectedInvoice.status}
                                    </span>
                                    <p className="mt-4">Issued: {selectedInvoice.date}</p>
                                    <p className="text-red-500">Due: {selectedInvoice.dueDate}</p>
                                </div>
                            </div>

                            <div className="p-8 bg-blue-50/30 border border-blue-100/30 rounded-[32px] space-y-4">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                                        <Printer className="w-5 h-5" />
                                    </div>
                                    <p className="text-blue-900 font-black uppercase text-xs tracking-widest">Customer Information</p>
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <p className="text-[10px] font-black text-blue-400 uppercase mb-1">Name</p>
                                        <p className="text-blue-900 font-black">{selectedInvoice.customer}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-blue-400 uppercase mb-1">Email</p>
                                        <p className="text-blue-900 font-black">{selectedInvoice.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Line Items */}
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Itemized Breakdown</h4>
                                <div className="space-y-4">
                                    {selectedInvoice.items.map((item, i) => (
                                        <div key={i} className="flex justify-between items-center p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
                                            <div className="space-y-1">
                                                <p className="font-black text-gray-900">{item.name}</p>
                                                <p className="text-xs text-gray-500 font-bold tracking-wide">Qty: {item.qty} × {item.price}</p>
                                            </div>
                                            <p className="font-black text-gray-900">{item.price}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="border-t border-gray-100 pt-8 space-y-4">
                                <div className="flex justify-between text-sm font-black text-gray-500">
                                    <span>Subtotal</span>
                                    <span>{selectedInvoice.subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm font-black text-gray-500">
                                    <span>Taxes (GST 18%)</span>
                                    <span>{selectedInvoice.tax}</span>
                                </div>
                                <div className="flex justify-between text-sm font-black text-gray-500">
                                    <span>Shipping</span>
                                    <span>{selectedInvoice.shipping}</span>
                                </div>
                                <div className="flex justify-between pt-6 border-t border-gray-50">
                                    <span className="text-lg font-black text-gray-900 uppercase tracking-widest">Total Amount</span>
                                    <span className="text-2xl font-black text-blue-600 tracking-tight">{selectedInvoice.amount}</span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex gap-4">
                            <button className="flex-1 py-4 bg-gray-900 text-white rounded-2xl text-sm font-black hover:bg-black transition-all shadow-xl hover:shadow-black/20 flex items-center justify-center gap-2 border-none cursor-pointer">
                                <Download className="w-5 h-5" /> Download PDF
                            </button>
                            <button className="flex-1 py-4 bg-white border border-gray-100 text-gray-900 rounded-2xl text-sm font-black hover:bg-gray-50 transition-all flex items-center justify-center gap-2 cursor-pointer">
                                <Printer className="w-5 h-5 text-gray-400" /> Print
                            </button>
                            <button className="p-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-100 transition-all border-none cursor-pointer">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvoiceManagement;
