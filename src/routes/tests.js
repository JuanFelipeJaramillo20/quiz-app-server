const express = require("express");
const { body } = require("express-validator");
const { startTest, submitTest } = require("../controllers/testController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/start",
  authenticateToken,
  [
    body("numQuestions")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Number of questions must be a positive integer"),
  ],
  startTest
);

router.post(
  "/submit",
  authenticateToken,
  [
    body("testId").notEmpty(),
    body("answers").isArray({ min: 1 }).withMessage("Answers must be provided"),
    body("answers.*.questionId").notEmpty(),
    body("answers.*.answer").notEmpty(),
  ],
  submitTest
);

module.exports = router;
