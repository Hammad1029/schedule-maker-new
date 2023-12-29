import React, { useState } from 'react';
import { Container, Typography, TextField, Button, CssBaseline, Box } from '@mui/material';
import { styled } from '@mui/system';
import httpService from '../utils/http.js';
import { endpoints } from '../utils/http.js';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/reducers/user';

const Form = styled('form')({
    width: '100%',
    marginTop: (theme) => theme.spacing(1),
});

const SubmitButton = styled(Button)({
    margin: (theme) => theme.spacing(3, 0, 2),
});

const LoginForm = ({ closeModal }) => {
    const [erp, setErp] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await httpService({
                endpoint: endpoints.auth.login,
                base: endpoints.auth.base,
                reqBody: { erp, password },
                successNotif: true
            });

            if (response) {
                dispatch(loginUser({ token: response.token, userDetails: response.userDetails }));
                closeModal()
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box>
            <Form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="erp"
                    label="ERP"
                    name="erp"
                    autoComplete="erp"
                    autoFocus
                    value={erp}
                    onChange={(e) => setErp(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <SubmitButton type="submit" fullWidth variant="contained" color="primary">
                    Sign In
                </SubmitButton>
            </Form>
        </Box>
    );
};

export default LoginForm;