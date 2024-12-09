import React, { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import axiosInstance from "../api/axiosInstance";
const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate(); 
    const loginInitialValues = { emai: "", password: "" };
    const loginValidationSchema = yup.object({
        email: yup.string().required("Please provide a username").email("please provide a valid email"),
        password: yup.string()
            .required("Please provide a password")
    });

   
    const registrationInitialValues = { 
        name: "", 
        username: "", 
        email: "", 
        password: "", 
        confirmPassword: "", 
        
    };
    const registrationValidationSchema = yup.object({
        name: yup.string().required("Please provide a name"),
        username: yup.string().required("Please provide a username").min(2,"Minimum 2 letters required"),
        email: yup.string().email("Please provide a valid email").required("Email is required"),
        password: yup.string()
            .required("Please provide a password")
            .min(8, "Password should be at least 8 characters long")
            .matches(/[a-z]/, "Password should contain at least one lowercase letter")
            .matches(/[A-Z]/, "Password should contain at least one uppercase letter")
            .matches(/[0-9]/, "Password should contain at least one number")
            .matches(/[@$!%*?&#_]/, "Password should contain at least one special character"),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required("Please confirm your password")
        
    });

    const loginSubmit = async (values, { resetForm }) => {
        try {
          if(values.email==="shanasafeeer159@gmail.com" && values.password==="Admin123")
          {
            toast.success("Admin login successfully complited")
           // localStorage.setItem("name","Shana")
            navigate("/admin")
            localStorage.setItem("id", 1);
                localStorage.setItem("name", 'admin');
          }
          else{
            const response = await axios.get('http://localhost:5000/users', {
                params: {
                    email: values.email,
                    password: values.password
                }
            });

            console.log("Login response data:", response.data); 

            if (response.data.length > 0 ) {
                if(!response.data[0].status)
                {
                    toast.error("you are blocked")
                    return
                }
                toast.success("Login successful!");
                resetForm();
                localStorage.setItem("id", response.data[0].id);
                localStorage.setItem("name", response.data[0].name);
                navigate("/");
                 
            }
            else {
                toast.error("Invalid username or password");
            }
        }}
        catch (error) {
            console.error("Error during login", error);
            toast.error("An error occurred during login. Please try again.");
        }
    
    };

    const registrationSubmit = async (values, { resetForm }) => {
        try {
            const response = await axiosInstance.post("/user/register", values); 
            toast.success("Registration successful");
            resetForm();
        }
        catch (error) {
            console.error("Registration failed:", error.response?.data || error.message);
            toast.error("Registration failed. Please try again.");
          }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="col-md-4 p-4 border rounded shadow">
              
                <div className="d-flex mb-4 gap-2">
                    <button 
                        type="button" 
                        onClick={() => setIsLogin(true)} 
                        className={`flex-fill btn ${isLogin ? 'btn-primary' : 'btn-light'}`}
                    >
                        Login
                    </button>
                    <button 
                        type="button" 
                        onClick={() => setIsLogin(false)} 
                        className={`flex-fill btn ${!isLogin ? 'btn-primary' : 'btn-light'}`}
                    >
                        Registration
                    </button>
                </div>
                <Toaster/>
               
                {isLogin ? (
                    <Formik
                        initialValues={loginInitialValues}
                        validationSchema={loginValidationSchema}
                        onSubmit={loginSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <Field 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        className="form-control"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <Field 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        className="form-control"
                                    />
                                    
                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                    className="btn btn-success w-50 mx-auto d-flex justify-content-center align-items-center"
                                >
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </button>
                               
                            </Form>
                        )}
                    </Formik>
                ) : (
                    <Formik
                        initialValues={registrationInitialValues}
                        validationSchema={registrationValidationSchema}
                        onSubmit={registrationSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <Field 
                                        type="text" 
                                        name="name" 
                                        id="name" 
                                        className="form-control"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <Field 
                                        type="text" 
                                        name="username" 
                                        id="username" 
                                        className="form-control"
                                    />
                                    <ErrorMessage name="username" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <Field 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        className="form-control"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <Field 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        className="form-control"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-danger" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <Field 
                                        type="password" 
                                        name="confirmPassword" 
                                        id="confirmPassword" 
                                        className="form-control"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isSubmitting} 
                                   className="btn btn-success w-50 mx-auto d-flex justify-content-center align-items-center"
                                >
                                    {isSubmitting ? 'Registering...' : 'Register'}
                                </button>
                              
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    );
};

export default Login;
