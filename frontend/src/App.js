import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter, Redirect} from "react-router-dom";
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import MyVibes from './components/pages/MyVibes';
import NearbyVibes from './components/pages/NearbyVibes';
import TrackVibe from './components/pages/TrackVibe';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={withRouter(Login)}/>
          <Route exact path='/home' component={withRouter(Home)}/>
          <Route exact path='/vibes' component={withRouter(MyVibes)}/>
          <Route exact path='/nearby' component={withRouter(NearbyVibes)}/>
          <Route exact path='/track' component={withRouter(TrackVibe)}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
