import React from 'react';
import {BrowserRouter, Switch, Route, Router, Redirect} from 'react-router-dom';
import Organization from './scenes/Organization';
import NotFound from './scenes/NotFound';
import Search from './scenes/Search';
import User from './scenes/User';
import history from './history';


export const routes = {
    search: '/search',
    organization: '/organization',
    user: '/user',
    userFollowers: '/user/followers',
    userFollowings: '/user/followings',
};

export default function MyRouter() {
    return (
        <BrowserRouter>
            <Router history={history}>
                <Switch>
                    <Route exact path='/' render={()=><Redirect to={routes.search}/>} />
                    <Route path={routes.user} component={User}/>
                    <Route path={routes.search} component={Search}/>
                    <Route path={routes.organization} component={Organization}/>
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        </BrowserRouter>
    );

}