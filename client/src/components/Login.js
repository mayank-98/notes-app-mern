import React, { useState } from 'react';
import axios from 'axios';

function Login({ setIsLogin }) {

    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [err, setErr] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        setErr('');
    }

    const registerSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/user/register', {
                username: user.name,
                email: user.email,
                password: user.password
            });
            setUser({ name: '', email: '', password: '' });
            setErr(res.data.msg);
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
            setUser({ name: '', email: '', password: '' });
            alert(err.response.data.msg);
        }
    }

    const loginSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/user/login', {
                email: user.email,
                password: user.password
            });
            setUser({ email: '', password: '' });
            localStorage.setItem('tokenStore', res.data.token);
            setIsLogin(true);
            setErr(res.data.msg);
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
            alert(err.response.data.msg);
        }
    }

    const [onLogin, setOnLogin] = useState(false);
    const style = {
        visibility: onLogin ? "visible" : "hidden",
        opacity: onLogin ? 1 : 0
    }

    return (
        <section className="login-page" >
            <div className="login create-note">
                <h2>Login</h2>
                <form onSubmit={loginSubmit}>
                    <input type="email" name="email" id="login-email"
                        placeholder="Email" required value={user.email} onChange={handleChange} />

                    <input type="password" name="password" id="login-password"
                        placeholder="Password" required value={user.password}
                        autoComplete="true" onChange={handleChange} />

                    <button type="submit" >Login</button>
                    <p>Don't have an acoount? <span onClick={() => { setOnLogin(true); setErr('') }} >Register Now</span></p>
                    <h3>{err}</h3>
                </form>
            </div>
            <div className="register create-note" style={style}>
                <h2>Register</h2>
                <form onSubmit={registerSubmit}>
                    <input type="text" name="name" id="register-name"
                        placeholder="Username" required value={user.name} onChange={handleChange} />

                    <input type="email" name="email" id="register-email"
                        placeholder="Email" onChange={handleChange} required value={user.email} />

                    <input type="password" name="password" id="register-password"
                        placeholder="Password" required value={user.password}
                        autoComplete="true" onChange={handleChange} />

                    <button type="submit" >Register</button>
                    <p>Already have an acoount? <span onClick={() => { setOnLogin(false); setErr('') }} >Login Now</span></p>
                    <h3>{err}</h3>
                </form>
            </div>
        </section>
    )
}

export default Login
