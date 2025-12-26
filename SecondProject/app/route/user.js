// app/route/user.js
module.exports = (app) => {
    // Временно создай простые обработчики
    app.get('/api/users', (req, res) => {
        res.json({ message: 'Users endpoint' });
    });
    
    app.get('/api/user/:id', (req, res) => {
        res.json({ id: req.params.id, message: 'User by ID' });
    });
    
    app.get('/api/user/username/:username', (req, res) => {
        res.json({ username: req.params.username, message: 'User by username' });
    });
    
    app.post('/api/addUser', (req, res) => {
        res.json({ message: 'Add user' });
    });
    
    app.post('/api/updateUser/:id', (req, res) => {
        res.json({ id: req.params.id, message: 'Update user' });
    });
    
    app.post('/api/deleteUser/:id', (req, res) => {
        res.json({ id: req.params.id, message: 'Delete user' });
    });
};