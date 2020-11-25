import 'core-js/stable';
import 'regenerator-runtime/runtime';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import configure, { runSaga, history } from './store/configure';

import App from './App';
import './index.css';
import 'react-tippy/dist/tippy.css';

export const store = configure(history);

runSaga();
// sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <Provider store={store} context={ReactReduxContext}>
    <React.StrictMode>
      
        <App history={history} context={ReactReduxContext}/>
      
    </React.StrictMode>
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
