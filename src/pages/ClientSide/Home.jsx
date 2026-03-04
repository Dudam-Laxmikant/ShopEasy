import React from 'react';
import {
    ShoppingBag,
    ArrowRight,
    Star,
    ShieldCheck,
    Truck,
    Clock,
    ChevronRight,
    TrendingUp,
    Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from './context/WishlistContext';
import { useCart } from './context/CartContext';
import { Heart } from 'lucide-react';



const Home = () => {
    const navigate = useNavigate();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { addToCart, flyToCart } = useCart();



    const categories = [
        { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b830c6039?w=500&auto=format&fit=crop&q=60', count: '1.2k+ Products' },
        { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&auto=format&fit=crop&q=60', count: '800+ Products' },
        { name: 'Home Decor', image: 'https://images.unsplash.com/photo-1616489953149-864c39974b68?w=500&auto=format&fit=crop&q=60', count: '600+ Products' },
        { name: 'Beauty', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?w=500&auto=format&fit=crop&q=60', count: '450+ Products' }
    ];

    const featuredProducts = [
        { id: 1, name: 'Minimalist Leather Watch', price: '₹4,999', rating: 4.8, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60' },
        { id: 2, name: 'Premium Noise Cancelling Headphones', price: '₹12,499', rating: 4.9, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60' },
        { id: 3, name: 'Modern Desk Lamp', price: '₹2,199', rating: 4.7, image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=500&auto=format&fit=crop&q=60' },
        { id: 4, name: 'Smart Fitness Tracker', price: '₹3,599', rating: 4.6, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop&q=60' }
    ];

    return (
        <div className="h-screen overflow-y-auto scroll-smooth bg-white">
            {/* Minimal Nav for Landing Page */}
            <nav className="fixed top-0 w-full z-[100] px-8 py-6 flex items-center justify-between bg-gradient-to-b from-black/20 to-transparent">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="p-2 bg-blue-600 rounded-full">
                        <ShoppingBag className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-black text-white tracking-tight">ShopEasy</span>
                </div>
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate('/products')} className="text-white font-black text-sm uppercase tracking-widest hover:text-blue-400 transition-colors border-none bg-transparent cursor-pointer">Shop</button>
                    <button onClick={() => navigate('/login')} className="px-6 py-3 bg-white text-gray-900 font-black rounded-xl hover:bg-blue-600 hover:text-white transition-all border-none cursor-pointer shadow-xl">Sign In</button>
                </div>
            </nav>

            <div className="space-y-32 pb-32">
                {/* Hero Section */}
                <section className="relative h-screen overflow-hidden group">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                        alt="Hero"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent flex items-center px-12 sm:px-20">
                        <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-left-10 duration-700">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 rounded-full">
                                <Zap className="w-4 h-4 text-blue-400 fill-current" />
                                <span className="text-blue-400 text-xs font-black uppercase tracking-widest">Summer Collection 2024</span>
                            </div>
                            <h1 className="text-6xl sm:text-7xl font-black text-white leading-none tracking-tight">
                                Elevate Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Shopping</span> Experience
                            </h1>
                            <p className="text-gray-300 text-lg font-medium max-w-lg leading-relaxed">
                                Discover a curated world of premium products designed to enhance your lifestyle. Quality meets elegance, delivered to your doorstep.
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <button
                                    onClick={() => navigate('/products')}
                                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl flex items-center gap-3 transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-600/20 border-none cursor-pointer"
                                >
                                    Shop Collection <ArrowRight className="w-5 h-5" />
                                </button>
                                <button className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-black rounded-2xl transition-all border border-white/20 cursor-pointer">
                                    Learn More
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Stats */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: Truck, title: 'Free Shipping', desc: 'On orders over ₹10,000' },
                        { icon: ShieldCheck, title: 'Secure Payment', desc: '100% security guaranteed' },
                        { icon: Clock, title: '24/7 Support', desc: 'Dedicated expert assistance' },
                        { icon: TrendingUp, title: 'Easy Returns', desc: '30-day hassle-free policy' }
                    ].map((feature, i) => (
                        <div key={i} className="p-8 bg-white rounded-[40px] border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600">
                                <feature.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-black text-gray-900">{feature.title}</h3>
                            <p className="text-sm text-gray-400 font-bold">{feature.desc}</p>
                        </div>
                    ))}
                </section>

                {/* Categories */}
                <section className="space-y-10">
                    <div className="flex flex-col sm:flex-row justify-between items-end gap-6">
                        <div>
                            <p className="text-sm font-black text-blue-600 uppercase tracking-widest mb-3">Browse by Category</p>
                            <h2 className="text-4xl font-black text-gray-900 leading-none">Find Your True Style</h2>
                        </div>
                        <button className="text-gray-900 font-black flex items-center gap-2 hover:text-blue-600 transition-colors border-none bg-transparent cursor-pointer">
                            View All Categories <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {categories.map((cat, i) => (
                            <div key={i} className="group relative h-80 rounded-[40px] overflow-hidden cursor-pointer shadow-lg">
                                <img src={cat.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={cat.name} />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent flex flex-col justify-end p-8">
                                    <h3 className="text-2xl font-black text-white leading-none">{cat.name}</h3>
                                    <p className="text-gray-300 text-sm font-bold mt-2 uppercase tracking-widest">{cat.count}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Products */}
                <section className="bg-gray-900 -mx-4 lg:-mx-8 px-4 lg:px-8 py-24 rounded-[60px] space-y-12">
                    <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
                        <p className="text-sm font-black text-blue-400 uppercase tracking-widest">Our Selection</p>
                        <h2 className="text-5xl font-black text-white leading-none">Featured Products</h2>
                        <p className="text-gray-400 font-medium">Carefully selected items that represent our commitment to quality, design, and innovation.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <div key={product.id} className="bg-white/5 backdrop-blur-md rounded-[40px] border border-white/10 p-6 space-y-6 group hover:bg-white/10 transition-all duration-300 cursor-pointer">
                                <div className="aspect-square rounded-[30px] overflow-hidden bg-gray-800 relative">
                                    <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
                                    <div className="absolute top-4 right-4 flex flex-col gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleWishlist(product);
                                            }}
                                            className={`p-3 rounded-2xl border-none cursor-pointer transition-all shadow-xl
                                                ${isInWishlist(product.id) ? 'bg-red-600 text-white' : 'bg-white text-gray-900 hover:bg-red-50 hover:text-red-600'}`}
                                        >
                                            <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const normalizedProduct = {
                                                    ...product,
                                                    title: product.name
                                                };
                                                addToCart(normalizedProduct);
                                                flyToCart(e, product.image);
                                            }}
                                            className="p-3 bg-white rounded-2xl text-gray-900 border-none cursor-pointer hover:bg-blue-600 hover:text-white transition-colors shadow-xl"
                                        >
                                            <ShoppingBag className="w-5 h-5" />
                                        </button>

                                    </div>

                                </div>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-black text-white text-lg leading-tight line-clamp-2">{product.name}</h3>
                                        <div className="flex items-center gap-1 text-yellow-400">
                                            <Star className="w-3 h-3 fill-current" />
                                            <span className="text-xs font-black text-white">{product.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-xl font-black text-white tracking-tight">{product.price}</span>
                                        <button className="text-blue-400 text-sm font-black flex items-center gap-1 group-hover:gap-2 transition-all border-none bg-transparent cursor-pointer">
                                            Details <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center pt-8">
                        <button
                            onClick={() => navigate('/products')}
                            className="px-10 py-5 bg-white text-gray-900 font-black rounded-[30px] hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-2xl border-none cursor-pointer"
                        >
                            Explorer Every Product
                        </button>
                    </div>
                </section>

                {/* Newsletter */}
                <section className="relative rounded-[60px] overflow-hidden bg-blue-600 p-20 text-center space-y-8">
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[150%] bg-blue-500/20 rotate-45 blur-3xl"></div>
                        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[150%] bg-indigo-500/20 rotate-[135deg] blur-3xl"></div>
                    </div>
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-5xl font-black text-white leading-none">Get Exclusive Deals</h2>
                        <p className="text-blue-100 font-medium text-lg">Subscribe to our newsletter and get 20% off your first purchase. No spam, just excellence.</p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 px-8 py-5 rounded-[25px] bg-white border-none focus:outline-none text-gray-900 font-bold placeholder:text-gray-400"
                            />
                            <button className="px-10 py-5 bg-gray-900 text-white font-black rounded-[25px] hover:bg-indigo-900 transition-all border-none cursor-pointer shadow-2xl">
                                Subscribe Now
                            </button>
                        </div>
                        <p className="text-blue-200 text-xs font-bold uppercase tracking-widest pt-4">We respect your privacy. No spam ever.</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
