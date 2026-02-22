import React, { useState } from 'react';
import {
    ArrowLeft,
    Upload,
    Plus,
    X,
    Check,
    ChevronRight,
    ChevronLeft,
    Image as ImageIcon,
    Tag,
    List,
    DollarSign,
    Package,
    Palette,
    Pipette
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [activeImageIdx, setActiveImageIdx] = useState(0);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            id: Math.random().toString(36).substr(2, 9)
        }));
        setImages(prev => {
            const updated = [...prev, ...newImages];
            // If it was empty, the first of new images becomes active
            if (prev.length === 0 && updated.length > 0) setActiveImageIdx(0);
            return updated;
        });
    };

    const removeImage = (id) => {
        setImages(prev => {
            const indexToRemove = prev.findIndex(img => img.id === id);
            const updated = prev.filter(img => img.id !== id);

            // Cleanup blob URL
            const imageToRemove = prev[indexToRemove];
            if (imageToRemove) URL.revokeObjectURL(imageToRemove.preview);

            // Adjust active index
            if (indexToRemove === activeImageIdx) {
                setActiveImageIdx(Math.max(0, indexToRemove - 1));
            } else if (indexToRemove < activeImageIdx) {
                setActiveImageIdx(activeImageIdx - 1);
            }
            return updated;
        });
    };

    const categories = ['Fashion', 'Electronics', 'Home', 'Beauty', 'Sports'];

    const availableSizes = [
        'XS / 36', 'S / 38', 'M / 40', 'L / 42', 'XL / 44', 'XXL / 46',
        '3XL / 48', '4XL / 50', '5XL / 52', '6XL / 54', '7XL / 56',
        '8XL / 58', '9XL / 60', '10XL / 62'
    ];

    const toggleSize = (size) => {
        if (selectedSizes.includes(size)) {
            setSelectedSizes(selectedSizes.filter(s => s !== size));
        } else {
            setSelectedSizes([...selectedSizes, size]);
        }
    };

    const availableColors = [
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#FFFFFF' },
        { name: 'Red', hex: '#EF4444' },
        { name: 'Blue', hex: '#3B82F6' },
        { name: 'Green', hex: '#10B981' },
        { name: 'Yellow', hex: '#F59E0B' },
        { name: 'Purple', hex: '#8B5CF6' },
        { name: 'Pink', hex: '#EC4899' },
        { name: 'Gray', hex: '#6B7280' },
        { name: 'Indigo', hex: '#6366F1' },
    ];

    const toggleColor = (color) => {
        if (selectedColors.includes(color)) {
            setSelectedColors(selectedColors.filter(c => c !== color));
        } else {
            setSelectedColors([...selectedColors, color]);
        }
    };

    const [customHex, setCustomHex] = useState('#6366F1');
    const [showPicker, setShowPicker] = useState(false);
    const [hue, setHue] = useState(240);
    const [saturation, setSaturation] = useState(100);
    const [lightness, setLightness] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const updateFromHsl = (h, s, l) => {
        const l_scaled = l / 100;
        const a = (s * Math.min(l_scaled, 1 - l_scaled)) / 100;
        const f = (n) => {
            const k = (n + h / 30) % 12;
            const color = l_scaled - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');
        };
        const hex = `#${f(0)}${f(8)}${f(4)}`;
        setCustomHex(hex.toUpperCase());
    };

    const handleColorMove = (e, rect) => {
        const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
        const s = Math.round(x);
        const l = Math.round(100 - y / 2);
        setSaturation(s);
        setLightness(l);
        updateFromHsl(hue, s, l);
    };

    const openEyeDropper = async () => {
        if (!window.EyeDropper) {
            alert('Your browser does not support the EyeDropper API');
            return;
        }
        const eyeDropper = new window.EyeDropper();
        try {
            const result = await eyeDropper.open();
            setCustomHex(result.sRGBHex.toUpperCase());
        } catch (e) {
            console.log('Eyedropper cancelled');
        }
    };

    const hexToRgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16) || 0;
        const g = parseInt(hex.slice(3, 5), 16) || 0;
        const b = parseInt(hex.slice(5, 7), 16) || 0;
        return { r, g, b };
    };

    const rgb = hexToRgb(customHex);

    const handleAddCustomColor = () => {
        if (!selectedColors.includes(customHex)) {
            setSelectedColors([...selectedColors, customHex]);
        }
        setShowPicker(false);
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/seller/products')}
                        className="p-2.5 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 text-gray-600 transition-all border-none cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
                        <p className="text-gray-500 text-sm">Create a new listing for your store.</p>
                    </div>
                </div>
                <div className="hidden sm:flex items-center gap-3">
                    <button className="text-gray-600 font-bold text-sm px-6 py-3 border-none bg-transparent cursor-pointer hover:text-gray-900 transition-colors">
                        Discard
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-blue-200 transition-all border-none cursor-pointer">
                        Publish Product
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form Details */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Tag className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-bold text-gray-900">Basic Information</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Product Title</label>
                                <input
                                    type="text"
                                    placeholder="Enter more than 20 characters for better visibility"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Description</label>
                                <textarea
                                    rows="6"
                                    placeholder="Tell your customers about the product features, material, and quality..."
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none resize-none font-sans"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Pricing & Stock */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <DollarSign className="w-5 h-5 text-green-600" />
                            <h2 className="text-lg font-bold text-gray-900">Pricing & Inventory</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Regular Price (₹)</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Sale Price (₹)</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">SKU (Stock Keeping Unit)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. FASH-001"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Initial Stock Quantity</label>
                                <input
                                    type="number"
                                    placeholder="0"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700">Cost Price (₹)</label>
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                                />
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest px-1">Internal Use: For Profit Mapping</p>
                            </div>
                        </div>
                    </div>

                    {/* Product Variants (Colors) */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Palette className="w-5 h-5 text-indigo-600" />
                            <h2 className="text-lg font-bold text-gray-900">Product Variants (Colors)</h2>
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm font-bold text-gray-700">Select available colors for this product</p>
                            <div className="flex flex-wrap gap-4">
                                {availableColors.map((color) => (
                                    <button
                                        key={color.name}
                                        type="button"
                                        onClick={() => toggleColor(color.name)}
                                        className={`
                                            group relative w-12 h-12 rounded-full border-2 transition-all p-0.5 cursor-pointer
                                            ${selectedColors.includes(color.name)
                                                ? 'border-blue-600 scale-110 shadow-lg'
                                                : 'border-transparent hover:border-gray-200'}
                                        `}
                                        title={color.name}
                                    >
                                        <div
                                            className="w-full h-full rounded-full border border-gray-100 flex items-center justify-center"
                                            style={{ backgroundColor: color.hex }}
                                        >
                                            {selectedColors.includes(color.name) && (
                                                <Check className={`w-6 h-6 ${color.name === 'White' ? 'text-black' : 'text-white'}`} />
                                            )}
                                        </div>
                                        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {color.name}
                                        </span>
                                    </button>
                                ))}

                                {/* Custom Color Trigger */}
                                <button
                                    type="button"
                                    onClick={() => setShowPicker(!showPicker)}
                                    className={`
                                        group relative w-12 h-12 rounded-full border-2 border-dashed border-gray-200 transition-all flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 cursor-pointer
                                        ${showPicker ? 'border-blue-500 bg-blue-50' : ''}
                                    `}
                                >
                                    <Plus className={`w-5 h-5 transition-transform ${showPicker ? 'rotate-45 text-blue-600' : 'text-gray-400'}`} />
                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        Custom
                                    </span>
                                </button>
                            </div>

                            {/* Customizer Box (First Image Style) */}
                            {showPicker && (
                                <div className="animate-in fade-in slide-in-from-top-4 duration-300 relative mt-4 p-5 bg-neutral-900 rounded-[32px] shadow-2xl z-10 max-w-[320px]">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Customizer</h3>
                                        <button onClick={() => setShowPicker(false)} className="text-neutral-600 hover:text-white border-none bg-transparent cursor-pointer transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Tool Bar: Pipette, Swatch, Slider */}
                                        <div className="flex items-center gap-4 px-2">
                                            <button
                                                onClick={openEyeDropper}
                                                className="w-10 h-10 flex items-center justify-center bg-neutral-800 rounded-xl hover:bg-neutral-700 transition-colors border-none cursor-pointer group"
                                                title="Pick color from screen"
                                            >
                                                <Pipette className="w-5 h-5 text-neutral-400 group-hover:text-white" />
                                            </button>

                                            <div
                                                className="w-10 h-10 rounded-full border-2 border-neutral-700 shadow-inner"
                                                style={{ backgroundColor: customHex }}
                                            ></div>

                                            <div className="flex-1 relative group">
                                                <div className="absolute inset-0 h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-teal-500 via-blue-500 via-purple-500 to-red-500 rounded-full my-auto pointer-events-none"></div>
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="360"
                                                    value={hue}
                                                    onChange={(e) => {
                                                        const h = parseInt(e.target.value);
                                                        setHue(h);
                                                        updateFromHsl(h, saturation, lightness);
                                                    }}
                                                    className="w-full h-full opacity-0 cursor-pointer relative z-10"
                                                />
                                                <div
                                                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-lg pointer-events-none transition-all"
                                                    style={{
                                                        left: `${(hue / 360) * 100}%`,
                                                        backgroundColor: `hsl(${hue}, 100%, 50%)`,
                                                        transform: `translate(-50%, -50%) scale(${hue ? 1.1 : 1})`
                                                    }}
                                                ></div>
                                            </div>
                                        </div>

                                        {/* Main Color Field (Sat/Bri) */}
                                        <div
                                            className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 cursor-default group select-none active:scale-[0.99] transition-transform"
                                            onMouseDown={(e) => {
                                                setIsDragging(true);
                                                handleColorMove(e, e.currentTarget.getBoundingClientRect());
                                            }}
                                            onMouseMove={(e) => {
                                                if (isDragging) {
                                                    handleColorMove(e, e.currentTarget.getBoundingClientRect());
                                                }
                                            }}
                                            onMouseUp={() => setIsDragging(false)}
                                            onMouseLeave={() => setIsDragging(false)}
                                        >
                                            {/* Base Hue Layer */}
                                            <div
                                                className="absolute inset-0 z-0"
                                                style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
                                            ></div>
                                            {/* Saturation/Brightness Overlays */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-100 z-[1]"></div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-100 z-[2]"></div>

                                            {/* Selector Ring */}
                                            <div
                                                className="absolute z-[3] w-6 h-6 border-2 border-white rounded-full shadow-lg ring-4 ring-white/10 transition-all duration-75 pointer-events-none"
                                                style={{
                                                    left: `${saturation}%`,
                                                    top: `${(100 - (lightness * 2 - 100)) / 2}%`,
                                                    transform: 'translate(-50%, -50%) scale(1.1)'
                                                }}
                                            ></div>
                                        </div>

                                        {/* RGB Inputs */}
                                        <div className="grid grid-cols-3 gap-3">
                                            {['R', 'G', 'B'].map((label, idx) => (
                                                <div key={label} className="space-y-2">
                                                    <div className="h-14 bg-neutral-800 border border-neutral-700 rounded-xl flex items-center justify-center">
                                                        <span className="text-lg font-bold text-white tracking-widest">
                                                            {idx === 0 ? rgb.r : idx === 1 ? rgb.g : rgb.b}
                                                        </span>
                                                    </div>
                                                    <p className="text-[10px] text-center font-black text-neutral-500 tracking-widest">{label}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Hex Input */}
                                        <div className="flex items-center gap-3 p-4 bg-neutral-800 rounded-2xl border border-neutral-700">
                                            <Tag className="w-4 h-4 text-neutral-500" />
                                            <input
                                                type="text"
                                                value={customHex}
                                                onChange={(e) => setCustomHex(e.target.value)}
                                                className="w-full bg-transparent border-none outline-none font-bold text-white uppercase tracking-widest"
                                                placeholder="#HEXCODE"
                                            />
                                        </div>

                                        <button
                                            onClick={handleAddCustomColor}
                                            className="w-full py-4 bg-white hover:bg-neutral-100 text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all border-none cursor-pointer"
                                        >
                                            Apply Color
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Circular Selected Swatches Display (Second Image Style) */}
                            {selectedColors.length > 0 && (
                                <div className="pt-8 border-t border-gray-50">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-1 h-3 bg-blue-600 rounded-full"></div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Selected Variants</span>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {selectedColors.map(c => (
                                            <button
                                                key={c}
                                                type="button"
                                                onClick={() => toggleColor(c)}
                                                className="group relative w-12 h-12 rounded-full border-2 border-white shadow-md hover:scale-110 transition-all cursor-pointer overflow-hidden p-0.5"
                                            >
                                                <div
                                                    className="w-full h-full rounded-full border border-gray-100 flex items-center justify-center transition-transform"
                                                    style={{ backgroundColor: availableColors.find(ac => ac.name === c)?.hex || c }}
                                                >
                                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <X className={`w-5 h-5 ${c === 'White' || c === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                                                    </div>
                                                </div>
                                                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                    {availableColors.find(ac => ac.name === c)?.name || c}
                                                </span>
                                            </button>
                                        ))}

                                        {/* Quick Add Button showing that dashed X look from image */}
                                        <button
                                            type="button"
                                            onClick={() => setShowPicker(!showPicker)}
                                            className="w-12 h-12 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-300 hover:border-blue-400 hover:text-blue-500 transition-all cursor-pointer bg-transparent"
                                        >
                                            <Plus className={`w-5 h-5 transition-transform ${showPicker ? 'rotate-45' : ''}`} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Variants (Sizes) */}
                    <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Package className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-bold text-gray-900">Product Variants (Sizes)</h2>
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm font-bold text-gray-700">Select available sizes for this product</p>
                            <div className="flex flex-wrap gap-3">
                                {availableSizes.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => toggleSize(size)}
                                        className={`
                                            px-6 py-3 rounded-xl border transition-all whitespace-nowrap text-sm font-bold cursor-pointer
                                            ${selectedSizes.includes(size)
                                                ? 'border-blue-600 text-blue-600 bg-blue-50/50 shadow-sm ring-1 ring-blue-600/10'
                                                : 'border-gray-200 text-gray-500 hover:border-gray-400 bg-white'}
                                        `}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Organization & Images */}
                <div className="space-y-8">
                    {/* Image Upload */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <ImageIcon className="w-5 h-5 text-purple-600" />
                            <h2 className="text-lg font-bold text-gray-900">Product Images</h2>
                        </div>
                        <div className="space-y-6">
                            <input
                                type="file"
                                id="image-upload"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />

                            {/* Main Preview Block (Standard E-com style) */}
                            {images.length > 0 ? (
                                <div className="relative aspect-square rounded-[32px] overflow-hidden bg-gray-100 group shadow-lg border border-gray-100">
                                    <img
                                        src={images[activeImageIdx]?.preview}
                                        alt="Main product"
                                        className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
                                    />

                                    {/* Navigation Arrows */}
                                    <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => setActiveImageIdx(prev => Math.max(0, prev - 1))}
                                            disabled={activeImageIdx === 0}
                                            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-900 border-none shadow-xl cursor-pointer flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={() => setActiveImageIdx(prev => Math.min(images.length - 1, prev + 1))}
                                            disabled={activeImageIdx === images.length - 1}
                                            className="w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-900 border-none shadow-xl cursor-pointer flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </div>

                                    {/* Remove Button for Main View */}
                                    <button
                                        onClick={() => removeImage(images[activeImageIdx].id)}
                                        className="absolute top-4 right-4 p-2.5 bg-red-500 hover:bg-red-600 text-white rounded-full border-none shadow-xl cursor-pointer transition-all hover:scale-110 active:scale-90"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <label
                                    htmlFor="image-upload"
                                    className="block border-2 border-dashed border-gray-200 rounded-[32px] p-12 text-center bg-gray-50/50 hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group"
                                >
                                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                        <Upload className="w-8 h-8 text-blue-500" />
                                    </div>
                                    <p className="text-sm font-bold text-gray-900">Add Product Images</p>
                                    <p className="text-[10px] text-gray-400 mt-2 font-black uppercase tracking-widest">Main angle, side, back views</p>
                                </label>
                            )}

                            {/* Thumbnail Strip (Interactive) */}
                            {images.length > 0 && (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Gallery ({images.length}/6)</span>
                                        <label htmlFor="image-upload" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 cursor-pointer">Add More</label>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {images.map((img, idx) => (
                                            <button
                                                key={img.id}
                                                type="button"
                                                onClick={() => setActiveImageIdx(idx)}
                                                className={`
                                                    relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all p-0.5 cursor-pointer
                                                    ${activeImageIdx === idx
                                                        ? 'border-orange-500 scale-105 shadow-md'
                                                        : 'border-transparent hover:border-gray-200'}
                                                `}
                                            >
                                                <img src={img.preview} alt="thumb" className="w-full h-full object-cover rounded-lg" />
                                            </button>
                                        ))}
                                        {images.length < 6 && (
                                            <label
                                                htmlFor="image-upload"
                                                className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </label>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Category Selection */}
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <List className="w-5 h-5 text-orange-600" />
                            <h2 className="text-lg font-bold text-gray-900">Categorization</h2>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Category</label>
                            <select className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none appearance-none">
                                {categories.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700">Tags (press Enter)</label>
                            <input
                                type="text"
                                placeholder="New, Sale, Cotton..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-100 sm:hidden z-50">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all border-none cursor-pointer">
                    Publish Product
                </button>
            </div>
        </div>
    );
};

export default AddProduct;
