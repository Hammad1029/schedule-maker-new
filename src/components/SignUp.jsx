import React from 'react';
import {
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
} from '@mui/material';
import httpService, { endpoints } from '../utils/http';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const signUpSchema = Yup.object({
    erp: Yup.string().min(5).max(5).required('ERP is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    program: Yup.string().required('Programme is required'),
    semester: Yup.number().min(1).max(8).required('Semester is required'),
}).required();

const SignUp = () => {
    const handleSubmit = async (values) => {
        try {
            const response = await httpService({
                endpoint: endpoints.auth.signUp,
                description: "Please login now",
                base: endpoints.auth.base,
                reqBody: values,
                successNotif: true,
                description: "Please sign in now"
            });
            if(response)formik.resetForm()
        } catch (e) {
            console.error(e)
        }
    };

    const formik = useFormik({
        initialValues: {
            erp: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            program: "",
            semester: 0
        },
        validationSchema: signUpSchema,
        onSubmit: handleSubmit
    });

    const getErrorProps = (name) => ({
        error: formik.touched[name] && Boolean(formik.errors[name]),
        helperText: formik.touched[name] && formik.errors[name]
    })

    const programmes = ["BBA", "BSCS", "BSACF", "BSECON", "BSE&M", "BSMATH"]

    return (
        <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        {...getErrorProps("firstName")}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        {...getErrorProps("lastName")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="text"
                        label="ERP"
                        name="erp"
                        value={formik.values.erp}
                        onChange={formik.handleChange}
                        {...getErrorProps("erp")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="password"
                        label="Password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        {...getErrorProps("password")}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        type="password"
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        {...getErrorProps("confirmPassword")}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel id="program-label">Program</InputLabel>
                        <Select
                            labelId="program-label"
                            fullWidth
                            name="program"
                            value={formik.values.program}
                            onChange={formik.handleChange}
                            {...getErrorProps("program")}
                        >
                            {programmes.map(i => <MenuItem value={i} key={i}>{i}</MenuItem>)}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Semester"
                        name="semester"
                        value={formik.values.semester}
                        onChange={formik.handleChange}
                        select
                        {...getErrorProps("semester")}
                    >
                        {[...Array(8).keys()].map((sem) => (
                            <MenuItem key={sem + 1} value={(sem + 1).toString()}>
                                Semester {sem + 1}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <Grid xs={12} sx={{ mt: 1 }}>
                <Button variant="contained" fullWidth type="submit" >
                    Sign Up
                </Button>
            </Grid>
        </Box >
    );
};

export default SignUp;