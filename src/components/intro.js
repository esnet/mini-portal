/**
 *  Copyright (c) 2017 - present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";

import readmeFile from "../README.md";

export default class Intro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trafficLoaded: false,
            trafficData: null,
            readmeText: null
        };
    }

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
