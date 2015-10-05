import React from "react";

import Util from "../utils/util";

export default React.createClass({
    displayName: "TrackerInfo",

    render() {
        let tracker = this.props.tracker;
        let trackerInfo = (<div className="row"></div>);
        let timeseries = this.props.timeseries;

        if (tracker) {
            let trafficIndex = timeseries["in"].bisect(tracker);

            let inValue = timeseries["in"].at(trafficIndex);
            let outValue = timeseries["out"].at(trafficIndex);
            let time = Util.formatDate(inValue.timestamp());

            let inFormatted = Util.scaleUnits(inValue.get("value"));
            let outFormatted = Util.scaleUnits(outValue.get("value"));

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
