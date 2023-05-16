import React from 'react';
import { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {

    const project_context = useContext(projectContext)
    const {selectProject} = project_context

    const task_context = useContext(taskContext)
    const {getTasks} = task_context

    const {name, _id} = project

    const handleClick = () => {
        selectProject(_id)
        getTasks(_id)
    }

    return(
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={handleClick}
            >{name}</button>
        </li>
    )

}

export default Project