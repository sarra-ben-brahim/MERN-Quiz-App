import { useNavigate } from "react-router-dom"
import { Box, Typography, Container } from '@mui/material';


const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

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
                align="center"
                gutterBottom={true}
                variant="h5">
                Unauthorized !!
                You do not have access to the requested page.
            </Typography>
        </Box>
        </Container>
        </>
    )
}

export default Unauthorized