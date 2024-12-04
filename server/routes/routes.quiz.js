const QuizController = require("../controllers/controller.quiz");
const { verifyToken, isAdmin } = require("../middleware/middleware.user");

module.exports = (app) => {
    app.get("/api/quiz",QuizController.findALLQuiz);
    app.get("/api/quiz/:id", QuizController.findOneSingleQuiz);
    app.post("/api/quiz", [verifyToken, isAdmin],QuizController.createNewQuiz);
    app.patch("/api/quiz/:id",[verifyToken, isAdmin], QuizController.updateExistingQuiz);
    app.delete("/api/quiz/:id",[verifyToken, isAdmin], QuizController.deleteAnExistingQuiz);
}