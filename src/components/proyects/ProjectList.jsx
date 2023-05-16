import React, {useContext, useEffect} from 'react';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';
import alertContext from '../../context/alerts/alertContext'
import {TransitionGroup, CSSTransition} from 'react-transition-group'

const ProjectList = () => {

   const context = useContext(projectContext)
   const {message, projects, viewProjects} = context

   const alert_context = useContext(alertContext)
   const {alert, showAlert} = alert_context

   useEffect(()=>{
       if(message){
           showAlert(message.msg, message.category)
       }
        viewProjects()
        //eslint-disable-next-line
   },[message])

   if(projects.length === 0 )return <p className="msj correct">No hay Proyectos<br/>Comience creando uno</p>

    return(

        <ul className="list-projects">
            {alert ? <div className={`alert ${alert.category}`}>{alert.msg}</div>:null}
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id} 
                        timeout={200}
                        classNames='project'
                    >
                        <Project
                            project={project} 
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    )

}

export default ProjectList