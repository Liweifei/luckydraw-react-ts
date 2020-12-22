import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import loadable from "@loadable/component"
// import RoutingGuart from "@/tools/routingGuard"
import RoutingGuart from "../tools/routingGuard"

const Test=loadable(()=>import("../views/Test/Test"));
const PageLogin=loadable(()=>import("../views/PageLogin/PageLogin"));
const PageAddRestaurant=loadable(()=>import("../views/PageAddRestaurant/PageAddRestaurant"));
const PageMain=loadable(()=>import("../views/PageMain/PageMain"));

const routes=()=>{
    return (
        <Router>
            <Route exact path="/" component={PageLogin}></Route>
            <Route exact path="/Test" component={Test}></Route>
            <Route exact path="/PageAddRestaurant" component={RoutingGuart(PageAddRestaurant)}></Route>
            <Route exact path="/PageMain" component={RoutingGuart(PageMain)}></Route>
        </Router>
    )
}
export default routes