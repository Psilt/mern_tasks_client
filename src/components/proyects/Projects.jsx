import React, {useContext, useEffect} from 'react';
import SideBar from '../layout/SideBar';
import Header from '../layout/Header';
import FormTask from '../tasks/FormTask';
import TaskList from '../tasks/TaskList';
import authContext from '../../context/auth/authContext'

const Projects = () => {

    const auth_context = useContext(authContext)
    const {authentificatedUser} = auth_context

    useEffect(()=>{
        authentificatedUser()
        //eslint-disable-next-line
    },[])

    return(
        
        <div className="container-app">
            <SideBar />
            <div className="section-principal">
                <Header />
                <main>
                    <FormTask />
                    <div className="container-tasks">
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>
    )

}

export default Projects