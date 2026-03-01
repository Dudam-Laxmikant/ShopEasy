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
    Pipette,
    ClipboardList,
    Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    const [mainImage, setMainImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Basic Product Info States
    const [productTitle, setProductTitle] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [searchTags, setSearchTags] = useState('');
    const [regularPrice, setRegularPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [sku, setSku] = useState('');
    const [initialStock, setInitialStock] = useState('');
    const [costPrice, setCostPrice] = useState('');

    // Generic Searchable Dropdown States & Data
    const [patternSearch, setPatternSearch] = useState('');
    const [selectedPattern, setSelectedPattern] = useState('');
    const [isPatternDropdownOpen, setIsPatternDropdownOpen] = useState(false);
    const patterns = ['Solid', 'Striped', 'Floral', 'Animal print', 'Argyle', 'Camouflage', 'Chequered', 'Chevron', 'Fruits', 'Geometric', 'Hearts', 'Letter print', 'Paisley', 'Plaid', 'Polka dots', 'Stars', 'Tie-Dye', 'Abstract', 'Ombre', 'Jacquard'];
    const filteredPatterns = patterns.filter(p => p.toLowerCase().includes(patternSearch.toLowerCase()));

    const [countrySearch, setCountrySearch] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const countries = ['India', 'United States', 'United Kingdom', 'China', 'Japan', 'Germany', 'France', 'Italy', 'Canada', 'Australia', 'Brazil', 'Russia', 'South Korea', 'Mexico', 'Spain', 'Indonesia', 'Turkey', 'Netherlands', 'Saudi Arabia', 'Switzerland', 'Bangladesh', 'Vietnam', 'Thailand', 'Sri Lanka', 'Nepal', 'Pakistan', 'Singapore', 'UAE'];
    const filteredCountries = countries.filter(c => c.toLowerCase().includes(countrySearch.toLowerCase()));

    const [materialSearch, setMaterialSearch] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');
    const [isMaterialDropdownOpen, setIsMaterialDropdownOpen] = useState(false);
    const materials = ['Cotton', 'Rayon', 'Linen', 'Art Silk', 'Chiffon', 'Corduroy', 'Crepe', 'Denim', 'Down', 'Fleece', 'Fur', 'Georgette', 'Lyocell', 'Modal', 'Rubber', 'Satin', 'Silk', 'Synthetic', 'Velvet', 'Wool', 'Polyester', 'Nylon', 'Spandex', 'Viscose', 'Leather', 'Canvas'];
    const filteredMaterials = materials.filter(m => m.toLowerCase().includes(materialSearch.toLowerCase()));

    const [fitSearch, setFitSearch] = useState('');
    const [selectedFit, setSelectedFit] = useState('');
    const [isFitDropdownOpen, setIsFitDropdownOpen] = useState(false);
    const fitTypes = ['Regular Fit', 'Slim Fit', 'Relaxed Fit', 'Oversized Fit', 'Skinny Fit', 'Classic Fit', 'Loose Fit', 'Tailored Fit', 'Comfort Fit', 'Athletic Fit', 'Curve Fit', 'Maternity Fit', 'Petite Fit', 'Tall Fit'];
    const filteredFits = fitTypes.filter(f => f.toLowerCase().includes(fitSearch.toLowerCase()));

    const [sleeveSearch, setSleeveSearch] = useState('');
    const [selectedSleeve, setSelectedSleeve] = useState('');
    const [isSleeveDropdownOpen, setIsSleeveDropdownOpen] = useState(false);
    const sleeveTypes = ['Long Sleeve', 'Short Sleeve', 'Half Sleeve', 'Sleeveless', '3/4 Sleeve', 'Cap Sleeve', 'Raglan Sleeve', 'Roll-up Sleeve', 'Kimono Sleeve', 'Puff Sleeve', 'Bell Sleeve', 'Butterfly Sleeve', 'Batwing Sleeve'];
    const filteredSleeves = sleeveTypes.filter(s => s.toLowerCase().includes(sleeveSearch.toLowerCase()));

    const [lengthSearch, setLengthSearch] = useState('');
    const [selectedLength, setSelectedLength] = useState('');
    const [isLengthDropdownOpen, setIsLengthDropdownOpen] = useState(false);
    const lengths = ['Standard Length', 'Short Length', 'Longline', 'Knee Length', 'Midi Length', 'Maxi Length', 'Cropped', 'Thigh Length', 'Ankle Length', 'Floor Length', 'Mini Length', 'Hi-Low Length'];
    const filteredLengths = lengths.filter(l => l.toLowerCase().includes(lengthSearch.toLowerCase()));

    const [neckSearch, setNeckSearch] = useState('');
    const [selectedNeck, setSelectedNeck] = useState('');
    const [isNeckDropdownOpen, setIsNeckDropdownOpen] = useState(false);
    const neckStyles = ['Button Down Collar', 'Crew Neck', 'V-Neck', 'Polo Collar', 'High Neck', 'Scoop Neck', 'Turtle Neck', 'Henley', 'Mandarin Collar', 'Boat Neck', 'Square Neck', 'Off-Shoulder', 'Halter Neck', 'Cowl Neck', 'Sweetheart Neck', 'Mock Neck'];
    const filteredNecks = neckStyles.filter(n => n.toLowerCase().includes(neckSearch.toLowerCase()));

    const [careSearch, setCareSearch] = useState('');
    const [selectedCare, setSelectedCare] = useState('');
    const [isCareDropdownOpen, setIsCareDropdownOpen] = useState(false);
    const careInstructions = ['Machine Wash', 'Hand Wash Only', 'Dry Clean Only', 'Do Not Bleach', 'Iron Low Heat', 'Tumble Dry Low', 'Cold Wash', 'Line Dry', 'Flat Dry', 'Wash with Similar Colors', 'Do Not Tumble Dry', 'Gentle Cycle'];
    const filteredCares = careInstructions.filter(c => c.toLowerCase().includes(careSearch.toLowerCase()));

    const [brandSearch, setBrandSearch] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false);
    const brands = ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M', 'Levi\'s', 'Gucci', 'Prada', 'Tommy Hilfiger', 'Calvin Klein', 'Louis Vuitton', 'Chanel', 'Dior', 'Under Armour', 'Reebok', 'Apple', 'Samsung', 'Sony', 'LG', 'Panasonic', 'Uniqlo', 'Gap', 'Forever 21', 'Lacoste'];
    const filteredBrands = brands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase()));

    const [categorySearch, setCategorySearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
    const categoriesList = ['Men', 'Women', 'Kids', 'Fashion Accessories', 'Footwear', 'Electronics', 'Home & Kitchen', 'Beauty & Personal Care', 'Sports & Outdoors', 'Books', 'Toys', 'Groceries', 'Automotive', 'Handbags', 'Watches', 'Jewelry'];
    const filteredCategories = categoriesList.filter(c => c.toLowerCase().includes(categorySearch.toLowerCase()));

    const [statusSearch, setStatusSearch] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const statuses = ['Regular', 'Sale', 'New Arrival', 'Best Seller', 'Out of Stock', 'Pre-Order'];
    const filteredStatuses = statuses.filter(s => s.toLowerCase().includes(statusSearch.toLowerCase()));

    const allImages = [mainImage, ...galleryImages].filter(Boolean);

    const handleMainImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const newImage = {
            file,
            preview: URL.createObjectURL(file),
            id: 'main-' + Math.random().toString(36).substr(2, 9)
        };

        if (mainImage) URL.revokeObjectURL(mainImage.preview);
        setMainImage(newImage);
        setActiveImageIdx(0);
    };

    const handleGalleryUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            file,
            preview: URL.createObjectURL(file),
            id: 'gallery-' + Math.random().toString(36).substr(2, 9)
        }));
        setGalleryImages(prev => [...prev, ...newImages]);
    };

    const removeImage = (id) => {
        if (mainImage?.id === id) {
            URL.revokeObjectURL(mainImage.preview);
            setMainImage(null);
            setActiveImageIdx(0);
            return;
        }

        setGalleryImages(prev => {
            const indexToRemove = prev.findIndex(img => img.id === id);
            const updated = prev.filter(img => img.id !== id);

            const imageToRemove = prev[indexToRemove];
            if (imageToRemove) URL.revokeObjectURL(imageToRemove.preview);

            return updated;
        });
    };



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

    const handlePublish = () => {
        // Collect all data, falling back to search values if nothing selected from dropdown
        const productData = {
            id: 'PROD-' + Date.now(),
            name: productTitle || 'New Premium Product',
            brand: selectedBrand || brandSearch || 'Generic',
            description: productDescription,
            category: selectedCategory || categorySearch || 'Fashion',
            status: selectedStatus || statusSearch || 'Active',
            tags: searchTags,
            material: selectedMaterial || materialSearch || 'Cotton',
            pattern: selectedPattern || patternSearch || 'Solid',
            fit: selectedFit || fitSearch || 'Regular Fit',
            sleeve: selectedSleeve || sleeveSearch || 'Long Sleeve',
            length: selectedLength || lengthSearch || 'Standard Length',
            neck: selectedNeck || neckSearch || 'Crew Neck',
            country: selectedCountry || countrySearch || 'India',
            care: selectedCare || careSearch || 'Machine Wash',
            price: salePrice || regularPrice || 1699,
            regularPrice: regularPrice || '3499',
            sku: sku || 'N/A',
            stock: initialStock || 0,
            sales: 0,
            image: mainImage?.preview || 'https://theformalclub.in/cdn/shop/files/TealFormalShirt_4.jpg?v=1751886662&width=600',
            images: allImages.map(img => img.preview).length > 0 ? allImages.map(img => img.preview) : ['https://theformalclub.in/cdn/shop/files/TealFormalShirt_4.jpg?v=1751886662&width=600'],
            colors: selectedColors,
            sizes: selectedSizes,
            createdAt: new Date().toISOString()
        };

        // Save to localStorage for demo persistence
        const existingProducts = JSON.parse(localStorage.getItem('sellerProducts') || '[]');
        localStorage.setItem('sellerProducts', JSON.stringify([productData, ...existingProducts]));

        setShowSuccessModal(true);
    };

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-32">
            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setShowSuccessModal(false)}></div>
                    <div className="bg-white rounded-[40px] p-8 max-w-md w-full relative z-[110] shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-5 duration-300 text-center">
                        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-100">
                            <Check className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 mb-2">Well Done!</h2>
                        <p className="text-gray-500 font-medium mb-8">Your product "<span className="text-blue-600 font-bold">{productTitle || 'New Product'}</span>" has been successfully added to your store.</p>
                        <div className="grid grid-cols-1 gap-3">
                            <button
                                onClick={() => navigate('/seller/products')}
                                className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-sm border-none cursor-pointer hover:bg-gray-800 transition-all"
                            >
                                Go to Management
                            </button>
                            <button
                                onClick={() => setShowSuccessModal(false)}
                                className="w-full py-4 bg-white text-gray-400 rounded-2xl font-bold text-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition-all"
                            >
                                Add Another Product
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/seller/products')}
                        className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 text-gray-600 transition-all shadow-sm cursor-pointer"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Add New Product</h1>
                        <p className="text-gray-500 text-sm font-medium">Create a premium listing for your store.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <button
                        onClick={() => navigate('/seller/products')}
                        className="flex-1 sm:flex-none text-gray-600 font-bold text-sm px-8 py-4 border-none bg-transparent cursor-pointer hover:text-gray-900 transition-colors"
                    >
                        Discard
                    </button>
                    <button
                        onClick={handlePublish}
                        className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-blue-200 transition-all border-none cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        Publish Product
                    </button>
                </div>
            </div>

            <div className="space-y-8">
                {/* Row 1: Basic Information & Organization */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Basic Info */}
                    <div className="lg:col-span-8 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                <Tag className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
                        </div>
                        <div className="grid gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Product Title</label>
                                <input
                                    type="text"
                                    value={productTitle}
                                    onChange={(e) => setProductTitle(e.target.value)}
                                    placeholder="e.g. Premium Cotton Oversized T-Shirt"
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                            {/* Brand - Searchable Dropdown */}
                            <div className="space-y-2 relative">
                                <label className="text-sm font-bold text-gray-700 ml-1">Brand Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search or select brand..."
                                        value={brandSearch}
                                        onChange={(e) => {
                                            setBrandSearch(e.target.value);
                                            setIsBrandDropdownOpen(true);
                                        }}
                                        onFocus={() => setIsBrandDropdownOpen(true)}
                                        className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                    />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                                {isBrandDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                        {filteredBrands.length > 0 ? (
                                            <div className="p-2 space-y-1">
                                                {filteredBrands.map((b) => (
                                                    <button
                                                        key={b}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedBrand(b);
                                                            setBrandSearch(b);
                                                            setIsBrandDropdownOpen(false);
                                                        }}
                                                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                    >
                                                        <span>{b}</span>
                                                        {selectedBrand === b && <Check className="w-4 h-4" />}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-4 text-center text-gray-400 text-sm">No brands found</div>
                                        )}
                                    </div>
                                )}
                                {isBrandDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsBrandDropdownOpen(false)}></div>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Product Description</label>
                                <textarea
                                    rows="5"
                                    value={productDescription}
                                    onChange={(e) => setProductDescription(e.target.value)}
                                    placeholder="Describe the material, fit, and special features..."
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Organization */}
                    <div className="lg:col-span-4 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                                <List className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Categorization</h2>
                        </div>
                        <div className="space-y-6">
                            {/* Category - Searchable Dropdown */}
                            <div className="space-y-2 relative">
                                <label className="text-sm font-bold text-gray-700 ml-1">Primary Category</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search category..."
                                        value={categorySearch}
                                        onChange={(e) => {
                                            setCategorySearch(e.target.value);
                                            setIsCategoryDropdownOpen(true);
                                        }}
                                        onFocus={() => setIsCategoryDropdownOpen(true)}
                                        className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                    />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                                {isCategoryDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                        {filteredCategories.length > 0 ? (
                                            <div className="p-2 space-y-1">
                                                {filteredCategories.map((c) => (
                                                    <button
                                                        key={c}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedCategory(c);
                                                            setCategorySearch(c);
                                                            setIsCategoryDropdownOpen(false);
                                                        }}
                                                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                    >
                                                        <span>{c}</span>
                                                        {selectedCategory === c && <Check className="w-4 h-4" />}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-4 text-center text-gray-400 text-sm">No categories found</div>
                                        )}
                                    </div>
                                )}
                                {isCategoryDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsCategoryDropdownOpen(false)}></div>}
                            </div>
                            {/* Status - Searchable Dropdown */}
                            <div className="space-y-2 relative">
                                <label className="text-sm font-bold text-gray-700 ml-1">Product Status</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search status..."
                                        value={statusSearch}
                                        onChange={(e) => {
                                            setStatusSearch(e.target.value);
                                            setIsStatusDropdownOpen(true);
                                        }}
                                        onFocus={() => setIsStatusDropdownOpen(true)}
                                        className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                    />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                                {isStatusDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                        {filteredStatuses.length > 0 ? (
                                            <div className="p-2 space-y-1">
                                                {filteredStatuses.map((s) => (
                                                    <button
                                                        key={s}
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedStatus(s);
                                                            setStatusSearch(s);
                                                            setIsStatusDropdownOpen(false);
                                                        }}
                                                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                    >
                                                        <span>{s}</span>
                                                        {selectedStatus === s && <Check className="w-4 h-4" />}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-4 text-center text-gray-400 text-sm">No status found</div>
                                        )}
                                    </div>
                                )}
                                {isStatusDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsStatusDropdownOpen(false)}></div>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Search Tags</label>
                                <input
                                    type="text"
                                    value={searchTags}
                                    onChange={(e) => setSearchTags(e.target.value)}
                                    placeholder="Summer, Trendy, New..."
                                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Row 1.5: Product Specifications (New from user request) */}
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                            <ClipboardList className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Product Specifications</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {/* Material Composition - Searchable Dropdown */}
                        <div className="space-y-2 relative">
                            <label className="text-sm font-bold text-gray-700 ml-1">Material Composition</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search material..."
                                    value={materialSearch}
                                    onChange={(e) => {
                                        setMaterialSearch(e.target.value);
                                        setIsMaterialDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsMaterialDropdownOpen(true)}
                                    className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>

                            {isMaterialDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                    {filteredMaterials.length > 0 ? (
                                        <div className="p-2 space-y-1">
                                            {filteredMaterials.map((m) => (
                                                <button
                                                    key={m}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedMaterial(m);
                                                        setMaterialSearch(m);
                                                        setIsMaterialDropdownOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                >
                                                    <span>{m}</span>
                                                    {selectedMaterial === m && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-gray-400 text-sm">
                                            No materials found
                                        </div>
                                    )}
                                </div>
                            )}
                            {isMaterialDropdownOpen && (
                                <div className="fixed inset-0 z-40" onClick={() => setIsMaterialDropdownOpen(false)}></div>
                            )}
                        </div>
                        {/* Pattern - Searchable Dropdown */}
                        <div className="space-y-2 relative">
                            <label className="text-sm font-bold text-gray-700 ml-1">Pattern</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search or select pattern..."
                                    value={patternSearch}
                                    onChange={(e) => {
                                        setPatternSearch(e.target.value);
                                        setIsPatternDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsPatternDropdownOpen(true)}
                                    className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>

                            {isPatternDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                    {filteredPatterns.length > 0 ? (
                                        <div className="p-2 space-y-1">
                                            {filteredPatterns.map((pattern) => (
                                                <button
                                                    key={pattern}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedPattern(pattern);
                                                        setPatternSearch(pattern);
                                                        setIsPatternDropdownOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                >
                                                    <span>{pattern}</span>
                                                    {selectedPattern === pattern && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-gray-400 text-sm">
                                            No patterns found
                                        </div>
                                    )}
                                </div>
                            )}
                            {/* Backdrop to close dropdown */}
                            {isPatternDropdownOpen && (
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsPatternDropdownOpen(false)}
                                ></div>
                            )}
                        </div>
                        {/* Fit Type - Searchable Dropdown */}
                        <div className="space-y-2 relative">
                            <label className="text-sm font-bold text-gray-700 ml-1">Fit Type</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search fit type..."
                                    value={fitSearch}
                                    onChange={(e) => {
                                        setFitSearch(e.target.value);
                                        setIsFitDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsFitDropdownOpen(true)}
                                    className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>

                            {isFitDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                    {filteredFits.length > 0 ? (
                                        <div className="p-2 space-y-1">
                                            {filteredFits.map((f) => (
                                                <button
                                                    key={f}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedFit(f);
                                                        setFitSearch(f);
                                                        setIsFitDropdownOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                >
                                                    <span>{f}</span>
                                                    {selectedFit === f && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-gray-400 text-sm text-gray-400">
                                            No fit types found
                                        </div>
                                    )}
                                </div>
                            )}
                            {isFitDropdownOpen && (
                                <div className="fixed inset-0 z-40" onClick={() => setIsFitDropdownOpen(false)}></div>
                            )}
                        </div>
                        {/* Sleeve Type - Searchable Dropdown */}
                        <div className="space-y-2 relative">
                            <label className="text-sm font-bold text-gray-700 ml-1">Sleeve Type</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search sleeve type..."
                                    value={sleeveSearch}
                                    onChange={(e) => {
                                        setSleeveSearch(e.target.value);
                                        setIsSleeveDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsSleeveDropdownOpen(true)}
                                    className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>

                            {isSleeveDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                    {filteredSleeves.length > 0 ? (
                                        <div className="p-2 space-y-1">
                                            {filteredSleeves.map((s) => (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedSleeve(s);
                                                        setSleeveSearch(s);
                                                        setIsSleeveDropdownOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                >
                                                    <span>{s}</span>
                                                    {selectedSleeve === s && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-gray-400 text-sm">
                                            No sleeve types found
                                        </div>
                                    )}
                                </div>
                            )}
                            {isSleeveDropdownOpen && (
                                <div className="fixed inset-0 z-40" onClick={() => setIsSleeveDropdownOpen(false)}></div>
                            )}
                        </div>
                        {/* Length - Searchable Dropdown */}
                        <div className="space-y-2 relative">
                            <label className="text-sm font-bold text-gray-700 ml-1">Length</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search length..."
                                    value={lengthSearch}
                                    onChange={(e) => {
                                        setLengthSearch(e.target.value);
                                        setIsLengthDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsLengthDropdownOpen(true)}
                                    className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>

                            {isLengthDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                    {filteredLengths.length > 0 ? (
                                        <div className="p-2 space-y-1">
                                            {filteredLengths.map((l) => (
                                                <button
                                                    key={l}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedLength(l);
                                                        setLengthSearch(l);
                                                        setIsLengthDropdownOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                >
                                                    <span>{l}</span>
                                                    {selectedLength === l && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-gray-400 text-sm">
                                            No lengths found
                                        </div>
                                    )}
                                </div>
                            )}
                            {isLengthDropdownOpen && (
                                <div className="fixed inset-0 z-40" onClick={() => setIsLengthDropdownOpen(false)}></div>
                            )}
                        </div>
                        {/* Neck Style - Searchable Dropdown */}
                        <div className="space-y-2 relative">
                            <label className="text-sm font-bold text-gray-700 ml-1">Neck Style</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search neck style..."
                                    value={neckSearch}
                                    onChange={(e) => {
                                        setNeckSearch(e.target.value);
                                        setIsNeckDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsNeckDropdownOpen(true)}
                                    className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>

                            {isNeckDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                    {filteredNecks.length > 0 ? (
                                        <div className="p-2 space-y-1">
                                            {filteredNecks.map((n) => (
                                                <button
                                                    key={n}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedNeck(n);
                                                        setNeckSearch(n);
                                                        setIsNeckDropdownOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                >
                                                    <span>{n}</span>
                                                    {selectedNeck === n && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-gray-400 text-sm">
                                            No neck styles found
                                        </div>
                                    )}
                                </div>
                            )}
                            {isNeckDropdownOpen && (
                                <div className="fixed inset-0 z-40" onClick={() => setIsNeckDropdownOpen(false)}></div>
                            )}
                        </div>
                        {/* Country of Origin - Searchable Dropdown */}
                        <div className="space-y-2 relative">
                            <label className="text-sm font-bold text-gray-700 ml-1">Country of Origin</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search or select country..."
                                    value={countrySearch}
                                    onChange={(e) => {
                                        setCountrySearch(e.target.value);
                                        setIsCountryDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsCountryDropdownOpen(true)}
                                    className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>

                            {isCountryDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                    {filteredCountries.length > 0 ? (
                                        <div className="p-2 space-y-1">
                                            {filteredCountries.map((country) => (
                                                <button
                                                    key={country}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedCountry(country);
                                                        setCountrySearch(country);
                                                        setIsCountryDropdownOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                >
                                                    <span>{country}</span>
                                                    {selectedCountry === country && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-gray-400 text-sm">
                                            No countries found
                                        </div>
                                    )}
                                </div>
                            )}
                            {/* Backdrop to close dropdown */}
                            {isCountryDropdownOpen && (
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsCountryDropdownOpen(false)}
                                ></div>
                            )}
                        </div>
                        {/* Care instructions - Searchable Dropdown */}
                        <div className="space-y-2 relative">
                            <label className="text-sm font-bold text-gray-700 ml-1">Care instructions</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search care instructions..."
                                    value={careSearch}
                                    onChange={(e) => {
                                        setCareSearch(e.target.value);
                                        setIsCareDropdownOpen(true);
                                    }}
                                    onFocus={() => setIsCareDropdownOpen(true)}
                                    className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            </div>

                            {isCareDropdownOpen && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                    {filteredCares.length > 0 ? (
                                        <div className="p-2 space-y-1">
                                            {filteredCares.map((c) => (
                                                <button
                                                    key={c}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedCare(c);
                                                        setCareSearch(c);
                                                        setIsCareDropdownOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                >
                                                    <span>{c}</span>
                                                    {selectedCare === c && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-gray-400 text-sm">
                                            No care instructions found
                                        </div>
                                    )}
                                </div>
                            )}
                            {isCareDropdownOpen && (
                                <div className="fixed inset-0 z-40" onClick={() => setIsCareDropdownOpen(false)}></div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Row 2: Visuals (Side-by-Side Images & Colors) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Images Section */}
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                                    <ImageIcon className="w-5 h-5 text-purple-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Product Images</h2>
                            </div>
                            <label htmlFor="main-image-upload" className="text-xs font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-full transition-colors">
                                {mainImage ? 'Change Main' : 'Upload Main'}
                            </label>
                        </div>

                        <div className="space-y-8">
                            <input type="file" id="main-image-upload" accept="image/*" className="hidden" onChange={handleMainImageUpload} />

                            {/* main image big preview */}
                            <div className="relative aspect-video sm:aspect-square lg:aspect-video xl:aspect-square bg-gray-50 rounded-[32px] overflow-hidden border border-gray-100 group shadow-inner">
                                {allImages.length > 0 ? (
                                    <>
                                        <img
                                            src={allImages[activeImageIdx]?.preview}
                                            alt="Preview"
                                            className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-500"
                                        />
                                        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setActiveImageIdx(p => Math.max(0, p - 1))} disabled={activeImageIdx === 0} className="w-11 h-11 bg-white/90 rounded-full flex items-center justify-center shadow-lg border-none cursor-pointer disabled:opacity-30">
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button onClick={() => setActiveImageIdx(p => Math.min(allImages.length - 1, p + 1))} disabled={activeImageIdx === allImages.length - 1} className="w-11 h-11 bg-white/90 rounded-full flex items-center justify-center shadow-lg border-none cursor-pointer disabled:opacity-30">
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <button onClick={() => removeImage(allImages[activeImageIdx].id)} className="absolute top-4 right-4 p-3 bg-red-500/90 text-white rounded-full shadow-lg border-none cursor-pointer hover:bg-red-600 transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </>
                                ) : (
                                    <label htmlFor="main-image-upload" className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100/50 transition-colors">
                                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-4">
                                            <Upload className="w-7 h-7 text-blue-500" />
                                        </div>
                                        <span className="text-sm font-bold text-gray-900">Upload Product Images</span>
                                        <span className="text-[10px] text-gray-400 mt-2 font-black uppercase tracking-widest">Supports JPED, PNG, WEBP</span>
                                    </label>
                                )}
                            </div>

                            {/* thumbnail gallery line */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between px-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Media Gallery ({galleryImages.length})</span>
                                </div>
                                <div className="flex overflow-x-auto gap-3 pb-2 snap-x scroll-smooth scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                                    <input type="file" id="gallery-upload" multiple accept="image/*" className="hidden" onChange={handleGalleryUpload} />

                                    {mainImage && (
                                        <button onClick={() => setActiveImageIdx(0)} className={`relative flex-shrink-0 w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all snap-start ${activeImageIdx === 0 ? 'border-blue-600 scale-105' : 'border-gray-100'}`}>
                                            <img src={mainImage.preview} className="w-full h-full object-cover" />
                                            <div className="absolute top-0 left-0 bg-blue-600 text-[8px] text-white px-1.5 py-0.5 rounded-br-lg font-black uppercase">Main</div>
                                        </button>
                                    )}

                                    {galleryImages.map((img, idx) => {
                                        const globalIdx = mainImage ? idx + 1 : idx;
                                        return (
                                            <button key={img.id} onClick={() => setActiveImageIdx(globalIdx)} className={`relative flex-shrink-0 w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all snap-start ${activeImageIdx === globalIdx ? 'border-blue-600 scale-105' : 'border-transparent hover:border-gray-200'}`}>
                                                <img src={img.preview} className="w-full h-full object-cover" />
                                            </button>
                                        );
                                    })}

                                    <label htmlFor="gallery-upload" className="flex-shrink-0 w-20 h-24 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer snap-start bg-white">
                                        <Plus className="w-6 h-6" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Colors Section */}
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                                <Palette className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Color Variants</h2>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <p className="text-sm font-bold text-gray-700 ml-1">Quick Select Colors</p>
                                <div className="flex flex-wrap gap-4">
                                    {availableColors.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => toggleColor(color.name)}
                                            className={`group relative w-12 h-12 rounded-full border-2 transition-all p-1 cursor-pointer ${selectedColors.includes(color.name) ? 'border-blue-600 scale-110 shadow-lg' : 'border-transparent hover:border-gray-200'}`}
                                        >
                                            <div className="w-full h-full rounded-full flex items-center justify-center shadow-inner" style={{ backgroundColor: color.hex }}>
                                                {selectedColors.includes(color.name) && (
                                                    <Check className={`w-5 h-5 ${color.name === 'White' ? 'text-black' : 'text-white'}`} />
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setShowPicker(!showPicker)}
                                        className={`w-12 h-12 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center transition-all hover:border-blue-500 hover:bg-blue-50 cursor-pointer ${showPicker ? 'border-blue-500 bg-blue-50' : ''}`}
                                    >
                                        <Plus className={`w-5 h-5 ${showPicker ? 'rotate-45' : ''} text-gray-400`} />
                                    </button>
                                </div>
                            </div>

                            {showPicker && (
                                <div className="animate-in fade-in slide-in-from-top-4 duration-300 p-6 bg-neutral-900 rounded-[32px] shadow-2xl space-y-6">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-black uppercase text-neutral-500 tracking-widest">Custom Color Engine</span>
                                        <button onClick={() => setShowPicker(false)} className="text-neutral-500 hover:text-white border-none bg-transparent cursor-pointer">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4">
                                            <button onClick={openEyeDropper} className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center border-none cursor-pointer group hover:bg-neutral-700">
                                                <Pipette className="w-5 h-5 text-neutral-400 group-hover:text-white" />
                                            </button>
                                            <div className="w-12 h-12 rounded-full border-2 border-neutral-700" style={{ backgroundColor: customHex }}></div>
                                            <div className="flex-1 relative h-2 bg-gradient-to-r from-red-500 via-blue-500 to-red-500 rounded-full my-auto">
                                                <input type="range" min="0" max="360" value={hue} onChange={(e) => {
                                                    const h = parseInt(e.target.value);
                                                    setHue(h);
                                                    updateFromHsl(h, saturation, lightness);
                                                }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                                            </div>
                                        </div>
                                        <button onClick={handleAddCustomColor} className="w-full py-4 bg-white hover:bg-neutral-100 text-black rounded-2xl font-black text-xs uppercase tracking-widest border-none cursor-pointer shadow-xl transition-all">
                                            Add To Variants
                                        </button>
                                    </div>
                                </div>
                            )}

                            {selectedColors.length > 0 && (
                                <div className="pt-8 border-t border-gray-50">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 ml-1">Selected Variants</p>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedColors.map(c => (
                                            <div key={c} className="group relative">
                                                <div
                                                    className="w-10 h-10 rounded-full border-2 border-white shadow-md cursor-help"
                                                    style={{ backgroundColor: availableColors.find(ac => ac.name === c)?.hex || c }}
                                                ></div>
                                                <button onClick={() => toggleColor(c)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity border-none cursor-pointer shadow-sm">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Row 3: Pricing & Sizes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Pricing & Inventory */}
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Pricing & Inventory</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Regular Price (₹)</label>
                                <input type="number" value={regularPrice} onChange={(e) => setRegularPrice(e.target.value)} placeholder="0.00" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Sale Price (₹)</label>
                                <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="0.00" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">SKU</label>
                                <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="e.g. TSH-001" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Initial Stock</label>
                                <input type="number" value={initialStock} onChange={(e) => setInitialStock(e.target.value)} placeholder="0" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                            </div>
                            <div className="sm:col-span-2 space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Cost Price (₹)</label>
                                <input type="number" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} placeholder="0.00" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest px-2 mt-1">Internal Use: For profit margin calculation</p>
                            </div>
                        </div>
                    </div>

                    {/* Sizes */}
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                <Package className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Size Variants</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {availableSizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => toggleSize(size)}
                                    className={`px-5 py-3 rounded-2xl border text-sm font-bold transition-all cursor-pointer ${selectedSizes.includes(size) ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-500 border-gray-50 hover:border-gray-200'}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-6 border-t border-gray-100 sm:hidden z-50 shadow-2xl rounded-t-[40px]">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all border-none cursor-pointer uppercase tracking-widest flex items-center justify-center gap-2">
                    <span>Publish Product</span>
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                </button>
            </div>
        </div>
    );
};

export default AddProduct;
