import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import CreateCity from './pages/CreateCity';
import { WatchCities } from './pages/WatchCities';
import ChangeCity from './pages/ChangeCity';


function App() {

  return (
    <Router>
      <Switch>
        <Route path='/home'>
          <WatchCities />
        </Route>
        <Route path='/createcity'>
          <CreateCity />
        </Route>
        <Route path='/changecity/:id'>
          <ChangeCity />
        </Route>
      </Switch>
      <Redirect to='/home' />
    </Router>
  );
}

export default App;
