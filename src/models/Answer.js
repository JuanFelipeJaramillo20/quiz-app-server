const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Answer = sequelize.define("Answer", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  answer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Questions",
      key: "id",
    },
  },
});

module.exports = Answer;
