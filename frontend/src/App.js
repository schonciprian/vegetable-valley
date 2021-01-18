import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./component/Home";
import Header from "./component/Header";
import GrowGuide from "./component/grow_guide/GrowGuide";
import VegetablePage from "./component/grow_guide/vegetable/VegetablePage";
import Weather from "./component/weather/Weather";


import './stylesheet/App.css';
import './stylesheet/weather/Weather_forecast.css';
import './stylesheet/grow_guide/Grow_Guides.css';
import './stylesheet/grow_guide/VegetableInfo.css';


function App() {
  return (
      <Router>
          <div>
            <Header />
            {/*<Navbar />*/}
            <div className="main-container">
                <Route exact path="/" component={Home}/>
                <Route exact path="/grow-guides" component={GrowGuide}/>
                <Route path="/grow-guides/:vegetableName" component={VegetablePage}/>
                <Route exact path="/my-todos">There are my todos separated for every month</Route>
                <Route exact path="/weather-forecast" component={Weather} />
            </div>
          </div>
      </Router>
  );
}

export default App;
