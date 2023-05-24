import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "",cpassword:"",name:"" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
       const {name,email,password} = credentials
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email,password,name})
        });
        const json = await response.json()
        console.log(json);
        if(json.success){
            //Save the auth token and redirect 
            localStorage.setItem('token',json.authtoken)
            navigate('/');
            props.showAlert("Account created Successfully ","success")
        }else{
            props.showAlert("Invalid credential","danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='mt-2'>
            <h2 className='my-2'>Create an account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className='my-2'>Name</label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className='my-2'>Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className='my-2'>Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={5} required />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword" className='my-2'>Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
    )
}

export default Signup
