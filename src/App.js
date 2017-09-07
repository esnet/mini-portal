import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Step0 from "./components/step0";
import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step3";
import Step4 from "./components/step4";
import Intro from "./components/intro";
import Stepper from "./components/stepper";

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div className="row">
                        <div className="col-md-9">
                            <div id="title">
                                <h2>mini-portal</h2>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <Stepper />
                        </div>
                    </div>

                    <div />
                    <Route exact path="/" component={Intro} />
                    <Route path="/step0" component={Step0} />
                    <Route path="/step1" component={Step1} />
                    <Route path="/step2" component={Step2} />
                    <Route path="/step3" component={Step3} />
                    <Route path="/step4" component={Step4} />
                </div>
            </Router>
        );
    }
}
