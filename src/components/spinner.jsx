import React, { Component } from "react";

import loader from "../img/loader.gif";

/** start: spin */
export default class Spinner extends Component {
    render() {
        return (
            <div>
                <img
                    className="img-responsive"
                    style={{ margin: "0 auto", paddingTop: "50px" }}
                    src={loader}
                    alt="Item loading..."
                />
            </div>
        );
    }
}
/** end: spin */
