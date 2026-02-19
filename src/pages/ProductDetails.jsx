
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Heart, Ruler, Check, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const [selectedColor, setSelectedColor] = useState('Slate Blue');
    const [selectedSize, setSelectedSize] = useState('S / 38');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const productImages = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTisAy6zP6nnKs9Ty07mOdvOJJMSwGxS4kNfQ&s",
        "https://theformalclub.in/cdn/shop/files/TealFormalShirt_2.jpg?v=1751886662&width=600",
        "https://theformalclub.in/cdn/shop/files/TealFormalShirt_1.jpg?v=1751886662&width=600",
        "https://theformalclub.in/cdn/shop/files/TealFormalShirt_3.jpg?v=1751886662&width=600",
        "https://theformalclub.in/cdn/shop/files/TealFormalShirt_3.jpg?v=1751886662&width=600",
        "https://theformalclub.in/cdn/shop/files/TealFormalShirt_3.jpg?v=1751886662&width=600",
        "https://theformalclub.in/cdn/shop/files/TealFormalShirt_3.jpg?v=1751886662&width=600",
        "https://theformalclub.in/cdn/shop/files/TealFormalShirt_5.jpg?v=1751886662&width=600"
    ];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
    };

    const colors = [
        { name: 'Snow', hex: '#ffffff' },
        { name: 'Powder Pink', hex: '#ffeff0' },
        { name: 'Peach Fuzz', hex: '#ffdab9' },
        { name: 'Dusty Rose', hex: '#dcaeb8' },
        { name: 'Slate Blue', hex: '#486284' }, // Selected in image
        { name: 'Vanilla', hex: '#f3e5ab' },
        { name: 'Fresh Aqua', hex: '#e0ffff' },
        { name: 'Ice Blue', hex: '#a5f2f3' },
        { name: 'Teal', hex: '#008080' },
        { name: 'Wine Berry', hex: '#5b1f2e' },
        { name: 'Saphire', hex: '#0f1f45' },
        { name: 'Moss Green', hex: '#8a9a5b' },
        { name: 'Pewter', hex: '#8e8e9e' },
        { name: 'Raven', hex: '#000000' },
        { name: 'Lemon Frost', hex: '#fffacd' },
        { name: 'Grass Green', hex: '#4c7031' },
        { name: 'Gun Metal', hex: '#2a2a2a' },
        { name: 'Coffee', hex: '#3b2f2f' },
        { name: 'Water Cress', hex: '#9dbb8e' }
    ];

    const sizes = ['S / 38', 'M / 40', 'L / 42', 'XL / 44', 'XXL / 46', '3XL / 48', '4XL / 50'];

    // Mock Data for Similar Products
    const similarProducts = [
        {
            id: 2,
            title: "Smart Watch Series 7 GPS",
            price: 398.00,
            originalPrice: 429.00,
            rating: 4.8,
            reviews: 856,
            image: "https://images.meesho.com/images/products/666880415/genyp_512.webp?width=512",
            badge: "New"
        },
        {
            id: 3,
            title: "Professional DSLR Camera Kit",
            price: 1299.00,
            originalPrice: 1499.00,
            rating: 4.9,
            reviews: 64,
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            badge: "Sale"
        },
        {
            id: 3,
            title: "Professional DSLR Camera Kit",
            price: 1299.00,
            originalPrice: 1499.00,
            rating: 4.9,
            reviews: 64,
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            badge: "Sale"
        },
        {
            id: 3,
            title: "Professional DSLR Camera Kit",
            price: 1299.00,
            originalPrice: 1499.00,
            rating: 4.9,
            reviews: 64,
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            badge: "Sale"
        },
        {
            id: 3,
            title: "Professional DSLR Camera Kit",
            price: 1299.00,
            originalPrice: 1499.00,
            rating: 4.9,
            reviews: 64,
            image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
            badge: "Sale"
        },
        {
            id: 4,
            title: "Gaming Laptop 15.6\" 144Hz",
            price: 1099.99,
            originalPrice: 1299.99,
            rating: 4.6,
            reviews: 215,
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
    ];

    const renderStars = (rating) => {
        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="bg-white min-h-screen p-4 md:p-8 font-sans text-gray-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[28rem_1fr] gap-8">

                {/* Left Column: Image Gallery */}
                <div className="space-y-4 w-full max-w-md mx-auto md:mx-0">
                    <div className="bg-[#e5e0d8] h-96 rounded-lg overflow-hidden relative group w-full">
                        <img
                            src={productImages[currentImageIndex]}
                            alt="Cambridge Giza Cotton Shirt"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        {/* Navigation Arrows (visible on hover or always on mobile) */}
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors backdrop-blur-sm"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Thumbnail Carousel */}
                    <div className="relative pt-2 w-full">
                        <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                            {productImages.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`relative flex-shrink-0 w-20 aspect-[3/4] rounded-md overflow-hidden border-2 transition-all snap-start
                                        ${currentImageIndex === index ? 'border-[#8B4513] ring-1 ring-[#8B4513]' : 'border-transparent hover:border-gray-300'}`}
                                >
                                    <img
                                        src={img}
                                        alt={`View ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                    {currentImageIndex === index && (
                                        <div className="absolute inset-0 bg-black/10" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Product Details */}
                <div className="space-y-4">

                    {/* Header */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-start">
                            <h1 className="text-xl md:text-2xl font-bold text-[#8B4513]">Cambridge Giza Cotton Shirt In Slate Blue</h1>
                            <button className="text-gray-900 hover:text-red-500 transition-colors">
                                <Heart className="w-6 h-6" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Experience the luxury of Giza cotton with this meticulously crafted slate blue shirt. Perfect for formal events and office wear, combining comfort with timeless style.
                        </p>
                    </div>

                    {/* Price and Reviews */}
                    <div className="space-y-2 border-b border-gray-200 pb-4">
                        <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-2xl font-bold text-[#1a4a45]">₹ 1,699</span>
                            <span className="text-lg text-gray-400 line-through">₹ 3,499</span>
                        </div>
                    </div>

                    {/* Color Selection */}
                    <div className="space-y-3">
                        <span className="font-bold text-gray-900">Color:</span>
                        <div className="flex flex-wrap gap-x-4 gap-y-6">
                            {colors.map((color) => (
                                <div key={color.name} className="flex flex-col items-center gap-1 cursor-pointer group" onClick={() => setSelectedColor(color.name)}>
                                    <div className={`w-10 h-10 rounded-full border border-gray-200 shadow-sm relative flex items-center justify-center transition-transform hover:scale-110
                                        ${selectedColor === color.name ? 'ring-2 ring-offset-2 ring-[#8B4513]' : ''}`}
                                        style={{ backgroundColor: color.hex }}
                                    >
                                        {selectedColor === color.name && <Check className={`w-5 h-5 ${['Snow', 'Vanilla', 'White', 'Lemon Frost', 'Fresh Aqua', 'Ice Blue'].includes(color.name) ? 'text-black' : 'text-white'}`} />}
                                    </div>
                                    <span className={`text-[10px] text-center w-14 leading-tight ${selectedColor === color.name ? 'font-bold text-[#8B4513]' : 'text-gray-500'}`}>
                                        {color.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Size Selection */}
                    <div className="space-y-2 pt-2">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-900">Avilable Size:</span>
                            {/* <button className="flex items-center gap-1 text-[#C19A6B] font-bold text-sm hover:underline">
                                <Ruler className="w-4 h-4" /> Size Chart
                            </button> */}
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 border rounded-lg text-sm transition-all duration-200
                                        ${selectedSize === size
                                            ? 'border-gray-900 bg-white text-gray-900 shadown-inner ring-1 ring-gray-900 font-medium'
                                            : 'border-gray-300 text-gray-600 hover:border-gray-900'
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Product Details Table */}
            <div className="max-w-7xl mx-auto mt-12 md:mt-16">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Product details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-sm md:text-base">
                    <div className="flex justify-between md:justify-start gap-12 border-b border-gray-100 pb-2">
                        <span className="font-bold text-gray-900 w-40">Material composition</span>
                        <span className="text-gray-600">100% Giza Cotton</span>
                    </div>
                    <div className="flex justify-between md:justify-start gap-12 border-b border-gray-100 pb-2">
                        <span className="font-bold text-gray-900 w-40">Pattern</span>
                        <span className="text-gray-600">Solid / Plain</span>
                    </div>
                    <div className="flex justify-between md:justify-start gap-12 border-b border-gray-100 pb-2">
                        <span className="font-bold text-gray-900 w-40">Fit type</span>
                        <span className="text-gray-600">Regular Fit</span>
                    </div>
                    <div className="flex justify-between md:justify-start gap-12 border-b border-gray-100 pb-2">
                        <span className="font-bold text-gray-900 w-40">Sleeve Type</span>
                        <span className="text-gray-600">Long Sleeve</span>
                    </div>
                    <div className="flex justify-between md:justify-start gap-12 border-b border-gray-100 pb-2">
                        <span className="font-bold text-gray-900 w-40">Length</span>
                        <span className="text-gray-600">Standard Length</span>
                    </div>
                    <div className="flex justify-between md:justify-start gap-12 border-b border-gray-100 pb-2">
                        <span className="font-bold text-gray-900 w-40">Neck Style</span>
                        <span className="text-gray-600">Button Down Collar</span>
                    </div>
                    <div className="flex justify-between md:justify-start gap-12 border-b border-gray-100 pb-2">
                        <span className="font-bold text-gray-900 w-40">Country of Origin</span>
                        <span className="text-gray-600">India</span>
                    </div>
                    <div className="flex justify-between md:justify-start gap-12 border-b border-gray-100 pb-2">
                        <span className="font-bold text-gray-900 w-40">Care instructions</span>
                        <span className="text-gray-600">Machine Wash</span>
                    </div>
                </div>
            </div>

            {/* Similar Products Section */}
            <div className="max-w-7xl mx-auto mt-16 md:mt-24 mb-12">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-0 gap-y-4 md:gap-6 lg:gap-8">
                    {similarProducts.map((product, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div
                                key={product.id}
                                onClick={() => window.open(`/product/${product.id}`, '_blank')}
                                className={`bg-white border-2 border-gray-300 shadow-sm hover:shadow-xl hover:border-yellow-400 transition-all duration-300 overflow-hidden flex flex-col group relative hover:z-10 cursor-pointer
                                ${isLeft ? 'rounded-bl-[2.5rem] rounded-tr-none rounded-tl-none rounded-br-none' : 'rounded-br-[2.5rem] rounded-tl-none rounded-tr-none rounded-bl-none border-l-0 md:border-l-2'}
                            `}>

                                {/* Image Container */}
                                <div className="relative aspect-[4/3] bg-gray-50 p-2 md:p-4 flex items-center justify-center overflow-hidden border-b border-gray-100">
                                    {/* Badge - Leaf Shape (Large Bottom-Right Curve) */}
                                    {product.badge && (
                                        <span className={`absolute top-0 left-0 rounded-br-[30px] pl-3 pr-6 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white z-10 shadow-sm
                                            ${product.badge === 'Best Seller' ? 'bg-orange-500' :
                                                product.badge === 'Sale' ? 'bg-red-500' :
                                                    product.badge === 'New' ? 'bg-green-500' : 'bg-blue-500'}`}>
                                            {product.badge}
                                        </span>
                                    )}

                                    {/* Wishlist - Always Top Right */}
                                    <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white text-gray-400 hover:text-red-500 border border-gray-200 shadow-sm z-10 transition-colors">
                                        <Heart className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    </button>

                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-2 md:p-3 flex flex-col flex-1 relative">
                                    <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Electronics</p>

                                    <h3 className="font-bold text-gray-900 text-xs md:text-base leading-tight md:leading-snug line-clamp-2 mb-1.5 h-8 md:h-11 group-hover:text-yellow-600 transition-colors cursor-pointer text-ellipsis overflow-hidden" title={product.title}>
                                        {product.title}
                                    </h3>

                                    <div className="flex items-center gap-1 mb-2">
                                        {renderStars(product.rating)}
                                        <span className="text-[10px] md:text-xs font-bold text-blue-600 ml-0.5">{product.rating}</span>
                                        <span className="text-[9px] md:text-[10px] font-semibold text-gray-400">({product.reviews})</span>
                                    </div>

                                    {/* Price - Right Aligned with Padding to avoid overlap */}
                                    <div className="mt-auto flex justify-end items-end w-full pl-14 md:pl-20">
                                        <div className="flex flex-col items-end">
                                            {product.originalPrice && (
                                                <span className="text-[9px] md:text-[10px] text-gray-400 line-through font-medium mb-0.5">${product.originalPrice}</span>
                                            )}
                                            <span className="text-base md:text-xl font-extrabold text-gray-900 flex items-baseline gap-0.5 break-all text-right">
                                                <span className="text-[10px] md:text-xs align-top opacity-70">$</span>{Math.floor(product.price)}<span className="text-[10px] md:text-xs align-top opacity-70">.{Math.round((product.price % 1) * 100).toString().padEnd(2, '0')}</span>
                                            </span>
                                        </div>
                                    </div>

                                    {/* Add Button - Absolute Bottom Left (Joined like Badge) */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(`/product/${product.id}`, '_blank');
                                        }}
                                        className="absolute bottom-0 left-0 bg-yellow-400 hover:bg-yellow-500 text-gray-900 hover:text-white px-4 md:px-2 h-9 md:h-12 flex items-center justify-center gap-2 rounded-tr-[20px] shadow-sm transition-all duration-300 z-1"
                                    >
                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider">Add To Cart</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div >
    );
};

export default ProductDetails;
