import React, { useState, useEffect } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // States
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [sku, setSku] = useState('');
    const [stock, setStock] = useState('');
    const [costPrice, setCostPrice] = useState('');
    const [description, setDescription] = useState('');
    const [mainImage, setMainImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [activeImageIdx, setActiveImageIdx] = useState(0);

    // Dropdown States
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

    // Color Pickers
    const [customHex, setCustomHex] = useState('#6366F1');
    const [showPicker, setShowPicker] = useState(false);
    const [hue, setHue] = useState(240);
    const [saturation, setSaturation] = useState(100);
    const [lightness, setLightness] = useState(50);

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

    const availableSizes = [
        'XS / 36', 'S / 38', 'M / 40', 'L / 42', 'XL / 44', 'XXL / 46',
        '3XL / 48', '4XL / 50', '5XL / 52', '6XL / 54', '7XL / 56',
        '8XL / 58', '9XL / 60', '10XL / 62'
    ];

    // Mock Fetch
    useEffect(() => {
        const mockProduct = {
            id: id,
            name: 'Premium Cotton Formal Shirt',
            price: '1699',
            salePrice: '1299',
            sku: 'SHIRT-ZARA-001',
            stock: '45',
            costPrice: '600',
            description: 'This is a premium cotton formal shirt, perfect for office wear and formal occasions. Features a slim fit and breathable fabric.',
            brand: 'Zara',
            category: 'Men',
            status: 'Regular',
            material: 'Cotton',
            pattern: 'Solid',
            fit: 'Slim Fit',
            sleeve: 'Long Sleeve',
            length: 'Standard Length',
            neck: 'Button Down Collar',
            country: 'India',
            care: 'Machine Wash',
            colors: ['Black', 'Blue', 'White'],
            sizes: ['M / 40', 'L / 42', 'XL / 44'],
            mainImage: 'https://theformalclub.in/cdn/shop/files/TealFormalShirt_4.jpg?v=1751886662&width=600',
            gallery: [
                'https://theformalclub.in/cdn/shop/files/TealFormalShirt_1.jpg?v=1751886662',
                'https://theformalclub.in/cdn/shop/files/TealFormalShirt_2.jpg?v=1751886662'
            ]
        };

        setName(mockProduct.name);
        setPrice(mockProduct.price);
        setSalePrice(mockProduct.salePrice);
        setSku(mockProduct.sku);
        setStock(mockProduct.stock);
        setCostPrice(mockProduct.costPrice);
        setDescription(mockProduct.description);
        setSelectedBrand(mockProduct.brand);
        setBrandSearch(mockProduct.brand);
        setSelectedCategory(mockProduct.category);
        setCategorySearch(mockProduct.category);
        setSelectedStatus(mockProduct.status);
        setStatusSearch(mockProduct.status);
        setSelectedMaterial(mockProduct.material);
        setMaterialSearch(mockProduct.material);
        setSelectedPattern(mockProduct.pattern);
        setPatternSearch(mockProduct.pattern);
        setSelectedFit(mockProduct.fit);
        setFitSearch(mockProduct.fit);
        setSelectedSleeve(mockProduct.sleeve);
        setSleeveSearch(mockProduct.sleeve);
        setSelectedLength(mockProduct.length);
        setLengthSearch(mockProduct.length);
        setSelectedNeck(mockProduct.neck);
        setNeckSearch(mockProduct.neck);
        setSelectedCountry(mockProduct.country);
        setCountrySearch(mockProduct.country);
        setSelectedCare(mockProduct.care);
        setCareSearch(mockProduct.care);
        setSelectedColors(mockProduct.colors);
        setSelectedSizes(mockProduct.sizes);
        setMainImage({ id: 'main-1', preview: mockProduct.mainImage });
        setGalleryImages(mockProduct.gallery.map((img, i) => ({ id: `gallery-${i}`, preview: img })));
    }, [id]);

    const allImages = [mainImage, ...galleryImages].filter(Boolean);

    // Handlers
    const handleMainImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const newImage = { file, preview: URL.createObjectURL(file), id: 'main-' + Math.random().toString(36).substr(2, 9) };
        if (mainImage?.file) URL.revokeObjectURL(mainImage.preview);
        setMainImage(newImage);
        setActiveImageIdx(0);
    };

    const handleGalleryUpload = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({ file, preview: URL.createObjectURL(file), id: 'gallery-' + Math.random().toString(36).substr(2, 9) }));
        setGalleryImages(prev => [...prev, ...newImages]);
    };

    const removeImage = (id) => {
        if (mainImage?.id === id) {
            if (mainImage.file) URL.revokeObjectURL(mainImage.preview);
            setMainImage(null);
            setActiveImageIdx(0);
            return;
        }
        setGalleryImages(prev => {
            const indexToRemove = prev.findIndex(img => img.id === id);
            const updated = prev.filter(img => img.id !== id);
            const imageToRemove = prev[indexToRemove];
            if (imageToRemove?.file) URL.revokeObjectURL(imageToRemove.preview);
            return updated;
        });
    };

    const toggleSize = (size) => {
        setSelectedSizes(prev => prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]);
    };

    const toggleColor = (colorName) => {
        setSelectedColors(prev => prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]);
    };

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

    const openEyeDropper = async () => {
        if (!window.EyeDropper) return alert('Browser not supported');
        const eyeDropper = new window.EyeDropper();
        try {
            const result = await eyeDropper.open();
            setCustomHex(result.sRGBHex.toUpperCase());
        } catch (e) { }
    };

    const handleAddCustomColor = () => {
        if (!selectedColors.includes(customHex)) setSelectedColors([...selectedColors, customHex]);
        setShowPicker(false);
    };

    const handleUpdate = () => {
        alert('Product updated successfully!');
        navigate('/seller/products');
    };

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-32">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8">
                <div className="flex items-center gap-6">
                    <button onClick={() => navigate('/seller/products')} className="p-3 bg-white border border-gray-100 rounded-2xl hover:bg-gray-50 text-gray-600 transition-all shadow-sm cursor-pointer">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Edit Product</h1>
                        <p className="text-gray-500 text-sm font-medium">Update listing for Store #{id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <button onClick={() => navigate('/seller/products')} className="flex-1 sm:flex-none text-gray-600 font-bold text-sm px-8 py-4 border-none bg-transparent cursor-pointer hover:text-gray-900 transition-colors">Discard</button>
                    <button onClick={handleUpdate} className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-blue-200 transition-all border-none cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0">Update Changes</button>
                </div>
            </div>

            <div className="space-y-8">
                {/* Basic Info & Categorization */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                            </div>
                            <div className="space-y-2 relative">
                                <label className="text-sm font-bold text-gray-700 ml-1">Brand Name</label>
                                <div className="relative">
                                    <input type="text" value={brandSearch} onChange={(e) => { setBrandSearch(e.target.value); setIsBrandDropdownOpen(true); }} onFocus={() => setIsBrandDropdownOpen(true)} className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                                {isBrandDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="p-2 space-y-1">
                                            {filteredBrands.map(b => (
                                                <button key={b} onClick={() => { setSelectedBrand(b); setBrandSearch(b); setIsBrandDropdownOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between cursor-pointer">
                                                    <span>{b}</span>
                                                    {selectedBrand === b && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {isBrandDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsBrandDropdownOpen(false)}></div>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Product Description</label>
                                <textarea rows="5" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none resize-none"></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-4 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                                <List className="w-5 h-5 text-orange-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Categorization</h2>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2 relative">
                                <label className="text-sm font-bold text-gray-700 ml-1">Primary Category</label>
                                <div className="relative">
                                    <input type="text" value={categorySearch} onChange={(e) => { setCategorySearch(e.target.value); setIsCategoryDropdownOpen(true); }} onFocus={() => setIsCategoryDropdownOpen(true)} className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                                {isCategoryDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto">
                                        <div className="p-2 space-y-1">
                                            {filteredCategories.map(c => (
                                                <button key={c} onClick={() => { setSelectedCategory(c); setCategorySearch(c); setIsCategoryDropdownOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between cursor-pointer">
                                                    <span>{c}</span>
                                                    {selectedCategory === c && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {isCategoryDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsCategoryDropdownOpen(false)}></div>}
                            </div>
                            <div className="space-y-2 relative">
                                <label className="text-sm font-bold text-gray-700 ml-1">Product Status</label>
                                <div className="relative">
                                    <input type="text" value={statusSearch} onChange={(e) => { setStatusSearch(e.target.value); setIsStatusDropdownOpen(true); }} onFocus={() => setIsStatusDropdownOpen(true)} className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                                {isStatusDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto">
                                        <div className="p-2 space-y-1">
                                            {filteredStatuses.map(s => (
                                                <button key={s} onClick={() => { setSelectedStatus(s); setStatusSearch(s); setIsStatusDropdownOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between cursor-pointer">
                                                    <span>{s}</span>
                                                    {selectedStatus === s && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {isStatusDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsStatusDropdownOpen(false)}></div>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Search Tags</label>
                                <input type="text" placeholder="Summer, Trendy, New..." className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Technical Specifications */}
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                            <ClipboardList className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">Technical Specifications</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Repeatable dropdown logic for Material, Pattern, Fit, Sleeve, Length, Neck, Country, Care */}
                        {[
                            { label: 'Material', value: materialSearch, setter: setMaterialSearch, open: isMaterialDropdownOpen, setOpen: setIsMaterialDropdownOpen, items: filteredMaterials, selected: selectedMaterial, setSelected: setSelectedMaterial },
                            { label: 'Pattern', value: patternSearch, setter: setPatternSearch, open: isPatternDropdownOpen, setOpen: setIsPatternDropdownOpen, items: filteredPatterns, selected: selectedPattern, setSelected: setSelectedPattern },
                            { label: 'Fit Type', value: fitSearch, setter: setFitSearch, open: isFitDropdownOpen, setOpen: setIsFitDropdownOpen, items: filteredFits, selected: selectedFit, setSelected: setSelectedFit },
                            { label: 'Sleeve Type', value: sleeveSearch, setter: setSleeveSearch, open: isSleeveDropdownOpen, setOpen: setIsSleeveDropdownOpen, items: filteredSleeves, selected: selectedSleeve, setSelected: setSelectedSleeve },
                            { label: 'Length', value: lengthSearch, setter: setLengthSearch, open: isLengthDropdownOpen, setOpen: setIsLengthDropdownOpen, items: filteredLengths, selected: selectedLength, setSelected: setSelectedLength },
                            { label: 'Neck Style', value: neckSearch, setter: setNeckSearch, open: isNeckDropdownOpen, setOpen: setIsNeckDropdownOpen, items: filteredNecks, selected: selectedNeck, setSelected: setSelectedNeck },
                            { label: 'Country', value: countrySearch, setter: setCountrySearch, open: isCountryDropdownOpen, setOpen: setIsCountryDropdownOpen, items: filteredCountries, selected: selectedCountry, setSelected: setSelectedCountry },
                            { label: 'Care', value: careSearch, setter: setCareSearch, open: isCareDropdownOpen, setOpen: setIsCareDropdownOpen, items: filteredCares, selected: selectedCare, setSelected: setSelectedCare },
                        ].map((spec, i) => (
                            <div key={i} className="space-y-2 relative">
                                <label className="text-sm font-bold text-gray-700 ml-1">{spec.label}</label>
                                <div className="relative">
                                    <input type="text" value={spec.value} onChange={(e) => { spec.setter(e.target.value); spec.setOpen(true); }} onFocus={() => spec.setOpen(true)} className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                </div>
                                {spec.open && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-48 overflow-y-auto">
                                        <div className="p-2 space-y-1">
                                            {spec.items.map(item => (
                                                <button key={item} onClick={() => { spec.setSelected(item); spec.setter(item); spec.setOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-xs font-medium flex items-center justify-between cursor-pointer">
                                                    <span>{item}</span>
                                                    {spec.selected === item && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {spec.open && <div className="fixed inset-0 z-40" onClick={() => spec.setOpen(false)}></div>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Media & Color variants in grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Visual Media */}
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                                    <ImageIcon className="w-5 h-5 text-purple-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Media Assets</h2>
                            </div>
                        </div>
                        <div className="space-y-8">
                            <div className="relative aspect-video bg-gray-50 rounded-[32px] overflow-hidden border border-gray-100 group">
                                {allImages.length > 0 ? (
                                    <>
                                        <img src={allImages[activeImageIdx]?.preview} className="w-full h-full object-cover" alt="Preview" />
                                        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => setActiveImageIdx(p => Math.max(0, p - 1))} className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer"><ChevronLeft className="w-5 h-5" /></button>
                                            <button onClick={() => setActiveImageIdx(p => Math.min(allImages.length - 1, p + 1))} className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer"><ChevronRight className="w-5 h-5" /></button>
                                        </div>
                                        <button onClick={() => removeImage(allImages[activeImageIdx].id)} className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full cursor-pointer"><X className="w-4 h-4" /></button>
                                    </>
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                        <Upload className="w-10 h-10 mb-2" />
                                        <span className="text-xs font-bold uppercase tracking-widest">No Media Uploaded</span>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                <label className="flex-shrink-0 w-20 h-24 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                                    <Plus className="w-6 h-6 text-gray-300" />
                                    <input type="file" multiple className="hidden" onChange={handleGalleryUpload} />
                                </label>
                                {allImages.map((img, i) => (
                                    <button key={img.id} onClick={() => setActiveImageIdx(i)} className={`flex-shrink-0 w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all ${activeImageIdx === i ? 'border-blue-600' : 'border-transparent'}`}>
                                        <img src={img.preview} className="w-full h-full object-cover" alt="Thumb" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Color Management */}
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                                <Palette className="w-5 h-5 text-indigo-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Color Palette</h2>
                        </div>
                        <div className="space-y-8">
                            <div className="flex flex-wrap gap-4">
                                {availableColors.map(c => (
                                    <button key={c.name} onClick={() => toggleColor(c.name)} className={`w-12 h-12 rounded-full border-2 transition-all p-1 ${selectedColors.includes(c.name) ? 'border-blue-600 scale-110' : 'border-transparent'}`}>
                                        <div className="w-full h-full rounded-full flex items-center justify-center" style={{ backgroundColor: c.hex }}>
                                            {selectedColors.includes(c.name) && <Check className={`w-5 h-5 ${c.name === 'White' ? 'text-black' : 'text-white'}`} />}
                                        </div>
                                    </button>
                                ))}
                                <button onClick={() => setShowPicker(!showPicker)} className="w-12 h-12 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:border-blue-500"><Plus className="w-5 h-5" /></button>
                            </div>
                            {showPicker && (
                                <div className="p-6 bg-neutral-900 rounded-[32px] space-y-6 animate-in slide-in-from-bottom-4">
                                    <div className="flex items-center gap-4">
                                        <button onClick={openEyeDropper} className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center cursor-pointer hover:bg-neutral-700"><Pipette className="w-5 h-5 text-neutral-400" /></button>
                                        <div className="w-12 h-12 rounded-full border-2 border-neutral-700" style={{ backgroundColor: customHex }}></div>
                                        <input type="range" min="0" max="360" value={hue} onChange={(e) => { setHue(e.target.value); updateFromHsl(e.target.value, 100, 50); }} className="flex-1 h-2 rounded-full appearance-none cursor-pointer bg-gradient-to-r from-red-500 via-blue-500 to-red-500" />
                                    </div>
                                    <button onClick={handleAddCustomColor} className="w-full py-3 bg-white text-black rounded-xl font-bold text-xs uppercase tracking-widest cursor-pointer">Add Custom Color</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Pricing & Sizes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Pricing & Inventory</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Reg. Price (₹)</label>
                                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Sale Price (₹)</label>
                                <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">SKU</label>
                                <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Stock</label>
                                <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 outline-none" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                <Package className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Size Matrix</h2>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {availableSizes.map(s => (
                                <button key={s} onClick={() => toggleSize(s)} className={`px-4 py-2.5 rounded-xl border font-bold text-xs transition-all cursor-pointer ${selectedSizes.includes(s) ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-50' : 'bg-gray-50 text-gray-400 border-gray-50 hover:border-gray-200'}`}>{s}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
