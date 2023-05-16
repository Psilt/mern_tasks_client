import React from 'react';
import Task from './Task';
import { useContext, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';
import alertContext from '../../context/alerts/alertContext'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const TaskList = () => {

    const project_context = useContext(projectContext)
    const {selected_project, removeProject} = project_context

    const task_context = useContext(taskContext)
    const {message, selected_tasks} = task_context

    const alert_context = useContext(alertContext)
    const {alert, showAlert} = alert_context

    useEffect(()=>{
        if(message){
            showAlert(message.msg, message.category)
        }
         //eslint-disable-next-line
    },[message])

    if(!selected_project) return(
        <h2>Seleccione un Proyecto</h2>
    )

    const [selection] = selected_project

    const {name, _id} = selection


    const handleClick = () => {
        removeProject(_id)
    }


    return(
        <>
        {alert ? <div className={`alert ${alert.category}`}>{alert.msg}</div>:null}
        <h2>Proyecto: {name}</h2>
        <ul className="list-tasks">
            {selected_tasks.length===0 
            ? (<li className="task"><p>No hay tareas</p></li>)
            :   <TransitionGroup> 
            {selected_tasks.map(task => (
                <CSSTransition
                    key={task._id}
                    timeout={200}
                    classNames='task'
                >
                    <Task
                        task={task}
                    />
                </CSSTransition>
            ))}
            </TransitionGroup>
            }
        </ul>
        <button
            type="button"
            className="btn"
            onClick={handleClick}
        >Eliminar Proyecto &times;</button>
        </>
    )

}

export default TaskList