import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./component/Header";
import Navbar from "./component/Navbar";
import GrowGuide from "./component/grow_guide/GrowGuide";
import Weather from "./component/weather/Weather";


import './stylesheet/App.css';
import './stylesheet/weather/Weather_forecast.css';
import './stylesheet/grow_guide/Grow_Guides.css';


function App() {
  return (
      <Router>
          <div>
            <Header />
            {/*<Navbar />*/}
            <div className="main-container">
                <Route exact path="/">Home page</Route>
                <Route exact path="/grow-guides" component={GrowGuide}></Route>
                <Route exact path="/my-todos">There are my todos separated for every month</Route>
                <Route exact path="/weather-forecast" component={Weather} />
            </div>
          </div>
      </Router>
  );
}

export default App;
