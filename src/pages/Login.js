import React, { useState } from 'react';
import { Container, Typography, TextField, Button, CssBaseline } from '@mui/material';
import { styled } from '@mui/system';
import httpService from '../utils/http.js';
import { endpoints } from '../utils/http.js';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/reducers/user';
import { useNavigate } from "react-router-dom";

const CenteredContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh', // This ensures the container takes the full height of the viewport
});

const Form = styled('form')({
  width: '100%',
  marginTop: (theme) => theme.spacing(1),
});

const SubmitButton = styled(Button)({
  margin: (theme) => theme.spacing(3, 0, 2),
});

const LargerHeading = styled(Typography)({
    fontSize: '2.5rem', // Adjust the font size as needed
  });

const LoginForm = () => {
  const [erp, setErp] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    try {
        const response = await httpService({
          endpoint: endpoints.auth.login,
          base: endpoints.auth.base,
          reqBody: { erp, password },
          successNotif: true
        });
  
        if (response) {
          // Dispatch the token to the Redux store
          dispatch(loginUser({ token: response.token, userDetails: response.userDetails }));

        }
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <CenteredContainer component="main" maxWidth="xs">
      <CssBaseline />
      <div>
      <LargerHeading variant="h4" align="center">
          Login
        </LargerHeading>
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
      </div>
    </CenteredContainer>
  );
};

export default LoginForm;
