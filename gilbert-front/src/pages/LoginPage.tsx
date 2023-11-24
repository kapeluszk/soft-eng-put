import React from 'react'
import '../index.css'
import { Link } from 'react-router-dom';

const LoginPage = () => {
    return (
        <div className='dark-background'>
            <div>
                LoginPage
            </div>
            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default LoginPage;