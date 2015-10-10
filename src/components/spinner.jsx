"use strict";

var React = require("react");
var loader = document.createElement("img");
loader.src = require("../../static/img/loader.gif");

/** start: spin */
var Spinner = React.createClass({
    render: function () {
        return (
            <div>
                <img className="img-responsive"
                     style={{margin: "0 auto", paddingTop: "50px"}}
                     src={loader.src} />
            </div>
        );
    }
});
/** end: spin */

module.exports = Spinner;
