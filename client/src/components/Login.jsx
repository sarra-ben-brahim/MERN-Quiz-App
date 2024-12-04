import React from "react";
import { AuthContext } from "./context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // simulation login
    if (username === "user" && password === "password") {
      const token = "fake-jwt-token";
      login(username, token);
      navigate("/quizzes");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h4>just for testing user = user password password</h4>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
