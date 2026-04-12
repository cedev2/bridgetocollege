const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/brigdetocollege/backend';

/**
 * Enhanced fetch wrapper that handles:
 * - Automatic Authorization header
 * - BASE_URL prefixing
 * - 401 (Unauthorized) session expiration
 */
export const apiFetch = async (endpoint, options = {}) => {
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}/${endpoint}`;
    
    // Get latest user from localStorage
    const savedUser = localStorage.getItem('btc_user');
    let token = null;
    try {
        if (savedUser) {
            const user = JSON.parse(savedUser);
            token = user.token;
        }
    } catch (e) {
        console.error('Error parsing user session:', e);
    }

    // Set headers
    const headers = {
        ...options.headers
    };

    if (token && !headers['Authorization']) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers
    });

    // Handle session expiration
    if (response.status === 401) {
        console.warn('Session expired. Redirecting to login...');
        localStorage.removeItem('btc_user');
        // We use window.location because we are outside the React context
        if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login?expired=true';
        }
    }

    return response;
};

/**
 * Helper to get correct URL for images
 */
export const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http') || path.startsWith('blob:')) return path;
    // Ensure no leading slash in relative path
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return `${BASE_URL}/${cleanPath}`;
};

export default apiFetch;
