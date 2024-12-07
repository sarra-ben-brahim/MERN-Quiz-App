import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import CreateQuizz from "./components/CreateQuizz"
import UpdateQuizz from "./components/UpdateQuizz"
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes*/}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        {/*<Route element={<RequireAuth allowedRole={'admin'} />}>*/}
          <Route path="/add-quizz" element={<CreateQuizz />} />
          <Route path="/edit-quizz" element={<UpdateQuizz />} />
        {/*</Route>*/}

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );

  /*return (
    <Routes>
      <Route path="/add-quizz" element={<CreateQuizz />} />
      <Route path="/edit-quizz" element={<UpdateQuizz />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>

  )*/
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