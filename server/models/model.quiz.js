const mongoose = require("mongoose");

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
    }
}, {timestamps: true});
const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;