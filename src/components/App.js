import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Devices from './Devices/index';
import Package from './Package/index';
import Memory from './Memory/index';


const App = () => (
    <section className="h100">
        <Switch>
            <Route exact path='/' component={Devices} />
            <Route exact path='/devices/:devices' component={Package} />
            <Route exact path='/memory/:devices/:package' component={Memory} />
        </Switch>
    </section>
)

export default App;
