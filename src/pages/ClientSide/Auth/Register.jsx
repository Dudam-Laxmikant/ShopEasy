import React, { useState } from 'react';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    User,
    ShieldCheck,
    CheckCircle2
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        terms: false
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Creating your account...');
        navigate('/login');
    };

    return (
        <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-12 animate-in fade-in slide-in-from-top-10 duration-700">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="flex justify-center">
                        <div className="w-16 h-16 bg-blue-600 rounded-[20px] shadow-xl shadow-blue-200 flex items-center justify-center rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                            <User className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-none">Join the Club</h2>
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Create your premium account today</p>
                </div>

                {/* Form */}
                <div className="bg-white rounded-[40px] border border-gray-100 shadow-2xl p-10 space-y-8 relative overflow-hidden group">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <CheckCircle2 className="w-32 h-32 text-blue-600 rotate-12" />
                    </div>

                    <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            {/* Full Name */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-3">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all font-sans"
                                        placeholder="Enter your name"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-3">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-500 transition-all font-sans"
                                        placeholder="name@email.com"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-3">Choose Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

                        <div className="flex items-start gap-3 px-3">
                            <input
                                type="checkbox"
                                required
                                checked={formData.terms}
                                onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                                className="mt-1 w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <p className="text-xs font-bold text-gray-500 leading-relaxed">
                                I agree to the <span className="text-blue-600 hover:underline cursor-pointer">Terms of Service</span> and <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-2xl shadow-blue-500/20 border-none cursor-pointer"
                        >
                            Create My Account <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                </div>

                {/* Footer link */}
                <p className="text-center text-gray-500 font-bold text-sm">
                    Already a member? {' '}
                    <Link to="/login" className="text-blue-600 hover:text-blue-700 font-black transition-colors underline decoration-2 underline-offset-4">
                        Sign In Instead
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
