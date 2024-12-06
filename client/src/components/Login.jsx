import { useRef, useState, useEffect, useContext } from 'react';
import { login } from '../api/login';
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Container, Typography, Box, Grid2 } from '@mui/material';
import { Link } from 'react-router-dom';



const Login = () => {
    const navigate = useNavigate()

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = await login(email, pwd);
            console.log('Token received:', token);
            errRef.current.focus();
            navigate('/add-quizz');

        } catch (err) {
            console.error('Login failed');
        }
    }

    return (
        <>
            {success ? (
                <Container>
                    <Typography variant="h5">You are logged in!</Typography>

                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </Container>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
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
                                    component={Link}
                                    to="/main"
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

                                <Link href="/signUp" style={{ color: 'blue', textDecoration: 'underline' }}>Sign Up</Link>
                            </Typography>
                        </Box>

                    </Container>

                    <p>

                    </p>
                </section>
            )}
        </>
    )
}

export default Login