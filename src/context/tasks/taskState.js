import React, {useReducer} from 'react';
import taskReducer from './taskReducer';
import taskContext from './taskContext';
import axiosClient from '../../config/axios'
import {
        LIST_TASKS,
        ADD_TASK,
        ADD_TASK_ERROR,
        REMOVE_TASK,
        SELECT_TASK,
        EDIT_TASK,
        CLEAR_SELECTION,
        TASK_ERROR
        } from '../../types'

const TaskState = props => {

    const initialState = {
        selected_tasks:[],
        edited_task:null,
        task_error:false,
        message: null
    }

    const [state, dispatch] = useReducer(taskReducer, initialState)

    const getTasks = async project => {
        try {
            const res = await axiosClient.get('/api/tasks', {params: {project}})
        dispatch({
            type: LIST_TASKS,
            payload: res.data.task
        })
    }catch(error){
        const alert = {
            msg: 'Hubo un error',
            category: 'alert-error'
        }
        dispatch({
            type: TASK_ERROR,
            payload: alert
        })
    }
    }

    const addTask = async task => {
        try {
            const res = await axiosClient.post('/api/tasks', task)
            dispatch({
            type: ADD_TASK,
            payload: res.data.task
        })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alert-error'
            }
            dispatch({
                type: TASK_ERROR,
                payload: alert
            })
        }
        
    }

    const addError = ()=>{
        dispatch({
            type: ADD_TASK_ERROR
        })
    }

    const removeTask = async(id,project) => {
        try{
           
            await axiosClient.delete(`/api/tasks/${id}`,{params:{project}}) 
            dispatch({
            type: REMOVE_TASK,
            payload:id
        })
        }catch(error){
            const alert = {
                msg: 'Hubo un error',
                category: 'alert-error'
            }
            dispatch({
                type: TASK_ERROR,
                payload: alert
            })
        }
       
    }

  
    const selectTask = task => {
        dispatch({
            type: SELECT_TASK,
            payload:task
        })
    }

    const editTask = async task => {
        try {
            const res = await axiosClient.put(`/api/tasks/${task._id}`,task)

            dispatch({
                type: EDIT_TASK,
                payload:res.data.task
            })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alert-error'
            }
            dispatch({
                type: TASK_ERROR,
                payload: alert
            })
        }
       
    }

    const clearSelection = () => {
        dispatch({
            type: CLEAR_SELECTION
        })
    }

    return(
        <taskContext.Provider
            value={{
                selected_tasks:state.selected_tasks,
                edited_task:state.edited_task,
                task_error:state.task_error,
                message:state.message,
                getTasks,
                addTask,
                addError,
                removeTask,
                selectTask,
                editTask,
                clearSelection
            }}
        >
            {props.children}
        </taskContext.Provider>
    )

}

export default TaskState