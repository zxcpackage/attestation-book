import { useState, useEffect } from 'react';
import api from "../services/api";

function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await api.get("/auth/current");
            if (response.data.success) {
                setUser(response.data.user);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            } else {
                setUser(null);
                localStorage.removeItem('user');
            }
        } catch (err) {
            console.log("Auth check error:", err);
            setUser(null);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const response = await api.post("/auth/login", {
                username,
                password
            });
            
            if (response.data.success) {
                setUser(response.data.user);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                await checkAuth();
                return { success: true };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (err) {
            return { 
                success: false, 
                message: err.response?.data?.message || 'Ошибка сервера' 
            };
        }
    };

    const register = async (username, password) => {
        try {
            const response = await api.post("/auth/register", {
                username,
                password
            });
            
            if (response.data.success) {
                setUser(response.data.user);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                await checkAuth();
                return { success: true };
            } else {
                return { success: false, message: response.data.message };
            }
        } catch (err) {
            return { 
                success: false, 
                message: err.response?.data?.message || 'Ошибка сервера' 
            };
        }
    };

    const logout = async () => {
        try {
            await api.get("/auth/logout");
        } catch (err) {
            console.log("Logout error:", err);
        } finally {
            setUser(null);
            localStorage.removeItem('user');
        }
    };

    return {
        user,
        loading,
        isAuthenticated: () => user !== null,
        login,
        register,
        logout,
        checkAuth,
        updateUser: setUser
    };
}

export default useAuth;