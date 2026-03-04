import React, { useState } from 'react';
import { useCart } from './context/CartContext';
import {
    CheckCircle2,
    CreditCard,
    Truck,
    ShieldCheck,
    ChevronRight,
    ArrowLeft,
    Building2,
    User,
    MapPin,
    Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleOrder = () => {
        // Mock order processing
        setTimeout(() => {
            setStep(3);
            clearCart();
        }, 1500);
    };

    if (step === 3) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 bg-white rounded-[3rem] shadow-2xl border border-blue-50 animate-in zoom-in duration-700">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 animate-bounce">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Order Successful!</h2>
                <p className="text-gray-500 mb-8 max-w-sm text-center font-medium leading-relaxed">
                    Thank you for your purchase. We've sent a confirmation email to <span className="text-gray-900 font-bold">{form.email}</span>
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => navigate('/products')}
                        className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl"
                    >
                        Continue Shopping
                    </button>
                    <button
                        onClick={() => navigate('/account/orders')}
                        className="px-10 py-4 bg-gray-50 text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-200"
                    >
                        Track Order
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Progress Header */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-8 max-w-2xl mx-auto overflow-hidden">
                    <div className="flex flex-col items-center gap-2 group">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${step >= 1 ? 'bg-gray-900 text-white shadow-xl' : 'bg-gray-100 text-gray-400'}`}>
                            <Truck className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${step >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>Shipping</span>
                    </div>
                    <div className={`h-[2px] flex-1 mx-4 transition-all duration-700 ${step >= 2 ? 'bg-gray-900' : 'bg-gray-100'}`} />
                    <div className="flex flex-col items-center gap-2">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${step >= 2 ? 'bg-gray-900 text-white shadow-xl' : 'bg-gray-100 text-gray-400'}`}>
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${step >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>Payment</span>
                    </div>
                    <div className={`h-[2px] flex-1 mx-4 bg-gray-100`} />
                    <div className="flex flex-col items-center gap-2">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 text-gray-400`}>
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Success</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Form Section */}
                <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[3rem] border border-gray-100 shadow-sm animate-in fade-in duration-500">
                    {step === 1 ? (
                        <div className="space-y-8">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Shipping Details</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={form.fullName}
                                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-yellow-400 font-bold transition-all outline-none"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-yellow-400 font-bold transition-all outline-none"
                                        placeholder="name@example.com"
                                    />
                                </div>
                                <div className="sm:col-span-2 space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Shipping Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        <input
                                            type="text"
                                            value={form.address}
                                            onChange={(e) => setForm({ ...form, address: e.target.value })}
                                            className="w-full pl-16 pr-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-yellow-400 font-bold transition-all outline-none"
                                            placeholder="123 Street Name, Area"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">City</label>
                                    <input
                                        type="text"
                                        value={form.city}
                                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-yellow-400 font-bold transition-all outline-none"
                                        placeholder="City"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Postal Code</label>
                                    <input
                                        type="text"
                                        value={form.postalCode}
                                        onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                                        className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-yellow-400 font-bold transition-all outline-none"
                                        placeholder="000 000"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleNext}
                                className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-3 border-none cursor-pointer mt-8"
                            >
                                Continue to Payment <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <button onClick={handleBack} className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors border-none cursor-pointer">
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Payment Method</h2>
                            </div>
                            <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2.5rem] text-white space-y-8 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 blur-3xl rounded-full" />
                                <div className="flex justify-between items-start">
                                    <div className="w-14 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg shadow-inner" />
                                    <CreditCard className="w-8 h-8 opacity-20" />
                                </div>
                                <div className="space-y-6">
                                    <input
                                        type="text"
                                        className="w-full bg-transparent border-none text-2xl font-black tracking-[0.2em] placeholder:text-gray-600 outline-none"
                                        placeholder="XXXX XXXX XXXX XXXX"
                                        value={form.cardNumber}
                                        onChange={(e) => setForm({ ...form, cardNumber: e.target.value })}
                                    />
                                    <div className="flex justify-between">
                                        <input
                                            type="text"
                                            className="bg-transparent border-none text-xs font-black uppercase tracking-widest placeholder:text-gray-600 outline-none"
                                            placeholder="MM/YY"
                                            value={form.expiry}
                                            onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            className="bg-transparent border-none text-xs text-right font-black uppercase tracking-widest placeholder:text-gray-600 outline-none w-10"
                                            placeholder="CVV"
                                            value={form.cvv}
                                            onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-6 bg-blue-50 rounded-2xl text-blue-700 border border-blue-100">
                                <Lock className="w-5 h-5 flex-shrink-0" />
                                <p className="text-xs font-bold leading-relaxed">Your transaction is encrypted with military-grade security. We never store your full card details.</p>
                            </div>
                            <button
                                onClick={handleOrder}
                                className="w-full py-5 bg-yellow-400 text-gray-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-yellow-500 transition-all flex items-center justify-center gap-3 border-none cursor-pointer mt-8 shadow-xl shadow-yellow-400/10"
                            >
                                Complete Purchase <ShieldCheck className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Summary Section */}
                <div className="lg:col-span-5 h-fit">
                    <div className="bg-gray-50 p-8 sm:p-10 rounded-[3rem] border border-gray-100 space-y-8 sticky top-24">
                        <h3 className="text-xl font-black text-gray-900 tracking-tight">Order Summary</h3>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center p-2 bg-white rounded-2xl border border-gray-100 transition-all hover:shadow-sm">
                                    <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover border border-gray-100" />
                                    <div className="flex-1">
                                        <h4 className="text-xs font-black text-gray-900 line-clamp-1">{item.title}</h4>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{item.quantity} × ${item.price}</p>
                                    </div>
                                    <span className="text-sm font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-4 border-t border-gray-200 pt-8 pt-6">
                            <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                                <span>Subtotal</span>
                                <span className="text-gray-900">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                                <span>Shipping</span>
                                <span className="text-gray-900">$5.00</span>
                            </div>
                            <div className="flex justify-between items-end pt-4 border-t border-gray-200">
                                <span className="text-sm font-black text-gray-900 uppercase tracking-wider">Total</span>
                                <span className="text-3xl font-black text-gray-900 tracking-tighter">${(cartTotal + 5).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
