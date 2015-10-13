import React from "react";
import Router from "react-router";

var {RouteHandler, History} = Router;
import hotkey from "react-hotkey";

hotkey.activate();

import Stepper from "./stepper";

export default React.createClass({

    // Router state
    mixins: [History, hotkey.Mixin("handleHotkey")],

    handleHotkey(e) {
        e.preventDefault();
        let key = String.fromCharCode(e.which);
        if (key in ["0", "1", "2", "3"]) {
            window.location.hash = `#/step${key}`;
        }
    },

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
                    <RouteHandler />
                </div>
            </div>
        );
    }
});
