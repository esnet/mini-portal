
### Map Nodes

To create a node, we define it as follows 

```js
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

    } ...
]
```

### Map Edges

To create an edge between two nodes, we define it as follows

```js
let edges = [
    {
        id: 11,
        capacity: "100G",
        source: "CERN",
        target: "FNAL"
    },
    {

    }...
];
```

### Calculate traffic at each edge

Using the pond library, we can use the `at()` and `in()` functions to calculate the traffic at each edge

```js
let edgeTraffic = {
    "BNL--CERN": trafficData["BNL"].at(index).get("in"),
    "CERN--BNL": trafficData["BNL"].at(index).get("out"),
    "FNAL--CERN": trafficData["FNAL"].at(index).get("in"),
    "CERN--FNAL": trafficData["FNAL"].at(index).get("out")
};

let traffic = new TimeEvent(timestamp, edgeTraffic);
```

To finally draw the map, we pass in the required parameters to the `TrafficMap` component

```js
import { TrafficMap } from "react-network-diagrams";

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
```