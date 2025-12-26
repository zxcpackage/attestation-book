var db = require('../config/db.config.js');
var AttestationBook = db.attestation_book;
var Student = db.student;
var Discipline = db.discipline;
var ReportType = db.report_type;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    AttestationBook.findAll({
        include: [
            { model: Student },
            { model: Discipline },
            { model: ReportType }
        ]
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
            message: 'Требуется авторизация'
        });
    }
    
    AttestationBook.create({
        student_id: req.body.student_id,
        discipline_id: req.body.discipline_id,
        report_type_id: req.body.report_type_id,
        grade: req.body.grade,
        date: req.body.date
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
            message: 'Требуется авторизация'
        });
    }
    
    AttestationBook.update({
        student_id: req.body.student_id,
        discipline_id: req.body.discipline_id,
        report_type_id: req.body.report_type_id,
        grade: req.body.grade,
        date: req.body.date
    }, {
        where: { id: req.params.id }
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.delete = (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            message: 'Требуется авторизация'
        });
    }
    
    AttestationBook.destroy({
        where: { id: req.params.id }
    }).then(() => {
        globalFunctions.sendResult(res, 'Запись удалена');
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};

exports.findById = (req, res) => {
    AttestationBook.findByPk(req.params.id, {
        include: [
            { model: Student },
            { model: Discipline },
            { model: ReportType }
        ]
    }).then(object => {
        globalFunctions.sendResult(res, object);
    }).catch(err => {
        globalFunctions.sendError(res, err);
    })
};