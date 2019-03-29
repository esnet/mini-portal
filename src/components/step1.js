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
import { TimeSeries } from "pondjs";
import Markdown from "react-markdown";
import _ from "underscore";
import $ from "jquery";

import Chart from "./chart";
import InfoPane from "./info";
import Map from "./map";

import markdownFile from "../guides/step1.md";

export default class Step1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trafficLoaded: false,
            trafficData: null,
            trafficKey: "Total",
            codeLoaded: false,
            code: "",
            tracker: null
        };
        this.trackerChanged = this.trackerChanged.bind(this);
        this.trafficKeyChanged = this.trafficKeyChanged.bind(this);
    }

    fetchMarkdownForProps(props) {
        window.scrollTo(0, 0);
        fetch(markdownFile)
            .then(response => {
                return response.text();
            })
            .then(markdown => {
                this.setState({ markdown });
            });
    }

    fetchJSONData() {
        $.ajax({
            url: `${process.env.PUBLIC_URL}/data/traffic.json`,
            dataType: "json",
            type: "GET",
            contentType: "application/json",
            success: function (data) {
                this.receiveTrafficData(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error("Failed to load traffic data", err);
            }
        });
    }

    componentDidMount() {
        // this.fetchJSONData();
        this.fetchMarkdownForProps(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.fetchMarkdownForProps(nextProps);
    }

    receiveTrafficData(data) {
        let processedData = {};
        _.each(data, (d, k) => {
            processedData[k] = new TimeSeries(d);
        });

        let tracker = processedData["Total"].end();

        this.setState({
            trafficData: processedData,
            trafficLoaded: true,
            tracker: tracker
        });
    }

    trackerChanged(t) {
        this.setState({ tracker: t });
    }

    trafficKeyChanged(k) {
        this.setState({ trafficKey: k });
    }

    renderMarkdown() {
        if (this.state.markdown) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <Markdown 
                            source={this.state.markdown}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="row">
                    <div className="col-md-12">
                        Loading...
                    </div>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <h2 style={{margin: 10}}> Step 1: Data Loading </h2>
                    <br />
                    <div className="col-sm-9">
                        <div id="map-container">
                            <Map
                                mock={true}
                                trafficLoaded={this.state.trafficLoaded}
                                trafficData={this.state.trafficData}
                                trafficKey={this.state.trafficKey}
                                trafficKeyChanged={this.trafficKeyChanged}
                                tracker={this.state.tracker}
                            />
                        </div>
                        <br />
                        <div>
                            <Chart
                                mock={true}
                                trafficLoaded={this.state.trafficLoaded}
                                trafficData={this.state.trafficData}
                                trafficKey={this.state.trafficKey}
                                trackerChanged={this.trackerChanged}
                                tracker={this.state.tracker}
                            />
                        </div>
                    </div>
                    <div className="col-sm-3" style={{ border: "1px solid #ccc", height: "540px" }}>
                        <InfoPane
                            mock={false}
                            trafficLoaded={this.state.trafficLoaded}
                            trafficData={this.state.trafficData}
                            trafficKey={this.state.trafficKey}
                            tracker={this.state.tracker}
                        />
                    </div>
                </div>
                <hr />
                {this.renderMarkdown()}
            </div>
        );
    }
}
