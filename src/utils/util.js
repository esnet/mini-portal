import d3 from "d3";
import moment from "moment";

export function scaleUnits(value, unit) {
        let unitName = unit || "B";
        let prefix = d3.formatPrefix(value, 3);
        let scaled = d3.round(prefix.scale(value), 2);
        return `${scaled} ${prefix.symbol}${unitName}`;
}

export function formatDate(d) {
    let m = moment(d);
    return m.format("MMM DD YYYY HH:mm:ss");
}

