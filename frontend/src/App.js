import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Registration from "./component/auth/Registration";
import Login from "./component/auth/Login";
import Profile from "./component/basic/basic_main/profile/Profile";
import {Home} from "./component/basic/basic_main/Home";
import Header from "./component/basic/basic_main/Header";
import GrowGuideCard from "./component/grow_guides/GrowGuideCard";
import VegetablePage from "./component/grow_guides/vegetable_page/VegetablePage";
import Weather from "./component/weather-forecast/weather/Weather";


import './stylesheet/App.css';
import {SelectedTypeListProvider} from "./context/SelectedTypeListContext";
import {LoadingProvider} from "./context/LoadingContext";
import {UserProvider} from "./context/User";
import PrivateRoute from "./component/redirects/PrivateRoute";
import PublicRoute from "./component/redirects/PublicRoute";
import {WeatherForecastDataProvider} from "./context/WeatherForecastDataContext";
import Charts from "./component/weather-forecast/chart/Charts";
import GardenPlanner from "./component/garden_planner/GardenPlanner";
import {GardenSizeProvider} from "./component/garden_planner/garden_connected/garden_connected_context/GardenSizeContext";
import {ActualGardenIdProvider} from "./component/garden_planner/garden_connected/garden_connected_context/ActualGardenIdContext";
import PageNotFound from "./PageNotFound";
import {UserHasMoreGardenProvider} from "./component/garden_planner/garden_connected/garden_connected_context/UserHasMoreGarden";
import UserImages from "./component/basic/basic_main/profile/UserImages";


function App() {
    return (
        <Router>
            <UserProvider>
                <div>
                    <Header/>
                    <div className="main-container">
                        <Switch>

                            <Route exact path="/" component={Home}/>
                            <PublicRoute exact path="/register/" component={Registration}/>
                            <PublicRoute exact path="/login/" component={Login}/>
                            <PrivateRoute exact path="/profile/" component={Profile}/>
                            <PrivateRoute exact path="/user-images/" component={UserImages}/>

                            <PrivateRoute exact path="/grow-guides/"
                                          render={() => (
                                              <LoadingProvider>
                                                  <SelectedTypeListProvider>
                                                      <GrowGuideCard/>
                                                  </SelectedTypeListProvider>
                                              </LoadingProvider>
                                          )}/>

                            <PrivateRoute exact path="/grow-guides/:vegetableName/"
                                          render={() => (
                                              <LoadingProvider>
                                                  <SelectedTypeListProvider>
                                                      <VegetablePage/>
                                                  </SelectedTypeListProvider>
                                              </LoadingProvider>
                                          )}/>

                            <PrivateRoute exact path="/garden-planner"
                                          render={() => (
                                              <LoadingProvider>
                                                  <GardenSizeProvider>
                                                      <UserHasMoreGardenProvider>
                                                          <ActualGardenIdProvider>
                                                              <GardenPlanner/>
                                                          </ActualGardenIdProvider>
                                                      </UserHasMoreGardenProvider>
                                                  </GardenSizeProvider>
                                              </LoadingProvider>
                                          )}/>

                            <PrivateRoute exact path="/weather"
                                          render={() => (
                                              <LoadingProvider>
                                                  <WeatherForecastDataProvider>
                                                      <Weather/>
                                                  </WeatherForecastDataProvider>
                                              </LoadingProvider>
                                          )}/>
                            <PrivateRoute exact path="/charts"
                                          render={() => (
                                              <LoadingProvider>
                                                  <WeatherForecastDataProvider>
                                                      <Charts/>
                                                  </WeatherForecastDataProvider>
                                              </LoadingProvider>
                                          )}/>

                            <Route exact path="*" component={PageNotFound}/>
                        </Switch>
                    </div>
                </div>
            </UserProvider>
        </Router>
    );
}

export default App;
