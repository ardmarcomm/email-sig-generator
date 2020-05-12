import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const subjects = [
  { title: "(f)ae", value: "(f)ae", type: "subject" },
  { title: "e/ey", value: "e/ey", type: "subject" },
  { title: "he", value: "he", type: "subject" },
  { title: "per", value: "per", type: "subject" },
  { title: "she", value: "she", type: "subject" },
  { title: "they", value: "they", type: "subject" },
  { title: "ve", value: "ve", type: "subject" },
  { title: "xe", value: "xe", type: "subject" },
  { title: "ze/zie", value: "ze/zie", type: "subject" }
];

const objects = [
  { title: "(f)aer", value: "(f)aer", type: "object" },
  { title: "em", value: "em", type: "object" },
  { title: "him", value: "him", type: "object" },
  { title: "per", value: "per", type: "object" },
  { title: "her", value: "her", type: "object" },
  { title: "them", value: "them", type: "object" },
  { title: "verr", value: "ve", type: "object" },
  { title: "xem", value: "xem", type: "object" },
  { title: "hir", value: "hir", type: "object" }
];

const possessives = [
  { title: "(f)aers", value: "(f)aers", type: "possessive" },
  { title: "eirs", value: "eirs", type: "possessive" },
  { title: "his", value: "his", type: "possessive" },
  { title: "pers", value: "pers", type: "possessive" },
  { title: "hers", value: "hers", type: "possessive" },
  { title: "theirs", value: "theirs", type: "possessive" },
  { title: "vis", value: "vis", type: "possessive" },
  { title: "xyrs", value: "xyrs", type: "possessive" },
  { title: "hirs", value: "hirs", type: "possessive" }
];

export default class PronounStep extends Component {
  handleChange = (e, value) => {
    this.props.handlePronounChange(value.value, value.type);
  };

  render() {
    return (
      <div className="form-step triple pronouns">
        <div className="form-step__field">
          <Autocomplete
            options={subjects}
            getOptionLabel={option => option.title}
            style={{ width: "100%" }}
            onChange={this.handleChange}
            name={this.props.fieldName[0]}
            renderInput={params => (
              <TextField
                {...params}
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
            options={objects}
            getOptionLabel={option => option.title}
            style={{ width: "100%" }}
            onChange={this.handleChange}
            name={this.props.fieldName[1]}
            renderInput={params => (
              <TextField
                {...params}
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
            options={possessives}
            getOptionLabel={option => option.title}
            style={{ width: "100%" }}
            onChange={this.handleChange}
            name={this.props.fieldName[2]}
            renderInput={params => (
              <TextField
                {...params}
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
