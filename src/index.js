import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './store';

render(
    <Provider store={ store }>
        <div id='container'>
            <App />
        </div>
    </Provider>,
    document.getElementById('root')
)
