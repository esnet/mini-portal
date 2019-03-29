
### Create Charts

To display charts using the `react-timeseries-charts` library, 

```js
import {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    AreaChart,
    Resizable,
    styler
} from "react-timeseries-charts";

let upDownStyle = styler([{ key: "in", color: "#C8D5B8" }, { key: "out", color: "#9BB8D7" }]);

let chart = (
    <Resizable>
        <ChartContainer
            timeRange={timerange}
            onTrackerChanged={this.handleTrackerChanged}
            trackerPosition={tracker}
            minDuration={1000 * 60 * 60}
            maxTime={timerange.end()}
            minTime={timerange.begin()}
        >
            <ChartRow height="150">
                <Charts>
                    <AreaChart
                        axis="traffic"
                        fillOpacity={0.8}
                        series={timeSeries}
                        columns={{ up: ["in"], down: ["out"] }}
                        style={upDownStyle}
                    />
                </Charts>
                <YAxis
                    id="traffic"
                    label="Traffic (bps)"
                    min={-maxValue}
                    max={maxValue}
                    absolute={true}
                    width="60"
                    type="linear"
                />
            </ChartRow>
        </ChartContainer>
    </Resizable>
);
```