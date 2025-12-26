module.exports = (app) => {
    const student = require('../controller/student');
    
    app.get('/api/listStudents', student.findAll);
    app.get('/api/listStudentsSQL', student.findAllSQL);
    app.post('/api/addStudent', student.create);
    app.post('/api/updateStudent/:id', student.update);
    app.post('/api/deleteStudent/:id', student.delete);
    app.get('/api/student/:id', student.findById);
    app.get('/api/studentsByStudentGroup/studentGroupId=:student_group_id', student.studentsByStudentGroup);
};