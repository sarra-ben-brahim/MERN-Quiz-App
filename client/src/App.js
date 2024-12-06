import React, { useContext } from "react";
import { AuthProvider, AuthContext } from "./components/context/AuthContext";
import ProtectedRoute from "./components/context/ProtectedRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import CreateQuizz from "./components/CreateQuizz"
import UpdateQuizz from "./components/UpdateQuizz"
import Navbar from "./components/Navbar";
import Main from "./components/Main";

import { Navigate, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <Routes>
      <Route path="/add-quizz" element={<CreateQuizz />} />
      <Route path="/edit-quizz" element={<UpdateQuizz />} />
    </Routes>

  )
}

/* return (
   <AuthProvider>
     <Navbar />
     <MainRoutes />
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
     <Route path="/login" element={<Login />} />
     <Route
       path="/main"
       element={
         <ProtectedRoute>
           <Main>
             
           </Main>
         </ProtectedRoute>
       }
     />
     <Route
       path="/add-quizz"
       element={
         <ProtectedRoute>
           <CreateQuizz />
         </ProtectedRoute>
       }
     />
     <Route
       path="/edit-quiz"
       element={
         <ProtectedRoute>
           <UpdateQuizz />
         </ProtectedRoute>
       }
     />
     <Route path="*" element={<Navigate to="/" />} />
   </Routes>
 );
};*/

export default App;