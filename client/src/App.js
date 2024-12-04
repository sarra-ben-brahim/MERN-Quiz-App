import React from "react";

const App = () => {
  const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
      window.location.href = "http://localhost:8000/api/users/google";
    };

    return (
      <button onClick={handleGoogleLogin} style={styles.button}>
        Login with Google
      </button>
    );
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to the Quiz App</h1>
      <GoogleLoginButton />
    </div>
  );
};

// Styling for the button and container
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4285F4",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default App;