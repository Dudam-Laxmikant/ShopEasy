import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('shopeasy_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('shopeasy_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        if (quantity < 1) return;
        setCart((prev) =>
            prev.map(item =>
                item.id === productId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    const flyToCart = (e, imageSrc) => {
        const cartIcon = document.getElementById('cart-icon-target');
        if (!cartIcon || !imageSrc) return;

        const imgClone = document.createElement('img');
        imgClone.src = imageSrc;
        const cartRect = cartIcon.getBoundingClientRect();

        imgClone.classList.add('fly-item');

        // Start from click position
        imgClone.style.top = `${e.clientY - 40}px`;
        imgClone.style.left = `${e.clientX - 40}px`;
        imgClone.style.width = '80px';
        imgClone.style.height = '80px';
        imgClone.style.opacity = '1';
        imgClone.style.transform = 'scale(1)';

        document.body.appendChild(imgClone);

        // Animation to cart
        setTimeout(() => {
            imgClone.style.top = `${cartRect.top}px`;
            imgClone.style.left = `${cartRect.left}px`;
            imgClone.style.width = '20px';
            imgClone.style.height = '20px';
            imgClone.style.opacity = '0.5';
            imgClone.style.transform = 'scale(0.2)';
        }, 50);

        setTimeout(() => {
            if (document.body.contains(imgClone)) {
                document.body.removeChild(imgClone);
            }
        }, 750);
    };

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            cartTotal,
            cartCount,
            flyToCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
