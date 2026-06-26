import React, { useState } from 'react';
import { loginSubAdmin, registerAdmin, parseJwt } from './adminService';
import {
    Lock,
    Eye,
    EyeOff,
    AtSign,
    ArrowRight,
    Shield,
    Key,
    User,
    ArrowLeft
} from 'lucide-react';

const AdminLogin = () => {
    // Shared states
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    // Login Form states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // Register Form states
    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [showRegPassword, setShowRegPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');
        setSuccessMsg('');
        try {
            const data = await loginSubAdmin(email, password);
            localStorage.setItem('adminToken', data.access_token);
            
            // Clean old super admin detail to prevent conflict
            localStorage.removeItem('superAdminDetails');
            
            const decoded = parseJwt(data.access_token);
            if (decoded) {
                localStorage.setItem('subAdminDetails', JSON.stringify(decoded));
            }
            
            // Directly redirect, removing the 2FA/OTP step
            window.location.href = '/admin/dashboard';
        } catch (err) {
            setErrorMsg(err.message || 'Login failed');
            setIsLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');
        setSuccessMsg('');
        try {
            await registerAdmin(regName, regEmail, regPassword);
            setSuccessMsg('Registration successful! Please login with your new credentials.');
            
            // Auto pre-fill login email with the registered email
            setEmail(regEmail);
            
            // Clear inputs
            setRegName('');
            setRegEmail('');
            setRegPassword('');
            
            // Slide back to login
            setIsRegistering(false);
        } catch (err) {
            setErrorMsg(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-slate-50 font-sans text-slate-800 selection:bg-amber-500 selection:text-slate-950 overflow-hidden">
            {/* Left Split Pane: Yellow Branding Area (Hidden on mobile) */}
            <div className="hidden lg:flex lg:w-[40%] bg-[#FCEF9F] flex-col justify-between p-12 xl:p-16 relative overflow-hidden select-none">
                {/* Decorative glow/radial shadows */}
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-white/20 rounded-full blur-3xl"></div>
                
                {/* Header Logo & Subtitle */}
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-slate-950 rounded-lg flex items-center justify-center">
                            <Shield className="w-4.5 h-4.5 text-[#FCEF9F]" />
                        </div>
                        <span className="text-xl font-black text-slate-950 tracking-tight">MintAdmin</span>
                    </div>
                    <p className="text-[10px] font-black text-slate-950/60 uppercase tracking-widest pl-10">Enterprise Suite</p>
                </div>

                {/* Tagline & Image Card */}
                <div className="my-auto space-y-10 z-10">
                    <div className="space-y-4">
                        <h2 className="text-4xl xl:text-5xl font-black text-slate-950 tracking-tight leading-tight">
                            Luminous<br />Precision.
                        </h2>
                        <p className="text-xs xl:text-sm font-bold text-slate-950/70 max-w-sm leading-relaxed">
                            Securely access your administrative hub. Manage inventory, monitor real-time analytics, and optimize operations with total clarity.
                        </p>
                    </div>

                    {/* Gold Sculpture Render Container */}
                    <div className="w-full max-w-[320px] aspect-square rounded-[36px] bg-[#EED878] p-5 shadow-2xl shadow-amber-950/20 border border-white/20 hover:scale-[1.02] transition-transform duration-500">
                        <div className="w-full h-full rounded-[24px] overflow-hidden bg-gradient-to-b from-amber-50 to-amber-100 flex items-center justify-center">
                            <img 
                                src="/gold_sculpture.png" 
                                alt="Gold Abstract Sculpture" 
                                className="w-full h-full object-cover select-none"
                                draggable="false"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="text-[10px] font-bold text-slate-950/50 uppercase tracking-widest">
                    Version 4.2.1-Prod
                </div>
            </div>

            {/* Right Split Pane: Login & Register Forms inside a Slider */}
            <div className="w-full lg:w-[60%] flex flex-col justify-between bg-[#FAF9F6] p-8 md:p-12 xl:p-16 overflow-y-auto">
                {/* Header helper link */}
                <div className="flex justify-between items-center w-full">
                    <div className="flex lg:hidden items-center gap-2">
                        <div className="w-8 h-8 bg-slate-950 rounded-lg flex items-center justify-center">
                            <Shield className="w-4.5 h-4.5 text-[#FCEF9F]" />
                        </div>
                        <span className="text-lg font-black text-slate-900 tracking-tight">MintAdmin</span>
                    </div>
                    <span className="text-xs font-bold text-slate-400 ml-auto">Support: 1-800-MINT-OPS</span>
                </div>

                {/* Form Slider Outer Frame */}
                <div className="w-full max-w-[460px] mx-auto my-auto overflow-hidden py-8">
                    {/* Status Messages */}
                    {errorMsg && (
                        <div className="p-4 mb-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-bold animate-in fade-in duration-200">
                            {errorMsg}
                        </div>
                    )}
                    {successMsg && (
                        <div className="p-4 mb-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-2xl text-xs font-bold animate-in fade-in duration-200">
                            {successMsg}
                        </div>
                    )}

                    {/* Sliding Inner Container */}
                    <div 
                        className="flex transition-transform duration-500 ease-in-out w-[200%]"
                        style={{ transform: isRegistering ? 'translateX(-50%)' : 'translateX(0%)' }}
                    >
                        {/* Slide 1: Login Form (Default) */}
                        <div className="w-1/2 pr-4 pl-1">
                            <div className="space-y-2 mb-8 text-left">
                                <h3 className="text-3xl font-extrabold text-slate-950 tracking-tight">Welcome Back</h3>
                                <p className="text-xs font-bold text-slate-400">Please enter your credentials to access the secure portal.</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-6">
                                {/* Email Input */}
                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-950 transition-colors">
                                            <AtSign className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="admin@mintadmin.com"
                                            className="w-full pl-11 pr-4 py-4 bg-slate-100/60 hover:bg-slate-100 border-none rounded-2xl text-slate-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="space-y-2 text-left">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Password</label>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-950 transition-colors">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••••••"
                                            className="w-full pl-11 pr-12 py-4 bg-slate-100/60 hover:bg-slate-100 border-none rounded-2xl text-slate-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all shadow-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-950 border-none bg-transparent cursor-pointer animate-none"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Secret Key Input (Mock requirement matching design template) */}
                                <div className="space-y-2 text-left">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin Secret Key</label>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-950 transition-colors">
                                            <Key className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            value={secretKey}
                                            onChange={(e) => setSecretKey(e.target.value)}
                                            placeholder="SEC-XXXX-XXXX"
                                            className="w-full pl-11 pr-4 py-4 bg-slate-100/60 hover:bg-slate-100 border-none rounded-2xl text-slate-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                {/* Extra Actions */}
                                <div className="flex items-center justify-between px-1">
                                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-500 select-none">
                                        <input 
                                            type="checkbox" 
                                            className="w-4 h-4 rounded bg-slate-100 border-slate-300 text-amber-500 focus:ring-amber-500/20 transition-all cursor-pointer"
                                        />
                                        Remember device
                                    </label>
                                    <button type="button" className="text-xs font-black text-amber-600 hover:text-amber-500 uppercase tracking-wider border-none bg-transparent cursor-pointer">
                                        Forgot Password?
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#FCC618] hover:bg-[#E2B10E] disabled:bg-amber-300 text-slate-950 font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all border-none cursor-pointer uppercase tracking-widest text-[11px] shadow-lg shadow-amber-500/10 group"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            Secure Sign In
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                                {/* Toggle Link */}
                                <div className="text-center mt-6">
                                    <p className="text-xs font-bold text-slate-400">
                                        Don't have an account?{' '}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsRegistering(true);
                                                setErrorMsg('');
                                                setSuccessMsg('');
                                            }}
                                            className="text-amber-600 hover:text-amber-500 font-extrabold uppercase tracking-wider border-none bg-transparent cursor-pointer"
                                        >
                                            Request Access
                                        </button>
                                    </p>
                                </div>
                            </form>
                        </div>

                        {/* Slide 2: Register Form */}
                        <div className="w-1/2 pl-4 pr-1">
                            <div className="space-y-2 mb-8 text-left">
                                <h3 className="text-3xl font-extrabold text-slate-950 tracking-tight">Create Account</h3>
                                <p className="text-xs font-bold text-slate-400">Register new administrative profile to start moderation.</p>
                            </div>

                            <form onSubmit={handleRegister} className="space-y-6">
                                {/* Name Input */}
                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-950 transition-colors">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={regName}
                                            onChange={(e) => setRegName(e.target.value)}
                                            placeholder="John Doe"
                                            className="w-full pl-11 pr-4 py-4 bg-slate-100/60 hover:bg-slate-100 border-none rounded-2xl text-slate-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-950 transition-colors">
                                            <AtSign className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            value={regEmail}
                                            onChange={(e) => setRegEmail(e.target.value)}
                                            placeholder="newadmin@mintadmin.com"
                                            className="w-full pl-11 pr-4 py-4 bg-slate-100/60 hover:bg-slate-100 border-none rounded-2xl text-slate-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-950 transition-colors">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <input
                                            type={showRegPassword ? "text" : "password"}
                                            required
                                            value={regPassword}
                                            onChange={(e) => setRegPassword(e.target.value)}
                                            placeholder="••••••••••••"
                                            className="w-full pl-11 pr-12 py-4 bg-slate-100/60 hover:bg-slate-100 border-none rounded-2xl text-slate-950 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:bg-white transition-all shadow-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowRegPassword(!showRegPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-950 border-none bg-transparent cursor-pointer"
                                        >
                                            {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#FCC618] hover:bg-[#E2B10E] disabled:bg-amber-300 text-slate-950 font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all border-none cursor-pointer uppercase tracking-widest text-[11px] shadow-lg shadow-amber-500/10 group"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            Begin Registration
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>

                                {/* Toggle Link */}
                                <div className="text-center mt-6">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsRegistering(false);
                                            setErrorMsg('');
                                            setSuccessMsg('');
                                        }}
                                        className="inline-flex items-center gap-2 text-xs font-black text-slate-400 hover:text-slate-950 uppercase tracking-widest border-none bg-transparent cursor-pointer"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                        Secure Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer Credits */}
                <div className="flex flex-col sm:flex-row items-center justify-between w-full border-t border-slate-100 pt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest gap-4">
                    <span>© 2026 MintAdmin Systems</span>
                    <div className="flex gap-6">
                        <button type="button" className="hover:text-amber-500 border-none bg-transparent cursor-pointer uppercase tracking-widest text-[10px]">Privacy</button>
                        <button type="button" className="hover:text-amber-500 border-none bg-transparent cursor-pointer uppercase tracking-widest text-[10px]">Security Audit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
