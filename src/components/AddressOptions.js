import React, { Component } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  IconButton,
} from "@material-ui/core";
import { DeleteIcon } from "@material-ui/icons";

export default class AddressOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curAddress: "",
    };
  }

  handleSelectChange = (event) => {
    this.setState({ curAddress: event.target.value });
    this.props.handleFieldChange(
      event.target.value,
      event.target.name
    );
  };

  render() {
    return (
      <div className="form-step">
        <div className="form-step__field">
          <FormControl
            required
            fullWidth
            variant="outlined"
            className="form-control"
          >
            <InputLabel className="label-control">Work Address</InputLabel>
            <Select
              className="select-control"
              value={this.state.curAddress}
              name="address"
              onChange={this.handleSelectChange}
              value={this.props.fieldDefaultVals}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem
                value="1201 Davis Street, Evanston IL, 60208"
                label="1201 Davis Street, Evanston IL, 60208"
              >
                1201 Davis Street, Evanston IL, 60208
              </MenuItem>
              <MenuItem
                value="10 Rockefeller Plaza, Suite 800, New York, NY 10020"
                label="10 Rockefeller Plaza, Suite 800, New York, NY 10020"
              >
                10 Rockefeller Plaza, Suite 800, New York, NY 10020
              </MenuItem>
              <MenuItem
                value="44 Montgomery Street, Suite 1250, San Francisco, CA 94104"
                label="44 Montgomery Street, Suite 1250, San Francisco, CA 94104"
              >
                44 Montgomery Street, Suite 1250, San Francisco, CA 94104
              </MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }
}
