import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    CssBaseline,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from '@mui/material';
import { styled } from '@mui/system';
import httpService, { endpoints } from '../utils/http';
import { NotificationManager } from 'react-notifications';
import * as Yup from 'yup';

const CenteredContainer = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
});

const Form = styled('form')({
    width: '100%',
    marginTop: (theme) => theme.spacing(3),
    marginBottom: (theme) => theme.spacing(3),
});

const SubmitButton = styled(Button)({
    margin: (theme) => theme.spacing(3, 0, 2),
});

const signUpSchema = Yup.object({
    erp: Yup.string().required('ERP is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    program: Yup.string().required('Programme is required'),
    semester: Yup.number().min(1).max(8).required('Semester is required'),
}).required();

const SignUp = () => {
    const [erp, setErp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [program, setProgram] = useState('');
    const [semester, setSemester] = useState('');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // Validate with Yup schema
            await signUpSchema.validate(
                {
                    erp,
                    password,
                    confirmPassword,
                    firstName,
                    lastName,
                    program,
                    semester,
                },
                { abortEarly: false }
            ); // abortEarly: false will validate all fields and return all errors

            // Check if passwords match
            if (password !== confirmPassword) {
                NotificationManager.warning('Passwords do not match', 'Validation Error');
                return;
            }

            const response = await httpService({
                endpoint: endpoints.auth.signUp,
                description: "Please login now",
                base: endpoints.auth.base,
                reqBody: {
                    erp,
                    password,
                    firstName,
                    lastName,
                    program,
                    semester,
                },
                successNotif: true,
            });

        } catch (error) {
            console.error(error);

            // Display Yup validation errors
            if (error.name === 'ValidationError') {
                error.errors.forEach((errMsg) => {
                    NotificationManager.warning(errMsg, 'Validation Error');
                });
            }
        }
    };

    return (
        <Box>
            <Form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="First Name"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Last Name"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            type="text" // Corrected from "erp"
                            label="ERP"
                            name="erp"
                            value={erp}
                            onChange={(e) => setErp(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            type="password"
                            label="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            type="password"
                            label="Confirm Password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="program-label">Program</InputLabel>
                            <Select
                                labelId="program-label"
                                required
                                fullWidth
                                name="program"
                                value={program}
                                onChange={(e) => setProgram(e.target.value)}
                            >
                                <MenuItem value="Engineering">Engineering</MenuItem>
                                <MenuItem value="Computer Science">Computer Science</MenuItem>
                                {/* Add more program options as needed */}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="Semester"
                            name="semester"
                            value={semester}
                            onChange={(e) => setSemester(e.target.value)}
                            select // Added select
                        >
                            {/* Options for the dropdown */}
                            {[...Array(8).keys()].map((sem) => (
                                <MenuItem key={sem + 1} value={(sem + 1).toString()}>
                                    Semester {sem + 1}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
                <SubmitButton type="submit" fullWidth variant="contained" color="primary">
                    Sign Up
                </SubmitButton>
            </Form>
        </Box>
    );
};

export default SignUp;