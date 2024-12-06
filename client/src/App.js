// App.js
import { Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import React, { useContext } from "react";
import Login from "./components/Login";
import { AuthProvider, AuthContext } from "./components/context/AuthContext";
import Register from "./components/Register";
import ProtectedRoute from "./components/context/ProtectedRoute";
import Stats from "./components/Stats";
import QuizList from "./components/quizzes/QuizList";
import Main from "./components/Main";
import StartQuiz from "./components/quizzes/StartQuiz";
import { QuizProvider } from "./components/context/QuizContext";
import Results from "./components/quizzes/Results";

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Navbar />
        <MainRoutes />
      </QuizProvider>
    </AuthProvider>
  );
}

const MainRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/main" /> : <Login />}
      />
      <Route path="/register" element={<Register />} />
      <Route
        path="/main"
        element={
          <ProtectedRoute>
            <Main>
              <QuizList />
            </Main>
          </ProtectedRoute>
        }
      />
      <Route
        path="/stats"
        element={
          <ProtectedRoute>
            <Stats />
          </ProtectedRoute>
        }
      />
      <Route
        path="/start-quiz/:id"
        element={
          <ProtectedRoute>
            <StartQuiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
