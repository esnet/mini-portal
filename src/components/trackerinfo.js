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

import { scaleUnits, formatDate } from "../utils/util";

export default class TrackerInfo extends Component {
    displayName = "TrackerInfo"

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
