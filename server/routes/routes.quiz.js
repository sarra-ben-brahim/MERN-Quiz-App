const QuizController = require("../controllers/controller.quiz");
const { verifyToken, isAdmin } = require("../middleware/middleware.user");
const UserController = require("../controllers/controller.user");


module.exports = (app) => {
    
    // Quiz routes
    app.get("/api/quiz",QuizController.findALLQuiz);
    app.get("/api/quiz/:id", QuizController.findOneSingleQuiz);
    app.post("/api/quiz",[verifyToken, isAdmin],QuizController.createNewQuiz);
    app.patch("/api/quiz/:id",[verifyToken, isAdmin], QuizController.updateExistingQuiz);
    app.delete("/api/quiz/:id",[verifyToken, isAdmin], QuizController.deleteAnExistingQuiz);

    // User routes for admin
    app.get("/api/user",[verifyToken, isAdmin], UserController.findALLUser);
    app.get("/api/user/email/:email",[verifyToken, isAdmin], UserController.findOneSingleUser);
    app.get("/api/user/:id", UserController.findOneSingleUserById);

    //update user
    app.patch("/api/user/:id", UserController.updateExistingUser);

    //quiz results
    app.post("/api/quiz-results", QuizController.saveQuizResult);
    app.get("/api/quiz-results/user/:userId", QuizController.getUserQuizResults);

    // Question Routes
    app.post("/api/quizzes/:quizId/questions", quizController.addQuestionToQuiz);
    app.get("/api/quizzes/:quizId/questions", quizController.getQuestionsFromQuiz);
    app.put("/api/quizzes/:quizId/questions/:questionId",quizController.updateQuestionInQuiz);
    app.delete("/api/quizzes/:quizId/questions/:questionId",quizController.deleteQuestionFromQuiz);

}