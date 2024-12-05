import React from "react";

const App = () => {
  const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
      window.location.href = "http://localhost:8000/api/users/google";
    };

    return (
      <button onClick={handleGoogleLogin}>
        Login with Google
      </button>
    );
  };

  return (
    <div>
      <h1>Welcome to the Quiz App</h1>
      <GoogleLoginButton />
    </div>
  );
};


export default App;