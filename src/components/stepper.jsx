import React from "react";
import { Link } from "react-router";

import _ from "underscore";

export default React.createClass({
    displayName: "Stepper",

    _getStep() {
        let step = -1;
        let loc = window.location.pathname;

        if (loc.indexOf("step") > -1) {
            step = parseInt(loc[loc.length-1]);
        }

        return step;
    },

    render() {
        let step = this._getStep();

        let steps = _.map([-1, 0, 1, 2, 3], function (n) {
            if (n === -1) {
                if (n === step) {
                    return (
                        <li key={n} className="active"><span>Intro</span></li>
                    );
                }
                return (
                    <li key={n} >
                        <Link to="/">Intro</Link>
                    </li>
                );
            }
            if (n === step) {
                return (
                    <li key={n} className="active"><span>{n}</span></li>
                );
            } else {
                return (
                    <li key={n}>
                        <Link to={`/step${n}`}>{n}</Link>
                    </li>

                );
            }
        });

        return (
            <nav>
                <ul className="pagination pull-right">
                    {steps}
                </ul>
            </nav>
        );
    }
});
