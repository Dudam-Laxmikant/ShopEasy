// ============================================================
// Admin API Service
// Base URL: http://localhost:5000/api/v1/admin
// ============================================================

const BASE_URL = "http://localhost:5000/api/v1/admin";

// ─── Helper ─────────────────────────────────────────────────
const handleResponse = async (res) => {
    const data = await res.json();
    if (!res.ok) {
        // Backend se detail field me error aata hai
        throw new Error(data.detail || "Something went wrong.");
    }
    return data;
};

// ─── 1. Admin Login ─────────────────────────────────────────
// POST /api/v1/admin/login
// Body: { admin_email, admin_password }
// Response: { message, access_token }
export const loginAdmin = async (admin_email, admin_password) => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_email, admin_password }),
    });
    return handleResponse(res);
};

// ─── 2. Admin Register ──────────────────────────────────────
// POST /api/v1/admin/register
// Body: { admin_name, admin_email, admin_password }
// Response: { admin_id, admin_name, admin_email, admin_type, members }
export const registerAdmin = async (admin_name, admin_email, admin_password) => {
    const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_name, admin_email, admin_password }),
    });
    return handleResponse(res);
};

// ─── 3. Sub-Admin Login ─────────────────────────────────────
// POST /api/v1/admin/sub-admin/login
// Body: { sub_admin_email, sub_admin_password }
// Response: { message, access_token }
export const loginSubAdmin = async (sub_admin_email, sub_admin_password) => {
    const res = await fetch(`${BASE_URL}/sub-admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sub_admin_email, sub_admin_password }),
    });
    return handleResponse(res);
};

// ─── 4. Add Sub-Admin ───────────────────────────────────────
// POST /api/v1/admin/add-sub-admin  (Auth Required)
// Body: { sub_admin_name, sub_admin_email, sub_admin_password, allowed }
export const addSubAdmin = async (payload, token) => {
    const res = await fetch(`${BASE_URL}/add-sub-admin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    return handleResponse(res);
};

// ─── 5. Get Unseen Sellers ──────────────────────────────────
// GET /api/v1/admin/admins/unseen  (Auth Required)
export const getUnseenSellers = async (token) => {
    const res = await fetch(`${BASE_URL}/admins/unseen`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(res);
};

// ─── 6. Get Pending Sellers ─────────────────────────────────
// GET /api/v1/admin/admins/sellers/pending  (Auth Required)
export const getPendingSellers = async (token) => {
    const res = await fetch(`${BASE_URL}/admins/sellers/pending`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(res);
};

// ─── 7. Mark Sellers as Seen ────────────────────────────────
// PUT /api/v1/admin/admins/sellers/mark-seen  (Auth Required)
export const markSellersSeen = async (seller_ids, token) => {
    const res = await fetch(`${BASE_URL}/admins/sellers/mark-seen`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ seller_ids }),
    });
    return handleResponse(res);
};

// ─── 8. Approve Seller ──────────────────────────────────────
// PUT /api/v1/admin/admins/sellers/:seller_id/approve  (Auth Required)
export const approveSeller = async (seller_id, token) => {
    const res = await fetch(`${BASE_URL}/admins/sellers/${seller_id}/approve`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(res);
};

// ─── 9. Reject Seller ───────────────────────────────────────
// PUT /api/v1/admin/admins/sellers/:seller_id/reject  (Auth Required)
// Body: { reason }
export const rejectSeller = async (seller_id, reason, token) => {
    const res = await fetch(`${BASE_URL}/admins/sellers/${seller_id}/reject`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason }),
    });
    return handleResponse(res);
};

// ─── 10. Get Seller History ─────────────────────────────────
// GET /api/v1/admin/sellers/history  (Auth Required)
// Query: ?status=all|approved|rejected|pending
export const getSellerHistory = async (status = "all", token) => {
    const res = await fetch(`${BASE_URL}/sellers/history?status=${status}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return handleResponse(res);
};

// ─── Token Helpers ───────────────────────────────────────────
export const saveAdminToken = (token) => localStorage.setItem("admin_token", token);
export const getAdminToken = () => localStorage.getItem("admin_token");
export const removeAdminToken = () => localStorage.removeItem("admin_token");
export const isAdminLoggedIn = () => !!localStorage.getItem("admin_token");
