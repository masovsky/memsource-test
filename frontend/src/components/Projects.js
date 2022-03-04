import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadSetting } from '../actions/settings';
import { login, readProjects } from '../actions/memsourceapi';
import ProjectRow from './ProjectRow';
import './__styles__/Projects.css';

function Projects() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        setLoading(true);
        loadSetting((response) => {
                login(response.data.name, response.data.password,
                    (response) => {
                        readProjects(response.data.token, (response) => {
                            setProjects(response.data)
                            setLoading(false);
                        })
                    }, dispatch)
            }, dispatch);
    }, [dispatch]);
    if (loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="projects-container">
                <div className="project-list">
                    <div className="rich-list-row rich-list-header">
                        <div className="project-column">
                            Name
                        </div>
                        <div className="project-column">
                            Status
                        </div>
                        <div className="project-column">
                            Source
                        </div>
                        <div className="project-column">
                            Target
                        </div>
                    </div>
                    {projects && projects.content.map((prj) => <ProjectRow project={prj} key={prj.internalId} />)}
                </div>
            </div>
        );
    }
}

export default Projects;