import "babel/polyfill";

import React from "react";
import App from "./components/app";
import Intro from "./components/intro";
import Step0 from "./components/step0";
import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step3";
import Router from "react-router";

const {Route, DefaultRoute} = Router;

const routes = (
    <Route path="/" handler={App}>
        <DefaultRoute name="intro" handler={Intro} />
        <Route name="step0" handler={Step0} />
        <Route name="step1" handler={Step1} />
        <Route name="step2" handler={Step2} />
        <Route name="step3" handler={Step3} />
    </Route>
);

Router.run(routes, Handler => {
    React.render(<Handler/>, document.getElementById("content"));
});
