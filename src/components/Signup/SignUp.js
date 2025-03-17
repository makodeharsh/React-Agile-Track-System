import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = (event) => {
        event.preventDefault();

        const payload = {
            name: name,
            email: email,
            password: password,
            role: 'employee'
        };

        axios.post('http://localhost:4000/users', payload)
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.error('Error while signing up...', error);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Sign Up</h2>
                <form onSubmit={handleSignUp}>
                    <div className="mb-3">
                        <label className="form-label">Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                </form>
                <button className="btn btn-link mt-3 w-100" onClick={() => navigate('/login')}>
                    Already have an account? Login
                </button>
            </div>
        </div>
    );
};

export default SignUp;
