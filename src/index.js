import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppRefactor from './AppRefactor';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App/> , document.getElementById('root'));
ReactDOM.render(<AppRefactor/> , document.getElementById('p61'));
registerServiceWorker();
