const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, "Question is required"],
        minlength: [5, "Question must be at least 5 characters long"],
    },
    options: {
        type: [String],
        validate: {
            validator: function (val) {
                return val.length >= 2; 
            },
            message: "At least two options are required",
        },
    },
    type: {
        type: String,
        required: [true, "Type is required"],
        enum: ["Multiple Choice", "True/False", "Short Answer", "Single Choice"],
    },
    correctAnswer: {
        type: String,
        required: [true, "Correct answer is required"],
        validate: {
            validator: function (val) {
                return this.options.includes(val); 
            },
            message: "Correct answer must be one of the options",
        },
    },
});
const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "{PATH} is required"],
    },
    description: {
        type: String,
        required: [true, "{PATH} is required"],
        minlength: [10, "{PATH} minimum 10 characters long"],
    },
    level : {
        type: String,
        required: [true, "{PATH} is required"],
        enum: ["Beginner", "Intermediate", "Advanced"]
    },
    questionsCount: {
        type: Number,
        required: [true, "{PATH} is required"],
        min: [1, "{PATH} minimum 1 question"],
    },
    image :{
        type: String,
        required: [true, "{PATH} is required"],
    },
    questions: [questionSchema],

}, {timestamps: true});
const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;