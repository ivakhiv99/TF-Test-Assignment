import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Organization from './scenes/Organization';
import NotFound from './scenes/NotFound';
import Search from './scenes/Search';
import User from './scenes/User';

export const routes = {
    user:'/user',
    search: '/search',
    organization: '/organization',
};

export default function Router() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={routes.user}         component={User}/>
                <Route path={routes.search}       component={Search}/>
                <Route path={routes.organization} component={Organization}/>
                {/*<Redirect />*/}
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );

}