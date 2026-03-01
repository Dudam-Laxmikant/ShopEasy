import React, { useState, useMemo } from 'react';
import {
    Truck,
    Package,
    MapPin,
    Search,
    Filter,
    Clock,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    ExternalLink,
    Box,
    Navigation,
    Calendar,
    ArrowRight,
    X,
    MoreVertical,
    Eye
} from 'lucide-react';

const ShipmentTracking = () => {
    const [selectedTab, setSelectedTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedShipment, setSelectedShipment] = useState(null);

    const [shipments] = useState([
        {
            id: 'SHP-77203',
            orderId: '#ORD-9019',
            customer: 'Harvey Specter',
            carrier: 'Delhivery',
            trackingId: 'DLV992288110',
            status: 'In Transit',
            destination: 'Jubilee Hills, Hyderabad, TS',
            estDelivery: 'Mar 03, 2026',
            timeline: [
                { status: 'Order Processed', date: 'Feb 21, 11:30 AM', location: 'Warehouse HQ', done: true },
                { status: 'Picked Up by Carrier', date: 'Feb 21, 02:30 PM', location: 'Warehouse HQ', done: true },
                { status: 'At Hub', date: 'Feb 22, 01:00 AM', location: 'Delhi Hub', done: true },
                { status: 'Out for Delivery', date: '-', location: 'Hyderabad Center', done: false },
                { status: 'Delivered', date: '-', location: 'Customer Doorstep', done: false },
            ]
        },
        {
            id: 'SHP-77204',
            orderId: '#ORD-9020',
            customer: 'Mike Ross',
            carrier: 'BlueDart',
            trackingId: 'BD74421199',
            status: 'Picked Up',
            destination: 'Cyber City, Gurgaon, HR',
            estDelivery: 'Mar 05, 2026',
            timeline: [
                { status: 'Order Processed', date: 'Feb 22, 01:15 PM', location: 'Warehouse HQ', done: true },
                { status: 'Picked Up by Carrier', date: 'Feb 22, 04:00 PM', location: 'Warehouse HQ', done: true },
                { status: 'At Hub', date: '-', location: 'Transit Hub', done: false },
            ]
        },
        {
            id: 'SHP-77205',
            orderId: '#ORD-9021',
            customer: 'Sarah Jenkins',
            carrier: 'Ecom Express',
            trackingId: 'EE4410029',
            status: 'Out for Delivery',
            destination: 'Bandra West, Mumbai, MH',
            estDelivery: 'Today',
            timeline: [
                { status: 'Order Processed', date: 'Feb 22, 02:45 PM', location: 'Warehouse HQ', done: true },
                { status: 'Picked Up by Carrier', date: 'Feb 22, 06:00 PM', location: 'Warehouse HQ', done: true },
                { status: 'Out for Delivery', date: 'Mar 01, 08:30 AM', location: 'Mumbai Hub', done: true },
            ]
        },
        {
            id: 'SHP-77206',
            orderId: '#ORD-9018',
            customer: 'Donna Paulsen',
            carrier: 'Delhivery',
            trackingId: 'DLV11223344',
            status: 'Delivered',
            destination: 'Salt Lake, Kolkata, WB',
            estDelivery: 'Feb 21, 2026',
            timeline: [
                { status: 'Delivered', date: 'Feb 21, 05:00 PM', location: 'Customer Doorstep', done: true },
            ]
        }
    ]);

    const stats = useMemo(() => [
        { label: 'Active Shipments', value: '24', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Out for Delivery', value: '8', icon: Navigation, color: 'text-orange-600', bg: 'bg-orange-100' },
        { label: 'Delivered Today', value: '15', icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Delayed', value: '2', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-100' },
    ], []);

    const filteredShipments = useMemo(() => {
        return shipments.filter(shp => {
            const matchesTab = selectedTab === 'All' || shp.status === selectedTab;
            const matchesSearch = shp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                shp.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                shp.customer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [shipments, selectedTab, searchQuery]);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-green-100 text-green-700';
            case 'Out for Delivery': return 'bg-orange-100 text-orange-700';
            case 'In Transit': return 'bg-blue-100 text-blue-700';
            case 'Picked Up': return 'bg-purple-100 text-purple-700';
            case 'Delayed': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-8 pb-12 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Shipment Tracking</h1>
                    <p className="text-gray-500 font-medium">Track logistics, delivery status and courier performance.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm cursor-pointer">
                        Courier Settings
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 rounded-2xl text-sm font-bold text-white hover:bg-black transition-all shadow-xl shadow-gray-200 border-none cursor-pointer">
                        <Truck className="w-4 h-4" /> Bulk Ship
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
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                            <p className="text-2xl font-black text-gray-900 tracking-tight">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-4 items-center justify-between">
                <div className="flex gap-3 overflow-x-auto w-full lg:w-auto scrollbar-hide pb-2 lg:pb-0">
                    {['All', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setSelectedTab(tab)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border-none cursor-pointer
                                ${selectedTab === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-transparent text-gray-400 hover:text-gray-600'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="relative w-full lg:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search Tracking ID or Order..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/10 outline-none font-medium"
                    />
                </div>
            </div>

            {/* Shipment List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredShipments.map((shp) => (
                    <div key={shp.id} className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
                        {/* Status Accent Bar */}
                        <div className={`absolute top-0 left-0 w-2 h-full ${shp.status === 'Delivered' ? 'bg-green-500' : 'bg-blue-500'}`}></div>

                        <div className="flex justify-between items-start mb-6">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Shipping ID</p>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">{shp.id}</h3>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(shp.status)}`}>
                                {shp.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-blue-600 transition-colors">
                                        <Package className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Carrier</p>
                                        <p className="text-sm font-black text-gray-800">{shp.carrier}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Destination</p>
                                        <p className="text-sm font-black text-gray-800">{shp.destination}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4 text-right">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Tracking ID</p>
                                    <p className="text-sm font-black text-gray-900 font-mono tracking-tighter bg-gray-50 px-2 py-1 rounded-lg inline-block">{shp.trackingId}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Est. Delivery</p>
                                    <p className="text-sm font-black text-blue-600">{shp.estDelivery}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setSelectedShipment(shp)}
                                className="flex-1 py-4 bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-600 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border-none cursor-pointer flex items-center justify-center gap-2"
                            >
                                <Eye className="w-4 h-4" /> Live Tracking
                            </button>
                            <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-400 transition-all border-none cursor-pointer">
                                <ExternalLink className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Tracking Modal */}
            {selectedShipment && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-lg rounded-[48px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-500">
                        {/* Header */}
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600">
                                    <Navigation className="w-7 h-7" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-gray-900 tracking-tight">Real-time Tracking</h2>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{selectedShipment.trackingId}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedShipment(null)}
                                className="p-4 bg-white border border-gray-100 rounded-2xl text-gray-400 hover:text-gray-900 transition-all cursor-pointer shadow-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
                            <div className="space-y-12">
                                {selectedShipment.timeline.map((event, i) => (
                                    <div key={i} className="relative pl-12">
                                        {/* Connector Line */}
                                        {i !== selectedShipment.timeline.length - 1 && (
                                            <div className={`absolute left-[19px] top-6 w-0.5 h-16 ${event.done ? 'bg-blue-600' : 'bg-gray-100'}`}></div>
                                        )}

                                        {/* Status Dot */}
                                        <div className={`absolute left-0 top-0 w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center z-10 
                                            ${event.done ? 'bg-blue-600' : 'bg-white border-gray-100'}`}>
                                            {event.done ? (
                                                <CheckCircle2 className="w-5 h-5 text-white" />
                                            ) : (
                                                <Clock className="w-5 h-5 text-gray-300" />
                                            )}
                                        </div>

                                        <div className="space-y-1">
                                            <p className={`text-sm font-black uppercase tracking-wider ${event.done ? 'text-gray-900' : 'text-gray-300'}`}>
                                                {event.status}
                                            </p>
                                            <p className="text-xs font-bold text-gray-400">{event.location}</p>
                                            {event.date !== '-' && (
                                                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-2 px-2 py-0.5 bg-blue-50 rounded-full inline-block">
                                                    {event.date}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-10 border-t border-gray-50 flex flex-col gap-4">
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-3xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-blue-600">
                                        <Truck className="w-4 h-4" />
                                    </div>
                                    <p className="text-xs font-black text-blue-900 uppercase">Current Location</p>
                                </div>
                                <p className="text-xs font-black text-blue-600">En Route to Mumbai</p>
                            </div>
                            <button className="w-full py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-gray-200 border-none cursor-pointer">
                                Message Courier
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShipmentTracking;
