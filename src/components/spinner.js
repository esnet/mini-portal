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

import loader from "../img/loader.gif";

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