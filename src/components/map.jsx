import React from "react";

import {Event} from "@esnet/pond";
import {TrafficMap} from "@esnet/react-network-diagrams";

import Spinner from "./spinner";

/** start: map */
var nodes = [
    {
        name: "BNL",
        type: "hub",
        capacity: "100G",
        label_dx: null,
        label_dy: null,
        label_position: "left",
        x: 5.0,
        y: 15.0
    },
/** end: map */
    {
        name: "FNAL",
        type: "hub",
        capacity: "100G",
        label_dx: null,
        label_dy: null,
        label_position: "left",
        x: 5.0,
        y: 5.0
    },
    {
        name: "CERN",
        type: "hub",
        capacity: "100G",
        label_dx: null,
        label_dy: null,
        label_position: "right",
        x: 10.0,
        y: 10.0
    },
];

/** start: map */
var edges = [
    {
        capacity: "100G",
        source: "CERN",
        target: "FNAL",
    },
/** end: map */
    {
        capacity: "100G",
        source: "BNL",
        target: "CERN",
    },
];

const hubStyle = {
    node: {
        normal: {fill: "#CBCBCB", stroke: "#BEBEBE", cursor: "pointer"},
        selected: {fill: "#37B6D3", stroke: "rgba(55, 182, 211, 0.22)",
                   strokeWidth: 10, cursor: "pointer"},
        muted: {fill: "#CBCBCB", stroke: "#BEBEBE", opacity: 0.6,
                cursor: "pointer"}
    },
    label: {
        normal: {fill: "#696969", stroke: "none", fontSize: 14},
        selected: {fill: "#333",stroke: "none", fontSize: 14},
        muted: {fill: "#696969", stroke: "none", fontSize: 8, opacity: 0.6}
    }
};

// Mapping of node type to style
const stylesMap = {
    hub: hubStyle,
};

const nodeSizeMap = {
    hub: 10,
};

const edgeColorMap = [
    {color: "#990000", label: ">=50 Gbps", range: [50, 100]},
    {color: "#bd0026", label: "20 - 50", range: [20, 50]},
    {color: "#cc4c02", label: "10 - 20", range: [10, 20]},
    {color: "#016c59", label: "5 - 10", range: [5, 10]},
    {color: "#238b45", label: "2 - 5", range: [2, 5]},
    {color: "#3690c0", label: "1 - 2", range: [1, 2]},
    {color: "#74a9cf", label: "0 - 1", range: [0, 1]}
];

export default React.createClass({
    _handleSelectionChanged(type, selection) {
        if (type === "edge" && selection === "BNL--CERN") {
            this.props.trafficKeyChanged("BNL");
        } else if (type === "edge" && selection === "CERN--FNAL") {
            this.props.trafficKeyChanged("FNAL");
        } else if (this.props.trafficKey !== "Total") {
            this.props.trafficKeyChanged("Total");
        }
    },

    render() {
        if (this.props.mock) {
            return (
                <img src="static/img/map.png" alt="[map]"
                     style={{width: "100%", height: "325px" }} />
            );
        }

        let trafficLoaded = this.props.trafficLoaded;

        if (!trafficLoaded) {
            return (
                <Spinner />
            );
        }

        let trafficData = this.props.trafficData;

        let tracker = this.props.tracker;
        let timestamp = tracker;
        if (!tracker) {
            timestamp = trafficData["Total"]["in"].end();
        }


        let index = trafficData["Total"]["in"].bisect(timestamp);

/** start: map */
        let edgeTraffic = {
            "BNL--CERN": trafficData["BNL"]["out"].at(index).get("value"),
            "CERN--BNL": trafficData["BNL"]["in"].at(index).get("value"),
            "FNAL--CERN": trafficData["FNAL"]["out"].at(index).get("value"),
            "CERN--FNAL": trafficData["FNAL"]["in"].at(index).get("value"),
        };
/** end: map */

        let traffic = new Event(timestamp, edgeTraffic);

        let topo = {
            nodes: nodes,
            edges: edges
        };

        let width = $("#map-container").width();

        return (
/** start: map */
            <TrafficMap topology={topo}
                        width={width}
                        height={325}
                        margin={75}
                        traffic={traffic}
                        onSelectionChange={this._handleSelectionChanged}
                        edgeColorMap={edgeColorMap}
                        stylesMap={stylesMap}
                        nodeSizeMap={nodeSizeMap} />
/** end: map */
        );
    }
});
