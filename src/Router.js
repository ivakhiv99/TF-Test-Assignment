import React from 'react';
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom';
import Organization from './scenes/Organization';
import NotFound from './scenes/NotFound';
import Search from './scenes/Search';
import User from './scenes/User';

export const routes = {
    search: '/search',
    organization: '/organization',
    user: '/user',
};

export default function MyRouter() {
    console.log(process.env.PUBLIC_URL);
    return (
        <HashRouter>
            <Switch>
                <Route exact path='/' render={() => <Redirect to={process.env.PUBLIC_URL + routes.search}/>}/>
                <Route path={routes.search} component={Search}/>
                <Route path={routes.organization} component={Organization}/>
                <Route path={routes.user} component={User}/>
                <Route component={NotFound}/>
            </Switch>
        </HashRouter>
    );
}

