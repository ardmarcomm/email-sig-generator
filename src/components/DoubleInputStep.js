import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

export default class DoubleInputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      officePhoneNum: 0,
      cellPhoneNum: 0
    };
  }

  handleChange = event => {
    const myNewState = { ...this.state };
    myNewState[event.target.name] = event.target.value;
    this.setState(myNewState);
    this.props.handleFieldChange(event.target.value, event.target.name);
  };

  render() {
    return (
      <div className="form-step double">
        <div className="form-step__field">
          <TextField
            className="field__input"
            required={this.props.isRequired[0]}
            value={this.props.fieldDefaultVals[0]}
            fullWidth
            variant="outlined"
            name={this.props.fieldName[0]}
            label={this.props.fieldLabel[0]}
            onChange={this.handleChange}
            error={
              this.state.officePhoneNum !== 0 &&
              !this.props.phoneNumValidity.office
            }
          />
          {this.state.officePhoneNum !== 0 &&
            !this.props.phoneNumValidity.office && (
              <div className="errorText">* Must be 10 digit phone number (no hyphens, or special characters)</div>
            )}
        </div>
        <div className="form-step__field">
          <TextField
            required={this.props.isRequired[1]}
            className="field__input"
            value={this.props.fieldDefaultVals[1]}
            fullWidth
            variant="outlined"
            name={this.props.fieldName[1]}
            label={this.props.fieldLabel[1]}
            onChange={this.handleChange}
            error={
              this.state.cellPhoneNum !== 0 && !this.props.phoneNumValidity.cell
            }
          />
          {this.state.cellPhoneNum !== 0 &&
            !this.props.phoneNumValidity.cell && (
              <div className="errorText">* Must be 10 digit phone number (no hyphens, or special characters)</div>
            )}
        </div>
      </div>
    );
  }
}
