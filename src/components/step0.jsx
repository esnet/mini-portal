import React from "react";
import {State} from "react-router";

import InfoPane from "./info";
import Chart from "./chart";
import Map from "./map";

export default React.createClass({

    // Router state
    mixins: [State],


    getInitialState() {
        return {
            trafficLoaded: false,
            trafficData: null,
        };
    },

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
});
