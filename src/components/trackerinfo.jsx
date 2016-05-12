import React from "react";

import Util from "../utils/util";

export default React.createClass({
    displayName: "TrackerInfo",

    render() {
        let tracker = this.props.tracker;
        let trackerInfo = (<div className="row"></div>);
        let timeseries = this.props.timeseries;

        if (tracker) {
            let trafficIndex = timeseries.bisect(tracker);

            let event = timeseries.at(trafficIndex);
            let time = Util.formatDate(event.timestamp());

            let inFormatted = Util.scaleUnits(event.get("in"));
            let outFormatted = Util.scaleUnits(event.get("out"));

            trackerInfo = (
                <div>
                    <div>{time}</div>
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
});
