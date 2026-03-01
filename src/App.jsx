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

                    {/* Seller Side Routes */}
                    <Route path="/seller" element={<SellerLayout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="registration" element={<Registration />} />
                        <Route path="products" element={<ProductManagement />} />
                        <Route path="add-product" element={<AddProduct />} />
                        <Route path="edit-product/:id" element={<EditProduct />} />
                        <Route path="orders" element={<OrderProcessing />} />
                        <Route path="shipments" element={<ShipmentTracking />} />
                        <Route path="payments" element={<Settlement />} />
                        <Route path="settlements" element={<Settlement />} />
                        <Route path="invoices" element={<InvoiceManagement />} />
                        <Route path="returns" element={<ReturnsHandling />} />
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
