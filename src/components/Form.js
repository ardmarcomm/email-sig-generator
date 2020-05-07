import React, { Component } from "react";
import ReactDOM from "react-dom";
import DoubleInputStep from "./DoubleInputStep";
import InputStep from "./InputStep";
import Button from "./Button";
import CheckboxStep from "./CheckboxStep";
import DegreeInfo from "./DegreeInfo";
import ParentInfo from "./ParentInfo";
import PronounStep from "./PronounStep";
import AddressOptions from "./AddressOptions";
import UniversityProgramming from "./UniversityProgramming"; 
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddBoxOutlined";

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      firstNameDefault: "",
      lastNameDefault: "",
    };
  }

  render() {
    const undergradDegrees = this.props.underGradInfo;
    const gradDegrees = this.props.gradInfo;
    const parentDegrees = this.props.parentInfo;
    const UndergradField = (
      <div className="form-step degrees">
        {undergradDegrees.map((degree, index) => (
          <DegreeInfo
            key={index}
            arrayID={index}
            handleDegreeChange={this.props.handleDegreeChange}
            fieldDefaultVals={[
              "",
              this.props.globalState.underGradInfo[index].year,
            ]}
            gradDegree={false}
            isYearValid={degree.isYearValid}
          />
        ))}
      </div>
    );
    const GradField = (
      <div className="form-step degrees">
        {gradDegrees.map((degree, index) => (
          <DegreeInfo
            key={index}
            arrayID={index}
            handleRemoveDegree={this.props.handleRemoveDegree}
            handleDegreeChange={this.props.handleDegreeChange}
            fieldDefaultVals={[
              this.props.globalState.gradInfo[index].degree,
              this.props.globalState.gradInfo[index].year,
            ]}
            gradDegree={true}
            isYearValid={degree.isYearValid}
          />
        ))}
        <div className="add-degree" onClick={this.props.handleAddDegree}>
          <IconButton
            onClick={this.props.handleAddDegree}
            aria-label="add a degree"
            label="test"
          >
            <AddIcon />
          </IconButton>
          Add Northwestern Degree
        </div>
      </div>
    );

    const ParentField = (
      <div className="form-step degrees">
        {parentDegrees.map((degree, index) => (
          <ParentInfo
            key={index}
            arrayID={index}
            handleRemoveDegree={this.props.handleRemoveDegree}
            handleDegreeChange={this.props.handleDegreeChange}
            fieldDefaultVals={[
              this.props.globalState.parentInfo[index].degree,
              this.props.globalState.parentInfo[index].year,
            ]}
            isYearValid={degree.isYearValid}
          />
        ))}
        <div className="add-degree" onClick={this.props.handleAddParentDegree}>
          <IconButton
            onClick={this.props.handleAddParentDegree}
            aria-label="add a degree"
            label="test"
          >
            <AddIcon />
          </IconButton>
          Add Northwestern Degree
        </div>
      </div>
    );

    const GenerateSigError = (
      <div className="error-messages">
        You must fill all required fields (indicated with a *) before generating
        a signature.
      </div>
    );
    return (
      <article className="sig-form">
        <h3>Name</h3>
        <DoubleInputStep
          fieldName={["firstName", "lastName"]}
          fieldLabel={["First Name", "Last Name"]}
          handleFieldChange={this.props.handleFieldChange}
          fieldDefaultVals={[
            this.props.globalState.firstName,
            this.props.globalState.lastName,
          ]}
          isRequired={[true, true]}
        />
        <InputStep
          fieldName={"middleName"}
          fieldLabel={"Middle or Former Name (Optional)"}
          fieldDefaultVals={this.props.globalState.middleName}
          handleFieldChange={this.props.handleFieldChange}
          isRequired={false}
          halfWidth={true}
        />
        <h3>Alumni Designation</h3>
        <div className="checkboxes">
          <div className="form-step">
            <CheckboxStep
              fieldName="Are You a Northwestern Undergraduate Alum?"
              handleAlumToggle={this.props.handleUndergradAlumToggle}
              isChecked={this.props.globalState.isUndergradAlum}
            />
            {this.props.isUndergradAlum && UndergradField}
          </div>
          <div className="form-step">
            <CheckboxStep
              fieldName="Are You a Northwestern Graduate/Professional Degree Holder?"
              handleAlumToggle={this.props.handleGradAlumToggle}
              isChecked={this.props.globalState.isGradAlum}
            />
            {this.props.isGradAlum && GradField}
          </div>
          <div className="form-step">
            <CheckboxStep
              fieldName="Are You the Parent/Grandparent of a Northwestern Student or Graduate?"
              handleAlumToggle={this.props.handleParentAlumToggle}
              isChecked={this.props.globalState.isParentAlum}
            />
            {this.props.isParentAlum && ParentField}
          </div>
        </div>
        <h3>Job</h3>
        <DoubleInputStep
          fieldName={["title", "department"]}
          fieldLabel={["Job Title", "Department"]}
          handleFieldChange={this.props.handleFieldChange}
          fieldDefaultVals={[
            this.props.globalState.title,
            this.props.globalState.department,
          ]}
          autoComplete={true}
          isRequired={[true, true]}
        />
        <h3>Pronouns</h3>
        <div className="sub-head-helper">Optional</div>
        <PronounStep
          fieldName={["subject", "object", "possessive"]}
          fieldLabel={["Subject", "Object", "Possessive"]}
          handlePronounChange={this.props.handlePronounChange}
        />
        <h3>Work Address</h3>
        <AddressOptions
          handleFieldChange={this.props.handleFieldChange}
          fieldDefaultVals={this.props.globalState.address}
          isRequired={true}
        />
        <h3>Contact Information</h3>
        <div className="sub-head-helper">Cell phone number is optional</div>
        <DoubleInputStep
          fieldName={["officePhoneNum", "cellPhoneNum"]}
          fieldLabel={["Office Phone Number", "Cell Phone Number"]}
          handleFieldChange={this.props.handleFieldChange}
          fieldDefaultVals={[
            this.props.globalState.officePhoneNum,
            this.props.globalState.cellPhoneNum,
          ]}
          autoComplete={false}
          phoneNumValidity={this.props.phoneNumValidity}
          isRequired={[true, false]}
        />
        <h3>University-Specific Programming</h3>
        <div className="sub-head-helper">University-specific programming is optional.</div>
        <UniversityProgramming
          handleFieldChange={this.props.handleFieldChange}
          fieldDefaultVals={this.props.globalState.specialMsg}
          isRequired={false}
        />
        {this.props.cantGenerateSig && GenerateSigError}
        <Button handleClick={this.props.handleClick}></Button>
      </article>
    );
  }
}
