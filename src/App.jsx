import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Tools/Client/Header';
import Sidebar from './pages/Tools/Client/Sidebar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
    return (
        <Router>
            <div className="flex flex-col h-screen bg-gray-50 text-gray-900 overflow-hidden">
                <Header />
                <div className="flex flex-1 w-full overflow-hidden">
                    <Sidebar />
                    <main className="flex-1 w-full min-w-0 p-4 lg:p-6 overflow-y-auto">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/product/:id" element={<ProductDetails />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
