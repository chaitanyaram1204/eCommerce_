import './CSS/LoginSignUp.css'
import { useState } from 'react'
const LoginSignUp = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({ username: '', email: '', password: '' })
    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const login = async () => {
        let responseData;
        await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(res => res.json()).then(data => {
            responseData = data;
            console.log(responseData);
        })
        if (responseData.success) {
            console.log(responseData)
            localStorage.setItem('token', responseData.token);
            window.location.replace('/')
            console.log('User created successfully')
        }
        else {
            alert(responseData.errors)
        }
    }
    const signup = async () => {
        let responseData;
        await fetch('http://localhost:5000/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then(res => res.json()).then(data => {
            responseData = data;
            console.log(responseData);
        })
        if (responseData.success) {
            console.log(responseData)
            localStorage.setItem('token', responseData.token);
            window.location.replace('/')
            console.log('User created successfully')
        }
        else {
            alert(responseData.errors)
        }
    }
    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Sign up" && <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' />}
                    <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
                    <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
                </div>
                <button onClick={() => { state === "Login" ? login() : signup() }} >Continue</button>
                {state === "Sign up" && <p className='loginsignup-login'>Already have an account ? <span onClick={() => setState("Login")}>Login Here</span></p>}
                {state === "Login" && <p className='loginsignup-login'>Create an account ? <span onClick={() => setState("Sign up")}>Click Here</span></p>}
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, I agree to the terms of us & privacy policy.</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignUp