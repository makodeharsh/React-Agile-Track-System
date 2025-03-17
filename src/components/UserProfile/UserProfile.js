import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

const UserProfile = () => {
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [newUserRole, setNewUserRole] = useState('employee');
    const { user } = useContext(UserContext);

    useEffect(() => {
        axios.get('http://localhost:4000/users')
            .then(resp => {
                if (user?.role === 'admin') {
                    setUsers(resp.data.filter(user => user?.role !== 'admin'));
                }
                else {
                    setSelectedUser(user);
                    fetchTasks(user?.id);
                }
            });
    }, [user]);

    const fetchTasks = (userId) => {
        axios.get(`http://localhost:4000/tasks?assignedTo=${userId}`)
            .then(resp => setTasks(resp.data));
    };

    const handleAddUser = (event) => {
        event.preventDefault();

        const payload = {
            name: newUserName,
            email: newUserEmail,
            password: newUserPassword,
            role: newUserRole,
        };

        axios.post('http://localhost:4000/users', payload)
            .then(() => {
                axios.get('http://localhost:4000/users')
                    .then(newUser => {
                        setUsers(newUser.data.filter(user => user?.role !== 'admin'));
                        setShowForm(false);
                        setNewUserName('');
                        setNewUserEmail('');
                        setNewUserPassword('');
                        setNewUserRole('employee');
                    });
            });
    };

    const handleGetHistory = (userId) => {
        setSelectedUser(users.find(user => user?.id === userId));
        fetchTasks(userId);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">User Profiles</h2>
            <hr/>
            {user?.role === 'admin' && (
                <div>
                    <div className="text-center mb-4">
                        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                            {showForm ? 'Cancel' : 'Add New User'}
                        </button>
                    </div>
                    
                    {showForm && (
                        <form onSubmit={handleAddUser} className="p-3 border rounded shadow-sm">
                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input type="text" className="form-control" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email:</label>
                                <input type="email" className="form-control" value={newUserEmail} onChange={(e) => setNewUserEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password:</label>
                                <input type="password" className="form-control" value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Role:</label>
                                <select className="form-select" value={newUserRole} onChange={(e) => setNewUserRole(e.target.value)}>
                                    <option value="admin">Admin</option>
                                    <option value="employee">Employee</option>
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success w-100">Create User</button>
                        </form>
                    )}

                    <ul className="list-group mt-3">
                        {users.map(user => (
                            <li key={user?.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>Name:</strong> {user?.name} <br />
                                    <strong>Email:</strong> {user?.email}
                                </div>
                                <button className="btn btn-outline-primary btn-sm" onClick={() => handleGetHistory(user?.id)}>Get History</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {user?.role !== 'admin' && (
                <div className="mt-4">
                    <h3>Tasks worked by {user?.name}</h3>
                    <ul className="list-group">
                        {tasks.map(task => (
                            <li key={task.id} className="list-group-item">
                                <strong>Title:</strong> {task.title} <br />
                                <strong>Description:</strong> {task.description} <br />
                                <strong>Status:</strong> {task.status}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {selectedUser && user?.role === 'admin' && (
                <div className="mt-4">
                    <h3>Tasks Worked By {selectedUser.name}</h3>
                    <ul className="list-group">
                        {tasks.map(task => (
                            <li key={task.id} className="list-group-item">
                                <strong>Title:</strong> {task.title} <br />
                                <strong>Description:</strong> {task.description} <br />
                                <strong>Status:</strong> {task.status}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
