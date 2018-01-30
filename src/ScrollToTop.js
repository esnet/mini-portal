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
import { withRouter } from "react-router-dom";

class ScrollToTop extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    componentWillReceiveProps(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return <div>{this.props.children}</div>;
    }
}

export default withRouter(ScrollToTop);
