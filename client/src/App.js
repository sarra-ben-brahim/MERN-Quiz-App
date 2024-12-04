import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const App = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const testAuthenticate = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/authenticate", {
        withCredentials: true,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const testProfile = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const testAdmin = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await axios.get("http://localhost:5000/api/users/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Auth0 React Integration</h1>
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Login</button>
      ) : (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
          <button onClick={testAuthenticate}>Test Authenticate</button>
          <button onClick={testProfile}>Test Profile</button>
          <button onClick={testAdmin}>Test Admin</button>
        </>
      )}
    </div>
  );
};

export default App;
