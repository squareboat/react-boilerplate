import React from 'react';

import NavigationPaths from './routes';
import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import 'antd/dist/antd.css';

const ProtectedRoute = ({isEnabled, ...props}) => {
  return (isEnabled) ? <Route {...props} /> : <Redirect to="/"/>;
};

const Navigator = () => {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path={NavigationPaths.LOGIN} component={LoginPage} isEnabled={true} />
      </Switch>
    </Router>
  );
};

export default Navigator;