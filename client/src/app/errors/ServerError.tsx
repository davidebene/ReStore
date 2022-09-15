import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation, useNavigate } from 'react-router-dom';

export default function ServerError() {
    const navigate = useNavigate();
    const { state } = useLocation();
    console.log(state);
    return(
        <Container component={Paper}>
            {state ? (
                <>
                    <Typography variant="h3" color='error' gutterBottom>Server error</Typography>
                    <Divider />
                </>
            ) : (
                <Typography variant="h5" gutterBottom>Server error</Typography>
            )}
            <Button onClick={() => navigate('/catalog')}>Go back to the store</Button>
        </Container>
    )
}