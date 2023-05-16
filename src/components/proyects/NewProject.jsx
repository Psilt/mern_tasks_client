import React, {useState, useContext} from 'react';
import projectContext from '../../context/projects/projectContext';

const NewProject = () => {

    const context = useContext(projectContext)
    const {newProject, form_error, viewForm, addProject, addFormError} = context

    const [project, setProject] = useState({
        name:''
    })

    const {name} = project

    const handleChange = e => {
        setProject({
            ...project,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(name===''){
            addFormError()
            return
        }

        addProject(project)

        setProject({
            name:''
        })
    }

    const handleClick = () => {
        viewForm()
    }

    return(
        <>
            <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={handleClick}
            >
                  Nuevo Proyecto  
            </button>

            { newProject?
                (
                   <form 
                        className="form-new-project"
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="text"
                            className="input-text"
                            placeholder="Escriba el nombre del proyecto"
                            name="name"
                            value={name}
                            onChange={handleChange}
                        />
                        <input
                            type="submit"
                            className="btn btn-primary btn-block"
                            value="Agregar Proyecto"
                        />     
                    </form> 
                ):null
            }    
            { form_error?
                <p className="msj error">El Nombre del Proyecto es un Campo Requerido</p>
            
                :null

            }
        </>
    )

}

export default NewProject