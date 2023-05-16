import { REGISTRATION_SUCCESS, REGISTRATION_ERROR, GET_USER, LOGIN_SUCCESS, LOGIN_ERROR, CLOSE_SESSION} from '../../types'

export default (state,action) => {
    switch(action.type){
        case REGISTRATION_SUCCESS: 
        case LOGIN_SUCCESS:
            localStorage.setItem('token',action.payload.token)
            return{
                ...state,
                authentification:true,
                message:null,
                loading:false
            }
        case REGISTRATION_ERROR:
        case LOGIN_ERROR:
        case CLOSE_SESSION:
            localStorage.removeItem('token')
            return{
                ...state,
                token:null,
                authentification:null,
                user:null,
                message: action.payload,
                loading:false
            }
            case GET_USER: 
                return{
                    ...state,
                    authentification:true,
                    user: action.payload,
                    loading:false
                }
                default:
                    return state
    }
}