import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const apiKey=process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState("light");
  const toggleMode=()=>{
    if(mode==="light")
    {
        setMode("dark");
        document.body.style.backgroundColor="black";
        document.body.style.color="white";
    }
    else
    {
        setMode("light");
        document.body.style.backgroundColor="white";
        document.body.style.color="black";
    }
  }
    return (
      <div>
        <Router>
        <LoadingBar
        color='#0d6efd'
        height={2.5}
        progress={progress}
      />
        <Navbar mode={mode} toggleMode={toggleMode}/>
        <Switch>
          <Route exact path="/"><News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={10} country="in" category="general" color="primary" mode={mode} /></Route>
          <Route exact path="/business"><News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={10} country="in" category="business" color="secondary" mode={mode}   /></Route>
          <Route exact path="/entertainment"><News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={10} country="in" category="entertainment" color="info" mode={mode} /></Route>
          <Route exact path="/science"><News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={10} country="in" category="science"  color="warning" mode={mode} /></Route>
          <Route exact path="/technology"><News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={10} country="in" category="technology"  color="danger" mode={mode} /></Route>
          <Route exact path="/sports"><News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={10} country="in" category="sports"  color="success" mode={mode} /></Route>
          <Route exact path="/health"><News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={10} country="in" category="health"  color="danger" mode={mode} /></Route>
        </Switch>
        </Router>
      </div>
    )
  }

export default App