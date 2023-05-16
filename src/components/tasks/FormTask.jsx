import React, { useContext, useState, useEffect} from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const FormTask = () => {

    const project_context = useContext(projectContext)
    const {selected_project} = project_context

    const task_context =useContext(taskContext)
    const {edited_task, task_error,getTasks,addTask,addError, editTask, clearSelection} = task_context

    useEffect(()=>{
        if(edited_task !== null){
            setTask(edited_task)
        }else{
            setTask({
                name:''
            })
        }
    },[edited_task])
    
    const [task, setTask] = useState({
        name:''
    })

    const {name} = task

    if(!selected_project) return null

    const [selection] = selected_project

    

    
    const handleSubmit = e =>{
        e.preventDefault()

        if(name.trim()===''){
            addError()
            return
        }

        if(edited_task === null){
            task.project = selection._id
            addTask(task)
        }else{
            editTask(task)
            clearSelection()
        }
        getTasks(selection._id)

        setTask({
            name:''
        })
    }

    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }
    
    return(
        <div className="form">
            <form
                onSubmit={handleSubmit}
            >
                <div className="container-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Escriba el nombre de la tarea"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className="container-input">
                    <input
                        type="submit"
                        className="btn btn-primary btn-submit btn-block"
                        value={edited_task?"Editar Tarea":"Agregar Tarea"}
                    />
                </div>
            </form>

            {task_error?
                (
                    <p className="msj error">El Nombre de la Tarea es un Campo Requerido</p>
                )
                :null
            }
        </div>

    )

}
export default FormTask