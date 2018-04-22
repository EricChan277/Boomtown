import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Items from '../containers/Items';
import Login from '../containers/Login';
import Share from '../containers/Share';
import NotFound from '../containers/NotFound';
import Profile from '../containers/Profile';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Items} />
        <Route path="/login" component={Login} />
        <Route path="/share" component={Share} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/*" component={NotFound} />
    </Switch>
);

export default Routes;
