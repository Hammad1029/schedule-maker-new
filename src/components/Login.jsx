import React from 'react';
import {  TextField, Button, Box, Grid } from '@mui/material';
import httpService from '../utils/http.js';
import { endpoints } from '../utils/http.js';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/reducers/user';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const loginSchema = Yup.object({
    erp: Yup.string().min(5).max(5).required('ERP is required'),
    password: Yup.string().required('Password is required'),
}).required();


const LoginForm = ({ closeModal }) => {
    const dispatch = useDispatch();

    const handleSubmit = async (values) => {
        try {
            const response = await httpService({
                endpoint: endpoints.auth.login,
                base: endpoints.auth.base,
                reqBody: values,
                successNotif: true
            });

            if (response) {
                dispatch(loginUser({ token: response.token, userDetails: response.userDetails }));
                closeModal()
            }
        } catch (e) {
            console.error(e);
        }
    };

    const formik = useFormik({
        initialValues: {
            erp: "",
            password: "",
        },
        validationSchema: loginSchema,
        onSubmit: handleSubmit
    });

    const getErrorProps = (name) => ({
        error: formik.touched[name] && Boolean(formik.errors[name]),
        helperText: formik.touched[name] && formik.errors[name]
    })


    return (
        <Box component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
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
                <Grid xs={12} sx={{ mt: 1 }}>
                    <Button variant="contained" fullWidth type="submit" >
                        Sign In
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginForm;