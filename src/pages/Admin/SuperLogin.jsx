import React, { useState } from 'react';
import { loginSuperAdmin, parseJwt } from './adminService';
import {
    Lock,
    ShieldAlert,
    Key,
    AtSign,
    ArrowRight,
    Fingerprint,
    Smartphone,
    Terminal
} from 'lucide-react';

const SuperLogin = () => {
    const [step, setStep] = useState(1); // 1: Login, 2: 2FA
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');
        try {
            const data = await loginSuperAdmin(email, password);
            localStorage.setItem('adminToken', data.access_token);
            
            // Clean old sub-admin detail to prevent conflict
            localStorage.removeItem('subAdminDetails');
            
            const decoded = parseJwt(data.access_token);
            if (decoded) {
                // Store super admin details in a distinct key
                localStorage.setItem('superAdminDetails', JSON.stringify(decoded));
            }
            setStep(2);
        } catch (err) {
            setErrorMsg(err.message || 'Super Admin login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handle2FA = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            window.location.href = '/admin/dashboard';
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden selection:bg-rose-600 selection:text-white font-sans text-slate-100">
            {/* Cyberpunk/High Security Background Effects */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-rose-950/20 blur-[150px] -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-950/20 blur-[120px] -z-10 animate-pulse"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 -z-20"></div>

            <div className="w-full max-w-[450px] animate-in fade-in zoom-in-95 duration-700">
                {/* Logo Section */}
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-rose-600 to-rose-800 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-rose-950/30 mb-6 group cursor-pointer hover:rotate-6 transition-transform border border-rose-500/20">
                        <Terminal className="w-10 h-10 text-white group-hover:scale-110 transition-transform" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tighter mb-2 italic uppercase">
                        SUPER<span className="text-rose-500">ROOT</span>
                    </h1>
                    <p className="text-rose-400/60 font-bold uppercase text-[10px] tracking-[0.3em]">Global Overlord Credentials Required</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-8 md:p-10 rounded-[32px] shadow-2xl relative">
                    <div className="absolute top-0 right-10 w-24 h-px bg-gradient-to-r from-transparent via-rose-500 to-transparent"></div>

                    {step === 1 ? (
                        <div className="space-y-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-rose-950/40 rounded-xl border border-rose-900/30">
                                    <Key className="w-5 h-5 text-rose-500" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Root Access Sign In</h2>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-6">
                                {errorMsg && (
                                    <div className="p-3 bg-rose-950/40 text-rose-400 rounded-xl text-xs font-bold border border-rose-900/40">
                                        {errorMsg}
                                    </div>
                                )}
                                <div className="space-y-2.5">
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Super Admin Identity</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-rose-500 transition-colors">
                                            <AtSign className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="root_id or email"
                                            className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <div className="flex justify-between items-center px-1">
                                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Access Key</label>
                                        <button type="button" className="text-[11px] font-black text-rose-500 hover:text-rose-400 transition-colors uppercase tracking-widest border-none bg-transparent cursor-pointer">Bypass OTP</button>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-rose-500 transition-colors">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="password"
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••••••"
                                            className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <button
                                    disabled={isLoading}
                                    className="w-full bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all border-none cursor-pointer uppercase tracking-widest text-xs group"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            Initiate Handshake
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-rose-950/40 border border-rose-900/30 rounded-xl">
                                    <ShieldAlert className="w-5 h-5 text-rose-500" />
                                </div>
                                <h2 className="text-xl font-bold text-white">2-Factor Override</h2>
                            </div>

                            <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl flex items-center gap-4">
                                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                                    <Smartphone className="w-6 h-6 text-rose-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Overlord Token</p>
                                    <p className="text-[11px] text-slate-400 font-medium">Enter the 2FA override code</p>
                                </div>
                            </div>

                            <form onSubmit={handle2FA} className="space-y-6">
                                <div className="grid grid-cols-6 gap-3">
                                    {[1, 2, 3, 4, 5, 6].map((idx) => (
                                        <input
                                            key={idx}
                                            type="text"
                                            maxLength="1"
                                            className="w-full aspect-square bg-slate-950 border border-slate-800 rounded-xl text-center text-xl font-black text-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                                        />
                                    ))}
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl transition-all border-none cursor-pointer uppercase tracking-widest text-[10px]"
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-[2] bg-rose-600 hover:bg-rose-500 disabled:bg-rose-800 text-white font-black py-4 rounded-2xl transition-all border-none cursor-pointer uppercase tracking-widest text-[10px]"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                                        ) : "Confirm Override"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                {/* Secure Footer Info */}
                <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
                    <div className="flex items-center gap-2">
                        <Fingerprint className="w-4 h-4 text-slate-400" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Biometric Active</span>
                    </div>
                    <div className="w-px h-3 bg-slate-800"></div>
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-slate-400" />
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Root Console Session</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperLogin;
