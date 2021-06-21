import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {logger} from 'redux-logger'
import {routerMiddleware} from 'connected-react-router'; 
import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import reducers from './redux/reducer'
import sagas from './redux/sagas'
import persistConfig from './config/persistorConfig'
import {Provider} from 'react-redux'


const sagaMiddleware = createSagaMiddleware()
const middleWares = [sagaMiddleware,logger];
const pReducer = persistReducer(persistConfig, reducers(reducers))
export const store = createStore(pReducer,compose(applyMiddleware(...middleWares)))
sagaMiddleware.run(sagas)
const pStore = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={pStore}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
