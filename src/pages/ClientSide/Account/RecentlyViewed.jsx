import React from 'react';
import { Clock, Eye, ShoppingCart, ChevronRight } from 'lucide-react';

const RecentlyViewed = () => {
    const products = [
        {
            id: 1,
            name: 'Denim Trucker Jacket',
            category: 'Men Fashion',
            price: '$89.00',
            image: 'https://placehold.co/400x500?text=Denim'
        },
        {
            id: 2,
            name: 'Cargo Jogger Pants',
            category: 'Men Fashion',
            price: '$55.00',
            image: 'https://placehold.co/400x500?text=Pants'
        },
        {
            id: 3,
            name: 'Premium White Tee',
            category: 'Essentials',
            price: '$25.00',
            image: 'https://placehold.co/400x500?text=Tee'
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Recently Viewed</h1>
                    <p className="text-gray-500 mt-1 font-medium">Products you recently explored</p>
                </div>
                <button className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors px-4 py-2 border-b-2 border-transparent hover:border-red-100">
                    Clear History
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-gray-200/50 hover:border-indigo-100 transition-all duration-500">
                        <div className="aspect-[4/5] overflow-hidden relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
                            <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                <button className="flex-1 bg-white/95 backdrop-blur-sm text-gray-900 py-3 rounded-2xl text-xs font-black uppercase tracking-wider hover:bg-indigo-600 hover:text-white transition-all shadow-xl">
                                    Quick View
                                </button>
                                <button className="aspect-square bg-white/95 backdrop-blur-sm text-gray-900 p-3 rounded-2xl hover:bg-black hover:text-white transition-all shadow-xl">
                                    <ShoppingCart className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="p-5">
                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[2px] mb-1 block">{product.category}</span>
                            <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">{product.name}</h3>
                            <div className="flex items-center justify-between mt-3">
                                <span className="text-lg font-black text-gray-900">{product.price}</span>
                                <div className="flex items-center gap-1.5 text-gray-400">
                                    <Eye className="w-3.5 h-3.5" />
                                    <span className="text-[11px] font-bold tracking-tight">Viewed 2h ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentlyViewed;
