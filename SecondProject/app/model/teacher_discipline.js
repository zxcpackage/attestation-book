module.exports = function(sequelize, DataTypes) {
  return sequelize.define('teacher_discipline', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    teacher_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    discipline_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};