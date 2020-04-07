import React, { Component } from "react";
import DoubleInputStep from "./DoubleInputStep";
import InputStep from "./InputStep";
import Button from "./Button";
import CheckboxStep from "./CheckboxStep";
import DegreeInfo from "./DegreeInfo";
import PronounStep from "./PronounStep";
import CityStateZip from "./CityStateZip";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddBoxOutlined";

export default class Form extends Component {
  render() {
    const undergradDegrees = this.props.underGradInfo;
    const gradDegrees = this.props.gradInfo;
    const UndergradField = (
      <div className="form-step degrees">
        {undergradDegrees.map((degree, index) => (
          <DegreeInfo
            key={index}
            arrayID={index}
            handleDegreeChange={this.props.handleDegreeChange}
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
          Add Northwestern degree
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
          fieldDefaultVals={["##First Name##", "##Last Name##"]}
          handleFieldChange={this.props.handleFieldChange}
          isRequired={[true, true]}
        />
        <h3>NU Degrees</h3>
        <div className="checkboxes">
          <div className="form-step">
            <CheckboxStep
              fieldName="Are you a Northwestern undergraduate alum?"
              handleAlumToggle={this.props.handleUndergradAlumToggle}
            />
            {this.props.isUndergradAlum && UndergradField}
          </div>
          <div className="form-step">
            <CheckboxStep
              fieldName="Are you a Northwestern graduate/professional degree holder, or the grandparent/parent of a Northwestern student or alum?"
              handleAlumToggle={this.props.handleGradAlumToggle}
            />
            {this.props.isGradAlum && GradField}
          </div>
        </div>
        <h3>Job</h3>
        <DoubleInputStep
          fieldName={["title", "department"]}
          fieldLabel={["Job Title", "Department"]}
          handleFieldChange={this.props.handleFieldChange}
          fieldDefaultVals={["", ""]}
          autoComplete={true}
          isRequired={[true, true]}
        />
        <h3>Pronouns</h3>
        <PronounStep
          fieldName={["subject", "object", "possessive"]}
          fieldLabel={["Subject", "Object", "Possessive"]}
          handlePronounChange={this.props.handlePronounChange}
        />
        <h3>Address</h3>
        <InputStep
          fieldName={"address"}
          fieldLabel={"Street Address"}
          handleFieldChange={this.props.handleFieldChange}
        />
        <CityStateZip
          fieldName={["city", "state", "zip"]}
          fieldLabel={["City", "State", "Zip"]}
          handleFieldChange={this.props.handleFieldChange}
          autoComplete={false}
        />
        <h3>Contact Information</h3>
        <DoubleInputStep
          fieldName={["officePhoneNum", "cellPhoneNum"]}
          fieldLabel={["Office Phone Number", "Cell Phone Number"]}
          handleFieldChange={this.props.handleFieldChange}
          fieldDefaultVals={["", ""]}
          autoComplete={false}
          phoneNumValidity={this.props.phoneNumValidity}
          isRequired={[false, false]}
        />
        {this.props.cantGenerateSig && GenerateSigError}
        <Button handleClick={this.props.handleClick}></Button>
      </article>
    );
  }
}
