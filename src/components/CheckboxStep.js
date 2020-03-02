import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const PurpleCheckbox = withStyles({
  root: {
    color: "#836EAA",
    "&$checked": {
      color: "#4e2a84"
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

export default class CheckboxStep extends Component {
  render() {
    return (
      <FormControlLabel
        control={<PurpleCheckbox size="medium" />}
        label={this.props.fieldName}
        onChange={this.props.handleAlumToggle}
        className="margin-bot__small"
      />
    );
  }
}
