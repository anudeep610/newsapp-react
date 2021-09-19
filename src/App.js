import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {

  render() {
    return (
      <div>
        <Router>
        <Navbar />
        <Switch>
          <Route exact path="/"><News key="general" pageSize={10} country="in" category="general" color="primary" /></Route>
          <Route exact path="/business"><News key="business" pageSize={10} country="in" category="business" color="secondary"   /></Route>
          <Route exact path="/entertainment"><News key="entertainment" pageSize={10} country="in" category="entertainment" color="info" /></Route>
          <Route exact path="/science"><News key="science" pageSize={10} country="in" category="science"  color="warning" /></Route>
          <Route exact path="/technology"><News key="technology" pageSize={10} country="in" category="technology"  color="danger" /></Route>
          <Route exact path="/sports"><News key="sports" pageSize={10} country="in" category="sports"  color="success" /></Route>
          <Route exact path="/health"><News key="health" pageSize={10} country="in" category="health"  color="danger" /></Route>
        </Switch>
        </Router>
      </div>
    )
  }
}

