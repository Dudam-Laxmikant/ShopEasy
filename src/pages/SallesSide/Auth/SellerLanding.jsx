import React from 'react';
import {
    TrendingUp,
    ShieldCheck,
    Zap,
    BarChart3,
    Globe,
    Smartphone,
    ArrowRight,
    CheckCircle2,
    Users,
    Star
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SellerLanding = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
            {/* Nav */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="p-2 bg-yellow-400 rounded-xl shadow-lg shadow-yellow-200">
                            <Zap className="h-6 w-6 text-gray-900 fill-current" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter">ShopEasy <span className="text-blue-600">Seller</span></span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        {['Features', 'How it Works', 'Pricing', 'Success Stories'].map(item => (
                            <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors no-underline">
                                {item}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/seller/auth?view=login')}
                            className="text-sm font-bold text-gray-600 px-6 py-2.5 hover:bg-gray-50 rounded-xl transition-all border-none bg-transparent cursor-pointer"
                        >
                            Log In
                        </button>
                        <button
                            onClick={() => navigate('/seller/auth?view=register')}
                            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-black px-8 py-3 rounded-xl shadow-xl shadow-blue-200 transition-all border-none cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Start Selling
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-black uppercase tracking-widest border border-blue-100">
                            <Star className="w-3.5 h-3.5 fill-current" />
                            India's Fastest Growing Marketplace
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black leading-[1.1] tracking-tight text-gray-900">
                            Sell Smarter, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Grow Faster.</span>
                        </h1>
                        <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-xl">
                            Join over 50,000+ businesses who are building their future on ShopEasy. Get 0% commission for the first 30 days.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                            <button
                                onClick={() => navigate('/seller/auth?view=register')}
                                className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white px-10 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all border-none cursor-pointer shadow-2xl group"
                            >
                                Get Started for Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <div className="flex items-center gap-4 px-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm font-bold text-gray-500">
                                    <span className="text-gray-900">4.9/5</span> from 2,000+ reviews
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative animate-in fade-in slide-in-from-right duration-1000">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>
                        <div className="relative bg-white rounded-[48px] border border-gray-100 shadow-[0_32px_80px_rgba(0,0,0,0.1)] p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div className="space-y-1">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Store Revenue</p>
                                    <p className="text-4xl font-black tracking-tight">₹45,290.00</p>
                                </div>
                                <div className="p-4 bg-green-50 text-green-600 rounded-2xl">
                                    <TrendingUp className="w-8 h-8" />
                                </div>
                            </div>
                            <div className="space-y-6">
                                {[
                                    { name: 'Fashion Accessories', sales: '85%', color: 'bg-blue-500' },
                                    { name: 'Home & Kitchen', sales: '64%', color: 'bg-indigo-500' },
                                    { name: 'Electronics', sales: '42%', color: 'bg-purple-500' },
                                ].map((cat, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-sm font-bold">
                                            <span className="text-gray-600">{cat.name}</span>
                                            <span className="text-gray-900">{cat.sales}</span>
                                        </div>
                                        <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden">
                                            <div className={`h-full ${cat.color} rounded-full transition-all duration-1000`} style={{ width: cat.sales }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-8 border-t border-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-blue-600" />
                                    <p className="text-sm font-bold text-gray-500">Live Visitors: <span className="text-gray-900">142</span></p>
                                </div>
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Stats */}
            <section className="bg-gray-50 py-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { label: 'Orders Processed', value: '1.2M+', icon: Smartphone },
                        { label: 'Active Sellers', value: '50K+', icon: Globe },
                        { label: 'Cities Covered', value: '2,500+', icon: BarChart3 },
                        { label: 'Avg. Growth', value: '310%', icon: ShieldCheck },
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                                <stat.icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <p className="text-4xl font-black mb-1">{stat.value}</p>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 px-6 text-center overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-600 -skew-y-3 origin-center scale-110 -z-10"></div>
                <div className="max-w-3xl mx-auto space-y-10 py-20">
                    <h2 className="text-5xl md:text-6xl font-black text-white leading-tight transition-all">
                        Ready to take your business to the next level?
                    </h2>
                    <p className="text-xl text-blue-100 font-medium">
                        Setup your store in less than 10 minutes. No credit card required.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => navigate('/seller/auth?view=register')}
                            className="w-full sm:w-auto bg-white text-gray-900 px-12 py-5 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all border-none cursor-pointer shadow-2xl"
                        >
                            Start Selling Now
                        </button>
                        <button className="w-full sm:w-auto bg-blue-500/30 text-white border-2 border-white/30 px-12 py-5 rounded-2xl font-black text-lg hover:bg-blue-500/40 transition-all cursor-pointer">
                            Contact Sales
                        </button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-white py-20 px-6 border-t border-gray-100">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
                    <div className="col-span-2 space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-yellow-400 rounded-xl">
                                <Zap className="h-6 w-6 text-gray-900 fill-current" />
                            </div>
                            <span className="text-2xl font-black">ShopEasy</span>
                        </div>
                        <p className="text-gray-500 font-medium max-w-xs">
                            Empowering Indian small businesses and brands to reach millions of customers globally.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <p className="font-black uppercase tracking-widest text-xs text-gray-400">Platform</p>
                        <ul className="space-y-3 list-none p-0">
                            {['Pricing', 'Seller Portal', 'Mobile App', 'Marketing Tools'].map(item => (
                                <li key={item}><a href="#" className="text-gray-600 font-bold hover:text-blue-600 transition-colors no-underline text-sm">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <p className="font-black uppercase tracking-widest text-xs text-gray-400">Support</p>
                        <ul className="space-y-3 list-none p-0">
                            {['Help Center', 'Safety & Security', 'Community', 'Resources'].map(item => (
                                <li key={item}><a href="#" className="text-gray-600 font-bold hover:text-blue-600 transition-colors no-underline text-sm">{item}</a></li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto pt-20 mt-20 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm font-bold text-gray-400">© 2026 ShopEasy Inc. All rights reserved.</p>
                    <div className="flex gap-8">
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
                            <a key={item} href="#" className="text-sm font-bold text-gray-400 hover:text-gray-900 transition-colors no-underline">{item}</a>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default SellerLanding;
