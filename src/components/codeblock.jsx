import React, { Component } from "react";

import Markdown from "react-markdown";

import Highlighter from "./highlighter";
import Spinner from "./spinner";
import $ from "jquery";

export default class CodeBlock extends Component {
    displayName: "CodeBlock";

    mixins: [Highlighter];

    state = {
        codeLoaded: false,
        code: null
    };

    componentWillMount() {
        let file = this.props.file;

        $.ajax({
            url: `${file}`,
            dataType: "text",
            type: "GET",
            contentType: "text/plain",
            success: function(data) {
                this._receiveFile(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(`Failed to load code: ${file}`, err);
            }
        });
    }

    _receiveFile(text) {
        let codeKey = this.props.codeKey;
        let startMarker = `/** start: ${codeKey} */`;
        let endMarker = `/** end: ${codeKey} */`;

        let lines = text.split("\n");

        let inBlock = false;
        let included = [];
        let nsnippets = 0;

        for (let line of lines) {
            if (line === startMarker) {
                nsnippets++;
                inBlock = true;
                included.push(`#### Snippet ${nsnippets} (${codeKey})`);
                included.push("```js");
                continue;
            }
            if (line === endMarker) {
                inBlock = false;
                included.push("```");
                continue;
            }
            if (inBlock) {
                included.push(line);
            }
        }

        let code = included.join("\n");

        this.setState({
            codeLoaded: true,
            code: code
        });
    }

    render() {
        if (this.state.codeLoaded) {
            return <Markdown source={this.state.code} />;
        } else {
            return <Spinner />;
        }
    }
}
