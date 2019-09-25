import React from 'react';
import ReactDOM from 'react-dom';
import './public/index.css';
import { HashRouter } from 'react-router-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render((
    <HashRouter>
        <App />
    </HashRouter>
), document.getElementById('root'))
serviceWorker.unregister();
