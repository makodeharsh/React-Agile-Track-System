import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ScrumDetails from '../Scrum Details/ScrumDetails';
import { UserContext } from '../../context/UserContext';

const Dashboard = () => {
    const [scrums, setScrums] = useState([]);
    const [selectedScrum, setSelectedScrum] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To Do');
    const [assignedTo, setAssignedTo] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        axios.get('http://localhost:4000/scrums').then((response) => setScrums(response.data));
        axios.get('http://localhost:4000/users').then((response) => setUsers(response.data));
    }, []);

    const handleGetDetails = (scrumId) => {
        axios.get(`http://localhost:4000/scrums/${scrumId}`).then((response) => setSelectedScrum(response.data));
    };

    const handleAddScrum = (event) => {
        event.preventDefault();

        const newScrum = { name };
        axios.post('http://localhost:4000/scrums', newScrum).then((scrumResponse) => {
            const scrumId = scrumResponse.data.id;

            const newTask = {
                title,
                description,
                status,
                scrumId,
                assignedTo,
                history: [{ status, date: new Date().toISOString().split('T')[0] }],
            };

            axios.post('http://localhost:4000/tasks', newTask).then(() => {
                axios.get('http://localhost:4000/scrums').then((updatedScrums) => setScrums(updatedScrums.data));
            });
        });

        setShowForm(false);
        setName('');
        setTitle('');
        setDescription('');
        setStatus('To Do');
        setAssignedTo('');
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Scrum Teams</h2>
            <hr/>
            {user?.role === 'admin' && (
                <div>
                    <div className="text-center mb-4">
                        <button className="btn btn-primary text-center" onClick={() => setShowForm(!showForm)}>
                            {showForm ? 'Cancel' : 'Add New Scrum'}
                        </button>
                    </div>
                    {showForm && (
                        <form onSubmit={handleAddScrum} className="mt-3 p-3 border rounded shadow-sm">
                            <div className="mb-3">
                                <label className="form-label">Scrum Name:</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Task Title:</label>
                                <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Task Description:</label>
                                <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Task Status:</label>
                                <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)} required>
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Assign To:</label>
                                <select className="form-select" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} required>
                                    <option value="">Select a user</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name} ({user.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-success w-100">Create Scrum</button>
                        </form>
                    )}
                </div>
            )}<br/>
            <ul className="list-group">
                {scrums.map((scrum) => (
                    <li key={scrum.id} className="list-group-item d-flex justify-content-between align-items-center">
                        {scrum.name}
                        <button className="btn btn-outline-primary btn-sm" onClick={() => handleGetDetails(scrum.id)}>Get Details</button>
                    </li>
                ))}
            </ul>
            {selectedScrum && <ScrumDetails scrum={selectedScrum} />}
        </div>
    );
};

export default Dashboard;
