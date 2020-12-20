import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./Component/Header";

import './App.css';


function App() {
  return (
      <Router>
          <div className="App">
            <Header />
            <div className="container">
                <Route exact path="/">Home page</Route>
            </div>
          </div>
      </Router>
  );
}

export default App;
