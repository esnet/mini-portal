import React from "react";
import Router from "react-router";

import Stepper from "./stepper";

export default React.createClass({
    displayName: "MiniPortalApp",

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-9">
                        <div id="title">
                            <h2>mini-portal</h2>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <Stepper />
                    </div>
                </div>

                <div>
                    <div className="row">
                        <div className="col-md-12">
                            <hr />
                        </div>
                    </div>
                    {this.props.children}
                </div>
            </div>
        );
    }
});
