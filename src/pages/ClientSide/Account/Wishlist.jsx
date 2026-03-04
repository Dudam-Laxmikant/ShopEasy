import { Heart, ShoppingCart, Trash2, Star, Plus } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';


const Wishlist = () => {
    const navigate = useNavigate();
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart, flyToCart } = useCart();




    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Wishlist</h1>
                <p className="text-gray-500 mt-1 font-medium">Items you've saved for later</p>
            </div>

            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {wishlist.map((item) => (
                        <div key={item.id} className="group relative flex gap-6 p-4 border border-gray-100 rounded-2xl hover:border-pink-100 hover:shadow-xl hover:shadow-pink-500/5 transition-all duration-500 overflow-hidden">
                            {/* Product Image */}
                            <div
                                onClick={() => navigate(`/product/${item.id}`)}
                                className="w-32 h-40 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-50 cursor-pointer"
                            >
                                <img src={item.image} alt={item.title || item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div
                                    onClick={() => navigate(`/product/${item.id}`)}
                                    className="cursor-pointer"
                                >

                                    <div className="flex items-center gap-1.5 mb-2">
                                        <div className="flex items-center gap-0.5 text-amber-500">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                        </div>
                                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{item.rating} ({item.reviews} reviews)</span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-pink-600 transition-colors">{item.title || item.name}</h3>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="text-xl font-black text-gray-900">${item.price}</span>
                                        {item.originalPrice && (
                                            <span className="text-sm font-bold text-gray-400 line-through">${item.originalPrice}</span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={(e) => {
                                            addToCart(item);
                                            flyToCart(e, item.image);
                                        }}
                                        className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white rounded-xl py-3 text-sm font-bold hover:bg-black transition-all active:scale-95 group/btn shadow-lg shadow-gray-200 cursor-pointer"
                                    >
                                        <ShoppingCart className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                                        Add to Cart
                                    </button>

                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        className="flex items-center justify-center p-3 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition-all border-none cursor-pointer"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Heart Icon - Click to unlike/remove */}
                            <button
                                onClick={() => removeFromWishlist(item.id)}
                                className="absolute top-4 right-4 text-red-500 hover:text-red-600 transition-all active:scale-90 border-none bg-transparent cursor-pointer"
                            >
                                <Heart className="w-5 h-5 fill-current" />
                            </button>

                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mb-6">
                        <Heart className="w-10 h-10 text-pink-200" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Your wishlist is empty</h3>
                    <p className="text-gray-500 mt-2 max-w-xs font-medium">Save items you like to see them here.</p>
                    <Link to="/products" className="mt-8 px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 no-underline">
                        Explore Products
                    </Link>
                </div>
            )}

        </div>
    );
};

export default Wishlist;
