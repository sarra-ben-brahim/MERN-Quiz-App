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
import CreateQuiz from "./components/admin/CreateQuiz";
import UpdateQuiz from "./components/admin/UpdateQuiz";
import RequireAuth from "./components/RequireAuth";
import Dashboard from "./components/admin/Dashboard";

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
      >
      </Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-quiz" element={<CreateQuiz />} />
      <Route path="/dashboard/edit-quiz/:id" element={<UpdateQuiz />} />

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
      {/* we want to protect these routes */}
      <Route element={<RequireAuth allowedRole='admin' />}>
        <Route
          path="/add-quiz"
          element={
            <ProtectedRoute>
              <CreateQuiz />
            </ProtectedRoute>
          }
        />

      </Route>
      <Route
        path="/stats"
        element={
          <ProtectedRoute>
            <Stats />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />


      <Route
        path="/edit-quiz"
        element={
          <ProtectedRoute>
            <UpdateQuiz />
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
        path="/results/:id"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default App;
