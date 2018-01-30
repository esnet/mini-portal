
### Map Editor

To finally draw the map and edit it, we pass in the required parameters to the `MapEditor` component

```js
import { TrafficMap, MapEditor } from "react-network-diagrams";

const bounds = {
    x1: 4,
    y1: 4,
    x2: 11,
    y2: 16
};

return (
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
```