import axios from 'axios';

const LOGIN_URL = 'http://localhost:8000/api/users/login';
export const login = async (email, password) => {
    try {

        const response = await axios.post(LOGIN_URL,
            { email: email, password: password },
            { headers: { 'Content-Type': 'application/json' } , withCredentials: true});

        // Extract token from response
        const token = response.data.token;



        // Save token (e.g., localStorage)
        localStorage.setItem('accessToken', token);

        console.log('Token saved:', localStorage.getItem('accessToken'));


        console.log('Login successful, token:', token);
        return token;
        
    } catch (error) {
        console.error('Error logging in:', error.response?.data || error.message);
        throw error;
    }

    /*} catch (err) {
    if (!err?.response) {
        setErrMsg('No Server Response');
    } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
    } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
    } else {
        setErrMsg('Login Failed');
    }
    };*/

}
