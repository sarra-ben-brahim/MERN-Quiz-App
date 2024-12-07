import React, { useEffect, useState } from "react";
import { getLevelColor } from "../config/Utils";
import { Card, CardContent, Typography, CardMedia, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosApi";

const QuizCard = ({ name, description, level, questionsCount, image, id }) => {
    const navigate = useNavigate();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (id) {
            axiosInstance
                .get(`api/quiz/${id}`)
                .then((response) => {
                    console.log(response.data.numberOfQuestions);
                    setTotal(response.data.numberOfQuestions); // set total number of questions to state
                    console.log(image)
                })
                .catch((err) => {
                    console.error("Error fetching quiz:", err);
                });
        } else {
            console.error("id is undefined");
        }
    }, [id]);

    const handleStart = () => {
      console.log(total); // get total number of questions from questionsCount prop
      console.log(id);
        navigate(`/start-quiz/${id}`, {
            state: { totalQuestion: total },
            
        });
    };

    return (
        <Card
            sx={{
                maxWidth: 345,
                margin: "20px auto",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" },
            }}
        >
            <CardMedia
                component="img"
                height="140"
                image={`http://localhost:8000/${image}`}
                alt={name}
                sx={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
            />
            <CardContent>
                <Typography variant="h5" component="div" color="primary" sx={{ fontWeight: "bold" }}>
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: "10px" }}>
                    {description}
                </Typography>
                <Box sx={{ marginTop: "10px", display: "flex", flexDirection: "column" }}>
                    <Typography sx={{ fontWeight: "bold", color: getLevelColor(level), marginBottom: "10px" }}>
                        {level}
                    </Typography>
                    <Typography>Questions: {questionsCount}</Typography>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: "20px" }}
                    onClick={handleStart}
                >
                    Start Quiz
                </Button>
            </CardContent>
        </Card>
    );
};

export default QuizCard;
