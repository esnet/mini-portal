import React, { Component } from "react";
import { Link } from "react-router-dom";

import Markdown from "react-markdown";

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
                    <div className="col-md-9">
                        <Markdown source={this.state.readmeText} />
                    </div>
                    <div className="col-md-3">
                        <br />
                        <br />
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
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
