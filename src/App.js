import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import Projects from './components/proyects/Projects';
import ProjectState from './context/projects/projectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alerts/alertState'
import AuthState from './context/auth/authState'
import authToken from './config/authToken'
import PrivateRoutes from './components/HOC/routes/privateRoutes';


function App() {

  const token = localStorage.getItem('token')
  if(token) authToken(token)
 
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Registration} />
            <PrivateRoutes exact path='/projects' component={Projects} />
          </Switch>
        </Router>
        </AuthState>
        </AlertState>
      </TaskState>
   </ProjectState>
  );
}

export default App;
