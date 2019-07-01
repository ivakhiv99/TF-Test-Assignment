import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react'
import './reset.css';

import MyRouter from './Router';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <MyRouter/>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));

