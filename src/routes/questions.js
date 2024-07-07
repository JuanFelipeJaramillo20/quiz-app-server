const express = require("express");
const { body } = require("express-validator");
const {
  createQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  [
    body("question").notEmpty(),
    body("option_a").notEmpty(),
    body("option_b").notEmpty(),
    body("option_c").notEmpty(),
    body("option_d").notEmpty(),
    body("right_answer").notEmpty(),
  ],
  createQuestion
);

router.get("/", authenticateToken, getQuestions);
router.get("/:id", authenticateToken, getQuestion);
router.put("/:id", authenticateToken, updateQuestion);
router.delete("/:id", authenticateToken, deleteQuestion);

module.exports = router;
