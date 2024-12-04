import React from "react";
import { Box, Typography } from "@mui/material";
import QuizList from "../components/quizzes/QuizList"; //
import data from "./data.json";
import { useState, useEffect } from "react";

const Main = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState(null);

  useEffect(() => {
    // Simulate data from API requests
    setQuizzes(data);
  }, []);

  const handleStartQuiz = (quizId) => {
    setSelectedQuizId(quizId);
    console.log(`Quiz ${quizId} started`);
  };

  return (
    <div>
      <Box sx={{ padding: "20px", margin: "25px" }}>
        <Typography
          variant="h4"
          color="primary"
          sx={{ fontWeight: "bold", marginBottom: "25px", padding: "15px" }}
        >
          Choose a Quiz from the list below and Enjoy!
        </Typography>

        <QuizList quizzes={quizzes} onStart={handleStartQuiz} />
      </Box>
    </div>
  );
};

export default Main;
