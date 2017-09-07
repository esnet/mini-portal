import React, { Component } from "react";

import { scaleUnits, formatDate } from "../utils/util";

export default class TrackerInfo extends Component {
    displayName: "TrackerInfo";

    render() {
        let tracker = this.props.tracker;
        let trackerInfo = <div className="row" />;
        let timeseries = this.props.timeseries;

        if (tracker) {
            let trafficIndex = timeseries.bisect(tracker);

            let event = timeseries.at(trafficIndex);
            let time = formatDate(event.timestamp());

            let inFormatted = scaleUnits(event.get("in"));
            let outFormatted = scaleUnits(event.get("out"));

            trackerInfo = (
                <div>
                    <div>
                        {time}
                    </div>
                    <div>
                        <b>in:</b>&nbsp;{inFormatted}
                    </div>
                    <div>
                        <b>out:</b>&nbsp;{outFormatted}
                    </div>
                </div>
            );
        }

        return trackerInfo;
    }
}
