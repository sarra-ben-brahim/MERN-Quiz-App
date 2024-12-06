import React from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import CreateQuizz from "./components/CreateQuizz"
import UpdateQuizz from "./components/UpdateQuizz"
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <Routes>      
        {/* public routes */}
        <Route path="/signIn" element={<Login />} />
        <Route path="/signUp" element={<Register />} />
        <Route path="/add-quizz" element={<CreateQuizz />} />
        <Route path="/edit-quizz" element={<UpdateQuizz />} />

    </Routes>
  );
}

export default App;