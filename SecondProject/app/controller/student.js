var db = require('../config/db.config.js');
var Student = db.student;
var StudentGroup = db.student_group;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    Student.findAll({
        include: [
            {
                model: StudentGroup,
                required: true
            }
        ]
    })
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findAllSQL = (req, res) => {
    db.sequelize.query(
        `SELECT student.*, student_group.name as student_group_name 
        FROM student
        INNER JOIN student_group ON student_group.id=student.student_group_id`,
        {
            type: db.sequelize.QueryTypes.SELECT
        })
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
            message: 'Требуется авторизация для добавления студента'
        });
    }
    
    Student.create({
        full_name: req.body.full_name,
        student_group_id: req.body.student_group_id
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
            message: 'Требуется авторизация для обновления студента'
        });
    }
    
    Student.update({
            full_name: req.body.full_name,
            student_group_id: req.body.student_group_id
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
            message: 'Требуется авторизация для удаления студента'
        });
    }
    
    Student.destroy({
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
    Student.findByPk(req.params.id, {
        include: [{ model: StudentGroup }]
    })
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.studentsByStudentGroup = (req, res) => {
    StudentGroup.findAll({
        include: [
            {
                model: Student,
                required: true
            }
        ],
        where: {
            id: req.params.student_group_id
        }
    })
    .then(objects => {
        globalFunctions.sendResult(res, objects);
    })
    .catch(err => {
        globalFunctions.sendError(res, err);
    })
};