import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Grid,
  Divider
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";

const Stats = () => {
  const { token } = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error("User ID not found in localStorage");
        }
        console.log(`Fetching results for userId: ${userId}`);
        const response = await axios.get(
          `http://localhost:8000/api/quiz-results/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log('Response:', response.data);
        setResults(response.data);
      } catch (err) {
        console.error("Error fetching quiz results:", err);
        setError("Error fetching quiz results");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [token]);

  const handleDelete = async (resultId) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/quiz-results/user/${resultId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setResults(results.filter(result => result._id !== resultId));
    } catch (err) {
      console.error("Error deleting quiz result:", err);
      setError("Error deleting quiz result");
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 4, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}
      >
        Your Quiz Results
      </Typography>

      {results.length === 0 ? (
        <Typography variant="h6" color="textSecondary" align="center">
          No quiz results yet. Start taking quizzes to see your results here!
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {results.map((result) => (
            <Grid item xs={12} sm={6} md={4} key={result._id}>
              <Card
                sx={{
                  borderRadius: 2,
                  boxShadow: 3,
                  backgroundColor: "white",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", mb: 1, color: "primary.main" }}
                  >
                    {result.quizName}
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Score:</strong> {result.score} /{" "}
                    {result.totalQuestions * 10}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Total Questions:</strong> {result.totalQuestions}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      mt: 3,
                    }}
                  >
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(result._id)}
                      sx={{
                        color: "error.main",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Stats;