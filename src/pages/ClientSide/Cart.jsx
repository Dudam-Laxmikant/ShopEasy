import React from 'react';
import { useCart } from './context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 bg-white rounded-3xl shadow-sm border border-gray-100">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag className="w-10 h-10 text-gray-200" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">Your Cart is Empty</h2>
                <p className="text-gray-500 mb-8 max-w-sm text-center font-medium">Looks like you haven't discovered anything you love yet. Let's change that!</p>
                <Link
                    to="/products"
                    className="px-10 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-gray-200 no-underline"
                >
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Cart Items List */}
                <div className="flex-1 space-y-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Shopping Cart</h1>
                        <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">{cartCount} Items</span>
                    </div>

                    <div className="space-y-6">
                        {cart.map((item) => (
                            <div key={item.id} className="group bg-white p-6 rounded-[2.5rem] border border-gray-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 flex flex-col sm:flex-row gap-6">
                                {/* Product Image */}
                                <div className="w-full sm:w-40 h-48 bg-gray-50 rounded-3xl overflow-hidden border border-gray-50 flex-shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                </div>

                                {/* Info */}
                                <div className="flex-1 flex flex-col justify-between py-2">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="text-xl font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{item.title}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-2 text-gray-300 hover:text-red-500 transition-colors border-none bg-transparent cursor-pointer"
                                            >
                                                <Trash2 className="w-6 h-6" />
                                            </button>
                                        </div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Saller: {item.sellerType || 'Standard'}</p>
                                    </div>

                                    <div className="flex items-end justify-between mt-6">
                                        <div className="flex items-center bg-gray-50 rounded-2xl p-1.5 border border-gray-100 shadow-sm">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-10 h-10 flex items-center justify-center hover:bg-white hover:text-blue-600 rounded-xl transition-all border-none bg-transparent cursor-pointer"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-12 text-center text-lg font-black text-gray-900">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-10 h-10 flex items-center justify-center hover:bg-white hover:text-blue-600 rounded-xl transition-all border-none bg-transparent cursor-pointer"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-gray-900 tracking-tighter">${(item.price * item.quantity).toFixed(2)}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">${item.price} per item</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-[400px]">
                    <div className="bg-gray-900 rounded-[3rem] p-10 text-white sticky top-24 shadow-2xl overflow-hidden">
                        {/* Decorative Background Glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[100px]" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 blur-[100px]" />

                        <h2 className="text-2xl font-black uppercase tracking-wider mb-8 relative">Summary</h2>

                        <div className="space-y-6 relative border-b border-white/10 pb-8">
                            <div className="flex justify-between items-center text-gray-400 font-bold uppercase text-xs tracking-widest">
                                <span>Subtotal</span>
                                <span className="text-white text-lg">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-400 font-bold uppercase text-xs tracking-widest">
                                <span>Shipping estimate</span>
                                <span className="text-white text-lg">$5.00</span>
                            </div>
                            <div className="flex justify-between items-center text-gray-400 font-bold uppercase text-xs tracking-widest">
                                <span>Tax estimate</span>
                                <span className="text-white text-lg">$12.50</span>
                            </div>
                        </div>

                        <div className="py-8 space-y-6 relative">
                            <div className="flex justify-between items-end">
                                <span className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-1">Total Order</span>
                                <span className="text-4xl font-black text-yellow-400 tracking-tighter">${(cartTotal + 17.50).toFixed(2)}</span>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full py-5 bg-yellow-400 text-gray-900 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-yellow-500 transition-all flex items-center justify-center gap-3 border-none cursor-pointer shadow-xl shadow-yellow-400/10"
                            >
                                Proceed to Checkout <ArrowRight className="w-5 h-5" />
                            </button>

                            <Link
                                to="/products"
                                className="w-full py-4 text-center text-white/50 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest block no-underline"
                            >
                                Continue Shopping
                            </Link>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-8 mt-4">
                            <div className="flex flex-col items-center gap-2 text-center group">
                                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-blue-500/20 transition-colors">
                                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                                </div>
                                <span className="text-[8px] font-black uppercase text-gray-500">Secure</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 text-center group">
                                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-green-500/20 transition-colors">
                                    <Truck className="w-5 h-5 text-green-400" />
                                </div>
                                <span className="text-[8px] font-black uppercase text-gray-500">Fast</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 text-center group">
                                <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-purple-500/20 transition-colors">
                                    <RefreshCw className="w-5 h-5 text-purple-400" />
                                </div>
                                <span className="text-[8px] font-black uppercase text-gray-500">Return</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
