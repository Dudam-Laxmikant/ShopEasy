import { io } from 'socket.io-client';

export const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

export const loginSubAdmin = async (email, password) => {
    const response = await fetch('http://localhost:8000/api/v1/admin/sub-admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sub_admin_email: email,
            sub_admin_password: password
        })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
    }
    return data;
};

export const loginSuperAdmin = async (email, password) => {
    const response = await fetch('http://localhost:8000/api/v1/admin/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            admin_email: email,
            admin_password: password
        })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
    }
    return data;
};

export const registerAdmin = async (name, email, password) => {
    const response = await fetch('http://localhost:8000/api/v1/admin/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            admin_name: name,
            admin_email: email,
            admin_password: password
        })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.detail || 'Registration failed');
    }
    return data;
};

export const initializeAdminSocket = (subAdminId, onNotificationReceived) => {
    // The backend uses wrapped ASGIApp, so path is default /socket.io
    const socket = io('http://localhost:8000', {
        transports: ['websocket', 'polling'] // Allow fallback
    });

    socket.on('connect', () => {
        console.log('Connected to admin socket:', socket.id);
        socket.emit('register_sub_admin', { sub_admin_id: subAdminId });
    });

    socket.on('new_seller_notification', (data) => {
        console.log('Notification received:', data);
        if (onNotificationReceived) {
            
            // Format to match required notification structure if backend doesn't exact match
            const formattedData = {
                id: data.id || data.seller_id || Date.now(), 
                seller_name: data.seller_name || data.shop_name || 'New Seller',
                email: data.seller_email || data.email || '',
                time: new Date().toLocaleTimeString(),
                ...data
            };
            onNotificationReceived(formattedData);
        }
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from admin socket');
    });

    return socket;
};
