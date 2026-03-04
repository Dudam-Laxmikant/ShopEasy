import React from 'react';
import { CreditCard, Plus, Trash2, ShieldCheck, Landmark } from 'lucide-react';

const Payments = () => {
    const paymentMethods = [
        {
            id: 1,
            type: 'Credit Card',
            brand: 'Visa',
            last4: '4242',
            expiry: '05/26',
            isDefault: true
        },
        {
            id: 2,
            type: 'Bank Account',
            brand: 'HDFC Bank',
            last4: '8812',
            expiry: '-',
            isDefault: false
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Payment Methods</h1>
                    <p className="text-gray-500 mt-1 font-medium">Securely manage your saved payment details</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
                    <Plus className="w-5 h-5" />
                    Add New Method
                </button>
            </div>

            <div className="space-y-4">
                {paymentMethods.map((method) => (
                    <div key={method.id} className={`group relative p-6 rounded-3xl border-2 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${method.isDefault ? 'border-indigo-600 bg-indigo-50/5' : 'border-gray-100 hover:border-gray-200'
                        }`}>
                        <div className="flex items-center gap-5">
                            <div className={`w-14 h-10 rounded-xl flex items-center justify-center border ${method.isDefault ? 'border-indigo-200 bg-white' : 'border-gray-100 bg-gray-50'
                                }`}>
                                {method.type === 'Credit Card' ? (
                                    <CreditCard className={`w-6 h-6 ${method.isDefault ? 'text-indigo-600' : 'text-gray-400'}`} />
                                ) : (
                                    <Landmark className={`w-6 h-6 ${method.isDefault ? 'text-indigo-600' : 'text-gray-400'}`} />
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                    {method.brand} {method.type === 'Credit Card' ? `•••• ${method.last4}` : `(Ending in ${method.last4})`}
                                    {method.isDefault && (
                                        <span className="bg-indigo-600 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">Default</span>
                                    )}
                                </h3>
                                <p className="text-xs font-bold text-gray-400 mt-0.5 uppercase tracking-wider">
                                    Expires: {method.expiry}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 self-end sm:self-center">
                            <button className="text-sm font-black text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest flex items-center gap-1.5">
                                <Trash2 className="w-3.5 h-3.5" /> Remove
                            </button>
                            <button className="px-5 py-2.5 bg-white border border-gray-100 rounded-xl text-xs font-black uppercase tracking-widest text-gray-900 hover:bg-gray-50 transition-all shadow-sm">
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 bg-emerald-50/50 border border-emerald-100 rounded-3xl p-6 sm:p-8 flex items-start gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-emerald-100 shadow-sm flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                    <h4 className="font-black text-emerald-900 uppercase tracking-widest text-sm mb-2">Secure Payments</h4>
                    <p className="text-emerald-800/70 text-sm font-medium leading-relaxed max-w-2xl">
                        Your payment information is encrypted and stored securely. We never share your full card details with anyone. Shop with confidence.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Payments;
