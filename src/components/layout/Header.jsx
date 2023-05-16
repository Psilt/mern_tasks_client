import React, {useContext, useEffect} from 'react';
import authContext from '../../context/auth/authContext'

const Header = () => {
    
    const auth_context = useContext(authContext)
    const {user, authentificatedUser, closeSession} = auth_context

    useEffect(()=>{
        authentificatedUser()
        //eslint-disable-next-line
    },[])

    return(
        <header className="app-header">
            {user ? <p className="name-user">Hola <span>{user.username}</span></p> : null}
            
            <nav className="nav-principal">
                <button
                    className='btn btn-blank close-session'
                    onClick={closeSession}
                >Cerrar Sesion</button>
            </nav>
        </header>
    )

}

export default Header