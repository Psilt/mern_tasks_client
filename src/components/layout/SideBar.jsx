import React from 'react';
import NewProject from '../proyects/NewProject';
import ProjectList from '../proyects/ProjectList';

const SideBar = () => {

    return(

        <aside>
            <h1>MERN<span>Tasks</span></h1>
            <NewProject />
            <div className="projects">
                <h2>Tus Proyectos</h2>
                <ProjectList />
            </div>
        </aside>
    )

}

export default SideBar