import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

import './index.css';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/detail" component={DetailPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
