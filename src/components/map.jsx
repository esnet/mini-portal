import React, { Component } from "react";

import { Event, TimeEvent } from "pondjs";
import { TrafficMap, MapEditor } from "react-network-diagrams";

import Spinner from "./spinner";
import mockMap from "../img/map.png";

/** start: map */
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
    /** end: map */
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

/** start: map */
let edges = [
    {
        id: 11,
        capacity: "100G",
        source: "CERN",
        target: "FNAL"
    },
    /** end: map */
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
    defaultProps = {
        editable: false
    };

    state = {
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

    _handleSelectionChanged = (selectionType, selection) => {
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

    _handleTopologyChanged = topology => {
        this.setState({ topology });
    };

    _renderMock() {
        return <img src={mockMap} alt="[map]" style={{ width: "100%", height: "325px" }} />;
    }

    render() {
        if (this.props.mock) {
            return this._renderMock();
        }

        switch (this.state.mode) {
            case "display":
                return this._renderDisplay();
            case "edit":
                return this._renderEditor();
            default:
                return (
                    <div>
                        `Unknown mode: ${this.props.mode}`
                    </div>
                );
        }
    }

    _renderDisplay = () => {
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

        /** start: map */
        let edgeTraffic = {
            "BNL--CERN": trafficData["BNL"].at(index).get("in"),
            "CERN--BNL": trafficData["BNL"].at(index).get("out"),
            "FNAL--CERN": trafficData["FNAL"].at(index).get("in"),
            "CERN--FNAL": trafficData["FNAL"].at(index).get("out")
        };
        /** end: map */

        let traffic = new TimeEvent(timestamp, edgeTraffic);

        let button = null;
        if (this.props.editable) {
            button = (
                <button className="btn btn-primary" onClick={this._editMap}>
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

        /** start: map */
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
                    onSelectionChange={this._handleSelectionChanged}
                    edgeColorMap={edgeColorMap}
                    edgeDrawingMethod="bidirectionalArrow"
                    stylesMap={stylesMap}
                    nodeSizeMap={nodeSizeMap}
                />
                <br />
                {button}
            </div>
        );
        /** end: map */
    };

    _editMap = () => {
        this.setState({ mode: "edit" });
    };

    _saveMap = () => {
        this.setState({ mode: "display" });
    };

    _renderEditor = () => {
        const bounds = {
            x1: 4,
            y1: 4,
            x2: 11,
            y2: 16
        };

        let button = null;
        if (this.props.editable) {
            button = (
                <button className="btn btn-primary" onClick={this._saveMap}>
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
                    onTopologyChange={this._handleTopologyChanged}
                />
                <br />
                {button}
            </div>
        );

        return editor;
    };
}
