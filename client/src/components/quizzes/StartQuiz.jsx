import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";
import QuizIcon from "@mui/icons-material/Quiz";
import TimerIcon from "@mui/icons-material/Timer";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../config/axiosApi";

const StartQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quizData, setQuizData] = useState([]);
  const [quizDetails, setQuizDetails] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [viewResult, setViewResult] = useState(false);
  // const [timeLeft, setTimeLeft] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(null);
  //const [totalTime, setTotalTime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const questionsResponse = await axiosInstance.get(
          `api/quiz/${id}/questions`
        );
        const quizResponse = await axiosInstance.get(`api/quiz/${id}`);
        setQuizData(questionsResponse.data);
        setQuizDetails(quizResponse.data);
      } catch (err) {
        setError("Failed to load quiz data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [id]);

  // Handle option selection
  const handleOptionChange = (value, checked) => {
    const updatedAnswers = { ...answers };
    if (quizData[currentQuestionIndex].type === "single") {
      updatedAnswers[quizData[currentQuestionIndex]._id] = [value];
    } else {
      const currentAnswers = new Set(
        updatedAnswers[quizData[currentQuestionIndex]._id] || []
      );
      if (checked) {
        currentAnswers.add(value);
      } else {
        currentAnswers.delete(value);
      }
      updatedAnswers[quizData[currentQuestionIndex]._id] = [
        ...currentAnswers,
      ];
    }
    setAnswers(updatedAnswers);
  };

  // Calculate the score
  const calculateScore = () => {
    let correctAnswers = 0;

    quizData.forEach((question) => {
      const userAnswers = answers[question._id] || [];

      if (question.type === "single") {
        const correctOption = question.options.find(
          (option) => option.isCorrect
        );
        if (correctOption && correctOption.text === userAnswers[0]) {
          correctAnswers++;
        }
      } else {
        const correctOptions = question.options
          .filter((option) => option.isCorrect)
          .map((option) => option.text);
        if (
          correctOptions.length === userAnswers.length &&
          correctOptions.every((opt) => userAnswers.includes(opt))
        ) {
          correctAnswers++;
        }
      }
    });

    setScore(correctAnswers * 10);
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleViewResults = () => {
    navigate(`/results/${id}`, { state: { score, totalQuestions: quizData.length } });
  };

  if (loading) {
    return <Typography>Loading quiz...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (quizFinished) {
    return (
      <Box>
        <Typography variant="h4">Quiz Completed!</Typography>
        <Typography variant="h6">Your Score: {score}</Typography>
        <Button variant="contained" color="primary" onClick={handleViewResults}>
          View Results
        </Button>
      </Box>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <Box>
      <Typography variant="h4" display="flex" alignItems="center" gap={1}>
        <QuizIcon /> {quizDetails?.name}
      </Typography>
      <Typography variant="h6" display="flex" alignItems="center" gap={1}>
        <TimerIcon /> Question {currentQuestionIndex + 1} of{" "}
        {quizData.length}
      </Typography>
      <Typography variant="body1">{currentQuestion.question}</Typography>

      <Box>
        {currentQuestion.options.map((option) => (
          <FormControlLabel
            key={option.text}
            control={
              currentQuestion.type === "single" ? (
                <Radio
                  checked={
                    answers[currentQuestion._id]?.includes(option.text) || false
                  }
                  onChange={() => handleOptionChange(option.text, true)}
                />
              ) : (
                <Checkbox
                  checked={
                    answers[currentQuestion._id]?.includes(option.text) || false
                  }
                  onChange={(e) =>
                    handleOptionChange(option.text, e.target.checked)
                  }
                />
              )
            }
            label={option.text}
          />
        ))}
      </Box>

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button
          variant="outlined"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button variant="contained" onClick={handleNext}>
          {currentQuestionIndex === quizData.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default StartQuiz;
