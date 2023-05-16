import {
        FORM_PROJECTS, 
        LIST_PROJECTS, 
        ADD_PROJECT,
        ADD_ERROR,
        SELECT_PROJECT,
        REMOVE_PROJECT,
        PROJECT_ERROR
    } from '../../types'

export default (state, action) => {
    switch(action.type){
        case FORM_PROJECTS:
            return({
                ...state,
                newProject:true
            })
            case LIST_PROJECTS:
                return({
                    ...state,
                    projects:action.payload
                })
                case ADD_PROJECT:
                    return({
                        ...state,
                        projects:[...state.projects,action.payload],
                        newProject:false,
                        form_error:false
                    })
                    case ADD_ERROR:
                        return({
                            ...state,
                            form_error:true
                        })
                        case SELECT_PROJECT:
                            return({
                                ...state,
                                selected_project: state.projects.filter(project => project._id === action.payload)  
                            })
                            case REMOVE_PROJECT:
                                return({
                                    ...state,
                                    projects: state.projects.filter(project => project._id !== action.payload),
                                    selected_project: null
                                })
                                case PROJECT_ERROR:
                                    return({
                                        ...state,
                                        message: action.payload
                                    })
                                    default:
                                        return(state)
    }
}