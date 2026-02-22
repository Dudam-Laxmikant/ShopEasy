import React, { useState } from 'react';
import {
    LogOut,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

const Sidebar = () => {
    const [showAllClosure, setShowAllClosure] = useState(false);
    const [showAllBrands, setShowAllBrands] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState([]);

    const filters = {
        clothingPattern: [
            'Solid', 'Striped', 'Floral', 'Animal print', 'Argyle', 'Camouflage',
            'Chequered', 'Chevron', 'Fruits', 'Geometric', 'Hearts', 'Letter print',
            'Paisley', 'Plaid', 'Polka dots', 'Stars'
        ],
        lifestyle: [
            'Business Casual', 'Business Professional', 'Casual', 'Comfort',
            'Dress', 'Evening', 'Formal', 'Themed', 'Work Utility'
        ],
        closureType: [
            'Pull On', 'Button', 'Zipper', 'Snap', 'Buckle', 'Double Ring', 'Drawstring',
            'Lace Up', 'Hook and Eye', 'Wrap'
        ],
        brands: [
            'DEELMO', 'U TURN', 'Peter England', 'The Indian Garage Co',
            'Majestic Man', 'Highlander', 'Pinkmint', 'Allen Solly', 'Van Heusen', 'Louis Philippe'
        ],
        shirtSizes: [
            '32', '34', '36', '38', '39', '40', '41', '42', '43', '44', '46', '48', '50'
        ]
    };

    const toggleSize = (size) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const FilterSection = ({ title, items, isBrand = false, showAll = true, setShowAll = null }) => {
        const displayedItems = showAll ? items : items.slice(0, 7);

        return (
            <section className="mb-8">
                <h3 className="text-[15px] font-bold text-gray-900 mb-4 px-1">{title}</h3>
                <div className="space-y-2.5 px-1">
                    {displayedItems.map((item) => (
                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    className="peer appearance-none w-4 h-4 border border-gray-400 rounded bg-white checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
                                />
                                <svg className="absolute w-3 h-3 text-white hidden peer-checked:block pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <span className={`text-[14px] text-gray-800 group-hover:text-blue-600 transition-colors ${isBrand ? 'uppercase font-medium' : ''}`}>{item}</span>
                        </label>
                    ))}
                    {setShowAll && items.length > 7 && (
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="flex items-center gap-1 text-[13px] font-semibold text-blue-600 hover:text-blue-800 mt-2 px-1 transition-colors border-none bg-transparent cursor-pointer"
                        >
                            {showAll ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            {showAll ? 'See less' : 'See more'}
                        </button>
                    )}
                </div>
            </section>
        );
    };

    return (
        <aside className="w-72 flex-shrink-0 bg-white border-r border-gray-200 hidden md:block text-left h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            <div className="p-6">

                <FilterSection title="Clothing pattern" items={filters.clothingPattern} />

                <FilterSection title="Lifestyle" items={filters.lifestyle} />

                <FilterSection
                    title="Closure Type"
                    items={filters.closureType}
                    showAll={showAllClosure}
                    setShowAll={setShowAllClosure}
                />

                <FilterSection
                    title="Brands"
                    items={filters.brands}
                    isBrand={true}
                    showAll={showAllBrands}
                    setShowAll={setShowAllBrands}
                />

                {/* Men's Shirt Size Section */}
                <section className="mb-8">
                    <h3 className="text-[15px] font-bold text-gray-900 mb-4 px-1">Men's Shirt Size</h3>
                    <div className="grid grid-cols-5 gap-2 px-1">
                        {filters.shirtSizes.map((size) => (
                            <button
                                key={size}
                                onClick={() => toggleSize(size)}
                                className={`h-10 border rounded flex items-center justify-center text-[13px] font-bold transition-all cursor-pointer shadow-sm
                                    ${selectedSizes.includes(size)
                                        ? 'border-gray-900 bg-gray-900 text-white'
                                        : 'border-gray-300 bg-white text-gray-800 hover:border-gray-900'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Logout Section */}
                <div className="pt-6 mt-6 border-t border-gray-100 mb-4">
                    <button className="w-full flex items-center gap-3 px-3 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all border-none bg-transparent cursor-pointer group">
                        <div className="p-2 bg-red-50 group-hover:bg-red-100 rounded-lg transition-colors">
                            <LogOut className="h-5 w-5" />
                        </div>
                        <span className="text-base">Logout</span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
