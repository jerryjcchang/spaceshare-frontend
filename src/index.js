// import 'semantic-ui-css/semantic.min.css'
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'


import * as serviceWorker from './serviceWorker';
// import {Provider} from 'react-redux'
// import store from './redux/store'

ReactDOM.render(
            <App />
, document.getElementById('root'));
serviceWorker.unregister();
