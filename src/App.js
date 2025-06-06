import React from "react";
import "./style.css";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Form from "./components/Form";
import Output from "./components/Output";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4e2a84"
    }
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
      middleName: "",
      isUndergradAlum: false,
      isGradAlum: false,
      isParentAlum: false,
      isAcknowledgement: false,
      underGradInfo: [],
      gradInfo: [],
      parentInfo: [],
      pronouns: "",
      title: "",
      department: "",
      org: "Alumni Relations and Development",
      specialMsg: "",
      address: "",
      officePhoneNum: "",
      cellPhoneNum: "",
      phoneNumValidity: {
        office: false,
        cell: false
      },
      cantGenerateSig: false
    };
  }

  componentDidMount() {
    const tempState = JSON.parse(localStorage.getItem("localState"));

    if (tempState) {
      this.setState(tempState);
    } else {
      console.log("There was no local storage memory");
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("localState", JSON.stringify(nextState));
  }

  checkLocalStorage = () => {};

  isClassYearValid = (yearInput) => {
    yearInput = parseInt(yearInput);
    if (yearInput >= 1935 && yearInput <= 2030) {
      return true;
    } else {
      return false;
    }
  };

  isPhoneNumValid = (phoneNum) => {
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
    const obj = { degree: "", year: "", isYearValid: false, errMsg: "" };
    this.setState({
      gradInfo: [...this.state.gradInfo, obj]
    });
  };

  handleAddParentDegree = () => {
    const obj = { degree: "", year: "", isYearValid: false, errMsg: "" };
    this.setState({
      parentInfo: [...this.state.parentInfo, obj]
    });
  };

  handleRemoveDegree = (idx, type) => {
    console.log(type);
    var arrCopy = this.state[type];
    arrCopy.splice(idx, 1);
    this.setState({
      type: arrCopy
    });
    if (arrCopy.length === 0) {
      if (type === "parentInfo") {
        this.setState({ isParentAlum: false });
      } else if (type === "gradInfo") {
        this.setState({ isGradAlum: false });
      } else {
        this.setState({ isUndergradAlum: false });
      }
    }
  };

  handleUndergradAlumToggle = () => {
    const { isUndergradAlum } = this.state;
    if (isUndergradAlum) {
      this.setState({ underGradInfo: [] });
      this.setState({ isUndergradAlum: !isUndergradAlum });
    } else {
      const obj = { year: "", isYearValid: false, errMsg: "" };
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
      const obj = { degree: "", year: "", isYearValid: false, errMsg: "" };
      this.setState({
        gradInfo: [...this.state.gradInfo, obj]
      });
      this.setState({ isGradAlum: !isGradAlum });
    }
  };

  handleAcknowledgementToggle = () => {
    const { isAcknowledgement } = this.state;
    if (isAcknowledgement) {
      this.setState({ isAcknowledgement: !isAcknowledgement });
    } else {
      this.setState({ isAcknowledgement: !isAcknowledgement });
    }
  };

  handleParentAlumToggle = () => {
    const { isParentAlum } = this.state;
    if (isParentAlum) {
      this.setState({ parentInfo: [] });
      this.setState({ isParentAlum: !isParentAlum });
    } else {
      const obj = { degree: "", year: "", isYearValid: false, errMsg: "" };
      this.setState({
        parentInfo: [...this.state.parentInfo, obj]
      });
      this.setState({ isParentAlum: !isParentAlum });
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
      this.state.address.length > 0
    ) {
      const myNewState = { ...this.state };
      myNewState.generateButtonClicked = true;
      myNewState.cantGenerateSig = false;
      this.setState(myNewState);
    } else {
      this.setState({ cantGenerateSig: true });
    }
  };

  render() {
    const stateCopy = { ...this.state };

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App container">
          <h2>ARD Email Signature Generator</h2>
          <p>
            Complete the form below to receive a custom, Northwestern-branded
            signature for your ARD staff email. Simply click “Generate
            Signature” when you’ve provided the requested information.
          </p>
          <p>
            You may copy and paste your new signature into your email template.
            For further instructions on how to set a signature on Outlook,
            follow&nbsp;
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://support.office.com/en-us/article/create-and-add-a-signature-to-messages-8ee5d4f4-68fd-464a-a1c1-0e1c80bb27f2"
            >
              this guide
            </a>
            .
          </p>
          <p>Note: Asterisks (*) indicate required information.</p>
          <Form
            globalState={stateCopy}
            handleClick={this.handleClick}
            handleUndergradAlumToggle={this.handleUndergradAlumToggle}
            handleGradAlumToggle={this.handleGradAlumToggle}
            handleParentAlumToggle={this.handleParentAlumToggle}
            handleAcknowledgementToggle={this.handleAcknowledgementToggle}
            isUndergradAlum={this.state.isUndergradAlum}
            isGradAlum={this.state.isGradAlum}
            isParentAlum={this.state.isParentAlum}
            isAcknowledgement={this.state.isAcknowledgement}
            underGradInfo={this.state.underGradInfo}
            gradInfo={this.state.gradInfo}
            parentInfo={this.state.parentInfo}
            handleAddDegree={this.handleAddDegree}
            handleAddParentDegree={this.handleAddParentDegree}
            handleRemoveDegree={this.handleRemoveDegree}
            handleFieldChange={this.handleFieldChange}
            handlePronounChange={this.handlePronounChange}
            handleDegreeChange={this.handleDegreeChange}
            phoneNumValidity={this.state.phoneNumValidity}
            cantGenerateSig={this.state.cantGenerateSig}
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
