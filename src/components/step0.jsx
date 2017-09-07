import React, { Component } from "react";

import InfoPane from "./info";
import Chart from "./chart";
import Map from "./map";

export default class Step0 extends Component {
    state = {
        trafficLoaded: false,
        trafficData: null
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-9">
                        <div>
                            <Map mock={true} />
                        </div>
                        <div>
                            <Chart mock={true} />
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <InfoPane mock={true} />
                    </div>
                </div>
            </div>
        );
    }
}
