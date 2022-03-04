import React from 'react';

function ProjectRow(props) {
    const { project } = props;

    return (
        <>
            <div className="rich-list-row project-header" role="button" tabIndex={0}>
                <div className="project-column">{project.name}</div>
                <div className="project-column">{project.status}</div>
                <div className="project-column">{project.sourceLang}</div>
                <div className="project-column">{project.targetLangs.join(",")}</div>
            </div>
        </>
    );
}

export default ProjectRow;
