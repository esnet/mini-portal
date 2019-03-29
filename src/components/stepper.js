/**
 *  Copyright (c) 2017 - present, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "underscore";

export default class Stepper extends Component {
    displayName = "Stepper"

    getStep() {
        let step = -1;
        let loc = window.location.pathname;

        if (loc.indexOf("step") > -1) {
            step = parseInt(loc[loc.length - 1], 10);
        }

        return step;
    }

    render() {
        let step = this.getStep();

        let steps = _.map([-1, 0, 1, 2, 3, 4], function(n) {
            if (n === -1) {
                if (n === step) {
                    return (
                        <li key={n} className="active">
                            <span>Intro</span>
                        </li>
                    );
                }
                return (
                    <li key={n}>
                        <Link to="/">Intro</Link>
                    </li>
                );
            }
            if (n === step) {
                return (
                    <li key={n} className="active">
                        <span>
                            Step {n}
                        </span>
                    </li>
                );
            } else {
                return (
                    <li key={n}>
                        <Link to={`/step${n}`}>
                            Step {n}
                        </Link>
                    </li>
                );
            }
        });

        return (
            <nav>
                <ul className="pagination pull-left">
                    {steps}
                </ul>
            </nav>
        );
    }
}
