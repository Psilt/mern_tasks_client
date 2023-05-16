import React, { useReducer } from 'react';
import axiosClient from '../../config/axios'
import projectReducer from './projectReducer';
import projectContext from './projectContext';
import {
        FORM_PROJECTS, 
        LIST_PROJECTS, 
        ADD_PROJECT,
        ADD_ERROR,
        SELECT_PROJECT,
        REMOVE_PROJECT,
        PROJECT_ERROR
        } from '../../types'


const ProjectState = props => {

    const initialState = {
        projects: [],
        newProject: false,
        form_error:false,
        selected_project:null,
        message:null
    }

    const [state, dispatch] = useReducer(projectReducer, initialState)

    const viewForm = () => {
        dispatch({
            type: FORM_PROJECTS
        })
    }

    const viewProjects = async() => {

        try{
            const res = await axiosClient.get('/api/projects')

            dispatch({
                        type: LIST_PROJECTS,
                        payload: res.data
                    })
        }catch(error){
            const alert = {
                msg: 'Hubo un error',
                category: 'alert-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
        
    }

    const addProject = async(project) => {

        try {
            const res = await axiosClient.post('/api/projects',project)

                    dispatch({
                        type: ADD_PROJECT,
                        payload: res.data
                    })
        }catch(error){
            const alert = {
                msg: 'Hubo un error',
                category: 'alert-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
        
        

    }

    const addFormError = () => {
        dispatch({
            type: ADD_ERROR
        })
    }

    const selectProject = (project_id) => {
        dispatch({
            type: SELECT_PROJECT,
            payload: project_id
        })
    }

    const removeProject = async(project_id) => {

        try{
            await axiosClient.delete(`/api/projects/${project_id}`)

            dispatch({
                        type: REMOVE_PROJECT,
                        payload: project_id
                    })
        }catch(error){
            const alert = {
                msg: 'Hubo un error',
                category: 'alert-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
        
    }

    return(
        <projectContext.Provider
            value={{
                projects: state.projects,
                newProject: state.newProject,
                form_error: state.form_error,
                selected_project: state.selected_project,
                message:state.message,
                viewForm,
                viewProjects,
                addProject,
                addFormError,
                selectProject,
                removeProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )

}

export default ProjectState