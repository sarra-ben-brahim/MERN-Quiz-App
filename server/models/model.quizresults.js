const mongoose = require("mongoose");

const QuizResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  timeSpent: {
    type: Number, 
    required: true,
  },
  correctAnswers: {
    type: Number,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  dateAttempted: {
    type: Date,
    default: Date.now,
  },
});
const QuizResult = mongoose.model("QuizResult", QuizResultSchema);
module.exports = QuizResult;

