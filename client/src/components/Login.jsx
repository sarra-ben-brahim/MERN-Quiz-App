import { useRef, useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Grid2, Link } from '@mui/material';
import { Link as LinkDom, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from './hooks/useAuth';

const LOGIN_URL = '/api/users/login';

const Login = () => {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const user = response?.data?.user;
            setAuth({ user, pwd, accessToken });
            setEmail('');
            setPwd('');
            navigate(from, {replace : true});
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

    }

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
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
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
                    </Typography>
                </Box>

            </Container>

        </>


    )
}

export default Login