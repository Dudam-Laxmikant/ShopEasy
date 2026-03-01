import React, { useState, useEffect } from 'react';
import {
    Mail,
    Lock,
    User,
    Store,
    Building2,
    ArrowRight,
    Zap,
    ShieldCheck,
    Globe,
    CheckCircle2,
    ChevronRight,
    ArrowLeft,
    Phone,
    FileText,
    MapPin,
    CreditCard,
    Users
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const SellerAuth = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Get view from URL query
    const query = new URLSearchParams(location.search);
    const initialView = query.get('view') || 'login';

    const [view, setView] = useState(initialView); // 'login', 'register'
    const [registrationType, setRegistrationType] = useState(null); // 'normal', 'business'
    const [step, setStep] = useState(0); // 0: select type, 1: form, 2: success

    useEffect(() => {
        const currentView = new URLSearchParams(location.search).get('view') || 'login';
        setView(currentView);
        if (currentView === 'login') {
            setRegistrationType(null);
            setStep(0);
        }
    }, [location.search]);

    const handleSwitchView = (newView) => {
        navigate(`/seller/auth?view=${newView}`);
    };

    const renderLogin = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tight">Welcome back</h2>
                <p className="text-gray-500 font-medium">Manage your store and grow your sales today.</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            placeholder="name@company.com"
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-sm font-bold text-gray-700">Password</label>
                        <button className="text-xs font-bold text-blue-600 hover:underline border-none bg-transparent cursor-pointer">Forgot password?</button>
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                        />
                    </div>
                </div>
            </div>

            <button
                onClick={() => navigate('/seller/dashboard')}
                className="w-full bg-gray-900 hover:bg-black text-white font-black py-4 rounded-2xl shadow-xl transition-all border-none cursor-pointer flex items-center justify-center gap-2 group"
            >
                Login to Dashboard
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="relative pt-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                <div className="relative flex justify-center text-xs uppercase font-black tracking-widest text-gray-400 bg-white px-2">Or continue with</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all bg-white cursor-pointer font-bold text-sm">
                    <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="google" />
                    Google
                </button>
                <button className="flex items-center justify-center gap-2 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all bg-white cursor-pointer font-bold text-sm">
                    <Users className="w-5 h-5 text-blue-600" />
                    Partner Sync
                </button>
            </div>
        </div>
    );

    const renderRegistrationChoice = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2 text-center lg:text-left">
                <h2 className="text-3xl font-black tracking-tight">Choose seller type</h2>
                <p className="text-gray-500 font-medium">Select how you want to register your business.</p>
            </div>

            <div className="grid gap-6">
                <button
                    onClick={() => { setRegistrationType('normal'); setStep(1); }}
                    className="group relative flex items-center gap-6 p-6 bg-white border-2 border-gray-100 rounded-[32px] hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 transition-all text-left cursor-pointer overflow-hidden"
                >
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <User className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-gray-900 mb-1">Normal / Individual Seller</h3>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">Best for middle-class entrepreneurs, small shop owners, and creators.</p>
                    </div>
                    <ChevronRight className="absolute right-6 w-6 h-6 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </button>

                <button
                    onClick={() => { setRegistrationType('business'); setStep(1); }}
                    className="group relative flex items-center gap-6 p-6 bg-white border-2 border-gray-100 rounded-[32px] hover:border-indigo-600 hover:shadow-2xl hover:shadow-indigo-600/10 transition-all text-left cursor-pointer overflow-hidden"
                >
                    <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
                        <Building2 className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-gray-900 mb-1">Businessman / Pvt Ltd Company</h3>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">For registered entities, large scale distributors, and Private Limited companies.</p>
                    </div>
                    <ChevronRight className="absolute right-6 w-6 h-6 text-gray-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </button>
            </div>

            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
                <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <p className="text-xs text-blue-800 font-bold leading-relaxed">
                    All accounts are verified within 24 hours. Your data is protected by industry-standard encryption.
                </p>
            </div>
        </div>
    );

    const renderRegistrationForm = () => {
        const isBusiness = registrationType === 'business';

        return (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setStep(0)}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-all border-none bg-transparent cursor-pointer text-gray-400"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight">{isBusiness ? 'Business Entity Registration' : 'Individual Seller Details'}</h2>
                        <p className="text-sm text-gray-500 font-medium">Please provide your {isBusiness ? 'legal company' : 'personal shop'} information.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">{isBusiness ? 'Legal Company Name' : 'Full Name'}</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder={isBusiness ? "e.g. Acme Tech Pvt Ltd" : "John Doe"}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Store Display Name</label>
                        <div className="relative">
                            <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="e.g. Fashion Point"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Work Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 ml-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="tel"
                                placeholder="+91 9876543210"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                            />
                        </div>
                    </div>

                    {isBusiness ? (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">GSTIN Number</label>
                                <div className="relative">
                                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="22AAAAA0000A1Z5"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Company PAN</label>
                                <div className="relative">
                                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="ABCDE1234F"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Corporate Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                                    <textarea
                                        rows="3"
                                        placeholder="Complete address including state and zip..."
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
                                    ></textarea>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">City / Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="e.g. Surat, Gujarat"
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Product Category</label>
                                <select className="w-full px-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none appearance-none cursor-pointer font-bold text-gray-600">
                                    <option>Clothing & Apparel</option>
                                    <option>Home Decor</option>
                                    <option>Electronics</option>
                                    <option>Handicrafts</option>
                                    <option>Accessories</option>
                                </select>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex items-center gap-2 px-1">
                    <input type="checkbox" className="w-5 h-5 rounded-lg border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" id="terms" />
                    <label htmlFor="terms" className="text-sm font-medium text-gray-500 cursor-pointer">
                        I agree to the <span className="text-blue-600 font-bold hover:underline">Seller Agreement</span> and <span className="text-blue-600 font-bold hover:underline">Data Policy</span>.
                    </label>
                </div>

                <button
                    onClick={() => setStep(2)}
                    className={`w-full ${isBusiness ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'} text-white font-black py-5 rounded-2xl shadow-xl transition-all border-none cursor-pointer flex items-center justify-center gap-2 group`}
                >
                    Create Seller Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        );
    };

    const renderSuccess = () => (
        <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-500">
            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl shadow-green-100">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tight">Application Submitted!</h2>
                <p className="text-gray-500 font-medium max-w-sm mx-auto leading-relaxed">
                    Great! We've received your application. Our team will verify your details and get back to you within 24 hours.
                </p>
            </div>
            <div className="grid gap-3 pt-6">
                <button
                    onClick={() => navigate('/seller/dashboard')}
                    className="w-full bg-gray-900 hover:bg-black text-white font-black py-4 rounded-2xl shadow-xl transition-all border-none cursor-pointer"
                >
                    Go to Portal Preview
                </button>
                <button
                    onClick={() => navigate('/seller/landing')}
                    className="w-full text-gray-400 font-bold hover:text-gray-600 transition-colors border-none bg-transparent cursor-pointer"
                >
                    Back to Homepage
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white flex flex-col lg:flex-row font-sans overflow-x-hidden">
            {/* Sidebar Content (Decorative) */}
            <div className="relative hidden lg:flex lg:w-[45%] bg-gray-950 p-16 flex-col justify-between overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-1/4 -left-1/4 w-full h-full bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute -bottom-1/4 -right-1/4 w-full h-full bg-indigo-600/20 rounded-full blur-[120px]"></div>
                </div>

                <div className="relative z-10 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/seller/landing')}>
                    <div className="p-2 bg-yellow-400 rounded-xl">
                        <Zap className="h-6 w-6 text-gray-900 fill-current" />
                    </div>
                    <span className="text-2xl font-black text-white">ShopEasy <span className="text-blue-500">Seller</span></span>
                </div>

                <div className="relative z-10 space-y-12">
                    <div className="space-y-4">
                        <h1 className="text-5xl font-black text-white leading-tight">
                            Start your digital <br />
                            journey with us.
                        </h1>
                        <p className="text-lg text-gray-400 font-medium max-w-md">
                            Join the millions of sellers who are growing their business with ShopEasy's advanced commerce tools.
                        </p>
                    </div>

                    <div className="grid gap-8">
                        {[
                            { icon: Globe, title: 'Global Reach', desc: 'Reach 200M+ customers worldwide.' },
                            { icon: Zap, title: 'Instant Setup', desc: 'Launch your store in 10 minutes.' },
                            { icon: ShieldCheck, title: 'Secure Payments', desc: 'Guaranteed timely settlements.' }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 group">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group-hover:bg-blue-600 group-hover:border-blue-500">
                                    <item.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-white font-black">{item.title}</h4>
                                    <p className="text-sm text-gray-400 font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-gray-500 text-sm font-bold">
                    <span>© 2026 ShopEasy Inc.</span>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors no-underline">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors no-underline">Terms</a>
                    </div>
                </div>
            </div>

            {/* Auth Content */}
            <div className="flex-1 flex flex-col justify-center p-6 md:p-12 lg:p-20 relative">
                {/* Mobile Logo */}
                <div className="lg:hidden flex items-center gap-2 mb-12">
                    <div className="p-2 bg-yellow-400 rounded-xl">
                        <Zap className="h-6 w-6 text-gray-900 fill-current" />
                    </div>
                    <span className="text-xl font-black uppercase tracking-tighter">ShopEasy</span>
                </div>

                <div className="w-full max-w-[520px] mx-auto">
                    {/* View Switcher */}
                    {step === 0 && (
                        <div className="flex p-1.5 bg-gray-50 rounded-2xl mb-12">
                            <button
                                onClick={() => handleSwitchView('login')}
                                className={`flex-1 py-3.5 rounded-xl font-black text-sm transition-all border-none cursor-pointer ${view === 'login' ? 'bg-white shadow-lg shadow-gray-200/50 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Seller Login
                            </button>
                            <button
                                onClick={() => handleSwitchView('register')}
                                className={`flex-1 py-3.5 rounded-xl font-black text-sm transition-all border-none cursor-pointer ${view === 'register' ? 'bg-white shadow-lg shadow-gray-200/50 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                            >
                                Join as Seller
                            </button>
                        </div>
                    )}

                    {/* Content Rendering */}
                    {view === 'login' ? (
                        renderLogin()
                    ) : (
                        <>
                            {step === 0 && renderRegistrationChoice()}
                            {step === 1 && renderRegistrationForm()}
                            {step === 2 && renderSuccess()}
                        </>
                    )}

                    {/* Footer text */}
                    {step < 2 && (
                        <p className="mt-12 text-center text-sm font-bold text-gray-400">
                            {view === 'login' ? (
                                <>Don't have an account? <button onClick={() => handleSwitchView('register')} className="text-blue-600 hover:underline border-none bg-transparent cursor-pointer font-black ml-1">Get Started</button></>
                            ) : (
                                <>Already have an account? <button onClick={() => handleSwitchView('login')} className="text-blue-600 hover:underline border-none bg-transparent cursor-pointer font-black ml-1">Login here</button></>
                            )}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SellerAuth;
