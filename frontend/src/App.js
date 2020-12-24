import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./component/Header";
import Navbar from "./component/Navbar";
import Weather from "./component/weather/Weather";


import './stylesheet/App.css';


function App() {
  return (
      <Router>
          <div className="App">
            <Header />
            <Navbar />
            <div className="container">
                <Route exact path="/">Home page</Route>
                <Route exact path="/grow-guides">There are some infos about vegetable growing...</Route>
                <Route exact path="/my-jobs">There are my jobs to do separated for every month</Route>
                <Route exact path="/weather-forecast" component={Weather} />
            </div>
          </div>
      </Router>
  );
}

export default App;
