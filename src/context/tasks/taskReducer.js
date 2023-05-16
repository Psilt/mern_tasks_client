import { LIST_TASKS, ADD_TASK, ADD_TASK_ERROR, REMOVE_TASK, SELECT_TASK, EDIT_TASK, CLEAR_SELECTION, TASK_ERROR } from "../../types";

export default (state, action) => {
    switch(action.type){
        case LIST_TASKS:
            return {
                ...state,
                selected_tasks: action.payload
            }
            case ADD_TASK:
                return {
                    ...state,
                    selected_tasks: [action.payload, ...state.selected_tasks],
                    task_error: false
                }
                case ADD_TASK_ERROR:
                    return {
                        ...state,
                        task_error: true
                    }
                    case REMOVE_TASK:
                        return {
                            ...state,
                            selected_tasks: state.selected_tasks.filter(task => task._id !== action.payload)
                        }
                        case EDIT_TASK:
                            return {
                                ...state,
                                selected_tasks: state.selected_tasks.map(task => task._id === action.payload._id ? action.payload : task)
                            }
                            case SELECT_TASK:
                                return {
                                    ...state,
                                    edited_task:action.payload
                                }
                                case CLEAR_SELECTION:
                                    return {
                                        ...state,
                                        edited_task:null
                                    }
                                    case TASK_ERROR:
                                        return{
                                            ...state,
                                            message: action.payload
                                        }
                                        default:
                                            return state;
    }
}