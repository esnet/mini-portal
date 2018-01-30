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
import { TimeEvent } from "pondjs";
import { TrafficMap, MapEditor } from "react-network-diagrams";

import Spinner from "./spinner";

import mockMap from "../img/map.png";

let nodes = [
    {
        id: 1,
        name: "BNL",
        type: "hub",
        capacity: "100G",
        label_dx: null,
        label_dy: null,
        label_position: "left",
        x: 5.0,
        y: 15.0
    },
    {
        id: 2,
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
        id: 3,
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

let edges = [
    {
        id: 11,
        capacity: "100G",
        source: "CERN",
        target: "FNAL"
    },
    {
        id: 12,
        capacity: "100G",
        source: "BNL",
        target: "CERN"
    }
];

const hubStyle = {
    node: {
        normal: { fill: "#CBCBCB", stroke: "#BEBEBE", cursor: "pointer" },
        selected: {
            fill: "#37B6D3",
            stroke: "rgba(55, 182, 211, 0.22)",
            strokeWidth: 10,
            cursor: "pointer"
        },
        muted: {
            fill: "#CBCBCB",
            stroke: "#BEBEBE",
            opacity: 0.6,
            cursor: "pointer"
        }
    },
    label: {
        normal: { fill: "#696969", stroke: "none", fontSize: 14 },
        selected: { fill: "#333", stroke: "none", fontSize: 14 },
        muted: { fill: "#696969", stroke: "none", fontSize: 8, opacity: 0.6 }
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
    { color: "#990000", label: ">=50 Gbps", range: [50, 100] },
    { color: "#bd0026", label: "20 - 50", range: [20, 50] },
    { color: "#cc4c02", label: "10 - 20", range: [10, 20] },
    { color: "#016c59", label: "5 - 10", range: [5, 10] },
    { color: "#238b45", label: "2 - 5", range: [2, 5] },
    { color: "#3690c0", label: "1 - 2", range: [1, 2] },
    { color: "#74a9cf", label: "0 - 1", range: [0, 1] }
];

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapSelection: {
                edges: [],
                nodes: []
            },
            topology: {
                name: "test",
                description: "test",
                nodes,
                edges
            },
            mode: "display"
        };
    }

    handleSelectionChanged(selectionType, selection) {
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

        this.setState({ mapSelection });
    };

    handleTopologyChanged(topology) {
        this.setState({ topology });
    };

    editMap = () => {
        this.setState({ mode: "edit" });
    };

    saveMap = () => {
        this.setState({ mode: "display" });
    };

    renderDisplay = () => {
        let trafficLoaded = this.props.trafficLoaded;

        if (!trafficLoaded) {
            return <Spinner />;
        }

        let trafficData = this.props.trafficData;

        let tracker = this.props.tracker;
        let timestamp = tracker;
        if (!tracker) {
            timestamp = trafficData["Total"].end();
        }

        let index = trafficData["Total"].bisect(timestamp);

        let edgeTraffic = {
            "BNL--CERN": trafficData["BNL"].at(index).get("in"),
            "CERN--BNL": trafficData["BNL"].at(index).get("out"),
            "FNAL--CERN": trafficData["FNAL"].at(index).get("in"),
            "CERN--FNAL": trafficData["FNAL"].at(index).get("out")
        };

        let traffic = new TimeEvent(timestamp, edgeTraffic);

        let button = null;
        if (this.props.editable) {
            button = (
                <button className="btn btn-primary" onClick={this.editMap}>
                    Edit
                </button>
            );
        }

        const bounds = {
            x1: 4,
            y1: 4,
            x2: 11,
            y2: 16
        };

        return (
            <div>
                <TrafficMap
                    topology={this.state.topology}
                    autoSize={false}
                    height={325}
                    margin={50}
                    bounds={bounds}
                    traffic={traffic}
                    selection={this.state.mapSelection}
                    onSelectionChange={(selectionType, selection) => this.handleSelectionChanged(selectionType, selection)}
                    edgeColorMap={edgeColorMap}
                    edgeDrawingMethod="bidirectionalArrow"
                    stylesMap={stylesMap}
                    nodeSizeMap={nodeSizeMap}
                />
                <br />
                {button}
            </div>
        );
    };

    renderEditor = () => {
        const bounds = {
            x1: 4,
            y1: 4,
            x2: 11,
            y2: 16
        };

        let button = null;
        if (this.props.editable) {
            button = (
                <button className="btn btn-primary" onClick={this.saveMap}>
                    Save
                </button>
            );
        }

        let editor = (
            <div>
                <MapEditor
                    height={325}
                    margin={50}
                    bounds={bounds}
                    autoSize={false}
                    topology={this.state.topology}
                    edgeColorMap={edgeColorMap}
                    edgeDrawingMethod="bidirectionalArrow"
                    nodeSizeMap={nodeSizeMap}
                    stylesMap={stylesMap}
                    gridSize={0.5}
                    onTopologyChange={(topology) => this.handleTopologyChanged(topology)}
                />
                <br />
                {button}
            </div>
        );

        return editor;
    };

    renderMock() {
        return <img src={mockMap} alt="[map]" style={{ width: "100%", height: "325px" }} />;
    }

    render() {
        if (this.props.mock) {
            return this.renderMock();
        }

        switch (this.state.mode) {
            case "display":
                return this.renderDisplay();
            case "edit":
                return this.renderEditor();
            default:
                return (
                    <div>
                        `Unknown mode: ${this.props.mode}`
                    </div>
                );
        }
    }
}

Map.defaultProps = {
    editable: false
};