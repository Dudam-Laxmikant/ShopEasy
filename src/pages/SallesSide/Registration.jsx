import React, { useState } from 'react';
import {
    Store,
    FileText,
    CreditCard,
    Upload,
    CheckCircle2,
    Search,
    ChevronRight,
    ArrowLeft
} from 'lucide-react';

const Registration = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        businessName: '',
        storeName: '',
        businessType: '',
        gstNumber: '',
        panNumber: '',
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        beneficiaryName: ''
    });

    const nextStep = () => setStep(prev => Math.min(prev + 1, 4));
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

    const renderStep1 = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Business Legal Name</label>
                    <input
                        type="text"
                        placeholder="As on PAN / GST"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Display Store Name</label>
                    <input
                        type="text"
                        placeholder="e.g. Fashion Hub"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Business Type</label>
                    <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none appearance-none">
                        <option>Individual / Sole Proprietorship</option>
                        <option>Partnership</option>
                        <option>Private Limited Company</option>
                        <option>Public Limited Company</option>
                    </select>
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">GSTIN Number</label>
                    <input
                        type="text"
                        placeholder="22AAAAA0000A1Z5"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">PAN Number</label>
                    <input
                        type="text"
                        placeholder="ABCDE1234F"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    />
                </div>
            </div>

            <div className="pt-4">
                <p className="text-sm font-bold text-gray-700 mb-3">Upload Documents</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer group bg-gray-50/50">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
                        <p className="text-sm font-bold text-gray-900">GST Certificate</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, JPG up to 5MB</p>
                    </div>
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors cursor-pointer group bg-gray-50/50">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-blue-500 transition-colors" />
                        <p className="text-sm font-bold text-gray-900">PAN Card</p>
                        <p className="text-xs text-gray-500 mt-1">PDF, JPG up to 5MB</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Account Holder Name</label>
                    <input
                        type="text"
                        placeholder="As per bank records"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Bank Name</label>
                    <input
                        type="text"
                        placeholder="e.g. HDFC Bank"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Account Number</label>
                    <input
                        type="password"
                        placeholder="•••• •••• •••• 1234"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">IFSC Code</label>
                    <input
                        type="text"
                        placeholder="HDFC0001234"
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    />
                </div>
            </div>
        </div>
    );

    const renderSuccess = () => (
        <div className="text-center py-12 space-y-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Application Submitted!</h2>
            <p className="text-gray-500 max-w-sm mx-auto">
                Your documents are being verified by our team. You will be notified via email within 24-48 hours.
            </p>
            <div className="pt-8">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all border-none cursor-pointer">
                    Go to Dashboard
                </button>
            </div>
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Seller Registration</h1>
                <p className="text-gray-500 mt-1">Complete these steps to start selling on ShopEasy</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between max-w-3xl mx-auto mb-12 relative px-4">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
                <div className="absolute top-1/2 left-0 h-0.5 bg-blue-600 -translate-y-1/2 z-0 transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>

                {[
                    { icon: Store, label: 'Business' },
                    { icon: FileText, label: 'Tax Info' },
                    { icon: CreditCard, label: 'Payment' },
                    { icon: CheckCircle2, label: 'Finish' }
                ].map((s, idx) => (
                    <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-4 border-white shadow-sm
                            ${step > idx + 1 ? 'bg-green-600 text-white' : step === idx + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                            <s.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-[11px] font-bold uppercase tracking-wider ${step === idx + 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                            {s.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-blue-900/5 p-6 md:p-10 max-w-3xl mx-auto">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderSuccess()}

                {step < 4 && (
                    <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-50">
                        <button
                            onClick={prevStep}
                            disabled={step === 1}
                            className={`flex items-center gap-2 text-sm font-bold transition-all px-4 py-3 rounded-xl border-none cursor-pointer
                                ${step === 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>
                        <button
                            onClick={nextStep}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-blue-200 border-none cursor-pointer group"
                        >
                            <span>{step === 3 ? 'Complete Application' : 'Save & Continue'}</span>
                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Registration;
