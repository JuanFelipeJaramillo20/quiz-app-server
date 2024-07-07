const Test = require("../models/Test");
const Question = require("../models/Question");
const TestAnswer = require("../models/TestAnswer");
const sequelize = require("../config/database");

const startTest = async (req, res) => {
  const userId = req.user.userId;
  const numQuestions = req.body.numQuestions || 200;

  try {
    const questions = await Question.findAll({
      limit: numQuestions,
      order: sequelize.random(),
    });

    if (questions.length < numQuestions) {
      return res
        .status(400)
        .json({ message: "Not enough questions available" });
    }

    const test = await Test.create({ userId });

    res.json({ test, questions });
  } catch (error) {
    console.error("Error starting test:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const submitTest = async (req, res) => {
  const { testId, answers } = req.body;

  try {
    const test = await Test.findByPk(testId);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    let correctAnswersCount = 0;

    for (const answer of answers) {
      const question = await Question.findByPk(answer.questionId);

      if (!question) {
        return res
          .status(404)
          .json({ message: `Question ID ${answer.questionId} not found` });
      }

      const isCorrect = question.right_answer === answer.answer;
      if (isCorrect) {
        correctAnswersCount++;
      }

      await TestAnswer.create({
        testId: test.id,
        questionId: question.id,
        answer: answer.answer,
        isCorrect,
      });
    }

    const score = correctAnswersCount;

    await test.update({ score });

    res.json({ testId: test.id, score, totalQuestions: answers.length });
  } catch (error) {
    console.error("Error submitting test:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { startTest, submitTest };
