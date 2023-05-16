import React,{useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext'
import authContext from '../../context/auth/authContext'

const Registration = (props) => {

    const alert_context = useContext(alertContext)
    const {alert, showAlert} = alert_context

    const auth_context = useContext(authContext)
    const {message, authentification, registerUser} = auth_context

    useEffect(()=>{

        if(authentification) props.history.push('/projects')

        if(message) showAlert(message.msg, message.category)

        
        //eslint-disable-next-line
    },[message, authentification, props.history])

    const [user, setUser] = useState({
        username:'',
        email:'',
        password:'',
        validation: ''
    })

    const {username, email, password, validation} = user

    const handleChange = e => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        if(username.trim() === ''||email.trim() === ''||password.trim() === ''|| validation.trim()===''){
            showAlert('Todos los Campos son obligatorios', 'alert-error')
            return
        }

        if(password.length < 6){
            showAlert('La contraseña debe tener mínimo 6 dígitos', 'alert-error')
            return
        }

        if(password !== validation){
            showAlert('Las contraseñas no son iguales', 'alert-error')
            return
        }

        registerUser({
            username,
            email,
            password
        })

    }

    return(
        <div className="form-user">
            <div className="container-form shadow-dark">
                <h1>Obtener Cuenta</h1>
                {alert ? <div className={`alert ${alert.category}`}>{alert.msg}</div>:null}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="data-form">
                        <label htmlFor="username">Nombre</label>
                        <input 
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Escriba su nombre de usuario"
                            value={username}
                            onChange={handleChange}
                        />
                    </div>
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
                            placeholder="Su contraseña debe contener minimo 6 digitos"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="data-form">
                        <label htmlFor="validation">Confirmar Contraseña</label>
                        <input 
                            type="password"
                            id="validation"
                            name="validation"
                            placeholder="Escriba su contraseña"
                            value={validation}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="data-form">
                        <input 
                            type="submit"
                            className="btn btn-primary btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>

                <Link to='/' className="link-account">Volver a Iniciar Sesion</Link>
            </div>
        </div>
    )

}

export default Registration