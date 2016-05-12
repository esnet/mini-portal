import React from "react";
import { render } from "react-dom";
import { Router, IndexRoute, Route } from "react-router";
import createHistory from "history/lib/createBrowserHistory";
import useScroll from "scroll-behavior/lib/useStandardScroll";

import App from "./components/app";
import Intro from "./components/intro";
import Step0 from "./components/step0";
import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step3";
import Step4 from "./components/step4";

const history = useScroll(createHistory)();

render((
        <Router history={history}>
        <Route path="/" component={App}>
        <IndexRoute component={Intro} />
        <Route path="step0" component={Step0} />
        <Route path="step1" component={Step1} />
        <Route path="step2" component={Step2} />
        <Route path="step3" component={Step3} />
        <Route path="step4" component={Step4} />
        </Route>
        </Router>
), document.getElementById("content"));

