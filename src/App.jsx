import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetails from './pages/ClientSide/ProductDetails';
import Products from './pages/ClientSide/Products';
import Header from './pages/ClientSide/Tools/Header';
import Sidebar from './pages/ClientSide/Tools/Sidebar';

// Seller Side Imports
import SellerLayout from './pages/SallesSide/SellerLayout';
import Dashboard from './pages/SallesSide/Dashboard';
import Registration from './pages/SallesSide/Registration';
import ProductManagement from './pages/SallesSide/Products/ProductManagement';
import AddProduct from './pages/SallesSide/Products/AddProduct';
import OrderProcessing from './pages/SallesSide/Orders/OrderProcessing';
import Settlement from './pages/SallesSide/Payments/Settlement';
import ReturnsHandling from './pages/SallesSide/Returns/ReturnsHandling';

import EditProduct from './pages/SallesSide/Products/EditProduct';
import InvoiceManagement from './pages/SallesSide/Invoices/InvoiceManagement';
import ShipmentTracking from './pages/SallesSide/Shipments/ShipmentTracking';
import SellerLanding from './pages/SallesSide/Auth/SellerLanding';
import SellerAuth from './pages/SallesSide/Auth/SellerAuth';

// Admin Side Imports
import AdminLayout from './pages/Admin/AdminLayout';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminLogin from './pages/Admin/Login';
import SellerManagement from './pages/Admin/SellerManagement';
import ProductModeration from './pages/Admin/ProductModeration';
import OrderManagement from './pages/Admin/OrderManagement';
import FinancialControl from './pages/Admin/FinancialControl';
import MarketingControl from './pages/Admin/MarketingControl';
import SystemManagement from './pages/Admin/SystemManagement';

function App() {
    return (
        <Router>
            <div className="flex flex-col h-screen bg-gray-50 text-gray-900 overflow-hidden font-sans">
                <Routes>
                    {/* Client Side Routes */}
                    <Route
                        path="/*"
                        element={
                            <>
                                <Header />
                                <div className="flex flex-1 w-full overflow-hidden">
                                    <Sidebar />
                                    <main className="flex-1 w-full min-w-0 p-4 lg:p-6 overflow-y-auto">
                                        <Routes>
                                            <Route path="/" element={<Products />} />
                                            <Route path="/products" element={<Products />} />
                                            <Route path="/product/:id" element={<ProductDetails />} />
                                        </Routes>
                                    </main>
                                </div>
                            </>
                        }
                    />

                    {/* Seller Standalone Routes */}
                    <Route path="/seller" element={<SellerLanding />} />
                    <Route path="/seller/landing" element={<SellerLanding />} />
                    <Route path="/seller/auth" element={<SellerAuth />} />

                    {/* Seller App Routes (with Layout) */}
                    <Route element={<SellerLayout />}>
                        <Route path="/seller/dashboard" element={<Dashboard />} />
                        <Route path="/seller/registration" element={<Registration />} />
                        <Route path="/seller/products" element={<ProductManagement />} />
                        <Route path="/seller/add-product" element={<AddProduct />} />
                        <Route path="/seller/edit-product/:id" element={<EditProduct />} />
                        <Route path="/seller/orders" element={<OrderProcessing />} />
                        <Route path="/seller/shipments" element={<ShipmentTracking />} />
                        <Route path="/seller/payments" element={<Settlement />} />
                        <Route path="/seller/settlements" element={<Settlement />} />
                        <Route path="/seller/invoices" element={<InvoiceManagement />} />
                        <Route path="/seller/returns" element={<ReturnsHandling />} />
                    </Route>


                    {/* Admin Side Routes */}
                    <Route path="/admin/login" element={<AdminLogin />} />
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="sellers" element={<SellerManagement />} />
                        <Route path="moderation" element={<ProductModeration />} />
                        <Route path="orders" element={<OrderManagement />} />
                        <Route path="finances" element={<FinancialControl />} />
                        <Route path="settlements" element={<FinancialControl />} />
                        <Route path="marketing/*" element={<MarketingControl />} />
                        <Route path="system" element={<SystemManagement />} />
                        <Route path="security" element={<SystemManagement />} />
                        <Route path="settings" element={<SystemManagement />} />
                        <Route path="logs" element={<SystemManagement />} />
                        <Route path="analytics" element={<AdminDashboard />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
