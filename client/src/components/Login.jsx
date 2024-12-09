import React from "react";
import { AuthContext } from "./context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRef, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Grid2, Link } from '@mui/material';
import { Link as LinkDom, useLocation } from 'react-router-dom';

import axios from '../api/axios';

const LOGIN_URL = '/api/users/login';

const Login = () => {
  const { login } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    emailRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.token;
      const user = response?.data?.user;
      login(user.firstName, accessToken, user.role);
      setEmail('');
      setPassword('');
      navigate(from, { replace: true });
      navigate('/edit-quizz')
      
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      //errRef.current.focus();
    }
  };
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

    <>

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 8,
            padding: 3,
            border: '1px solid #ddd',
            borderRadius: 2,
          }}
        >
          <Typography
            color="primary"
            align="center"
            gutterBottom={true}
            variant="h5"
          >Login</Typography>
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={2}>
              <Grid2 xs={12}>
                <TextField
                  type="text"
                  id="email"
                  ref={emailRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  variant="outlined"
                />
              </Grid2>
              <Grid2 xs={12}>
                <TextField
                  type="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  fullWidth
                  label="Password"
                  name="password"
                />
              </Grid2>
            </Grid2>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              //component={LinkDom}
              //to="/add-quizz"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </form>
          <Typography
            color="primary"
            align="center"
            gutterBottom={true}
            variant="p"
          > Need an Account?

            <Link href="/register" style={{ color: 'blue', textDecoration: 'underline' }}>Sign Up</Link>
            <GoogleLoginButton />
          </Typography>
        </Box>

      </Container>

    </>


  )
};

export default Login;
