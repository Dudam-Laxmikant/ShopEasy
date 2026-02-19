import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
                        🛒 E-Commerce
                    </Link>

                    {/* Navigation Links */}
                    <div className="flex gap-6">
                        <Link
                            to="/"
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${isActive('/')
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            to="/products"
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${isActive('/products')
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            Products
                        </Link>
                        <Link
                            to="/about"
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${isActive('/about')
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${isActive('/contact')
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
