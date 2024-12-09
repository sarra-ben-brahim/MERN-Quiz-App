import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateQuestion = () => {
  const { quizId, questionId } = useParams();
  const navigate = useNavigate();

  const [questionData, setQuestionData] = useState({
    question: "",
    options: [{ text: "", isCorrect: false }],
    type: "Multiple",
  });

  useEffect(() => {
    // Fetch existing question details
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/quiz/${quizId}/questions/${questionId}`);
        setQuestionData(response.data);
      } catch (error) {
        console.error("Error fetching question data", error);
      }
    };

    fetchQuestion();
  }, [quizId, questionId]);

  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...questionData.options];
    updatedOptions[index][field] = value;
    setQuestionData({ ...questionData, options: updatedOptions });
  };

  const handleAddOption = () => {
    const newOption = { text: "", isCorrect: false };
    setQuestionData((prevData) => ({
      ...prevData,
      options: [...prevData.options, newOption],
    }));
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = questionData.options.filter((_, i) => i !== index);
    setQuestionData((prevData) => ({
      ...prevData,
      options: updatedOptions,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:8000/api/quiz/${quizId}/questions/${questionId}`,
        questionData
      );
      navigate(`/edit-quiz/${quizId}`);
    } catch (error) {
      console.error("Error updating question", error);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6">Update Question</Typography>
      <form onSubmit={handleUpdate}>
        <TextField
          label="Question Text"
          name="question"
          value={questionData.question}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        {/* Render options dynamically */}
        {questionData.options.map((option, index) => (
          <Box key={index} sx={{ display: "flex", gap: 1, marginBottom: 1 }}>
            <TextField
              label={`Option ${index + 1}`}
              value={option.text}
              onChange={(e) => handleOptionChange(index, "text", e.target.value)}
              fullWidth
            />
            <Button variant="outlined" color="error" onClick={() => handleRemoveOption(index)}>
              Remove
            </Button>
          </Box>
        ))}
        <Button variant="contained" onClick={handleAddOption}>Add Option</Button>
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          Update Question
        </Button>
      </form>
    </Box>
  );
};

export default UpdateQuestion;
