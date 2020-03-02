import React, { Component } from "react";

export default class Button extends Component {
  render() {
    return (
      <button className="button" onClick={this.props.handleClick}>
        Generate Signature
      </button>
    );
  }
}
