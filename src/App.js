import "./App.css";
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Step0 from "./components/step0";
import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step3";
import Step4 from "./components/step4";
import Intro from "./components/intro";
import Stepper from "./components/stepper";
import ScrollToTop from "./ScrollToTop";
import Header from './Header';

const bodyStyle = {
    marginTop: 100,
    display: "flex",
    minHeight: "100vh",
    flexDirection: "column"
};

const mainStyle = {
    display: "flex",
    flex: 1,
    marginLeft: 20,
    marginRight: 40
};

const contentStyle = {
    flex: 1
};

export default class App extends Component {
    render() {
        return (
            <Router>
                <div style={bodyStyle}>
                    <Header />
                    <Route component={ScrollToTop} />
                    <div style={mainStyle}>
                        <div style={contentStyle}>
                            {" "}
                            <Route exact path="/" component={Intro}/>
                            <Route path="/step0" component={Step0} />
                            <Route path="/step1" component={Step1} />
                            <Route path="/step2" component={Step2} />
                            <Route path="/step3" component={Step3} />
                            <Route path="/step4" component={Step4} />
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}
