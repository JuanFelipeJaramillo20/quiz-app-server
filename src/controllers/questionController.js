const { validationResult } = require("express-validator");
const Question = require("../models/Question");

const createQuestion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { question, option_a, option_b, option_c, option_d, right_answer } =
    req.body;

  try {
    const newQuestion = await Question.create({
      question,
      option_a,
      option_b,
      option_c,
      option_d,
      right_answer,
    });
    res.status(201).json({
      message: "Question created successfully",
      question: newQuestion,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const getQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateQuestion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { question, option_a, option_b, option_c, option_d, right_answer } =
    req.body;

  try {
    const existingQuestion = await Question.findByPk(id);
    if (!existingQuestion) {
      return res.status(404).json({ error: "Question not found" });
    }

    existingQuestion.question = question || existingQuestion.question;
    existingQuestion.option_a = option_a || existingQuestion.option_a;
    existingQuestion.option_b = option_b || existingQuestion.option_b;
    existingQuestion.option_c = option_c || existingQuestion.option_c;
    existingQuestion.option_d = option_d || existingQuestion.option_d;
    existingQuestion.right_answer =
      right_answer || existingQuestion.right_answer;

    await existingQuestion.save();
    res.status(200).json({
      message: "Question updated successfully",
      question: existingQuestion,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteQuestion = async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    await question.destroy();
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
