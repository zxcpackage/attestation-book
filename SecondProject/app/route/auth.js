var express = require('express');
var router = express.Router();
var passport = require('passport');

// Страница входа
router.get('/login', (req, res) => {
    res.json({
        success: false,
        message: req.flash('message') || 'Требуется авторизация'
    });
});

// Обработка входа
router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: info.message || 'Ошибка аутентификации' 
            });
        }
        
        // Логиним пользователя
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ success: false, error: err.message });
            }
            
            return res.json({ 
                success: true, 
                message: 'Успешный вход',
                user: {
                    id: user.id,
                    username: user.username
                }
            });
        });
    })(req, res, next);
});

// Страница регистрации
router.get('/register', (req, res) => {
    res.json({
        success: false,
        message: 'Используйте POST /register для регистрации'
    });
});

// Обработка регистрации
router.post('/register', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        
        if (!user) {
            return res.status(400).json({ 
                success: false, 
                message: info.message || 'Ошибка регистрации' 
            });
        }
        
        // Автоматически логиним после регистрации
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ success: false, error: err.message });
            }
            
            return res.json({ 
                success: true, 
                message: 'Успешная регистрация',
                user: {
                    id: user.id,
                    username: user.username
                }
            });
        });
    })(req, res, next);
});

// Выход из системы
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ success: false, error: err.message });
            }
            
            res.clearCookie('connect.sid');
            res.json({ success: true, message: 'Успешный выход' });
        });
    });
});

// Проверка текущего пользователя
router.get('/current', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({
            success: true,
            user: {
                id: req.user.id,
                username: req.user.username
            }
        });
    } else {
        res.json({
            success: false,
            message: 'Пользователь не авторизован'
        });
    }
});

module.exports = router;