import * as React from 'react';
import './helper/App.scss';
import { Dashboard } from './components/Dashboard/dashboard';

export default class App extends React.Component<{}, {}> {

  render() {
    return (
      <Dashboard />
    );
  }
}

