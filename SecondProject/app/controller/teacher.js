var db = require('../config/db.config.js');
var Teacher = db.teacher;
var TeacherDiscipline = db.teacher_discipline;
var Discipline = db.discipline;
var globalFunctions = require('../config/global.functions.js');


exports.findAll = (req, res) => {
    Teacher.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};


exports.create = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            message: 'Требуется авторизация для добавления преподавателя'
        });
    }
    
    Teacher.create({
        full_name: req.body.full_name
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};


exports.update = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            message: 'Требуется авторизация для обновления преподавателя'
        });
    }
    
    Teacher.update({
            full_name: req.body.full_name
        },
        {
            where: {
                id: req.params.id
            }
        }
    ).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};


exports.delete = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            message: 'Требуется авторизация для удаления преподавателя'
        });
    }
    
    Teacher.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};


exports.findById = (req, res) => {
    Teacher.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};


exports.listTeacherDiscipline = (req, res) => {
    TeacherDiscipline.findAll({
        include: [
            { model: Teacher, required: true },
            { model: Discipline, required: true }
        ]
    })
    .then(objects => {
        globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    })
};


exports.addTeacherDiscipline = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            message: 'Требуется авторизация для добавления связи преподаватель-дисциплина'
        });
    }
    
    TeacherDiscipline.create({
        teacher_id: req.body.teacher_id,
        discipline_id: req.body.discipline_id
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.deleteTeacherDiscipline = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            message: 'Требуется авторизация для удаления связи преподаватель-дисциплина'
        });
    }
    
    TeacherDiscipline.destroy({
        where: {
            teacher_id: req.params.teacher_id,
            discipline_id: req.params.discipline_id
        }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    });
};