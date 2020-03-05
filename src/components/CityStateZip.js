import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const cities = [
  { title: "Evanston", value: "Evanston", type: "city" },
  { title: "New York", value: "New York", type: "city" }
];

const states = [
  { title: "IL", value: "IL", type: "state" },
  { title: "NY", value: "NY", type: "state" }
];

const zips = [
  { title: "60208 (Evanston)", value: "60208", type: "zip" },
  { title: "10020 (New York)", value: "10020", type: "zip" }
];

export default class CityStateZip extends Component {
  handleChange = (e, value) => {
    this.props.handleFieldChange(value.value, value.type);
  };

  render() {
    return (
      <div className="form-step triple pronouns">
        <div className="form-step__field">
          <Autocomplete
            options={cities}
            getOptionLabel={option => option.title}
            style={{ width: "100%" }}
            onChange={this.handleChange}
            name={this.props.fieldName[0]}
            renderInput={params => (
              <TextField
                {...params}
                required
                className="field__input"
                label={this.props.fieldLabel[0]}
                name={this.props.fieldName[0]}
                variant="outlined"
              />
            )}
          />
        </div>
        <div className="form-step__field">
          <Autocomplete
            options={states}
            getOptionLabel={option => option.title}
            style={{ width: "100%" }}
            onChange={this.handleChange}
            name={this.props.fieldName[1]}
            renderInput={params => (
              <TextField
                {...params}
                required
                className="field__input"
                label={this.props.fieldLabel[1]}
                name={this.props.fieldName[1]}
                variant="outlined"
              />
            )}
          />
        </div>
        <div className="form-step__field">
          <Autocomplete
            options={zips}
            getOptionLabel={option => option.title}
            style={{ width: "100%" }}
            onChange={this.handleChange}
            name={this.props.fieldName[2]}
            renderInput={params => (
              <TextField
                {...params}
                required
                className="field__input"
                label={this.props.fieldLabel[2]}
                name={this.props.fieldName[2]}
                variant="outlined"
              />
            )}
          />
        </div>
      </div>
    );
  }
}
