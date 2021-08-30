import React, { Component } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  IconButton
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

export default class ParentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      degreeType: "",
      classYear: 0
    };
  }

  isYearNotZero = () => {
    if (this.state.classYear === 0) {
      return false;
    } else {
      return true;
    }
  };

  handleSelectChange = event => {
    var gradType = "parentInfo";
    this.setState({ degreeType: event.target.value });
    this.props.handleDegreeChange(
      event.target.value,
      gradType,
      event.target.name,
      this.props.arrayID
    );
  };

  handleChange = event => {
    var gradType = "parentInfo";
    this.setState({ classYear: event.target.value });
    this.props.handleDegreeChange(
      event.target.value,
      gradType,
      event.target.name,
      this.props.arrayID
    );
  };

  handleDeleteClick = event => {
    console.log(event.value);
  }

  render() {
    const ParentDegreeType = (
      <div className="form-step__field">
        <FormControl
          required
          fullWidth
          variant="outlined"
          className="form-control"
        >
          <InputLabel className="label-control">Select parent, or grandparent</InputLabel>
          <Select
            className="select-control"
            value={this.props.fieldDefaultVals[0]}
            name="degree"
            onChange={this.handleSelectChange}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="P" label="Parent of students or alumni (P)">
            Parent of students or alumni (P)
            </MenuItem>
            <MenuItem value="GP" label="Grandparent of students or alumni (GP)">
            Grandparent of students or alumni (GP)
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    );
    return (
      <div className="form-step double degree">
        {ParentDegreeType}
        <FormControl className="form-step__field year">
          <TextField
            className="field__input"
            required
            fullWidth
            variant="outlined"
            value={this.props.fieldDefaultVals[1]}
            label="Class Year"
            name="year"
            onChange={this.handleChange}
            error={this.state.classYear !== 0 && !this.props.isYearValid}
          ></TextField>
          {this.state.classYear !== 0 && !this.props.isYearValid && (
            <div className="errorText">
              * Year must be between 1934 and 2026
            </div>
          )}
        </FormControl>
        <IconButton
          onClick={e => this.props.handleRemoveDegree(this.props.arrayID, "parentInfo")}
          aria-label="remove degree info"
          label="test"
        >
          <Delete />
        </IconButton>
      </div>
    );
  }
}
