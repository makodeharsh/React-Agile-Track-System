import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(UserContext);

    const handleLogin = (event) => {
        event.preventDefault();
        
        axios.get(`http://localhost:4000/users?email=${email}&password=${password}`)
            .then((resp) => {
                if (resp.data.length > 0) {
                    const user = resp.data[0];
                    login(user);
                    navigate('/');
                } else {
                    alert('Invalid email or password');
                }
            })
            .catch((error) => {
                console.error('Error while logging...', error);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow p-4" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleLogin}>
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
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <button className="btn btn-link mt-3 w-100" onClick={() => navigate('/signup')}>
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default Login;
