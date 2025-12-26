module.exports = (app) => {
    const discipline = require('../controller/discipline');
    
    app.get('/api/listDisciplines', discipline.findAll);
    app.post('/api/addDiscipline', discipline.create);
    app.post('/api/updateDiscipline/:id', discipline.update);
    app.post('/api/deleteDiscipline/:id', discipline.delete);
    app.get('/api/discipline/:id', discipline.findById);
};