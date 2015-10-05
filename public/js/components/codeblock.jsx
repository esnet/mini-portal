import React from "react";
import _ from "underscore";

import Markdown from "react-markdown";

import Highlighter from "./highlighter";
import Spinner from "./spinner";

export default React.createClass({
    displayName: "CodeBlock",

    mixins: [Highlighter],

    getInitialState() {
        return {
            codeLoaded: false,
            code: null,
        };
    },

    componentWillMount() {
        let file = this.props.file;

        $.ajax({
            url: `code/${file}`,
            dataType: "text",
            type: "GET",
            contentType: "text/plain",
            success: function (data) {
                this._receiveFile(data);
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(`Failed to load code: ${file}`, err);
            }
        });        
    },

    _receiveFile(text) {
        let codeKey = this.props.codeKey;
        let startMarker = `/** start: ${codeKey} */`;
        let endMarker = `/** end: ${codeKey} */`;

        let lines = text.split("\n");

        let line = '';
        let lineno = 0;
        let inBlock = false;
        let included = [];
        let nsnippets = 0;

        for (lineno in lines) {
            line = lines[lineno];
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
    },
       
    render() {
        if (this.state.codeLoaded) {
            return (
                <Markdown source={this.state.code} />
            );
        } else {
            return (
                <Spinner />
            );
        }
    }
});
