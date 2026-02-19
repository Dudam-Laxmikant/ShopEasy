import React from 'react';

const Home = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight dark:text-white">Welcome to E-Commerce</h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">Discover amazing products at unbeatable prices.</p>
                <button className="mt-6 px-6 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-500 transition-colors">Start Shopping</button>
            </div>
        </div>
    );
};

export default Home;
