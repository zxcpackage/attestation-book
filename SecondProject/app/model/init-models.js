var DataTypes = require("sequelize").DataTypes;

function initModels(sequelize) {

  var models = {};
  
  models.attestation_book = require('./attestation_book')(sequelize, DataTypes);
  models.discipline = require('./discipline')(sequelize, DataTypes);
  models.report_type = require('./report_type')(sequelize, DataTypes);
  models.student = require('./student')(sequelize, DataTypes);
  models.student_group = require('./student_group')(sequelize, DataTypes);
  models.student_group_session = require('./student_group_session')(sequelize, DataTypes);
  models.teacher = require('./teacher')(sequelize, DataTypes);
  models.teacher_discipline = require('./teacher_discipline')(sequelize, DataTypes);
  models.user = require('./user')(sequelize, DataTypes);


  models.attestation_book.hasMany(models.student_group_session, { 
    foreignKey: "attestation_book_id", 
    onDelete: "CASCADE" 
  });

  models.discipline.hasMany(models.attestation_book, { 
    foreignKey: "discipline_id", 
    onDelete: "CASCADE" 
  });
  

  models.discipline.hasMany(models.teacher_discipline, { 
    foreignKey: "discipline_id", 
    onDelete: "CASCADE" 
  });
  
 
  models.report_type.hasMany(models.attestation_book, { 
    foreignKey: "report_type_id", 
    onDelete: "CASCADE" 
  });
  

  models.student.hasMany(models.attestation_book, { 
    foreignKey: "student_id", 
    onDelete: "CASCADE" 
  });
  
  
  models.student_group.hasMany(models.student, { 
    foreignKey: "student_group_id", 
    onDelete: "CASCADE" 
  });
  
 
  models.student_group.hasMany(models.student_group_session, { 
    foreignKey: "student_group_id", 
    onDelete: "CASCADE" 
  });
  

  models.teacher.hasMany(models.teacher_discipline, { 
    foreignKey: "teacher_id", 
    onDelete: "CASCADE" 
  });


 
  models.attestation_book.belongsTo(models.discipline, { 
    foreignKey: "discipline_id" 
  });

  models.attestation_book.belongsTo(models.report_type, { 
    foreignKey: "report_type_id" 
  });
  

  models.attestation_book.belongsTo(models.student, { 
    foreignKey: "student_id" 
  });
  

  models.student.belongsTo(models.student_group, { 
    foreignKey: "student_group_id" 
  });
  

  models.student_group_session.belongsTo(models.attestation_book, { 
    foreignKey: "attestation_book_id" 
  });
  

  models.student_group_session.belongsTo(models.student_group, { 
    foreignKey: "student_group_id" 
  });
  

  models.teacher_discipline.belongsTo(models.discipline, { 
    foreignKey: "discipline_id" 
  });
  

  models.teacher_discipline.belongsTo(models.teacher, { 
    foreignKey: "teacher_id" 
  });

  return models;
}


module.exports = initModels;
module.exports.initModels = initModels;