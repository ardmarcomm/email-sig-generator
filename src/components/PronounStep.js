import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

const subjects = [
  { title: "", value: "", type: "subject" },
  { title: "(f)ae", value: "(f)ae", type: "subject" },
  { title: "e/ey", value: "e/ey", type: "subject" },
  { title: "he", value: "he", type: "subject" },
  { title: "per", value: "per", type: "subject" },
  { title: "she", value: "she", type: "subject" },
  { title: "they", value: "they", type: "subject" },
  { title: "ve", value: "ve", type: "subject" },
  { title: "xe", value: "xe", type: "subject" },
  { title: "ze/zie", value: "ze/zie", type: "subject" },
];

const objects = [
  { title: "", value: "", type: "object" },
  { title: "(f)aer", value: "(f)aer", type: "object" },
  { title: "em", value: "em", type: "object" },
  { title: "him", value: "him", type: "object" },
  { title: "per", value: "per", type: "object" },
  { title: "her", value: "her", type: "object" },
  { title: "them", value: "them", type: "object" },
  { title: "verr", value: "ve", type: "object" },
  { title: "xem", value: "xem", type: "object" },
  { title: "hir", value: "hir", type: "object" },
];

const possessives = [
  { title: "", value: "", type: "possessive" },
  { title: "(f)aers", value: "(f)aers", type: "possessive" },
  { title: "eirs", value: "eirs", type: "possessive" },
  { title: "his", value: "his", type: "possessive" },
  { title: "pers", value: "pers", type: "possessive" },
  { title: "hers", value: "hers", type: "possessive" },
  { title: "theirs", value: "theirs", type: "possessive" },
  { title: "vis", value: "vis", type: "possessive" },
  { title: "xyrs", value: "xyrs", type: "possessive" },
  { title: "hirs", value: "hirs", type: "possessive" },
];

export default class PronounStep extends Component {

  constructor(props) {
    super(props)
    this.state = {
      storageSubject: {},
      storageObject: {},
      storagePossessive: {}
    }
  }

  componentDidMount(){
    const tempState = JSON.parse(localStorage.getItem('localState'));

    if (tempState) {
      var curSubject = {
        title: tempState.pronouns.subject,
        value: tempState.pronouns.subject,
        type: "subject"
      }
      var curObject = {
        title: tempState.pronouns.object,
        value: tempState.pronouns.object,
        type: "object"
      }
      var curPossessive = {
        title: tempState.pronouns.possessive,
        value: tempState.pronouns.possessive,
        type: "possessive"
      }
      
      const filteredObjects = objects.filter((object) =>
      object.value.toLowerCase().includes(curObject.value.toLowerCase())
      );
      if(filteredObjects.length <= 0){
        objects[0] = curObject;
      }

      const filteredSubjects = subjects.filter((subject) =>
      subject.value.toLowerCase().includes(curSubject.value.toLowerCase())
      );
      if(filteredSubjects.length <= 0){
      subjects[0] = curSubject;
      }
      const filteredPossessives = possessives.filter((possessive) =>
      possessive.value.toLowerCase().includes(curPossessive.value.toLowerCase())
      );
      if(filteredPossessives.length <= 0){
        possessives[0] = curPossessive;
      }

      this.setState({storageSubject: curSubject});
      this.setState({storageObject: curObject});
      this.setState({storagePossessive: curPossessive});
    } else {
      console.log("There was no local storage memory");
    }
  }

  handleChange = (e, value) => {
    console.log(value);
    if(value !== null){
      this.props.handlePronounChange(value.value, value.type);
    }
  };

  handleTextFieldChangeSubject = (event) => {
    console.log(event.target.value);
    const filteredSubjects = subjects.filter((subject) =>
      subject.value.toLowerCase().includes(event.target.value.toLowerCase())
    );
    console.log(filteredSubjects);
    if (filteredSubjects.length > 0) {
      console.log("this means there were some matches");
    } else {
      const newSubject = {
        title: event.target.value,
        value: event.target.value,
        type: "subject",
      };
      subjects[0] = newSubject;
      this.props.handlePronounChange(event.target.value, "subject");
    }
  };

  handleTextFieldChangeObject = (event) => {
    console.log(event.target.value);
    const filteredObjects = objects.filter((object) =>
      object.value.toLowerCase().includes(event.target.value.toLowerCase())
    );
    console.log(filteredObjects);
    if (filteredObjects.length > 0) {
      console.log("this means there were some matches");
    } else {
      const newObject = {
        title: event.target.value,
        value: event.target.value,
        type: "object",
      };
      subjects[0] = newObject;
      this.props.handlePronounChange(event.target.value, "object");
    }
  };

  handleTextFieldChangePossessive = (event) => {
    console.log(event.target.value);
    const filteredPossessives = possessives.filter((possessive) =>
      possessive.value.toLowerCase().includes(event.target.value.toLowerCase())
    );
    console.log(filteredPossessives);
    if (filteredPossessives.length > 0) {
      console.log("this means there were some matches");
    } else {
      const newPossessive = {
        title: event.target.value,
        value: event.target.value,
        type: "possessive",
      };
      possessives[0] = newPossessive;
      this.props.handlePronounChange(event.target.value, "possessive");
    }
  };

  render() {
    return (
      <div className="form-step triple pronouns">
        <div className="form-step__field">
          <Autocomplete
            options={subjects}
            getOptionLabel={(option) => option.title}
            style={{ width: "100%" }}
            onChange={this.handleChange}
            name={this.props.fieldName[0]}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                className="field__input"
                label={this.props.fieldLabel[0]}
                name={this.props.fieldName[0]}
                onChange={this.handleTextFieldChangeSubject}
                defaualtValue={this.state.storageSubject}
                variant="outlined"
              />
            )}
          />
        </div>
        <div className="form-step__field">
          <Autocomplete
            options={objects}
            getOptionLabel={(option) => option.title}
            style={{ width: "100%" }}
            onChange={this.handleChange}
            name={this.props.fieldName[1]}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                className="field__input"
                label={this.props.fieldLabel[1]}
                name={this.props.fieldName[1]}
                onChange={this.handleTextFieldChangeObject}
                variant="outlined"
              />
            )}
          />
        </div>
        <div className="form-step__field">
          <Autocomplete
            options={possessives}
            getOptionLabel={(option) => option.title}
            style={{ width: "100%" }}
            onChange={this.handleChange}
            name={this.props.fieldName[2]}
            freeSolo
            renderInput={(params) => (
              <TextField
                {...params}
                className="field__input"
                label={this.props.fieldLabel[2]}
                name={this.props.fieldName[2]}
                onChange={this.handleTextFieldChangePossessive}
                variant="outlined"
              />
            )}
          />
        </div>
      </div>
    );
  }
}
