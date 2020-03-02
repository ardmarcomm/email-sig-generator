import React, { Component } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  IconButton
} from "@material-ui/core";
import { DeleteIcon } from "@material-ui/icons";

export default class DegreeInfo extends Component {
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
    if (this.props.gradDegree) {
      var gradType = "gradInfo";
    } else {
      var gradType = "underGradInfo";
    }
    this.setState({ degreeType: event.target.value });
    this.props.handleDegreeChange(
      event.target.value,
      gradType,
      event.target.name,
      this.props.arrayID
    );
  };

  handleChange = event => {
    if (this.props.gradDegree) {
      var gradType = "gradInfo";
    } else {
      var gradType = "underGradInfo";
    }
    this.setState({ classYear: event.target.value });
    this.props.handleDegreeChange(
      event.target.value,
      gradType,
      event.target.name,
      this.props.arrayID
    );
  };

  render() {
    const DegreeType = (
      <div className="form-step__field">
        <FormControl
          required
          fullWidth
          variant="outlined"
          className="form-control"
        >
          <InputLabel className="label-control">Degree</InputLabel>
          <Select
            className="select-control"
            value={this.state.degreeType}
            name="degree"
            onChange={this.handleSelectChange}
          >
            <MenuItem value=""></MenuItem>
            <MenuItem value="DDS" label="Doctor of Dental Surgery">
              Doctor of Dental Surgery (DDS)
            </MenuItem>
            <MenuItem value="DPT" label="Doctor of Physical Therapy">
              Doctor of Physical Therapy (DPT)
            </MenuItem>
            <MenuItem value="GME" label="Graduate Medical Education">
              Graduate Medical Education (GME)
            </MenuItem>
            <MenuItem value="DHL" label="Doctor of Humane Letters">
              Doctor of Humane Letters (DHL)
            </MenuItem>
            <MenuItem value="GP" label="Grandparent of student or alumni">
              Grandparent of student or alumni (GP)
            </MenuItem>
            <MenuItem value="JD" label="Juris Doctor">
              Juris Doctor (JD)
            </MenuItem>
            <MenuItem value="LLM" label="Master of Laws">
              Master of Laws (LLM)
            </MenuItem>
            <MenuItem value="MA" label="Master of Arts">
              Master of Arts (MA)
            </MenuItem>
            <MenuItem value="MBA" label="Master of Business Administration ">
              Master of Business Administration (MBA)
            </MenuItem>
            <MenuItem value="MD" label="Doctor of Medicine">
              Doctor of Medicine (MD)
            </MenuItem>
            <MenuItem value="MFA" label="Master of Fine Arts">
              Master of Fine Arts (MFA)
            </MenuItem>
            <MenuItem value="MMus" label="Master of Music">
              Master of Music (MMus)
            </MenuItem>
            <MenuItem value="MS" label="Master of Science">
              Master of Science (MS)
            </MenuItem>
            <MenuItem value="P" label="Parent of students or alumni ">
              Parent of students or alumni (P)
            </MenuItem>
            <MenuItem value="PhD" label="Doctor of Philosophy">
              Doctor of Philosophy (PhD)
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    );
    return (
      <div className="form-step double degree">
        {this.props.gradDegree && DegreeType}
        <FormControl className="form-step__field year">
          <TextField
            className="field__input"
            required
            fullWidth
            variant="outlined"
            label="Class Year"
            name="year"
            onChange={this.handleChange}
            error={this.state.classYear != 0 && !this.props.isYearValid}
          ></TextField>
          {this.state.classYear != 0 && !this.props.isYearValid && (
            <div className="errorText">
              * Year must be between 1934 and 2026
            </div>
          )}
        </FormControl>
      </div>
    );
  }
}
