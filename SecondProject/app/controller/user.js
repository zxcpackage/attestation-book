var db = require('../config/db.config.js');
var User = db.user;
var globalFunctions = require('../config/global.functions.js');
var bcrypt = require('bcrypt');

exports.update = (req, res) => {
    if (!req.isAuthenticated()) {
        return globalFunctions.sendError(res, 'Требуется авторизация');
    }

    // Проверяем, что пользователь обновляет свой профиль
    if (req.user.id != req.params.id) {
        return globalFunctions.sendError(res, 'Нельзя обновлять чужой профиль');
    }

    // Проверяем уникальность логина (если меняется)
    if (req.body.username && req.body.username !== req.user.username) {
        User.findOne({ 
            where: { 
                username: req.body.username,
                id: { [db.Sequelize.Op.ne]: req.user.id }
            } 
        })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Логин уже занят'
                });
            }
            updateUser();
        })
        .catch(err => {
            return globalFunctions.sendError(res, err);
        });
    } else {
        updateUser();
    }

    function updateUser() {
        const updateData = { username: req.body.username };
        
        // Если меняем пароль
        if (req.body.currentPassword && req.body.newPassword) {
            // Проверяем текущий пароль
            bcrypt.compare(req.body.currentPassword, req.user.password, (err, result) => {
                if (err) {
                    return globalFunctions.sendError(res, err);
                }
                
                if (!result) {
                    return res.status(400).json({
                        success: false,
                        message: 'Текущий пароль неверен'
                    });
                }
                
                // Хешируем новый пароль
                bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                    if (err) {
                        return globalFunctions.sendError(res, err);
                    }
                    
                    updateData.password = hash;
                    performUpdate();
                });
            });
        } else {
            performUpdate();
        }
    }

    function performUpdate() {
        User.update(updateData, {
            where: { id: req.params.id }
        })
        .then(object => {
            if (object[0] > 0) {
                // Получаем обновленного пользователя
                return User.findByPk(req.params.id)
                    .then(updatedUser => {
                        const userWithoutPassword = {
                            id: updatedUser.id,
                            username: updatedUser.username
                        };
                        
                        res.json({
                            success: true,
                            message: 'Профиль обновлен',
                            user: userWithoutPassword
                        });
                    });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Пользователь не найден'
                });
            }
        })
        .catch(err => {
            // Проверяем ошибку уникальности (если вдруг пропустили проверку выше)
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({
                    success: false,
                    message: 'Логин уже занят'
                });
            }
            globalFunctions.sendError(res, err);
        });
    }
};