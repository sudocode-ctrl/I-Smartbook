import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = (props) => {
    var pass
    var cpassword;
    // const showAlert = props;
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (pass === cpassword) {
            try {
                const { name, email, password } = credentials;
                const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                    method: "POST", // *GET, POST, PUT, DELETE, etc.

                    headers: {
                        "Content-Type": "application/json",

                    },
                    body: JSON.stringify({ name, email, password }),
                });
                const json = await response.json()
                if (json.success) {
                    localStorage.setItem("token", json.authtoken)
                    setCredentials({ name: "", email: "", password: "", cpassword: "" })
                    props.showAlert("Account created successfully", "success");
                    // alert("Account created successfully");
                }
                else {
                    props.showAlert("Invalid Credentials", "danger");
                    // alert("Invalid Credentials");
                }
                console.log(json)

            } catch (error) {
                console.log(error)
            }
        }
        else {
            alert("Password and Confirm password should be same")
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container mt-3">
            <h2 className='m-3  text-center'>Create an account to use i-Smartbook</h2>
            <form className='addnote mx-auto ' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" required />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label" >Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5} required />
                    <div className="text-danger">
                        {credentials.password !== credentials.cpassword ?
                            "Password and confirm password does not match" : <span className='text-success'>Password and confirm password matched</span>}
                    </div>
                </div>

                <button disabled={credentials.password != credentials.cpassword} type="submit" className="btn btn-primary">Submit</button>

                <div className="logintext">
                    Already have account?
                    <Link className='loginlink' to='/login'> Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup