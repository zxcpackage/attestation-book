module.exports = (app) => {
    const reportType = require('../controller/reportType');
    
    app.get('/api/listReportTypes', reportType.findAll);
    app.get('/api/reportType/:id', reportType.findById);
};