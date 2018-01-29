import React, { Component } from "react";
import { Link } from "react-router-dom";

import Markdown from "react-markdown";
import Stepper from "./stepper";
import readmeFile from "../README.md";

export default class Intro extends Component {
    state = {
        trafficLoaded: false,
        trafficData: null,
        readmeText: null
    };

    componentDidMount() {
        fetch(readmeFile).then(response => response.text()).then(readmeText => {
            this.setState({ readmeText });
        });
    }

    componentWillUnmount() {}

    _onChange() {}

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Markdown source={this.state.readmeText} />
                        <ul>
                            <li>
                                <Link to="step0">Step 0</Link> Wireframe
                            </li>
                            <li>
                                <Link to="step1">Step 1</Link> Data Loading
                            </li>
                            <li>
                                <Link to="step2">Step 2</Link> Traffic Chart
                            </li>
                            <li>
                                <Link to="step3">Step 3</Link> Traffic Map
                            </li>
                            <li>
                                <Link to="step4">Step 4</Link> Map Editor
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
