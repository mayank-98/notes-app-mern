import React from 'react';
import { Link } from 'react-router-dom';

function Nav({ setIsLogin }) {

    const logoutSubmit = () => {
        localStorage.clear();
        setIsLogin(false);
    }
    return (
        <header>
            <div className="logo">
                <h1><Link to="/">MyNotes</Link></h1>
            </div>
            <ul>
                <li><Link className="link" to="/">Home</Link></li>
                <li><Link className="link" to="/create">Create New Note</Link></li>
                <li onClick={logoutSubmit}><Link className="link" to="/">Logout</Link></li>
            </ul>
        </header>
    )
}

export default Nav
