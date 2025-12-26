module.exports = (app) => {
    const teacher = require('../controller/teacher');
    

    app.get('/api/listTeachers', teacher.findAll);
    app.post('/api/addTeacher', teacher.create);
    app.post('/api/updateTeacher/:id', teacher.update);
    app.post('/api/deleteTeacher/:id', teacher.delete);
    app.get('/api/teacher/:id', teacher.findById);
    
  
    app.get('/api/listTeacherDiscipline', teacher.listTeacherDiscipline);
    app.post('/api/addTeacherDiscipline', teacher.addTeacherDiscipline);
    app.post('/api/deleteTeacherDiscipline/teacherId=:teacher_id/disciplineId=:discipline_id', teacher.deleteTeacherDiscipline);
};