import React, { Component } from "react";
import { TimeSeries } from "pondjs";
import _ from "underscore";
// import $ from "jquery";

import Chart from "./chart";
import CodeBlock from "./codeblock";
import InfoPane from "./info";
import Map from "./map";

export default class Step1 extends Component {
    state = {
        trafficLoaded: false,
        trafficData: null,
        trafficKey: "Total",
        codeLoaded: false,
        code: "",
        tracker: null
    };

    /** start: fetch *
    componentDidMount() {
        $.ajax({
            url: `${process.env.PUBLIC_URL}/data/traffic.json`,
            dataType: "json",
            type: "GET",
            contentType: "application/json",
            success: function (data) {
                this._receiveTrafficData(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error("Failed to load traffic data", err);
            }
        });
    }
/** end: fetch */

    /** start: process */
    _receiveTrafficData(data) {
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
    /** end: process */

    trackerChanged(t) {
        this.setState({ tracker: t });
    }

    trafficKeyChanged(k) {
        this.setState({ trafficKey: k });
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
                <div className="row">
                    <CodeBlock file="src/components/step1.jsx" codeKey="fetch" />
                    <CodeBlock file="src/components/step1.jsx" codeKey="process" />
                    <CodeBlock file="src/components/info.jsx" codeKey="pond" />
                </div>
            </div>
        );
    }
}
