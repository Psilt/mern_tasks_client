import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext'
import authContext from '../../context/auth/authContext'

const Login = (props) => {

    const alert_context = useContext(alertContext)
    const {alert, showAlert} = alert_context

    const auth_context = useContext(authContext)
    const {message, authentification, startSession} = auth_context

    useEffect(()=>{

        if(authentification) props.history.push('/projects')

        if(message){ showAlert(message.msg, message.category) }

        //eslint-disable-next-line   
    },[message, authentification, props.history])

    const [user, setUser] = useState({
        email:'',
        password:''
    })

    const {email, password} = user

    const handleChange = e => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(email.trim()===''||password.trim()===''){
            showAlert('Todos los campos son obligatorios','alert-error')
            return
        }

        startSession({email, password})

    }

    return(
        <div className="form-user">
            <div className="container-form shadow-dark">
                <h1>Iniciar Sesión</h1>
                {alert ? <div className={`alert ${alert.category}`}>{alert.msg}</div>:null}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="data-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Ejemplo: juan@gmail.com"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="data-form">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Escriba su contraseña"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="data-form">
                        <input 
                            type="submit"
                            className="btn btn-primary btn-block"
                            value="Iniciar Sesion"
                        />

                    </div>
                </form>

                <Link to='/register' className="link-account">Obtener Cuenta</Link>
            </div>
        </div>
    )

}

export default Login