import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectBrowser = () => {
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [projectCategory, setProjectCategory] = useState('');
    const [teamMembers, setTeamMembers] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const response = await axios.get('/api/projects');
        setProjects(response.data);
    };

    const createProject = async () => {
        if (projects.length >= 5) {
            alert('Free users are limited to 5 projects');
            return;
        }

        const newProject = {
            name: projectName,
            category: projectCategory,
            teamMembers: teamMembers.split(',').map(member => member.trim()),
        };

        await axios.post('/api/projects', newProject);
        fetchProjects();
    };

    return (
        <div>
            <h2>Project Browser</h2>
            <div>
                <input
                    type="text"
                    placeholder="Project Name"
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Project Category"
                    value={projectCategory}
                    onChange={e => setProjectCategory(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Team Members (comma separated)"
                    value={teamMembers}
                    onChange={e => setTeamMembers(e.target.value)}
                />
                <button onClick={createProject}>Create Project</button>
            </div>
            <div>
                {projects.map(project => (
                    <div key={project.id}>
                        <h3>{project.name}</h3>
                        <p>Category: {project.category}</p>
                        <p>Team Members: {project.teamMembers.join(', ')}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectBrowser;