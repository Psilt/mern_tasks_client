import React from 'react';
import { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Task = ({task}) => {

    const project_context = useContext(projectContext)
    const {selected_project} = project_context

    const [selection] =selected_project


    const task_context = useContext(taskContext)
    const {getTasks,removeTask,editTask, selectTask} = task_context

    const {_id, name, state}=task

    const handleDelete = id => {
    
        removeTask(id,selection._id)
        getTasks(selection._id)
    }

    const handleCompletion = task => {
        if(task.state===false){
            task.state=true
        }else{
            task.state=false
        }
        editTask(task)
    }

    const handleSelection = task => {
        selectTask(task)
    }

    return(
        <li className="task shadow">
            <p>{name}</p>
            <div className="state">
                {state
                ? (<button
                    type="button"
                    className="complete"
                    onClick={()=>handleCompletion(task)}
                    >Completo</button>)
                : (<button
                    type="button"
                    className="incomplete"
                    onClick={()=>handleCompletion(task)}
                    >Incompleto</button>)
                }
            </div>
            <div className="actions">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={()=>handleSelection(task)}
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundary"
                    onClick={()=>handleDelete(_id)}
                >Eliminar</button>
            </div>
        </li>
    )

}
export default Task