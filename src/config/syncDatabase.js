// models/index.js
const sequelize = require("./database");
const User = require("../models/User");
const Question = require("../models/Question");
const Test = require("../models/Test");
const TestAnswer = require("../models/TestAnswer");

User.hasMany(Test, { foreignKey: "userId" });
Test.belongsTo(User, { foreignKey: "userId" });

Test.hasMany(TestAnswer, { foreignKey: "testId" });
TestAnswer.belongsTo(Test, { foreignKey: "testId" });

Question.hasMany(TestAnswer, { foreignKey: "questionId" });
TestAnswer.belongsTo(Question, { foreignKey: "questionId" });

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    await User.sync();
    await Question.sync();
    await Test.sync();
    await TestAnswer.sync();

    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = {
  User,
  Question,
  Test,
  TestAnswer,
  syncDatabase,
};
