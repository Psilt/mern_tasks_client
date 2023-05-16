import React, {useReducer} from 'react'
import authReducer from './authReducer'
import authContext from './authContext'
import axiosClient from '../../config/axios'
import authToken from '../../config/authToken'
import { REGISTRATION_SUCCESS, REGISTRATION_ERROR, GET_USER, LOGIN_SUCCESS, LOGIN_ERROR, CLOSE_SESSION} from '../../types'

const AuthState = ({children}) => {

    const initialState = {
        token: localStorage.getItem('token'),
        authentification:null,
        user:null,
        message:null,
        loading:true
    }

    const [state, dispatch] = useReducer(authReducer, initialState)

    const registerUser = async data => {
        try {
            const res = await axiosClient.post('/api/users',data)
            
            dispatch({
                type: REGISTRATION_SUCCESS,
                payload: res.data
            })
            authentificatedUser()
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error'
            }
            dispatch({
                type: REGISTRATION_ERROR,
                payload: alert
            })
        }
    }

    const authentificatedUser = async () => {

        const token = localStorage.getItem('token')
        if(token){
            authToken(token)
        }
        try {
            const res = await axiosClient.get('/api/auth')
            dispatch({
                type: GET_USER,
                payload: res.data.user
            })
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    }

    const startSession = async (data) => {

        try {
            const res = await axiosClient.post('/api/auth',data)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            authentificatedUser()
        } catch (error) {
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    }

    const closeSession = async () => {

            dispatch({
                type: CLOSE_SESSION
            })
        
    }

    return(
        <authContext.Provider
            value={{
                token: state.token,
                authentification:state.authentification,
                user:state.user,
                message:state.message,
                loading:state.loading,
                registerUser,
                authentificatedUser,
                startSession,
                closeSession
            }}
        >
            {children}
        </authContext.Provider>
    )
}

export default AuthState