import React, { Component } from "react";
import DoubleInputStep from "./DoubleInputStep";
import InputStep from "./InputStep";
import Button from "./Button";
import CheckboxStep from "./CheckboxStep";
import DegreeInfo from "./DegreeInfo";
import ParentInfo from "./ParentInfo";
import AddressOptions from "./AddressOptions";
import UniversityProgramming from "./UniversityProgramming";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddBoxOutlined";

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      firstNameDefault: "",
      lastNameDefault: ""
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
            handleRemoveDegree={this.props.handleRemoveDegree}
            fieldDefaultVals={[
              "",
              this.props.globalState.underGradInfo[index].year
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
              this.props.globalState.gradInfo[index].year
            ]}
            errMsg={this.props.globalState.gradInfo[index].errMsg}
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
          Add another
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
              this.props.globalState.parentInfo[index].year
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
          Add another
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
            this.props.globalState.lastName
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
        <p>Check all that apply</p>
        <div className="checkboxes">
          <div className="form-step">
            <CheckboxStep
              fieldName="Northwestern Undergraduate Alum"
              handleAlumToggle={this.props.handleUndergradAlumToggle}
              isChecked={this.props.globalState.isUndergradAlum}
            />
            {this.props.isUndergradAlum && UndergradField}
          </div>
          <div className="form-step">
            <CheckboxStep
              fieldName="Northwestern Graduate Degree, Professional Degree, or Certificate Holder"
              handleAlumToggle={this.props.handleGradAlumToggle}
              isChecked={this.props.globalState.isGradAlum}
            />
            {this.props.isGradAlum && GradField}
          </div>
          <div className="form-step">
            <CheckboxStep
              fieldName="Parent/Grandparent of a Northwestern Student or Graduate"
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
            this.props.globalState.department
          ]}
          autoComplete={true}
          isRequired={[true, true]}
        />
        <h3>Pronouns</h3>
        <div className="sub-head-helper">
          Optional (e.g., she/her/hers, he/him/his, and they/their/theirs, etc.)
        </div>
        <InputStep
          fieldName={"pronouns"}
          fieldLabel={"Pronouns"}
          fieldDefaultVals={this.props.globalState.pronouns}
          handleFieldChange={this.props.handleFieldChange}
          isRequired={false}
          halfWidth={true}
        />
        <h3>Address</h3>
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
            this.props.globalState.cellPhoneNum
          ]}
          autoComplete={false}
          phoneNumValidity={this.props.phoneNumValidity}
          isRequired={[true, false]}
        />
        {/* <h3>University-Specific Programming</h3>
        <div className="sub-head-helper">Optional Programming Message</div>
        <UniversityProgramming
          handleFieldChange={this.props.handleFieldChange}
          fieldDefaultVals={this.props.globalState.specialMsg}
          isRequired={false}
        /> */}
        <h3>Land Acknowledgment</h3>
        <div className="sub-head-helper">
          Optional Land Acknowledgment Message
        </div>
        <div className="form-step">
          <CheckboxStep
            fieldName="Check if you would like to include Northwestern’s land acknowledgment in your email signature (optional)"
            handleAlumToggle={this.props.handleAcknowledgementToggle}
            isChecked={this.props.isAcknowledgement}
          />
          <p>
            A land acknowledgment is a formal statement that recognizes and
            respects Indigenous peoples as traditional stewards of this land and
            the enduring relationship that exists between Indigenous peoples and
            their traditional territories. To recognize the land is an
            expression of gratitude and appreciation to those whose territory
            you reside on, and a way of honoring the Indigenous people who have
            been living and working on the land from time immemorial. ARD staff
            may choose to include Northwestern’s land acknowledgment in their
            email signatures. Learn more about the land acknowledgment{" "}
            <a href="http://northwestern.edu/native-american-and-indigenous-peoples/about/Land%20Acknowledgement.html">
              here
            </a>
            .
          </p>
        </div>
        {this.props.cantGenerateSig && GenerateSigError}
        <Button handleClick={this.props.handleClick}></Button>
      </article>
    );
  }
}
