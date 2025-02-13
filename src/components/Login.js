import axios  from "axios"
import {useFormik}from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import {useState}from "react"
import {useAuth}from "../context/AuthContext"
import API_BASE_URL from '../config'

const loginValidationSchema=yup.object({
    email:yup.string().required().email(),
    password:yup.string().required().min(8).max(64)
})

export default function Login ({loggedIn}){
    const {dispatch}=useAuth()
    const navigate=useNavigate()
    const [serverErrors,setServerErrors]=useState('')

    const formik=useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validateOnChange:false,
        validationSchema:loginValidationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${API_BASE_URL}/users/login`, values); // Updated URL
                localStorage.setItem("token", response.data.token);
                loggedIn();
                console.log(response.data);
                
                const userResponse = await axios.get(`${API_BASE_URL}/users/account`, { // Updated URL
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });
                
                console.log("userResponse", userResponse.data);
                dispatch({ type: "LOGIN", payload: { account: userResponse.data } });
                
                navigate("/");
            } catch (e) {
                setServerErrors(e.response?.data?.errors || "An error occurred. Please try again.");
            }
        }
    });

    return (
        <div>
           <h1>Login Here</h1>
           {serverErrors && <b>
            {serverErrors}</b>}

            <form onSubmit={formik.handleSubmit}>
                <label>Enter Email</label><br/>
                <input type="text"
                value={formik.values.email}
                name="email"
                onChange={formik.handleChange}/>
                {formik.errors.email}
                <br/>

                <label>Enter Password</label><br/>
                <input type="password"
                value={formik.values.password}
                name="password"
                onChange={formik.handleChange}/>
                {formik.errors.password}
                <br/>
                <input type="submit"/>
            </form>
        </div>
    )
}