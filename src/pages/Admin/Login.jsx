import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    Lock, 
    ShieldCheck, 
    Mail, 
    ArrowRight, 
    Eye, 
    EyeOff
} from 'lucide-react';

const AdminLogin = () => {
    // States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        setIsLoading(true);
        setErrorMessage('');

        // Simulate backend authentication call
        setTimeout(() => {
            setIsLoading(false);
            // Redirect to dashboard
            window.location.href = '/admin/dashboard';
        }, 1200);
    };

    return (
        <div className="min-h-screen bg-[#EFECE3] flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-[450px] animate-in fade-in duration-500">
                {/* Header branding */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#4A70A9] rounded-[22px] flex items-center justify-center mx-auto mb-4 group cursor-pointer hover:rotate-6 transition-transform">
                        <ShieldCheck className="w-8 h-8 text-[#EFECE3] group-hover:scale-110 transition-transform" />
                    </div>
                    <h1 className="text-3xl font-black text-[#000000] tracking-tight leading-none uppercase italic">
                        Shop<span className="text-[#4A70A9]">Easy</span> Admin
                    </h1>
                    <p className="text-[#4A70A9]/80 font-bold uppercase text-[10px] tracking-[0.25em] mt-2">
                        Authorized Personnel Only
                    </p>
                </div>

                {/* Form Container (Flat design - No Shadow, No Border) */}
                <div className="bg-white p-8 md:p-10 rounded-[35px] relative overflow-hidden">
                    <div className="space-y-6">
                        <div className="text-left pb-2">
                            <h2 className="text-xl font-black text-[#000000] tracking-tight">Sign In</h2>
                            <p className="text-xs font-semibold text-gray-400 mt-1">Access the administrator control desk.</p>
                        </div>

                        {errorMessage && (
                            <div className="p-3.5 bg-rose-50 rounded-2xl text-xs font-bold text-rose-600 text-left">
                                {errorMessage}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">
                            {/* Email Address */}
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-[#4A70A9] uppercase tracking-widest ml-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@shopeasy.com"
                                        className="w-full pl-12 pr-4 py-4 bg-[#EFECE3]/50 rounded-2xl text-[#000000] placeholder:text-gray-400 text-sm focus:outline-none focus:bg-[#8FABD4]/10 transition-all font-semibold border-none"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-black text-[#4A70A9] uppercase tracking-widest ml-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <Lock className="w-4 h-4" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full pl-12 pr-12 py-4 bg-[#EFECE3]/50 rounded-2xl text-[#000000] placeholder:text-gray-400 text-sm focus:outline-none focus:bg-[#8FABD4]/10 transition-all font-semibold border-none"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4A70A9] transition-colors p-1 border-none bg-transparent cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button (Flat design - No Shadow, No Border) */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-4 mt-2 bg-[#4A70A9] hover:bg-[#395c91] text-[#EFECE3] font-black rounded-2xl uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-300 border-none cursor-pointer ${
                                    isLoading ? 'opacity-85 cursor-not-allowed' : ''
                                }`}
                            >
                                {isLoading ? 'Authenticating...' : (
                                    <>
                                        Sign In <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="pt-4 text-center">
                            <span className="text-xs font-semibold text-gray-400">
                                Don't have an admin account?{' '}
                            </span>
                            <Link 
                                to="/admin/register" 
                                className="text-xs font-black text-[#4A70A9] hover:underline no-underline"
                            >
                                Register Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
