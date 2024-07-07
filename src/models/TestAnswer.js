const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TestAnswer = sequelize.define(
  "TestAnswer",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    testId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tests",
        key: "id",
      },
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Questions",
        key: "id",
      },
    },
    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "TestAnswers",
  }
);

module.exports = TestAnswer;
