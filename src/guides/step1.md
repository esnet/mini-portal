
### Fetch data

To fetch json data from a file, 

```js
fetchJSONData() {
    $.ajax({
        url: `${process.env.PUBLIC_URL}/data/traffic.json`,
        dataType: "json",
        type: "GET",
        contentType: "application/json",
        success: function (data) {
            this._receiveTrafficData(data);
        }.bind(this),
        error: function (xhr, status, err) {
            console.error("Failed to load traffic data", err);
        }
    });
}
```

### Process data

Once data is fetched, you can process it using the `pond` library:

```js
import { TimeSeries } from "pondjs";

_receiveTrafficData(data) {
    let processedData = {};
    _.each(data, (d, k) => {
        processedData[k] = new TimeSeries(d);
    });

    let tracker = processedData["Total"].end();

    this.setState({
        trafficData: processedData,
        trafficLoaded: true,
        tracker: tracker
    });
}
```

### Using pond

Using the pond library, we can use the `avg()` and `max()` functions to calculate the respective average and maximum value in our `TimeSeries`

```js
let average = timeseries.avg(direction);
let maximum = timeseries.max(direction);
```

To get the timerange, we use the `range()` method and then format the begin and end time in a custom format

```js
import moment from "moment";

function formatDate(d) {
    let m = moment(d);
    return m.format("MMM DD YYYY HH:mm:ss");
}

let range = trafficData[trafficKey].range("in");
let beginTime = formatDate(range.begin());
let endTime = formatDate(range.end());
```