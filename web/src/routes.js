import React from 'react';
import { Switch, Route }  from 'react-router-dom';

import UserPage from './pages/UserPage';

function Routes() {
    return (
        <Switch>
            <Route path='/' exact component={UserPage} />
        </Switch>
    );
}

export default Routes;