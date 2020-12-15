import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import loadable from "@loadable/component"

const Test=loadable(()=>import("../views/Test/Test"));
const PageLogin=loadable(()=>import("../views/PageLogin/PageLogin"));
const PageAddRestaurant=loadable(()=>import("../views/PageAddRestaurant/PageAddRestaurant"));

const routes=()=>{
    return (
        <Router>
            <Route exact path="/" component={PageLogin}></Route>
            <Route exact path="/Test" component={Test}></Route>
            <Route exact path="/PageAddRestaurant" component={PageAddRestaurant}></Route>
        </Router>
    )
}
export default routes