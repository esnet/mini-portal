import React from "react";
import {State, Link} from "react-router";

import Markdown from "react-markdown";

import text from "raw!../../README.md";

export default React.createClass({

    // Router state
    mixins: [State],


    getInitialState() {
        return {
            trafficLoaded: false,
            trafficData: null,
        };
    },

    componentDidMount() {
    },

    componentWillUnmount() {
    },

    _onChange() {
    },

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-9">
                        <Markdown source={text} />
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
});
