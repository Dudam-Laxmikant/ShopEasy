import React from 'react';
import { MapPin, Plus, Trash2, Edit3, CheckCircle2 } from 'lucide-react';

const Addresses = () => {
    const addresses = [
        {
            id: 1,
            type: 'Home',
            isDefault: true,
            name: 'John Doe',
            phone: '+1 (555) 000-1111',
            details: '123 Luxury Lane, Apt 4B, Beverly Hills, CA 90210, USA'
        },
        {
            id: 2,
            type: 'Office',
            isDefault: false,
            name: 'John Doe',
            phone: '+1 (555) 222-3333',
            details: '456 Business Park, Suite 200, San Francisco, CA 94105, USA'
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Saved Addresses</h1>
                    <p className="text-gray-500 mt-1 font-medium">Manage your delivery and billing locations</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                    <Plus className="w-5 h-5" />
                    Add New Address
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {addresses.map((address) => (
                    <div key={address.id} className={`relative p-6 rounded-3xl border-2 transition-all duration-300 ${address.isDefault ? 'border-indigo-600 bg-indigo-50/5' : 'border-gray-100 hover:border-gray-200'
                        }`}>
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${address.isDefault ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{address.type}</h3>
                                    {address.isDefault && (
                                        <div className="flex items-center gap-1.5 text-indigo-600 text-[10px] font-black uppercase tracking-widest mt-0.5">
                                            <CheckCircle2 className="w-3 h-3" /> Default Address
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-black text-gray-900">{address.name}</p>
                                <p className="text-xs font-bold text-gray-400 mt-0.5">{address.phone}</p>
                            </div>
                            <p className="text-sm text-gray-600 font-medium leading-relaxed leading-extra">
                                {address.details}
                            </p>
                        </div>

                        {!address.isDefault && (
                            <button className="w-full mt-6 py-3 border border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest text-gray-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all">
                                Set as Default
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Addresses;
