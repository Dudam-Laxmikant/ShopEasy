import React, { useState } from 'react';
import {
    Lock,
    ShieldCheck,
    Key,
    AtSign,
    ArrowRight,
    Fingerprint,
    ShieldAlert,
    Smartphone,
    X,
    Check
} from 'lucide-react';

const AdminLogin = () => {
    const [step, setStep] = useState(1); // 1: Login, 2: 2FA
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep(2);
        }, 1500);
    };

    const handle2FA = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            window.location.href = '/admin/dashboard';
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden selection:bg-indigo-500 selection:text-white">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-100/50 blur-[150px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-100/50 blur-[120px] -z-10 animate-pulse"></div>

            <div className="w-full max-w-[450px] animate-in fade-in zoom-in-95 duration-700">
                {/* Logo Section */}
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-indigo-100 mb-6 group cursor-pointer hover:rotate-6 transition-transform">
                        <ShieldCheck className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2 italic">
                        ADMIN<span className="text-indigo-600">ROOT</span>
                    </h1>
                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">Authorized Personnel Only</p>
                </div>

                <div className="bg-white border border-slate-200 p-8 md:p-10 rounded-[32px] shadow-2xl shadow-slate-200/50 relative">
                    <div className="absolute top-0 right-10 w-24 h-px bg-gradient-to-r from-transparent via-indigo-600 to-transparent"></div>

                    {step === 1 ? (
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-indigo-50 rounded-xl border border-indigo-100">
                                    <Key className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">Secure Sign In</h2>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2.5">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Admin Identity</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                            <AtSign className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            placeholder="admin_id or email"
                                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Access Key</label>
                                        <button type="button" className="text-[11px] font-black text-indigo-600 hover:text-indigo-500 transition-colors uppercase tracking-widest border-none bg-transparent cursor-pointer">Recover</button>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            placeholder="••••••••••••"
                                            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium shadow-sm"
                                        />
                                    </div>
                                </div>

                                <button
                                    disabled={isLoading}
                                    className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-slate-200 border-none cursor-pointer uppercase tracking-widest text-xs group"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            Begin Authentication
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-emerald-50 border border-emerald-100 rounded-xl">
                                    <ShieldAlert className="w-5 h-5 text-emerald-600" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">2-Factor Verification</h2>
                            </div>

                            <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl flex items-center gap-4">
                                <div className="p-3 bg-white rounded-xl shadow-sm">
                                    <Smartphone className="w-6 h-6 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Device Authenticator</p>
                                    <p className="text-[11px] text-slate-400 font-medium">Enter the 6-digit code from your app</p>
                                </div>
                            </div>

                            <form onSubmit={handle2FA} className="space-y-6">
                                <div className="grid grid-cols-6 gap-3">
                                    {[1, 2, 3, 4, 5, 6].map((idx) => (
                                        <input
                                            key={idx}
                                            type="text"
                                            maxLength="1"
                                            className="w-full aspect-square bg-white border border-slate-200 rounded-xl text-center text-xl font-black text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
                                        />
                                    ))}
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-2xl transition-all border-none cursor-pointer uppercase tracking-widest text-[10px]"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-[2] bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-400 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-emerald-100 border-none cursor-pointer uppercase tracking-widest text-[10px]"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                                        ) : "Confirm Access"}
                                    </button>
                                </div>

                                <button type="button" className="w-full text-[11px] font-black text-slate-400 hover:text-indigo-600 text-center transition-colors uppercase tracking-[0.2em] border-none bg-transparent cursor-pointer">
                                    Trust this device for 30 days
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                {/* Secure Footer Info */}
                <div className="mt-8 flex items-center justify-center gap-6 opacity-50">
                    <div className="flex items-center gap-2">
                        <Fingerprint className="w-4 h-4 text-slate-400" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Biometric Ready</span>
                    </div>
                    <div className="w-px h-3 bg-slate-300"></div>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-slate-400" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">AES-256 Encrypted</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
