import React from 'react';
import {BrowserRouter as Router,Route} from "react-router-dom";
import loadable from "@loadable/component"

const App=loadable(()=>import("../views/App/App"));
const Test=loadable(()=>import("../views/Test/Test"));
const PageLogin=loadable(()=>import("../views/PageLogin/PageLogin"));

const routes=()=>{
    return (
        <Router>
            <Route exact path="/" component={PageLogin}></Route>
            <Route exact path="/Test" component={Test}></Route>
        </Router>
    )
}
export default routes