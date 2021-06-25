import React, { Component } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  IconButton,
} from "@material-ui/core";
import Papa from "papaparse";
import { DeleteIcon } from "@material-ui/icons";
const csvURL =
  "https://s3.us-east-2.amazonaws.com/assets.ard.northwestern.edu/files/email-sig-generator/university-specific-programming-messages.csv";

export default class UniversityProgramming extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curMsg: "",
      msgChoices: [],
    };
  }

  componentDidMount() {
    Papa.parse(csvURL, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.updateData.bind(this),
    });
  }

  updateData(result) {
    const data = result.data;
    const filteredData = data.filter(msg =>{
      if(msg.isEnabledChoice.toLowerCase().includes("true")){
        msg.messageCopy = msg.messageCopy.replace("&#8209;", "–");
        return true;
      }
    }
    );
    this.setState({ msgChoices: filteredData });
  }

  handleSelectChange = (event) => {
    this.setState({ curMsg: event.target.value });
    this.props.handleFieldChange(event.target.value, event.target.name);
  };

  render() {
    return (
      <div className="form-step">
        <div className="form-step__field">
          <FormControl
            fullWidth
            variant="outlined"
            className="form-control"
          >
            <InputLabel className="label-control">
              Programming Message
            </InputLabel>
            <Select
              className="select-control"
              value={this.state.curAddress}
              name="specialMsg"
              onChange={this.handleSelectChange}
              value={this.props.fieldDefaultVals}
            >
              <MenuItem value=""></MenuItem>
              <MenuItem value="" label="No message">No message</MenuItem>
              {this.state.msgChoices.map((msg, index) => (
                <MenuItem value={msg.messageCopy} label={msg.messageCopy}>
                  {msg.messageCopy}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    );
  }
}
