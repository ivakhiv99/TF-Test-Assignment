import React from 'react';
import {BrowserRouter, Switch, Route, Router, Redirect} from 'react-router-dom';
import Organization from './scenes/Organization';
import NotFound from './scenes/NotFound';
import Search from './scenes/Search';
import User from './scenes/User';
import history from './history';


export const routes = {
    user: '/user',
    search: '/search',
    organization: '/organization',
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
                    {/*<Redirect />*/}
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        </BrowserRouter>
    );

}