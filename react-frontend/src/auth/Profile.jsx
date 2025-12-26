import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import api from "../services/api";

function Profile() {
    const { user, logout, updateUser } = useAuth();
    const [form, setForm] = useState({
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            setForm(prev => ({ ...prev, username: user.username }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
        // Сбрасываем сообщения при изменении
        if (error) setError('');
        if (success) setSuccess('');
    };

    const checkUsernameAvailability = async (username) => {
        if (username === user?.username) return true; // Тот же логин - доступен
        
        try {
            const response = await api.get(`/api/user/username/${username}`);
            // Проверяем структуру ответа
            console.log('Username check response:', response.data);
            
            // Если ответ - массив, проверяем длину
            if (Array.isArray(response.data)) {
                return response.data.length === 0; // Если массив пустой - логин свободен
            }
            // Если ответ - объект, проверяем наличие данных
            else if (response.data && typeof response.data === 'object') {
                return !response.data.id; // Если нет id - логин свободен
            }
            
            return false;
        } catch (err) {
            console.error('Error checking username:', err);
            // Если ошибка 404 - значит логин свободен
            if (err.response?.status === 404) {
                return true;
            }
            return false;
        }
    };

    const validateForm = async () => {
        // Проверка логина
        if (!form.username.trim()) {
            setError('Логин не может быть пустым');
            return false;
        }

        // Если меняем логин, проверяем доступность
        if (form.username !== user?.username) {
            const isAvailable = await checkUsernameAvailability(form.username);
            if (!isAvailable) {
                setError('Этот логин уже занят');
                return false;
            }
        }

        // Если меняем пароль
        if (form.newPassword || form.confirmPassword || form.currentPassword) {
            if (!form.currentPassword) {
                setError('Для смены пароля введите текущий пароль');
                return false;
            }

            if (form.newPassword.length < 6) {
                setError('Новый пароль должен быть не менее 6 символов');
                return false;
            }

            if (form.newPassword !== form.confirmPassword) {
                setError('Новые пароли не совпадают');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const isValid = await validateForm();
        if (!isValid) return;

        setLoading(true);

        try {
            const data = { username: form.username };
            
            // Если меняем пароль
            if (form.currentPassword && form.newPassword) {
                data.currentPassword = form.currentPassword;
                data.newPassword = form.newPassword;
            }

            const response = await api.post(`/api/updateUser/${user.id}`, data);
            
            if (response.data) {
                setSuccess('Профиль успешно обновлен!');
                
                // Обновляем пользователя в контексте
                updateUser({
                    ...user,
                    username: form.username
                });

                // Сбрасываем поля паролей
                setForm(prev => ({
                    ...prev,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }));

                // Перезагружаем через 2 секунды
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (err) {
            console.error('Update error:', err);
            setError(err.response?.data?.message || 'Ошибка обновления профиля');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (!user) {
        return (
            <div className="container mt-5 text-center">
                <h3>Требуется авторизация</h3>
                <button 
                    className="btn btn-primary mt-3"
                    onClick={() => navigate('/login')}
                >
                    Войти
                </button>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg border-0">
                        <div className="card-header bg-primary text-white">
                            <h4 className="mb-0">👤 Личный профиль</h4>
                        </div>
                        <div className="card-body">
                            {error && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {error}
                                    <button type="button" className="btn-close" onClick={() => setError('')}></button>
                                </div>
                            )}

                            {success && (
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    {success}
                                    <button type="button" className="btn-close" onClick={() => setSuccess('')}></button>
                                </div>
                            )}

                            <div className="mb-4">
                                <h5>Информация о пользователе</h5>
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><strong>ID пользователя:</strong></p>
                                        <div className="form-control bg-light">{user.id}</div>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>Дата регистрации:</strong></p>
                                        <div className="form-control bg-light">{new Date().toLocaleDateString('ru-RU')}</div>
                                    </div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <h5 className="mb-3">Редактировать профиль</h5>
                                
                                <div className="mb-3">
                                    <label className="form-label">Логин:</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        value={form.username}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="form-text">
                                        {form.username === user.username 
                                            ? 'Текущий логин' 
                                            : 'Проверка доступности...'}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Текущий пароль:</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        className="form-control"
                                        value={form.currentPassword}
                                        onChange={handleChange}
                                        placeholder="Оставьте пустым, если не меняете пароль"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Новый пароль:</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        className="form-control"
                                        value={form.newPassword}
                                        onChange={handleChange}
                                        placeholder="Минимум 6 символов"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="form-label">Подтвердите новый пароль:</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        value={form.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                                    <button
                                        type="submit"
                                        className="btn btn-primary px-4"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                Сохранение...
                                            </>
                                        ) : '💾 Сохранить изменения'}
                                    </button>
                                    
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger"
                                        onClick={handleLogout}
                                    >
                                        🚪 Выйти из системы
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="card mt-4 border-0 shadow-sm">
                        <div className="card-body">
                            <h5>📊 Статистика</h5>
                            <div className="row text-center">
                                <div className="col-md-4">
                                    <div className="p-3 bg-light rounded">
                                        <h3 className="text-primary">0</h3>
                                        <p className="mb-0">Дисциплин добавлено</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 bg-light rounded">
                                        <h3 className="text-success">0</h3>
                                        <p className="mb-0">Студентов в системе</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="p-3 bg-light rounded">
                                        <h3 className="text-warning">0</h3>
                                        <p className="mb-0">Оценок выставлено</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;