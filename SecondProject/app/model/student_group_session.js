module.exports = function(sequelize, DataTypes) {
  return sequelize.define('student_group_session', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    attestation_book_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    student_group_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
};