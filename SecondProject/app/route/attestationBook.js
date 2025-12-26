module.exports = (app) => {
    const attestationBook = require('../controller/attestationBook');
    
    app.get('/api/listAttestationBooks', attestationBook.findAll);
    app.post('/api/addAttestationBook', attestationBook.create);
    app.post('/api/updateAttestationBook/:id', attestationBook.update);
    app.post('/api/deleteAttestationBook/:id', attestationBook.delete);
    app.get('/api/attestationBook/:id', attestationBook.findById);
};