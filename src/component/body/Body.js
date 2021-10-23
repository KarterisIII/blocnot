import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login'
import {useSelector} from 'react-redux'
import NotFound from '../utils/NotFound/NotFound'
import Profile from './profile/Profile';
import Register from './auth/Registet'
import Admin from './profile/Admin'
import EditWorkerInform from '../modal/EditWorkerInform'
import EditUser from '../body/profile/EditUser'



function Body() {

    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth

    return (
        <Switch>
            <Route  path="/login" component={isLogged ? NotFound : Login} exact />
            <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
            <Route path="/admin" component={isAdmin ? Admin : NotFound} exact />
            <Route path="/register" component={isAdmin ? Register : NotFound} exact />
            <Route path="/editeworker" component={isLogged ? EditWorkerInform : NotFound} exact />
            <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />
            
        </Switch>
    );
};

export default Body