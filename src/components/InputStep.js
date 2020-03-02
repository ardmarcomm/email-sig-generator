import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

export default class InputField extends Component {
  handleChange = event => {
    this.props.handleFieldChange(event.target.value, event.target.name);
  };
  render() {
    return (
      <div className="form-step">
        <div className="form-step__field">
          <TextField
            className="field__input"
            required
            fullWidth
            variant="outlined"
            name={this.props.fieldName}
            label={this.props.fieldLabel}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}
