import React from "react";
import "./style.css";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Form from "./components/Form";
import Output from "./components/Output";
import nuPurple from "@material-ui/core/colors/nuPurple";

const theme = createMuiTheme({
  palette: {
    primary: nuPurple
  },
  typography: {
    fontFamily: ['"Akkurat Pro Regular"']
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generateButtonClicked: false,
      firstName: "",
      lastName: "",
      isUndergradAlum: false,
      isGradAlum: false,
      underGradInfo: [],
      gradInfo: [],
      pronouns: {
        subject: "",
        object: "",
        possessive: ""
      },
      title: "",
      department: "",
      org: "Alumni Relations and Development",
      specialMsg: "Commemorating 150 years of women students",
      address: "",
      city: "",
      state: "",
      zip: "",
      officePhoneNum: "",
      cellPhoneNum: "",
      phoneNumValidity: {
        office: false,
        cell: false
      }
    };
  }

  isClassYearValid = yearInput => {
    yearInput = parseInt(yearInput);
    if (yearInput >= 1935 && yearInput <= 2025) {
      return true;
    } else {
      return false;
    }
  };

  isPhoneNumValid = phoneNum => {
    var isnum = /^\d+$/.test(phoneNum);
    if (isnum) {
      if (phoneNum.length === 10) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  handlePronounChange = (value, fieldName) => {
    const myNewState = { ...this.state };
    myNewState.pronouns[fieldName] = value;
    this.setState(myNewState);
  };

  handleFieldChange = (value, fieldName) => {
    const myNewState = { ...this.state };
    myNewState[fieldName] = value;
    if (fieldName === "officePhoneNum" || fieldName === "cellPhoneNum") {
      var isThisPhoneNumValid = this.isPhoneNumValid(value);
      var phoneType = fieldName.substring(0, fieldName.length - 8);
      if (isThisPhoneNumValid) {
        myNewState.phoneNumValidity[phoneType] = true;
      } else {
        myNewState.phoneNumValidity[phoneType] = false;
      }
    }
    this.setState(myNewState);
  };

  handleDegreeChange = (value, gradType, fieldName, index) => {
    const myNewState = { ...this.state };
    myNewState[gradType][index][fieldName] = value;
    if (fieldName === "year") {
      var isThisYearValid = this.isClassYearValid(value);
      if (isThisYearValid) {
        myNewState[gradType][index].isYearValid = true;
      } else {
        myNewState[gradType][index].isYearValid = false;
      }
    }
    this.setState(myNewState);
  };

  handleAddDegree = () => {
    const obj = { degree: "", year: 0, isYearValid: false };
    this.setState({
      gradInfo: [...this.state.gradInfo, obj]
    });
  };

  handleRemoveDegree = value => {};

  handleUndergradAlumToggle = () => {
    const { isUndergradAlum } = this.state;
    if (isUndergradAlum) {
      this.setState({ underGradInfo: [] });
      this.setState({ isUndergradAlum: !isUndergradAlum });
    } else {
      const obj = { year: 0, isYearValid: false };
      this.setState({
        underGradInfo: [...this.state.underGradInfo, obj]
      });
      this.setState({ isUndergradAlum: !isUndergradAlum });
    }
  };

  handleGradAlumToggle = () => {
    const { isGradAlum } = this.state;
    if (isGradAlum) {
      this.setState({ gradInfo: [] });
      this.setState({ isGradAlum: !isGradAlum });
    } else {
      const obj = { degree: "", year: 0, isYearValid: false };
      this.setState({
        gradInfo: [...this.state.gradInfo, obj]
      });
      this.setState({ isGradAlum: !isGradAlum });
    }
  };

  handleDateChange = () => {
    const myNewState = { ...this.state };
    myNewState.buttonClicked = true;
    this.setState(myNewState);
  };

  handleClick = () => {
    if (
      this.state.firstName.length > 0 &&
      this.state.lastName.length > 0 &&
      this.state.title.length > 0 &&
      this.state.department.length > 0 &&
      this.state.address.length > 0 &&
      this.state.city.length > 0 &&
      this.state.state.length > 0 &&
      this.state.zip.length > 0
    ) {
      const myNewState = { ...this.state };
      myNewState.generateButtonClicked = true;
      this.setState(myNewState);
    } else {
      console.log(
        "You cant generate a signature without filling out the required fields"
      );
    }
  };

  render() {
    const stateCopy = { ...this.state };

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App container">
          <h2>ARD Email Signature Generator</h2>
          <p>
            This tool will generate a branded email signature for your
            northwestern staff email. Simply fill out the form below, and click
            ‘Generate Signature’.
          </p>
          <p>
            For further instructions on how to set a signature on Outlook follow
            &nbsp;
            <a href="https://support.office.com/en-us/article/create-and-add-a-signature-to-messages-8ee5d4f4-68fd-464a-a1c1-0e1c80bb27f2">
              this guide
            </a>
            .
          </p>
          <Form
            globalState={stateCopy}
            handleClick={this.handleClick}
            handleUndergradAlumToggle={this.handleUndergradAlumToggle}
            handleGradAlumToggle={this.handleGradAlumToggle}
            isUndergradAlum={this.state.isUndergradAlum}
            isGradAlum={this.state.isGradAlum}
            underGradInfo={this.state.underGradInfo}
            gradInfo={this.state.gradInfo}
            handleAddDegree={this.handleAddDegree}
            handleRemoveDegree={this.handleRemoveDegree}
            handleFieldChange={this.handleFieldChange}
            handlePronounChange={this.handlePronounChange}
            handleDegreeChange={this.handleDegreeChange}
            phoneNumValidity={this.state.phoneNumValidity}
          />
          {this.state.generateButtonClicked && (
            <Output globalState={stateCopy} />
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
