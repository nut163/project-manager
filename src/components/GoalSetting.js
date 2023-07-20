import React, { useState } from 'react';
import axios from 'axios';

const GoalSetting = () => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const handlePriorityChange = (event) => {
        setPriority(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const goal = {
            title: title,
            priority: priority
        }

        axios.post('/api/goals', goal)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div>
            <h2>Create a Goal</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={handleTitleChange} />
                </label>
                <label>
                    Priority:
                    <input type="text" value={priority} onChange={handlePriorityChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default GoalSetting;