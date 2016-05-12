import React from "react";

import { Event } from "pondjs";
import { TrafficMap } from "react-network-diagrams";

import Spinner from "./spinner";

/** start: map */
const nodes = [
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
    }
];

/** start: map */
const edges = [
    {
        capacity: "100G",
        source: "CERN",
        target: "FNAL"
    },
/** end: map */
    {
        capacity: "100G",
        source: "BNL",
        target: "CERN"
    }
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
    hub: hubStyle
};

const nodeSizeMap = {
    hub: 10
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

const edgeThicknessMap = {
    "100G": 5,
    "10G": 3,
    "1G": 1.5,
    subG: 1
};

export default React.createClass({
    getInitialState() {
        return {
            mapSelection: {
                edges: [],
                nodes: []
            }
        };
    },

    _handleSelectionChanged(selectionType, selection) {
        if (selectionType === "edge" && selection === "BNL--CERN") {
            this.props.trafficKeyChanged("BNL");
        } else if (selectionType === "edge" && selection === "CERN--FNAL") {
            this.props.trafficKeyChanged("FNAL");
        } else if (this.props.trafficKey !== "Total") {
            this.props.trafficKeyChanged("Total");
        }

        let mapSelection = {
            nodes: selectionType === "node" ? [selection] : [],
            edges: selectionType === "edge" ? [selection] : []
        };

        this.setState({mapSelection});
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
            timestamp = trafficData["Total"].end();
        }


        let index = trafficData["Total"].bisect(timestamp);

/** start: map */
        let edgeTraffic = {
            "BNL--CERN": trafficData["BNL"].at(index).get("in"),
            "CERN--BNL": trafficData["BNL"].at(index).get("out"),
            "FNAL--CERN": trafficData["FNAL"].at(index).get("in"),
            "CERN--FNAL": trafficData["FNAL"].at(index).get("out")
        };
/** end: map */

        let traffic = new Event(timestamp, edgeTraffic);

        let topo = {
            nodes,
            edges
        };

        let width = $("#map-container").width();

        return (
/** start: map */
            <TrafficMap topology={topo}
                        autoSize={false}
                        height={325}
                        margin={75}
                        traffic={traffic}
                        selection={this.state.mapSelection}
                        onSelectionChange={this._handleSelectionChanged}
                        edgeColorMap={edgeColorMap}
                        edgeDrawingMethod="bidirectionalArrow"
                        edgeThicknessMap={edgeThicknessMap}
                        stylesMap={stylesMap}
                        nodeSizeMap={nodeSizeMap} />
/** end: map */
        );
    }
});
