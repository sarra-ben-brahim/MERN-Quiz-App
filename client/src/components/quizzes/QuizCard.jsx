import React, { useEffect, useState } from "react";
import { getLevelColor } from "../config/Utils"; // import color function from getLevelColor
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosApi";

const QuizCard = ({ name, description, level, questionsCount, image, id }) => {
  const navigate = useNavigate();
  //const { id } = useParams();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axiosInstance
      .get(`http://localhost:5000/quizzes/${id}`)

      .then((response) => {
        console.log(response.data.numberOfQuestions);
        setTotal(response.data.numberOfQuestions); // set total number of questions to state
      })

      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleStart = (id) => {
    console.log(total); // get total number of questions from questionsCount prop
    navigate(`/start-quiz/${id}`, {
      state: { totalQuestion: total },
    });
  };

  return (
    <div>
      <Card
        sx={{
          maxWidth: 345,
          margin: "20px auto",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "scale(1.05)", //
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={name}
          sx={{
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        />
        <CardContent>
          <Typography
            variant="h5"
            component="div"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginTop: "10px" }}
          >
            {description}
          </Typography>
          <Box
            style={{
              marginTop: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography
              style={{
                fontWeight: "bold",
                color: getLevelColor(level),
                marginBottom: "10px",
              }}
            >
              {level}
            </Typography>
            <Typography sx={{ marginBottom: "10px" }}>
              Questions: {questionsCount}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              marginTop: "20px",
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
            onClick={() => handleStart(id)}
          >
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizCard;
