import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../context/UserContext';

const ScrumDetails = ({ scrum }) => {
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem('user'));
        if (!loggedInUser) {
            window.location.href = '/login';
        }
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:4000/tasks?scrumId=${scrum.id}`).then(response => {
            setTasks(response.data);
        });
    }, [scrum.id]);

    useEffect(() => {
        if (tasks.length > 0) {
            axios.get('http://localhost:4000/users').then(response => {
                const scrumUsers = response.data.filter(user =>
                    tasks.some(task => String(task.assignedTo) === String(user.id)) 
                );
                setUsers(scrumUsers);
            });
        }
    }, [tasks]);

    const handleStatusChange = (taskId, newStatus) => {
        axios.patch(`http://localhost:4000/tasks/${taskId}`, {
            status: newStatus
        }).then(() => {
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === taskId ? { ...task, status: newStatus } : task
                )
            );
        });
    };

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <h3 className="text-center">{scrum.name} - Scrum Details</h3>
                
                <h4 className="mt-4">Tasks</h4>
                <ul className="list-group">
                    {tasks.map(task => (
                        <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <strong>{task.title}:</strong> {task.description} - <em>{task.status}</em>
                            </div>
                            {user?.role === 'admin' && (
                                <select
                                    className="form-select w-auto"
                                    value={task.status}
                                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                >
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            )}
                        </li>
                    ))}
                </ul>

                <h4 className="mt-4">Users</h4>
                <ul className="list-group">
                    {users.map(user => (
                        <li key={user.id} className="list-group-item">
                            {user.name} ({user.email})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ScrumDetails;
