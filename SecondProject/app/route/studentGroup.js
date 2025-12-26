module.exports = (app) => {
    const studentGroup = require('../controller/studentGroup');
    

    app.get('/api/listStudentGroups', studentGroup.findAll);
    

    app.post('/api/addStudentGroup', studentGroup.create);
    
  
    app.post('/api/updateStudentGroup/:id', studentGroup.update);
    

    app.post('/api/deleteStudentGroup/:id', studentGroup.delete);
    

    app.get('/api/studentGroup/:id', studentGroup.findById);
};