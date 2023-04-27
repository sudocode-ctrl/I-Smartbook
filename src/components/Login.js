import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './components.css'


const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.

            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            localStorage.setItem("ismtoken", json.authToken)
            localStorage.setItem("ismname", json.name)
            props.showAlert("Logged in successfully", "success");

            navigate("/")

        }
        else {
            props.showAlert("invalid credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="">
            <div className='mt-0 pt-3'>
                <h2 className='text-center'>Login to your i-Smartbook account</h2>
                <form className='addnote mx-auto' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label ">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" id="password" value={credentials.password} onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-primary" >Submit</button>

                    <div className="signuptext">
                        Do not have account?
                        <Link to="/signup" className='signuplink'> Signup</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login