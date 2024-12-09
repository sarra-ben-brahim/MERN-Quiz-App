// GoogleCallback.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import axios from "../api/axios";

const GoogleCallback = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGoogleData = async () => {
      try {
        // Fetch the user data and token after Google login
        const response = await axios.get("/api/users/google/callback", {
          withCredentials: true,
        });

        const { token, user } = response.data;

        // Call the login function to store user data and token
        login(user.firstName, token, user.role);

        // Redirect to the desired page (e.g., dashboard)
        navigate("/dashboard");
      } catch (err) {
        console.error("Google login failed", err);
      }
    };

    fetchGoogleData();
  }, [login, navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallback;
