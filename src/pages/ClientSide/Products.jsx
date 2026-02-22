import React from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';

const Products = () => {
    // Mock Data for Products
    const products = [
        {
            id: 0,
            title: "Wireless Noise Cancelling Headphones",
            price: 299.99,
            originalPrice: 349.99,
            rating: 4.5,
            reviews: 128,
            image: "https://theformalclub.in/cdn/shop/files/TealFormalShirt_4.jpg?v=1751886662&width=600",
            badge: "Best Seller"
        },
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
            id: 4,
            title: "Gaming Laptop 15.6\" 144Hz",
            price: 1099.99,
            originalPrice: 1299.99,
            rating: 4.6,
            reviews: 215,
            image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        },
        {
            id: 5,
            title: "Classic Leather Sneakers",
            price: 89.95,
            rating: 4.3,
            reviews: 42,
            image: "https://images-cdn.ubuy.qa/69775dc8b10e005ef006210c-shart-master-t-shirt-funny-saying.jpg",
        },
        {
            id: 5,
            title: "Classic Leather Sneakers",
            price: 89.95,
            rating: 4.3,
            reviews: 42,
            image: "https://images-cdn.ubuy.qa/69775dc8b10e005ef006210c-shart-master-t-shirt-funny-saying.jpg",
        },
        {
            id: 5,
            title: "Classic Leather Sneakers",
            price: 89.95,
            rating: 4.3,
            reviews: 42,
            image: "https://images-cdn.ubuy.qa/69775dc8b10e005ef006210c-shart-master-t-shirt-funny-saying.jpg",
        },
        {
            id: 6,
            title: "Mechanical Gaming Keyboard",
            price: 149.50,
            originalPrice: 189.00,
            rating: 4.7,
            reviews: 330,
            image: "https://m.media-amazon.com/images/I/61umEGE0mKL._SX522_.jpg",
            badge: "Choice"
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
                <span className="text-xs text-blue-600 ml-1 hover:underline cursor-pointer">{rating}</span>
            </div>
        );
    };

    return (
        <div className="space-y-4">

            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Electronics & Gadgets</h1>
                    <p className="text-sm text-gray-500">Showing 1-12 of over 2000 results</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-yellow-500 focus:ring-yellow-500 bg-gray-50 p-2 cursor-pointer outline-none">
                        <option>Featured</option>
                        <option>Price: Low to High</option>
                        <option>Price: High to Low</option>
                        <option>Avg. Customer Review</option>
                        <option>Newest Arrivals</option>
                    </select>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-0 gap-y-4 md:gap-6 lg:gap-8">
                {products.map((product, index) => {
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
                                    {/* <ShoppingCart className="w-3.5 h-3.5 md:w-4 md:h-4" /> */}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Products;
