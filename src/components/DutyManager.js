import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DutyManager = () => {
    const [duties, setDuties] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [user, setUser] = useState('');

    useEffect(() => {
        fetchDuties();
    }, []);

    const fetchDuties = async () => {
        const response = await axios.get('/api/duties');
        setDuties(response.data);
    };

    const createDuty = async () => {
        if (title && description && user) {
            const newDuty = { title, description, user };
            await axios.post('/api/duties', newDuty);
            fetchDuties();
        }
    };

    return (
        <div>
            <h2>Duty Manager</h2>
            <input
                type="text"
                placeholder="Duty Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Duty Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="User"
                value={user}
                onChange={(e) => setUser(e.target.value)}
            />
            <button onClick={createDuty}>Create Duty</button>
            <div>
                {duties.map((duty) => (
                    <div key={duty.id}>
                        <h3>{duty.title}</h3>
                        <p>{duty.description}</p>
                        <p>{duty.user}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DutyManager;