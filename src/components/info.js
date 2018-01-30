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
import _ from "underscore";

import { scaleUnits, formatDate } from "../utils/util";
import TrackerInfo from "./trackerinfo";

import mockInfo from "../img/infopane.png";

export default class InfoPane extends Component {
    displayName = "InfoPane"

    render() {
        if (this.props.mock) {
            return <img src={mockInfo} alt="[infopane]" style={{ width: "100%" }} />;
        }

        let trafficTable = null;
        let trackerInfo = <div />;
        let trafficRange = <div />;

        let trafficData = this.props.trafficData;
        let trafficLoaded = this.props.trafficLoaded;
        let trafficKey = this.props.trafficKey;

        if (trafficLoaded) {
            let timeseries = trafficData[trafficKey];
            let rows = _.map(["in", "out"], direction => {
                let average = timeseries.avg(direction);
                let maximum = timeseries.max(direction);
                return (
                    <tr key={direction}>
                        <th>
                            {direction}
                        </th>
                        <td>
                            {scaleUnits(average, "b/s")}
                        </td>
                        <td>
                            {scaleUnits(maximum, "b/s")}
                        </td>
                    </tr>
                );
            });

            trafficTable = (
                <table className="table">
                    <tbody>
                        <tr>
                            <th />
                            <th>Avg</th>
                            <th>Max</th>
                        </tr>
                        {rows}
                    </tbody>
                </table>
            );

            let range = trafficData[trafficKey].range("in");
            let beginTime = formatDate(range.begin());
            let endTime = formatDate(range.end());

            trafficRange = (
                <div>
                    <div>
                        Begin:&nbsp;{beginTime}
                    </div>
                    <div>
                        End:&nbsp;{endTime}
                    </div>
                    <br />
                </div>
            );

            let tracker = this.props.tracker;
            trackerInfo = <TrackerInfo timeseries={timeseries} tracker={tracker} />;
        }

        return (
            <div>
                <h4>
                    {trafficKey}
                </h4>
                {trafficRange}
                {trafficTable}
                <hr />
                {trackerInfo}
            </div>
        );
    }
}
