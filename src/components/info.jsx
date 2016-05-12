import React from "react";
import _ from "underscore";

import Util from "../utils/util";

import TrackerInfo from "./trackerinfo";

export default React.createClass({
    displayName: "InfoPane",

    getDefaultProps() {
    },

    render() {
        if (this.props.mock) {
            return (
                <img src="static/img/infopane.png" alt="[infopane]"
                     style={{ width: "100%" }} />
            );
        }

        let trafficTable = null;
        let trackerInfo = (<div></div>);
        let trafficRange = (<div></div>);

        let trafficData = this.props.trafficData;
        let trafficLoaded = this.props.trafficLoaded;
        let trafficKey = this.props.trafficKey;

        if (trafficLoaded) {
            let timeseries = trafficData[trafficKey];
            let rows = _.map(["in", "out"], (direction) => {
/** start: pond */
                let average = timeseries.avg(direction);
                let maximum = timeseries.max(direction);
/** end: pond */
                return (
                    <tr key={direction}>
                        <th>{direction}</th>
                        <td>{Util.scaleUnits(average, "b/s")}</td>
                        <td>{Util.scaleUnits(maximum, "b/s")}</td>
                    </tr>
                );
            });

            trafficTable = (
                <table className="table">
                    <tbody>
                        <tr>
                            <th></th>
                            <th>Avg</th>
                            <th>Max</th>
                        </tr>
                        {rows}
                    </tbody>
                </table>
            );

/** start: pond */
            let range = trafficData[trafficKey].range("in");
            let beginTime = Util.formatDate(range.begin());
            let endTime = Util.formatDate(range.end());
/** end: pond */

            trafficRange = (
                <div>
                    <div>Begin:&nbsp;{beginTime}</div>
                    <div>End:&nbsp;{endTime}</div>
                    <br />
                </div>
            );

            let tracker = this.props.tracker;
            trackerInfo = (
                <TrackerInfo timeseries={timeseries} tracker={tracker} />
            );
        }

        return (
            <div>
                <h4>{trafficKey}</h4>
                {trafficRange}
                {trafficTable}
                <hr />
                {trackerInfo}
            </div>
        );
    }
});
