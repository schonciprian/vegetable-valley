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


function App() {
    return (
        <Router>
            <UserProvider>
                <LoadingProvider>
                    <SelectedTypeListProvider>
                        <GardenSizeProvider>
                            <WeatherForecastDataProvider>
                                <ActualGardenIdProvider>

                                    <div>
                                        <Header/>
                                        <div className="main-container">
                                            <Switch>

                                                <Route exact path="/" component={Home}/>
                                                <PublicRoute exact path="/register/" component={Registration}/>
                                                <PublicRoute exact path="/login/" component={Login}/>
                                                <PrivateRoute exact path="/profile/" component={Profile}/>

                                                {/*<LoadingProvider>*/}

                                                    {/*<SelectedTypeListProvider>*/}
                                                        <PrivateRoute exact path="/grow-guides/"
                                                                      component={GrowGuideCard}/>
                                                        <PrivateRoute exact path="/grow-guides/:vegetableName/"
                                                                      component={VegetablePage}/>

                                                        {/*<GardenSizeProvider>*/}
                                                        {/*    <ActualGardenIdProvider>*/}
                                                                <PrivateRoute exact path="/garden-planner"
                                                                              component={GardenPlanner}/>
                                                            {/*</ActualGardenIdProvider>*/}
                                                        {/*</GardenSizeProvider>*/}

                                                    {/*</SelectedTypeListProvider>*/}

                                                    {/*<WeatherForecastDataProvider>*/}
                                                        <PrivateRoute exact path="/weather" component={Weather}/>
                                                        <PrivateRoute exact path="/charts" component={Charts}/>
                                                    {/*</WeatherForecastDataProvider>*/}
                                                {/*</LoadingProvider>*/}

                                                <Route exact path="*" component={PageNotFound}/>

                                            </Switch>
                                        </div>
                                    </div>
                                </ActualGardenIdProvider>

                            </WeatherForecastDataProvider>

                        </GardenSizeProvider>

                    </SelectedTypeListProvider>

                </LoadingProvider>

            </UserProvider>
        </Router>
    );
}

export default App;
