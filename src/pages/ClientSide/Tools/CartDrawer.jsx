import React, { useEffect, useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
    const navigate = useNavigate();
    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 300);
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div className="fixed inset-0 z-[1000] overflow-hidden">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
                onClick={handleClose}
            />

            {/* Drawer */}
            <div className={`absolute inset-y-0 right-0 max-w-full flex sm:pl-10 transition-transform duration-300 ease-in-out ${isClosing ? 'translate-x-full' : 'translate-x-0'}`}>
                <div className="w-screen max-w-md">
                    <div className="h-full flex flex-col bg-white shadow-2xl skew-y-0 translate-z-0">
                        {/* Header */}
                        <div className="px-6 py-6 bg-gray-900 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-6 h-6 text-yellow-400" />
                                <h2 className="text-xl font-black uppercase tracking-wider">Your Cart</h2>
                                <span className="bg-yellow-400 text-gray-900 px-2.5 py-0.5 rounded-full text-xs font-black">
                                    {cartCount}
                                </span>
                            </div>
                            <button
                                onClick={handleClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors border-none bg-transparent cursor-pointer text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
                            {cart.length > 0 ? (
                                <div className="space-y-6">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4 group">
                                            <div className="w-20 h-24 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{item.title}</h3>
                                                    <p className="text-xs text-gray-400 font-bold uppercase mt-1">Saller: {item.sellerType || 'Standard'}</p>
                                                    <p className="text-lg font-black text-gray-900 mt-1">${item.price}</p>
                                                </div>
                                                <div className="flex items-center justify-between mt-2">
                                                    <div className="flex items-center bg-gray-100 rounded-xl px-2 py-1 gap-3">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-1 hover:text-blue-600 transition-colors border-none bg-transparent cursor-pointer"
                                                        >
                                                            <Minus className="w-3.5 h-3.5" />
                                                        </button>
                                                        <span className="text-sm font-black w-4 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1 hover:text-blue-600 transition-colors border-none bg-transparent cursor-pointer"
                                                        >
                                                            <Plus className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-gray-400 hover:text-red-500 transition-colors border-none bg-transparent cursor-pointer"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                                        <ShoppingBag className="w-10 h-10 text-gray-200" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                                        <p className="text-sm text-gray-400 max-w-[200px] mt-1 font-medium">Looks like you haven't added anything to your cart yet.</p>
                                    </div>
                                    <button
                                        onClick={() => { handleClose(); navigate('/products'); }}
                                        className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-all border-none cursor-pointer"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="px-6 py-8 bg-gray-50 space-y-4 rounded-t-[40px] shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-500 font-bold uppercase text-xs tracking-widest">Subtotal</span>
                                    <span className="text-2xl font-black text-gray-900">${cartTotal.toFixed(2)}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 font-medium text-center italic">Shipping and taxes calculated at checkout</p>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => { handleClose(); navigate('/cart'); }}
                                        className="py-4 px-6 border-2 border-gray-900 text-gray-900 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white transition-all bg-transparent cursor-pointer"
                                    >
                                        View Cart
                                    </button>
                                    <button
                                        onClick={() => { handleClose(); navigate('/checkout'); }}
                                        className="py-4 px-6 bg-yellow-400 text-gray-900 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-yellow-500 transition-all border-none flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-yellow-400/20"
                                    >
                                        Checkout <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDrawer;
