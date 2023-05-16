import React, {useContext, useEffect} from 'react'
import {Redirect, Route} from 'react-router-dom'
import authContext from '../../../context/auth/authContext'

const PrivateRoutes = ({component: Component, ...props}) => {
    const auth_context = useContext(authContext)
    const {authentification, loading, authentificatedUser} = auth_context

    useEffect(()=>{
        authentificatedUser()
        //eslint-disable-next-line
    },[])

    return(
        <Route {...props} render={props => !authentification && !loading? (
            <Redirect to='/' />
        ) : (
            <Component {...props} />
        )} />
    )

}

export default PrivateRoutes

