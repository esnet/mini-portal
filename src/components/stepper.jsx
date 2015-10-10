import React from "react";
import _ from "underscore";

export default React.createClass({
    displayName: "Stepper",

    _getStep() {
        let step = -1;
        let hash = window.location.hash;

        if (hash.indexOf("step") > -1) {
            step = parseInt(hash[hash.length-1]);
        }

        return step;
    },

    render() {
        let step = this._getStep();

        let steps = _.map([-1, 0, 1, 2, 3], function(n) {
            let klass = "";
            if (n === step) {
                klass = "active";
            }

            if (n === -1) {
                if (n === step) {
                    return (
                        <li className="active"><span>Intro</span></li>
                    )
                }
                return (
                    <li><a key={`step${n}`} className={klass} href="#">Intro</a></li>
                );
            }
            if (n === step) {
                return (
                    <li className="active"><span>{n}</span></li>
                )
            } else {
                return (
                    <li><a key={`step${n}`} className={klass} href={`#step${n}`}>{n}</a></li>
                )
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
