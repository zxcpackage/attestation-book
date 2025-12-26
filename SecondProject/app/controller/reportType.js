var db = require('../config/db.config.js');
var ReportType = db.report_type;
var globalFunctions = require('../config/global.functions.js');

exports.findAll = (req, res) => {
    ReportType.findAll()
        .then(objects => {
            globalFunctions.sendResult(res, objects);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};

exports.findById = (req, res) => {
    ReportType.findByPk(req.params.id)
        .then(object => {
            globalFunctions.sendResult(res, object);
        })
        .catch(err => {
            globalFunctions.sendError(res, err);
        })
};