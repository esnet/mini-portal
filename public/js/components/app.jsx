import React from "react";
import Router from "react-router";

var {RouteHandler, History} = Router;
import hotkey from "react-hotkey";

hotkey.activate();

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
                    <div className="col-md-12">
                        <hr />
                    </div>
                </div>
                <RouteHandler />
            </div>
        );
    }
});
