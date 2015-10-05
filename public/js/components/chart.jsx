import React from "react";
import _ from "underscore";

import { Charts,
         ChartContainer,
         ChartRow,
         YAxis,
         AreaChart,
         Resizable } from "@esnet/react-timeseries-charts";


import Spinner from "./spinner";

export default React.createClass({
    displayName: "TrafficChart",

    getDefaultProps() {
        return {
            mock: false,
        };
    },

    getInitialState() {
        return {
            tracker: null,
        };
    },

    handleTrackerChanged(t) {
        this.props.trackerChanged(t);
    },

    render() {
        if (this.props.mock) {
            return (
                <img src="img/chart.png" alt="[chart]"
                     style={{ width: "100%", height: "200px" }} />
            );
        }

        let trafficLoaded = this.props.trafficLoaded;
        let trafficData = this.props.trafficData;
        let trafficKey = this.props.trafficKey;

        if (!trafficLoaded) {
            return (
                <Spinner />
            );
        }

        let timeSeries = trafficData[trafficKey];

        let maxValue = _.max([
            timeSeries["in"].max("value"),
            timeSeries["out"].max("value")
        ]);

        let timerange = timeSeries["in"].range();
        let tracker = this.props.tracker;
/** start: chart */
        let chart = (
            <Resizable>
                <ChartContainer timeRange={timerange}
                                onTrackerChanged={this.handleTrackerChanged}
                                trackerPosition={tracker}>

                    <ChartRow height="150">
                        <Charts>
                            <AreaChart axis="traffic"
                                       series={[[timeSeries["in"]], [timeSeries["out"]]]} />
                        </Charts>
                        <YAxis id="traffic"
                               label="Traffic (bps)"
                               min={-maxValue}
                               max={maxValue}
                               absolute={true}
                               width="60"
                               type="linear" />
                    </ChartRow>
                </ChartContainer>
            </Resizable>
        );
/** end: chart */

        return chart;
    }
});
