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
    Search,
    User,
    UserRound,
    Laptop,
    LayoutGrid,
    Smartphone,
    Cpu,
    HardDrive,
    Shield,
    Hash,
    Zap,
    Activity,
    Wifi,
    Maximize,
    Scale,
    Shirt,
    Watch,
    Wallet,
    Glasses,
    Footprints,
    Crown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const navigate = useNavigate();
    const [mainImage, setMainImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [activeImageIdx, setActiveImageIdx] = useState(0);
    const [showCategoryModal, setShowCategoryModal] = useState(true);
    const [modalStep, setModalStep] = useState('primary'); // 'primary' or 'men-sub'
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formStep, setFormStep] = useState('common'); // 'common' or 'specs'
    const [specs, setSpecs] = useState({});
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [dropdownSearch, setDropdownSearch] = useState('');

    // Basic Product Info States
    const [productTitle, setProductTitle] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [searchTags, setSearchTags] = useState('');
    const [regularPrice, setRegularPrice] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [sku, setSku] = useState('');
    const [initialStock, setInitialStock] = useState('');
    const [costPrice, setCostPrice] = useState('');
    // Women's specific fields
    const [mrp, setMrp] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [offerStartDate, setOfferStartDate] = useState('');
    const [offerEndDate, setOfferEndDate] = useState('');
    const [productWeight, setProductWeight] = useState('');

    // Electronics Specification States
    const [modelName, setModelName] = useState('');
    const [modelNumber, setModelNumber] = useState('');
    const [processorSearch, setProcessorSearch] = useState('');
    const [selectedProcessor, setSelectedProcessor] = useState('');
    const [isProcessorDropdownOpen, setIsProcessorDropdownOpen] = useState(false);
    const processorOptions = ['Apple A17 Pro', 'Apple M3 Max', 'Snapdragon 8 Gen 3', 'Intel Core i9-14900K', 'AMD Ryzen 9 7950X', 'Google Tensor G3', 'Exynos 2400', 'MediaTek Dimensity 9300', 'NVIDIA RTX 4090 GPU', 'Apple S9 SiP'];
    const filteredProcessors = processorOptions.filter(p => p.toLowerCase().includes(processorSearch.toLowerCase()));

    const [storageSearch, setStorageSearch] = useState('');
    const [selectedStorage, setSelectedStorage] = useState('');
    const [isStorageDropdownOpen, setIsStorageDropdownOpen] = useState(false);
    const storageOptions = ['8GB / 128GB', '8GB / 256GB', '12GB / 256GB', '12GB / 512GB', '16GB / 512GB', '16GB / 1TB', '32GB / 1TB', '64GB / 2TB', '4GB / 64GB', '18GB / 512GB'];
    const filteredStorages = storageOptions.filter(s => s.toLowerCase().includes(storageSearch.toLowerCase()));

    const [batterySearch, setBatterySearch] = useState('');
    const [selectedBattery, setSelectedBattery] = useState('');
    const [isBatteryDropdownOpen, setIsBatteryDropdownOpen] = useState(false);
    const batteryOptions = ['3000 mAh', '4000 mAh', '4500 mAh', '5000 mAh', '6000 mAh', '10000 mAh', 'Li-Po 4422 mAh', '54.2Wh (MacBook)', '99.9Wh (Laptop)', '2000 mAh'];
    const filteredBatteries = batteryOptions.filter(b => b.toLowerCase().includes(batterySearch.toLowerCase()));
    const [powerConsumption, setPowerConsumption] = useState('');
    const [dimensions, setDimensions] = useState('');
    const [weight, setWeight] = useState('');
    const [selectedConnectivity, setSelectedConnectivity] = useState('');
    const [connectivitySearch, setConnectivitySearch] = useState('');
    const [isConnectivityDropdownOpen, setIsConnectivityDropdownOpen] = useState(false);
    const connectivityOptions = ['WiFi 6', 'Bluetooth 5.3', 'NFC', 'USB-C 3.2', 'HDMI 2.1', 'Ethernet', 'Wireless Charge', 'GPS', '5G Support', 'Thunderbolt 4'];
    const filteredConnectivity = connectivityOptions.filter(c => c.toLowerCase().includes(connectivitySearch.toLowerCase()));

    const [warrantySearch, setWarrantySearch] = useState('');
    const [selectedWarranty, setSelectedWarranty] = useState('');
    const [isWarrantyDropdownOpen, setIsWarrantyDropdownOpen] = useState(false);
    const warrantyOptions = ['No Warranty', '6 Months', '1 Year Standard', '2 Years Extended', '3 Years Premium', 'Lifetime Warranty', 'Manufacturer Warranty'];
    const filteredWarranties = warrantyOptions.filter(w => w.toLowerCase().includes(warrantySearch.toLowerCase()));

    const [features, setFeatures] = useState([]);
    const [featureInput, setFeatureInput] = useState('');
    const addFeature = () => {
        if (featureInput.trim()) {
            setFeatures([...features, featureInput.trim()]);
            setFeatureInput('');
        }
    };
    const removeFeature = (index) => {
        setFeatures(features.filter((_, i) => i !== index));
    };


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

    const [occasionSearch, setOccasionSearch] = useState('');
    const [selectedOccasion, setSelectedOccasion] = useState('');
    const [isOccasionDropdownOpen, setIsOccasionDropdownOpen] = useState(false);
    const occasions = ['Casual', 'Formal', 'Party', 'Wedding', 'Sports', 'Business', 'Festival', 'Cocktail', 'Streetwear', 'Ethnic', 'Office', 'Travel'];
    const filteredOccasions = occasions.filter(o => o.toLowerCase().includes(occasionSearch.toLowerCase()));

    const [workTypeSearch, setWorkTypeSearch] = useState('');
    const [selectedWorkType, setSelectedWorkType] = useState('');
    const [isWorkTypeDropdownOpen, setIsWorkTypeDropdownOpen] = useState(false);
    const workTypes = ['Embroidered', 'Printed', 'Woven', 'Plain', 'Solid', 'Check', 'Striped', 'Floral', 'Hand Work', 'Stone Work', 'Mirror Work', 'Zari Work', 'Gota Patti'];
    const filteredWorkTypes = workTypes.filter(w => w.toLowerCase().includes(workTypeSearch.toLowerCase()));

    const [dupattaIncluded, setDupattaIncluded] = useState('');

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

    const [selectedCategory, setSelectedCategory] = useState('');
    const [categorySearch, setCategorySearch] = useState('');
    const [selectedCategoryLabel, setSelectedCategoryLabel] = useState('');
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

    // Sub-category lists based on primary category
    const womenCategories = ['Saree', 'Kurti', 'Dress', 'Top', 'T-Shirt', 'Shirt', 'Jeans', 'Pant', 'Leggings', 'Shoes', 'Sandals', 'Heels', 'Handbag', 'Wallet', 'Watch', 'Sunglasses', 'Belt', 'Jewellery'];
    const menCategories = [
        'T-Shirt', 'Shirt', 'Pant', 'Jeans', 'Shorts', 'Track Pant', 'Jacket', 
        'Hoodie', 'Blazer', 'Kurta', 'Shoes', 'Slippers', 'Sandals', 'Boots', 
        'Cap', 'Hat', 'Sunglasses', 'Watch', 'Wallet', 'Bag', 'Belt', 
        'Socks', 'Muffler / Scarf', 'Gloves', 'Jewellery (Men)'
    ];
    const electronicsCategories = ['Mobile', 'Laptop', 'Smartwatch', 'Headphones', 'Camera', 'Tablet', 'Accessories', 'Gaming', 'Home Appliances', 'Computer Peripherals'];

    const menSubCategories = [
        { name: 'T-Shirt', icon: Shirt, colorClass: 'bg-blue-50 text-blue-600 group-hover:bg-blue-500 group-hover:text-white' },
        { name: 'Shirt', icon: Shirt, colorClass: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white' },
        { name: 'Pant', icon: Tag, colorClass: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white' },
        { name: 'Jeans', icon: Tag, colorClass: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white' },
        { name: 'Shorts', icon: Tag, colorClass: 'bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white' },
        { name: 'Track Pant', icon: Tag, colorClass: 'bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white' },
        { name: 'Jacket', icon: Shirt, colorClass: 'bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white' },
        { name: 'Hoodie', icon: Shirt, colorClass: 'bg-purple-50 text-purple-600 group-hover:bg-purple-500 group-hover:text-white' },
        { name: 'Blazer', icon: Shirt, colorClass: 'bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white' },
        { name: 'Kurta', icon: Shirt, colorClass: 'bg-pink-50 text-pink-600 group-hover:bg-pink-500 group-hover:text-white' },
        { name: 'Shoes', icon: Footprints, colorClass: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white' },
        { name: 'Slippers', icon: Footprints, colorClass: 'bg-blue-50 text-blue-600 group-hover:bg-blue-500 group-hover:text-white' },
        { name: 'Sandals', icon: Footprints, colorClass: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white' },
        { name: 'Boots', icon: Footprints, colorClass: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white' },
        { name: 'Cap', icon: Crown, colorClass: 'bg-pink-50 text-pink-600 group-hover:bg-pink-500 group-hover:text-white' },
        { name: 'Hat', icon: Crown, colorClass: 'bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white' },
        { name: 'Sunglasses', icon: Glasses, colorClass: 'bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white' },
        { name: 'Watch', icon: Watch, colorClass: 'bg-purple-50 text-purple-600 group-hover:bg-purple-500 group-hover:text-white' },
        { name: 'Wallet', icon: Wallet, colorClass: 'bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white' },
        { name: 'Bag', icon: Wallet, colorClass: 'bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white' },
        { name: 'Belt', icon: Shield, colorClass: 'bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white' },
        { name: 'Socks', icon: Tag, colorClass: 'bg-blue-50 text-blue-600 group-hover:bg-blue-500 group-hover:text-white' },
        { name: 'Muffler / Scarf', icon: Tag, colorClass: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white' },
        { name: 'Gloves', icon: Tag, colorClass: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white' },
        { name: 'Jewellery (Men)', icon: Crown, colorClass: 'bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white' }
    ];

    const womenSubCategories = [
        { name: 'Saree', icon: Shirt, colorClass: 'bg-pink-50 text-pink-600 group-hover:bg-pink-500 group-hover:text-white' },
        { name: 'Kurti', icon: Shirt, colorClass: 'bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white' },
        { name: 'Dress', icon: Shirt, colorClass: 'bg-fuchsia-50 text-fuchsia-600 group-hover:bg-fuchsia-500 group-hover:text-white' },
        { name: 'Top', icon: Shirt, colorClass: 'bg-purple-50 text-purple-600 group-hover:bg-purple-500 group-hover:text-white' },
        { name: 'T-Shirt', icon: Shirt, colorClass: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white' },
        { name: 'Shirt', icon: Shirt, colorClass: 'bg-blue-50 text-blue-600 group-hover:bg-blue-500 group-hover:text-white' },
        { name: 'Jeans', icon: Tag, colorClass: 'bg-cyan-50 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white' },
        { name: 'Pant', icon: Tag, colorClass: 'bg-teal-50 text-teal-600 group-hover:bg-teal-500 group-hover:text-white' },
        { name: 'Leggings', icon: Tag, colorClass: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white' },
        { name: 'Shoes', icon: Footprints, colorClass: 'bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white' },
        { name: 'Sandals', icon: Footprints, colorClass: 'bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white' },
        { name: 'Heels', icon: Footprints, colorClass: 'bg-red-50 text-red-600 group-hover:bg-red-500 group-hover:text-white' },
        { name: 'Handbag', icon: Wallet, colorClass: 'bg-pink-50 text-pink-600 group-hover:bg-pink-500 group-hover:text-white' },
        { name: 'Wallet', icon: Wallet, colorClass: 'bg-rose-50 text-rose-600 group-hover:bg-rose-500 group-hover:text-white' },
        { name: 'Watch', icon: Watch, colorClass: 'bg-purple-50 text-purple-600 group-hover:bg-purple-500 group-hover:text-white' },
        { name: 'Sunglasses', icon: Glasses, colorClass: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white' },
        { name: 'Belt', icon: Shield, colorClass: 'bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-white' },
        { name: 'Jewellery', icon: Crown, colorClass: 'bg-fuchsia-50 text-fuchsia-600 group-hover:bg-fuchsia-500 group-hover:text-white' }
    ];

    const subCategoryFields = {
        'T-Shirt': ['Size', 'Sleeve Type', 'Neck Style', 'Fabric', 'Pattern', 'Fit', 'Occasion'],
        'Shirt': ['Size', 'Sleeve Type', 'Neck Style', 'Fabric', 'Pattern', 'Fit', 'Occasion'],
        'Pant': ['Waist Size', 'Length', 'Fabric', 'Pattern', 'Fit', 'Closure Type'],
        'Jeans': ['Waist Size', 'Length', 'Fit', 'Pattern', 'Stretchable', 'Closure Type'],
        'Shorts': ['Waist Size', 'Length', 'Fabric', 'Pattern', 'Fit'],
        'Jacket': ['Size', 'Sleeve Type', 'Hood', 'Fabric', 'Fit', 'Closure Type'],
        'Hoodie': ['Size', 'Sleeve Type', 'Hood', 'Fabric', 'Fit'],
        'Blazer': ['Size', 'Fabric', 'Pattern', 'Fit', 'Occasion'],
        'Track Pant': ['Waist Size', 'Length', 'Fabric', 'Fit', 'Pocket'],
        'Kurta': ['Size', 'Sleeve Type', 'Neck Style', 'Fabric', 'Pattern', 'Occasion'],
        'Shoes': ['Shoe Size', 'Material', 'Sole Material', 'Closure Type', 'Occasion'],
        'Slippers': ['Slipper Size', 'Material', 'Sole Material'],
        'Sandals': ['Sandal Size', 'Material', 'Closure Type'],
        'Boots': ['Boot Size', 'Material', 'Sole Material', 'Closure Type'],
        'Cap': ['Size', 'Material', 'Pattern'],
        'Hat': ['Size', 'Material'],
        'Sunglasses': ['Frame Material', 'Lens Type', 'Frame Color'],
        'Watch': ['Dial Shape', 'Strap Material', 'Display Type', 'Water Resistant', 'Warranty'],
        'Wallet': ['Material', 'Number of Compartments', 'Closure Type'],
        'Bag': ['Material', 'Capacity', 'Number of Compartments', 'Closure Type'],
        'Belt': ['Belt Size', 'Material', 'Buckle Type', 'Width'],
        'Socks': ['Size', 'Material', 'Pattern'],
        'Muffler / Scarf': ['Material', 'Length', 'Pattern'],
        'Gloves': ['Size', 'Material', 'Pattern'],
        'Jewellery (Men)': ['Material', 'Size', 'Stone Type (Optional)']
    };

    const specOptions = {
        'Sleeve Type': ['Long Sleeve', 'Short Sleeve', 'Half Sleeve', 'Sleeveless', '3/4 Sleeve', 'Cap Sleeve', 'Raglan Sleeve'],
        'Neck Style': ['Button Down Collar', 'Crew Neck', 'V-Neck', 'Polo Collar', 'High Neck', 'Scoop Neck', 'Turtle Neck', 'Henley', 'Mandarin Collar'],
        'Fabric': ['Cotton', 'Rayon', 'Linen', 'Art Silk', 'Chiffon', 'Corduroy', 'Crepe', 'Denim', 'Fleece', 'Satin', 'Silk', 'Synthetic', 'Velvet', 'Wool', 'Polyester', 'Nylon', 'Spandex', 'Viscose'],
        'Material': ['Cotton', 'Rayon', 'Linen', 'Art Silk', 'Chiffon', 'Corduroy', 'Crepe', 'Denim', 'Fleece', 'Satin', 'Silk', 'Synthetic', 'Velvet', 'Wool', 'Polyester', 'Nylon', 'Spandex', 'Viscose', 'Leather', 'Canvas', 'Rubber', 'Metal', 'Plastic', 'Silver', 'Gold', 'Brass'],
        'Pattern': ['Solid', 'Striped', 'Floral', 'Animal print', 'Argyle', 'Camouflage', 'Chequered', 'Chevron', 'Geometric', 'Paisley', 'Plaid', 'Polka dots', 'Stars', 'Tie-Dye', 'Abstract', 'Ombre'],
        'Fit': ['Regular Fit', 'Slim Fit', 'Relaxed Fit', 'Oversized Fit', 'Skinny Fit', 'Classic Fit', 'Loose Fit', 'Tailored Fit', 'Athletic Fit'],
        'Occasion': ['Casual', 'Formal', 'Party', 'Wedding', 'Sports', 'Business', 'Festival', 'Cocktail', 'Streetwear', 'Ethnic', 'Office', 'Travel'],
        'Length': ['Standard Length', 'Short Length', 'Longline', 'Knee Length', 'Midi Length', 'Maxi Length', 'Cropped'],
        'Closure Type': ['Button', 'Zipper', 'Slip-on', 'Lace-up', 'Velcro', 'Hook and Loop', 'Buckle', 'None'],
        'Stretchable': ['Yes', 'No'],
        'Hood': ['Yes', 'No'],
        'Pocket': ['Yes', 'No'],
        'Sole Material': ['Rubber', 'EVA', 'Leather', 'PU', 'PVC', 'TPU'],
        'Dial Shape': ['Round', 'Square', 'Rectangular', 'Oval', 'Tonneau'],
        'Strap Material': ['Leather', 'Stainless Steel', 'Silicon', 'Nylon', 'Titanium'],
        'Display Type': ['Analog', 'Digital', 'Chronograph', 'Smart / OLED'],
        'Water Resistant': ['30m (3 ATM)', '50m (5 ATM)', '100m (10 ATM)', 'No'],
        'Warranty': ['No Warranty', '6 Months', '1 Year Standard', '2 Years Extended', '3 Years Premium'],
        'Number of Compartments': ['1', '2', '3', '4', '5+'],
        'Capacity': ['10L', '20L', '30L', '40L', '50L+'],
        'Buckle Type': ['Pin Buckle', 'Plate Buckle', 'Automatic Buckle', 'Ring Buckle'],
        'Width': ['1.0 inch', '1.25 inch', '1.5 inch', '1.75 inch'],
        'Frame Material': ['Plastic', 'Metal', 'Acetate', 'Titanium', 'Wood'],
        'Lens Type': ['Polarized', 'UV Protection', 'Mirrored', 'Gradient', 'Clear'],
        'Frame Color': ['Black', 'Brown', 'Gold', 'Silver', 'Tortoise', 'Grey', 'Blue'],
        'Stone Type (Optional)': ['None', 'Diamond', 'Zirconia', 'Ruby', 'Sapphire', 'Emerald', 'Pearl']
    };

    // Women's sub-category fields
    const womenSubCategoryFields = {
        'Saree': ['Saree Length', 'Blouse Piece', 'Fabric', 'Pattern', 'Occasion', 'Color'],
        'Kurti': ['Size', 'Sleeve Type', 'Neck Style', 'Kurti Length', 'Fabric', 'Pattern', 'Color'],
        'Dress': ['Size', 'Sleeve Type', 'Neck Style', 'Dress Length', 'Fabric', 'Pattern', 'Fit', 'Color'],
        'Top': ['Size', 'Sleeve Type', 'Neck Style', 'Fabric', 'Pattern', 'Fit', 'Color'],
        'T-Shirt': ['Size', 'Sleeve Type', 'Neck Style', 'Fabric', 'Pattern', 'Fit', 'Color'],
        'Shirt': ['Size', 'Sleeve Type', 'Collar Type', 'Fabric', 'Pattern', 'Fit', 'Color'],
        'Jeans': ['Waist Size', 'Fit', 'Stretchable', 'Pattern', 'Color'],
        'Pant': ['Waist Size', 'Fabric', 'Pattern', 'Fit', 'Closure Type', 'Color'],
        'Leggings': ['Waist Size', 'Fabric', 'Pattern', 'Stretchable', 'Color'],
        'Shoes': ['Shoe Size', 'Material', 'Sole Material', 'Closure Type', 'Color'],
        'Sandals': ['Sandal Size', 'Material', 'Closure Type', 'Heel Height', 'Color'],
        'Heels': ['Shoe Size', 'Heel Height', 'Heel Type', 'Material', 'Closure Type', 'Color'],
        'Handbag': ['Material', 'Capacity', 'Number of Compartments', 'Closure Type', 'Strap Type', 'Color'],
        'Wallet': ['Material', 'Number of Compartments', 'Closure Type', 'Color'],
        'Watch': ['Dial Shape', 'Dial Color', 'Strap Material', 'Strap Color', 'Display Type', 'Water Resistant', 'Warranty'],
        'Sunglasses': ['Frame Material', 'Frame Color', 'Lens Type', 'Lens Color', 'UV Protection'],
        'Belt': ['Belt Size', 'Material', 'Buckle Type', 'Width', 'Color'],
        'Jewellery': ['Jewellery Type', 'Material', 'Size (Optional)', 'Stone Type (Optional)', 'Color'],
    };

    // Women's specific spec options (merged with specOptions)
    const womenSpecOptions = {
        ...specOptions,
        'Saree Length': ['5.5 Meters', '6 Meters', '6.3 Meters', '6.5 Meters', '7 Meters', '8 Meters', '9 Meters'],
        'Blouse Piece': ['Yes', 'No'],
        'Kurti Length': ['Short (upto 30")', 'Mid Thigh (30"-40")', 'Long (40"-50")', 'Maxi (50"+)'],
        'Dress Length': ['Mini', 'Knee Length', 'Midi', 'Maxi', 'Ankle Length', 'Floor Length'],
        'Collar Type': ['Spread Collar', 'Button Down Collar', 'Mandarin Collar', 'Point Collar', 'Band Collar', 'V-Neck', 'Round Neck'],
        'Heel Height': ['Flat (0-1")', 'Low (1-2")', 'Mid (2-3")', 'High (3-4")', 'Very High (4"+)'],
        'Heel Type': ['Stiletto', 'Block Heel', 'Kitten Heel', 'Wedge', 'Cone Heel', 'Platform', 'Spool Heel'],
        'Strap Type': ['Single Strap', 'Double Strap', 'Chain Strap', 'Detachable Strap', 'No Strap', 'Crossbody'],
        'Dial Color': ['Black', 'White', 'Silver', 'Gold', 'Blue', 'Rose Gold', 'Brown', 'Green', 'Champagne'],
        'Strap Color': ['Black', 'Brown', 'Silver', 'Gold', 'White', 'Blue', 'Rose Gold', 'Multicolor'],
        'Lens Color': ['Black', 'Brown', 'Grey', 'Green', 'Blue', 'Pink', 'Yellow', 'Mirror Silver', 'Clear'],
        'UV Protection': ['UV 400', 'UV 380', 'Polarized UV', 'No UV Protection'],
        'Jewellery Type': ['Ring', 'Necklace', 'Earrings', 'Bracelet', 'Anklet', 'Bangle', 'Pendant', 'Brooch', 'Maangtika', 'Nose Ring'],
        'Color': ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Pink', 'Beige', 'Maroon', 'Navy Blue', 'Teal', 'Orange', 'Brown', 'Grey', 'Gold', 'Silver', 'Multicolor', 'Off White', 'Peach'],
        'Neck Style': ['Crew Neck', 'V-Neck', 'Scoop Neck', 'Square Neck', 'Boat Neck', 'High Neck', 'Off-Shoulder', 'Halter Neck', 'Cowl Neck', 'Sweetheart Neck', 'Mock Neck', 'Mandarin Collar'],
        'Sleeve Type': ['Sleeveless', 'Short Sleeve', 'Half Sleeve', '3/4 Sleeve', 'Long Sleeve', 'Cap Sleeve', 'Puff Sleeve', 'Bell Sleeve', 'Butterfly Sleeve', 'Batwing Sleeve', 'Kimono Sleeve'],
        'Fit': ['Regular Fit', 'Slim Fit', 'Relaxed Fit', 'Oversized Fit', 'Bodycon Fit', 'Flared', 'A-Line', 'Wrap Fit'],
        'Size (Optional)': ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size', 'N/A'],
        'Belt Size': ['24"', '26"', '28"', '30"', '32"', '34"', '36"', '38"', '40"', 'Free Size'],
        'Size': ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', 'Free Size'],
        'Waist Size': ['24"', '26"', '28"', '30"', '32"', '34"', '36"', '38"', '40"'],
        'Shoe Size': ['UK 2', 'UK 3', 'UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
        'Sandal Size': ['UK 2', 'UK 3', 'UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    };
    const otherCategories = ['Kids', 'Fashion Accessories', 'Footwear', 'Home & Kitchen', 'Beauty & Personal Care', 'Sports & Outdoors', 'Books', 'Toys', 'Groceries', 'Automotive', 'Handbags', 'Watches', 'Jewelry'];

    const getCategoriesList = () => {
        if (selectedCategory === 'Women') return womenCategories;
        if (selectedCategory === 'Men') return menCategories;
        if (selectedCategory === 'Electronics') return electronicsCategories;
        return otherCategories;
    };

    const categoriesList = getCategoriesList();
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
            category: selectedCategoryLabel || categorySearch || selectedCategory || 'Fashion',
            status: selectedStatus || statusSearch || 'Active',
            tags: searchTags,
            material: selectedMaterial || materialSearch || 'Cotton',
            pattern: selectedPattern || patternSearch || 'Solid',
            fit: selectedFit || fitSearch || 'Regular Fit',
            sleeve: selectedSleeve || sleeveSearch || 'Long Sleeve',
            length: selectedLength || lengthSearch || 'Standard Length',
            neck: selectedNeck || neckSearch || 'Crew Neck',
            occasion: selectedOccasion || occasionSearch || 'Casual',
            workType: selectedWorkType || workTypeSearch,
            dupattaIncluded,
            country: selectedCountry || countrySearch || 'India',
            care: selectedCare || careSearch || 'Machine Wash',
            price: salePrice || regularPrice || 1699,
            regularPrice: regularPrice || '3499',
            sku: sku || 'N/A',
            stock: initialStock || 0,
            sales: 0,
            image: mainImage?.preview || 'https://theformalclub.in/cdn/shop/files/TealFormalShirt_4.jpg?v=1751886662&width=600',
            images: allImages.map(img => img.preview).length > 0 ? allImages.map(img => img.preview) : ['https://theformalclub.in/cdn/shop/files/TealFormalShirt_4.jpg?v=1751886662&width=600'],
            warranty: selectedWarranty || warrantySearch || '1 Year Standard',
            modelNumber,
            processor: selectedProcessor || processorSearch || 'A17 Pro',
            storage: selectedStorage || storageSearch || '256GB / 8GB',
            battery: selectedBattery || batterySearch || '5000mAh',
            connectivity: selectedConnectivity || connectivitySearch,
            dimensions,
            weight,
            features,
            specs: {
                ...specs,
                country: selectedCountry || countrySearch || 'India',
                care: selectedCare || careSearch || 'Machine Wash',
            },
            sizes: selectedSizes,
            createdAt: new Date().toISOString()
        };

        // Save to localStorage for demo persistence
        const existingProducts = JSON.parse(localStorage.getItem('sellerProducts') || '[]');
        localStorage.setItem('sellerProducts', JSON.stringify([productData, ...existingProducts]));

        setShowSuccessModal(true);
    };

    const handleNextStep = (category) => {
        if (category === 'Women') {
            setModalStep('women-sub');
        } else {
            setModalStep('men-sub');
        }
        setShowCategoryModal(true);
    };

    const categoryTemplates = [
        { id: 'Men', name: "Men's Fashion", icon: User, color: 'blue' },
        { id: 'Women', name: "Women's Fashion", icon: UserRound, color: 'pink' },
        { id: 'Electronics', name: 'Electronics', icon: Laptop, color: 'purple' },
        { id: 'Others', name: 'Other Categories', icon: LayoutGrid, color: 'orange' }
    ];

    const getAvailableSizes = () => {
        if (!selectedCategoryLabel) return [];
        const fields = subCategoryFields[selectedCategoryLabel] || [];
        const sizeField = fields.find(f => f.toLowerCase().includes('size'));
        if (!sizeField) return [];
        
        if (sizeField === 'Waist Size' || sizeField === 'Belt Size') {
            return ['28', '30', '32', '34', '36', '38', '40', '42', '44', '46', '48'];
        }
        if (sizeField === 'Shoe Size' || sizeField === 'Slipper Size' || sizeField === 'Sandal Size' || sizeField === 'Boot Size') {
            return ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'];
        }
        return ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];
    };
    const sizeList = getAvailableSizes();

    return (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-32">
            {/* Category Selection Modal */}
            {showCategoryModal && (
                <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-md animate-in fade-in duration-500"></div>
                    <div className="bg-white rounded-[45px] p-10 max-w-2xl w-full relative z-[160] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 border border-white">
                        {modalStep === 'primary' ? (
                            <>
                                <div className="text-center mb-10">
                                    <h2 className="text-4xl font-[1000] text-gray-900 mb-3 tracking-tight">What are you selling?</h2>
                                    <p className="text-gray-500 font-medium text-lg">Select a category to customize your product form.</p>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {categoryTemplates.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                setSelectedCategory(item.id);
                                                setShowCategoryModal(false);
                                            }}
                                            className="group relative flex items-center gap-5 p-6 bg-gray-50 rounded-[30px] border-2 border-transparent hover:border-blue-500 hover:bg-white hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer text-left overflow-hidden"
                                        >
                                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 ${item.id === 'Men' ? 'bg-blue-100 group-hover:bg-blue-500 text-blue-600 group-hover:text-white' :
                                                    item.id === 'Women' ? 'bg-pink-100 group-hover:bg-pink-500 text-pink-600 group-hover:text-white' :
                                                        item.id === 'Electronics' ? 'bg-purple-100 group-hover:bg-purple-500 text-purple-600 group-hover:text-white' :
                                                            'bg-orange-100 group-hover:bg-orange-500 text-orange-600 group-hover:text-white'
                                                }`}>
                                                <item.icon className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                                                <p className="text-gray-400 text-sm font-medium">Click to use this layout</p>
                                            </div>
                                            <ChevronRight className="absolute right-6 w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                        </button>
                                    ))}
                                </div>
                                <button onClick={() => navigate('/seller/products')} className="mt-8 w-full py-4 text-gray-400 font-bold hover:text-gray-600 transition-colors border-none bg-transparent cursor-pointer">
                                    Cancel and go back
                                </button>
                            </>
                        ) : modalStep === 'women-sub' ? (
                            <>
                                <div className="flex items-center gap-4 mb-8">
                                    <button
                                        type="button"
                                        onClick={() => setShowCategoryModal(false)}
                                        className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-600 transition-all cursor-pointer border-none flex items-center justify-center"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <div className="text-left">
                                        <h2 className="text-3xl font-[1000] text-gray-900 mb-1 tracking-tight">Women's Fashion</h2>
                                        <p className="text-gray-500 font-medium text-sm">Select a specific sub-category</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-8 max-h-[360px] overflow-y-auto pr-1">
                                    {womenSubCategories.map((sub) => {
                                        const SubIcon = sub.icon;
                                        const isSelected = selectedCategoryLabel === sub.name;
                                        return (
                                            <button
                                                key={sub.name}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedCategoryLabel(sub.name);
                                                    setCategorySearch(sub.name);
                                                }}
                                                className={`group flex flex-col items-center justify-center p-4 rounded-[20px] border-2 transition-all duration-300 cursor-pointer text-center ${
                                                    isSelected
                                                        ? 'border-pink-500 bg-pink-50/30 shadow-lg shadow-pink-500/5'
                                                        : 'border-transparent bg-gray-50 hover:border-pink-300 hover:bg-white hover:shadow-lg hover:shadow-pink-500/5'
                                                }`}
                                            >
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 ${
                                                    isSelected ? 'bg-pink-500 text-white' : sub.colorClass
                                                }`}>
                                                    <SubIcon className="w-5 h-5" />
                                                </div>
                                                <span className={`font-bold text-xs transition-colors ${
                                                    isSelected ? 'text-pink-600 font-extrabold' : 'text-gray-800 group-hover:text-pink-600'
                                                }`}>{sub.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/seller/products')}
                                        className="w-full sm:w-auto py-4 px-8 text-gray-400 font-bold hover:text-gray-600 transition-colors border-none bg-transparent cursor-pointer"
                                    >
                                        Cancel and go back
                                    </button>
                                    <button
                                        type="button"
                                        disabled={!selectedCategoryLabel}
                                        onClick={() => {
                                            setFormStep('specs');
                                            setShowCategoryModal(false);
                                        }}
                                        className={`flex-1 w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                                            selectedCategoryLabel
                                                ? 'bg-pink-500 text-white cursor-pointer hover:bg-pink-600 hover:shadow-xl hover:shadow-pink-500/10 transform hover:-translate-y-0.5 active:translate-y-0'
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-4 mb-8">
                                    <button 
                                        type="button"
                                        onClick={() => setShowCategoryModal(false)}
                                        className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-gray-600 transition-all cursor-pointer border-none flex items-center justify-center"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <div className="text-left">
                                        <h2 className="text-3xl font-[1000] text-gray-900 mb-1 tracking-tight">Men's Fashion</h2>
                                        <p className="text-gray-500 font-medium text-sm">Select a specific sub-category</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
                                    {menSubCategories.map((sub) => {
                                        const SubIcon = sub.icon;
                                        const isSelected = selectedCategoryLabel === sub.name;
                                        return (
                                            <button
                                                key={sub.name}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedCategoryLabel(sub.name);
                                                    setCategorySearch(sub.name);
                                                }}
                                                className={`group flex flex-col items-center justify-center p-5 rounded-[24px] border-2 transition-all duration-300 cursor-pointer text-center ${
                                                    isSelected 
                                                        ? 'border-blue-600 bg-blue-50/30 shadow-lg shadow-blue-500/5' 
                                                        : 'border-transparent bg-gray-50 hover:border-blue-300 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5'
                                                }`}
                                            >
                                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                                                    isSelected ? 'bg-blue-600 text-white' : sub.colorClass
                                                }`}>
                                                    <SubIcon className="w-6 h-6" />
                                                </div>
                                                <span className={`font-bold text-sm transition-colors ${
                                                    isSelected ? 'text-blue-600 font-extrabold' : 'text-gray-800 group-hover:text-blue-600'
                                                }`}>{sub.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 pt-4 border-t border-gray-100">
                                    <button 
                                        type="button"
                                        onClick={() => navigate('/seller/products')} 
                                        className="w-full sm:w-auto py-4 px-8 text-gray-400 font-bold hover:text-gray-600 transition-colors border-none bg-transparent cursor-pointer"
                                    >
                                        Cancel and go back
                                    </button>
                                    <button
                                        type="button"
                                        disabled={!selectedCategoryLabel}
                                        onClick={() => {
                                            setFormStep('specs');
                                            setShowCategoryModal(false);
                                        }}
                                        className={`flex-1 w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                                            selectedCategoryLabel 
                                                ? 'bg-blue-600 text-white cursor-pointer hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/10 transform hover:-translate-y-0.5 active:translate-y-0' 
                                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
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
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Add New Product</h1>
                            {selectedCategory && (
                                <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-gray-900 text-white rounded-full animate-in fade-in slide-in-from-left-4 duration-500 shadow-lg shadow-gray-200">
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-none mt-0.5">{selectedCategory}</span>
                                </div>
                            )}
                        </div>
                        <p className="text-gray-500 text-sm font-medium">Create a premium listing for your store.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <button
                        onClick={() => {
                            if (formStep === 'specs') {
                                setFormStep('common');
                            } else {
                                navigate('/seller/products');
                            }
                        }}
                        className="flex-1 sm:flex-none text-gray-600 font-bold text-sm px-8 py-4 border-none bg-transparent cursor-pointer hover:text-gray-900 transition-colors"
                    >
                        {formStep === 'specs' ? 'Back' : 'Discard'}
                    </button>
                    <button
                        onClick={() => {
                            if (formStep === 'common') {
                                if (selectedCategory === 'Men') {
                                    handleNextStep('Men');
                                } else if (selectedCategory === 'Women') {
                                    handleNextStep('Women');
                                } else {
                                    setFormStep('specs');
                                }
                            } else {
                                handlePublish();
                            }
                        }}
                        className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-blue-200 transition-all border-none cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        {formStep === 'common' ? 'Next' : 'Submit'}
                    </button>
                </div>
            </div>

            <div className="space-y-8">
                {/* Row 1: Basic Information & Organization */}
                {formStep === 'common' && (
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
                                                            setSelectedCategoryLabel(c);
                                                            setCategorySearch(c);
                                                            setIsCategoryDropdownOpen(false);
                                                        }}
                                                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                    >
                                                        <span>{c}</span>
                                                        {selectedCategoryLabel === c && <Check className="w-4 h-4" />}
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
                            {/* <div className="space-y-2 relative">
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
                            </div> */}
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
                )}

                {/* Row 1.5: Product Specifications */}
                {formStep === 'specs' && (subCategoryFields[selectedCategoryLabel] || womenSubCategoryFields[selectedCategoryLabel] || selectedCategory === 'Electronics') && (
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                <ClipboardList className="w-5 h-5 text-blue-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Product Specifications</h2>
                        </div>
                        {selectedCategory && (
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedCategory === 'Men' ? 'bg-blue-100 text-blue-600' :
                                    selectedCategory === 'Women' ? 'bg-pink-100 text-pink-600' :
                                        selectedCategory === 'Electronics' ? 'bg-purple-100 text-purple-600' :
                                            'bg-gray-100 text-gray-600'
                                }`}>
                                {selectedCategoryLabel || (selectedCategory === 'Men' ? "Men's Fashion" :
                                    selectedCategory === 'Women' ? "Women's Fashion" :
                                        selectedCategory)}
                            </span>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                        {selectedCategory === 'Electronics' ? (
                            <>
                                {/* Model Name */}
                                <div className="space-y-2 relative">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Model Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={modelName}
                                            onChange={(e) => setModelName(e.target.value)}
                                            placeholder="e.g. iPhone 15 Pro"
                                            className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                        />
                                        <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                                {/* Model Number */}
                                <div className="space-y-2 relative">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Model Number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={modelNumber}
                                            onChange={(e) => setModelNumber(e.target.value)}
                                            placeholder="e.g. A2848"
                                            className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                        />
                                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                                {/* Processor - Dropdown */}
                                <div className="space-y-2 relative">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Processor</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search processor..."
                                            value={processorSearch}
                                            onChange={(e) => {
                                                setProcessorSearch(e.target.value);
                                                setIsProcessorDropdownOpen(true);
                                            }}
                                            onFocus={() => setIsProcessorDropdownOpen(true)}
                                            className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                        />
                                        <Cpu className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                    {isProcessorDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                            {filteredProcessors.length > 0 ? (
                                                <div className="p-2 space-y-1">
                                                    {filteredProcessors.map((p) => (
                                                        <button
                                                            key={p}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedProcessor(p);
                                                                setProcessorSearch(p);
                                                                setIsProcessorDropdownOpen(false);
                                                            }}
                                                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                        >
                                                            <span>{p}</span>
                                                            {selectedProcessor === p && <Check className="w-4 h-4" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="p-4 text-center text-gray-400 text-sm">No options found</div>
                                            )}
                                        </div>
                                    )}
                                    {isProcessorDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsProcessorDropdownOpen(false)}></div>}
                                </div>
                                {/* Storage / RAM - Dropdown */}
                                <div className="space-y-2 relative">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Storage / RAM</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search storage/ram..."
                                            value={storageSearch}
                                            onChange={(e) => {
                                                setStorageSearch(e.target.value);
                                                setIsStorageDropdownOpen(true);
                                            }}
                                            onFocus={() => setIsStorageDropdownOpen(true)}
                                            className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                        />
                                        <HardDrive className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                    {isStorageDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                            {filteredStorages.length > 0 ? (
                                                <div className="p-2 space-y-1">
                                                    {filteredStorages.map((s) => (
                                                        <button
                                                            key={s}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedStorage(s);
                                                                setStorageSearch(s);
                                                                setIsStorageDropdownOpen(false);
                                                            }}
                                                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                        >
                                                            <span>{s}</span>
                                                            {selectedStorage === s && <Check className="w-4 h-4" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="p-4 text-center text-gray-400 text-sm">No options found</div>
                                            )}
                                        </div>
                                    )}
                                    {isStorageDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsStorageDropdownOpen(false)}></div>}
                                </div>
                                {/* Battery Capacity - Dropdown */}
                                <div className="space-y-2 relative">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Battery</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search battery..."
                                            value={batterySearch}
                                            onChange={(e) => {
                                                setBatterySearch(e.target.value);
                                                setIsBatteryDropdownOpen(true);
                                            }}
                                            onFocus={() => setIsBatteryDropdownOpen(true)}
                                            className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                        />
                                        <Zap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                    {isBatteryDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                            {filteredBatteries.length > 0 ? (
                                                <div className="p-2 space-y-1">
                                                    {filteredBatteries.map((b) => (
                                                        <button
                                                            key={b}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedBattery(b);
                                                                setBatterySearch(b);
                                                                setIsBatteryDropdownOpen(false);
                                                            }}
                                                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                        >
                                                            <span>{b}</span>
                                                            {selectedBattery === b && <Check className="w-4 h-4" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="p-4 text-center text-gray-400 text-sm">No options found</div>
                                            )}
                                        </div>
                                    )}
                                    {isBatteryDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsBatteryDropdownOpen(false)}></div>}
                                </div>
                                {/* Power Consumption */}
                                <div className="space-y-2 relative">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Power Consumption</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={powerConsumption}
                                            onChange={(e) => setPowerConsumption(e.target.value)}
                                            placeholder="e.g. 65W"
                                            className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                        />
                                        <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                                {/* Connectivity - Dropdown */}
                                <div className="space-y-2 relative">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Connectivity</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search connectivity..."
                                            value={connectivitySearch}
                                            onChange={(e) => {
                                                setConnectivitySearch(e.target.value);
                                                setIsConnectivityDropdownOpen(true);
                                            }}
                                            onFocus={() => setIsConnectivityDropdownOpen(true)}
                                            className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                        />
                                        <Wifi className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                    {isConnectivityDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                            {filteredConnectivity.length > 0 ? (
                                                <div className="p-2 space-y-1">
                                                    {filteredConnectivity.map((c) => (
                                                        <button
                                                            key={c}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedConnectivity(c);
                                                                setConnectivitySearch(c);
                                                                setIsConnectivityDropdownOpen(false);
                                                            }}
                                                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                        >
                                                            <span>{c}</span>
                                                            {selectedConnectivity === c && <Check className="w-4 h-4" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="p-4 text-center text-gray-400 text-sm">No options found</div>
                                            )}
                                        </div>
                                    )}
                                    {isConnectivityDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsConnectivityDropdownOpen(false)}></div>}
                                </div>
                                {/* Warranty Details - Dropdown */}
                                <div className="space-y-2 relative">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Warranty Details</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Search warranty..."
                                            value={warrantySearch}
                                            onChange={(e) => {
                                                setWarrantySearch(e.target.value);
                                                setIsWarrantyDropdownOpen(true);
                                            }}
                                            onFocus={() => setIsWarrantyDropdownOpen(true)}
                                            className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                        />
                                        <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                    {isWarrantyDropdownOpen && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                            {filteredWarranties.length > 0 ? (
                                                <div className="p-2 space-y-1">
                                                    {filteredWarranties.map((w) => (
                                                        <button
                                                            key={w}
                                                            type="button"
                                                            onClick={() => {
                                                                setSelectedWarranty(w);
                                                                setWarrantySearch(w);
                                                                setIsWarrantyDropdownOpen(false);
                                                            }}
                                                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer"
                                                        >
                                                            <span>{w}</span>
                                                            {selectedWarranty === w && <Check className="w-4 h-4" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="p-4 text-center text-gray-400 text-sm">No options found</div>
                                            )}
                                        </div>
                                    )}
                                    {isWarrantyDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsWarrantyDropdownOpen(false)}></div>}
                                </div>
                                {/* Dimensions */}
                                <div className="space-y-2 relative">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Dimensions</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={dimensions}
                                            onChange={(e) => setDimensions(e.target.value)}
                                            placeholder="e.g. 146.6 x 70.6 x 8.3 mm"
                                            className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                        />
                                        <Maximize className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                                {/* Weight */}
                                <div className="space-y-2 relative">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Weight</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            placeholder="e.g. 187g"
                                            className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                        />
                                        <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    </div>
                                </div>
                                {/* Product Features - Dynamic List */}
                                <div className="md:col-span-2 space-y-4 pt-4 border-t border-gray-50">
                                    <label className="text-sm font-bold text-gray-900 ml-1">Key Product Features</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={featureInput}
                                            onChange={(e) => setFeatureInput(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                                            placeholder="Add a key feature (e.g. 120Hz Display)..."
                                            className="flex-1 px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                        />
                                        <button 
                                            type="button"
                                            onClick={addFeature}
                                            className="px-8 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all border-none cursor-pointer"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {features.map((f, i) => (
                                            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-100 animate-in fade-in zoom-in-95">
                                                <span className="text-sm font-medium">{f}</span>
                                                <button onClick={() => removeFeature(i)} className="p-1 hover:bg-blue-100 rounded-full transition-colors border-none bg-transparent cursor-pointer">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Dynamic specs form fields - supports both Men's and Women's */}
                                {(() => {
                                    const isWomen = selectedCategory === 'Women';
                                    const fields = isWomen
                                        ? (womenSubCategoryFields[selectedCategoryLabel] || [])
                                        : (subCategoryFields[selectedCategoryLabel] || []);
                                    const filteredFields = isWomen
                                        ? fields // Women's - show all fields including size-based ones
                                        : fields.filter(f => !f.toLowerCase().includes('size')); // Men's - sizes handled separately
                                    
                                    return filteredFields.map((field) => {
                                        const options = (isWomen ? womenSpecOptions : specOptions)[field] || [];
                                        const isBoolean = ['Hood', 'Pocket', 'Stretchable', 'Blouse Piece'].includes(field);
                                        
                                        if (isBoolean) {
                                            const val = specs[field] || '';
                                            const boolOpts = womenSpecOptions[field] && womenSpecOptions[field].length === 2 ? womenSpecOptions[field] : ['Yes', 'No'];
                                            return (
                                                <div key={field} className="space-y-2">
                                                    <label className="text-sm font-bold text-gray-700 ml-1">{field}</label>
                                                    <div className="flex gap-4 p-1 bg-gray-50 rounded-2xl border border-gray-100">
                                                        {boolOpts.map((opt) => (
                                                            <button
                                                                key={opt}
                                                                type="button"
                                                                onClick={() => setSpecs(prev => ({ ...prev, [field]: opt }))}
                                                                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all border-none cursor-pointer ${val === opt ? (isWomen ? 'bg-white text-pink-600 shadow-sm ring-1 ring-pink-100' : 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-100') : 'text-gray-400 hover:text-gray-600 bg-transparent'}`}
                                                            >
                                                                {opt}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        }

                                        const val = specs[field] || '';
                                        const isOpen = activeDropdown === field;
                                        const filteredOptions = options.filter(opt => opt.toLowerCase().includes(dropdownSearch.toLowerCase()));
                                        
                                        return (
                                            <div key={field} className="space-y-2 relative">
                                                <label className="text-sm font-bold text-gray-700 ml-1">{field}</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder={`Search or select ${field.toLowerCase()}...`}
                                                        value={isOpen ? dropdownSearch : val}
                                                        onChange={(e) => {
                                                            setDropdownSearch(e.target.value);
                                                            setActiveDropdown(field);
                                                        }}
                                                        onFocus={() => {
                                                            setDropdownSearch('');
                                                            setActiveDropdown(field);
                                                        }}
                                                        className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                                                    />
                                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                </div>
                                                
                                                {isOpen && (
                                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
                                                        {filteredOptions.length > 0 ? (
                                                            <div className="p-2 space-y-1">
                                                                {filteredOptions.map((opt) => (
                                                                    <button
                                                                        key={opt}
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setSpecs(prev => ({ ...prev, [field]: opt }));
                                                                            setActiveDropdown(null);
                                                                        }}
                                                                        className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer border-none bg-transparent"
                                                                    >
                                                                        <span>{opt}</span>
                                                                        {val === opt && <Check className="w-4 h-4 text-blue-600" />}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        ) : (
                                                            <div className="p-4 text-center text-gray-400 text-sm">
                                                                No matches found
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                {isOpen && (
                                                    <div className="fixed inset-0 z-40" onClick={() => setActiveDropdown(null)}></div>
                                                )}
                                            </div>
                                        );
                                    });
                                })()}

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
                                                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer border-none bg-transparent"
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
                                                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer border-none bg-transparent"
                                                        >
                                                            <span>{c}</span>
                                                            {selectedCare === c && <Check className="w-4 h-4 text-blue-600" />}
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
                            </>
                        )}
                    </div>
                </div>
                )}
                {/* Row 2: Visuals (Side-by-Side Images & Colors) */}
                {formStep === 'common' && (
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
                )}

                {/* Row 3: Pricing & Sizes */}
                {formStep === 'common' && (
                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-5 h-5 text-green-600" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Pricing & Inventory</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* MRP - Women's only */}
                            {selectedCategory === 'Women' && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="text-sm font-bold text-gray-700 ml-1">MRP (₹)</label>
                                    <input type="number" value={mrp} onChange={(e) => setMrp(e.target.value)} placeholder="Maximum Retail Price" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all outline-none" />
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">{selectedCategory === 'Women' ? 'Selling Price (₹)' : 'Regular Price (₹)'}</label>
                                <input type="number" value={regularPrice} onChange={(e) => setRegularPrice(e.target.value)} placeholder="0.00" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                            </div>
                            {/* Offer Price - Women's only */}
                            {selectedCategory === 'Women' && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Offer Price (₹)</label>
                                    <input type="number" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} placeholder="Special offer price" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all outline-none" />
                                </div>
                            )}
                            {selectedCategory !== 'Women' && (
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Sale Price (₹)</label>
                                    <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} placeholder="0.00" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                                </div>
                            )}
                            {/* Offer Start & End Date - Women's only */}
                            {selectedCategory === 'Women' && (
                                <>
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Offer Start Date</label>
                                        <input type="date" value={offerStartDate} onChange={(e) => setOfferStartDate(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all outline-none" />
                                    </div>
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Offer End Date</label>
                                        <input type="date" value={offerEndDate} onChange={(e) => setOfferEndDate(e.target.value)} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all outline-none" />
                                    </div>
                                </>
                            )}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">Stock</label>
                                <input type="number" value={initialStock} onChange={(e) => setInitialStock(e.target.value)} placeholder="0" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 ml-1">SKU</label>
                                <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="e.g. WMN-001" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                            </div>
                            {/* Weight - Women's only */}
                            {selectedCategory === 'Women' && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Weight (grams)</label>
                                    <input type="number" value={productWeight} onChange={(e) => setProductWeight(e.target.value)} placeholder="e.g. 250" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all outline-none" />
                                </div>
                            )}
                            {/* Country of Origin - Women's only */}
                            {selectedCategory === 'Women' && (
                                <div className="space-y-2 relative animate-in fade-in slide-in-from-top-2 duration-300">
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
                                            className="w-full px-5 py-4 pl-12 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-pink-500/10 focus:border-pink-500 transition-all outline-none"
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
                                                            className="w-full text-left px-4 py-3 rounded-xl hover:bg-pink-50 hover:text-pink-600 transition-colors text-sm font-medium flex items-center justify-between group cursor-pointer border-none bg-transparent"
                                                        >
                                                            <span>{country}</span>
                                                            {selectedCountry === country && <Check className="w-4 h-4" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="p-4 text-center text-gray-400 text-sm">No countries found</div>
                                            )}
                                        </div>
                                    )}
                                    {isCountryDropdownOpen && <div className="fixed inset-0 z-40" onClick={() => setIsCountryDropdownOpen(false)}></div>}
                                </div>
                            )}
                            {selectedCategory !== 'Women' && (
                                <div className="sm:col-span-2 space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Cost Price (₹)</label>
                                    <input type="number" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} placeholder="0.00" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none" />
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest px-2 mt-1">Internal Use: For profit margin calculation</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                    {/* Sizes */}
                    {formStep === 'specs' && sizeList.length > 0 && (
                        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                                    <Package className="w-5 h-5 text-blue-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Size Variants ({selectedCategoryLabel})</h2>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {sizeList.map((size) => (
                                    <button
                                        key={size}
                                        type="button"
                                        onClick={() => toggleSize(size)}
                                        className={`px-5 py-3 rounded-2xl border text-sm font-bold transition-all cursor-pointer ${selectedSizes.includes(size) ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100' : 'bg-gray-50 text-gray-500 border-gray-50 hover:border-gray-200'}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
            </div>

            {/* Final Actions Footer - Final Refined Variant */}
            <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col md:flex-row items-center justify-between gap-8 animate-in slide-in-from-bottom-4 duration-500 mb-10">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-gray-900 font-black text-xl tracking-tight leading-none mb-2">Ready to launch?</h3>
                    <p className="text-gray-500/80 text-[10px] font-black uppercase tracking-[0.2em]">Double check all tech specs before going live</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button
                        onClick={() => {
                            if (formStep === 'specs') {
                                setFormStep('common');
                            } else {
                                navigate('/seller/products');
                            }
                        }}
                        className="flex-1 md:flex-none text-gray-400 font-black text-[11px] uppercase tracking-widest px-8 py-5 border-none bg-transparent cursor-pointer hover:text-gray-900 transition-all"
                    >
                        {formStep === 'specs' ? 'Back' : 'Discard'}
                    </button>
                    <button
                        onClick={() => {
                            if (formStep === 'common') {
                                if (selectedCategory === 'Men') {
                                    handleNextStep('Men');
                                } else if (selectedCategory === 'Women') {
                                    handleNextStep('Women');
                                } else {
                                    setFormStep('specs');
                                }
                            } else {
                                handlePublish();
                            }
                        }}
                        className="flex-[2] md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-black py-5 px-16 rounded-2xl shadow-xl shadow-blue-500/20 transition-all border-none cursor-pointer transform hover:-translate-y-1 active:translate-y-0 text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 group"
                    >
                        <span>{formStep === 'common' ? 'Next' : 'Submit'}</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Mobile Actions */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-6 border-t border-gray-100 sm:hidden z-50 shadow-2xl rounded-t-[40px]">
                <div className="flex gap-4 w-full">
                    {formStep === 'specs' && (
                        <button
                            type="button"
                            onClick={() => setFormStep('common')}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-black py-4 rounded-2xl transition-all border-none cursor-pointer uppercase tracking-widest"
                        >
                            Back
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => {
                            if (formStep === 'common') {
                                if (selectedCategory === 'Men') {
                                    handleNextStep('Men');
                                } else if (selectedCategory === 'Women') {
                                    handleNextStep('Women');
                                } else {
                                    setFormStep('specs');
                                }
                            } else {
                                handlePublish();
                            }
                        }}
                        className={`bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-200 transition-all border-none cursor-pointer uppercase tracking-widest flex items-center justify-center gap-2 ${formStep === 'specs' ? 'flex-[2]' : 'w-full'}`}
                    >
                        <span>{formStep === 'common' ? 'Next' : 'Submit'}</span>
                        <ArrowLeft className="w-4 h-4 rotate-180" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
 