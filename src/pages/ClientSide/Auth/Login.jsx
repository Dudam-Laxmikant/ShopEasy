import React, { useState } from 'react';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Github,
    Chrome,
    User,
    ShieldCheck
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulation login
        alert('Logging in...');
        navigate('/');
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-[20px] shadow-xl shadow-blue-200 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500">
                            <ShieldCheck className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-none">Welcome Back</h2>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Login to continue your journey</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl p-10 space-y-8 relative overflow-hidden group">
                    {/* Decorative Blobs */}
                    <div className="absolute top-[-20%] right-[-20%] w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-[-20%] left-[-20%] w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>

                    <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-3">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all font-sans"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-3">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Password</label>
                                    <button type="button" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline border-none bg-transparent cursor-pointer">
                                        Forgot?
                                    </button>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all font-sans"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-900 transition-colors border-none bg-transparent cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-3">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span className="text-xs font-bold text-gray-500">Remember me for 30 days</span>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-2xl shadow-blue-500/20 border-none cursor-pointer"
                        >
                            Sign In Now <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative z-10 flex items-center justify-center gap-4">
                        <div className="h-px flex-1 bg-gray-100"></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Or Continue with</span>
                        <div className="h-px flex-1 bg-gray-100"></div>
                    </div>

                    {/* Social Login */}
                    <div className="relative z-10 grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 py-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm text-gray-700 cursor-pointer">
                            <Chrome className="w-5 h-5 text-gray-400" /> Google
                        </button>
                        <button className="flex items-center justify-center gap-3 py-4 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm text-gray-700 cursor-pointer">
                            <Github className="w-5 h-5 text-gray-400" /> Github
                        </button>
                    </div>
                </div>

                {/* Footer link */}
                <p className="text-center text-gray-500 font-bold text-sm">
                    Don't have an account? {' '}
                    <Link to="/register" className="text-blue-600 hover:text-blue-700 font-black transition-colors underline decoration-2 underline-offset-4">
                        Create Account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
