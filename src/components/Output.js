import React, { Component } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

function makePhoneNum(input) {
  var inputArray = input.split("");
  inputArray.splice(3, 0, ".");
  inputArray.splice(7, 0, ".");
  return inputArray.join("");
}

function makeDepartment(input) {
  var inputDepartment = input.split(" ");
  return inputDepartment.join(" ");
}

export default class Output extends Component {
  state = {
    value: "",
    copied: false,
  };
  render() {
    const Pronouns = (
      <span className="pronouns">
        ({this.props.globalState.pronouns.subject}
        {"/"}
        {this.props.globalState.pronouns.object}
        {"/"}
        {this.props.globalState.pronouns.possessive})
        <br />
      </span>
    );

    const Job = (
      <span className="job">
        <span id="title">{this.props.globalState.title}</span>
        {this.props.globalState.department.length > 0 && ", "}
        <span id="department">
          {makeDepartment(this.props.globalState.department)}
        </span>
        <br />
      </span>
    );

    const OfficeNum = (
      <span className="office-num">
        <br />
        {makePhoneNum(this.props.globalState.officePhoneNum)}
        {" office"}
      </span>
    );

    const CellNum = (
      <span className="cell-num">
        <br />
        {makePhoneNum(this.props.globalState.cellPhoneNum)}
        {" cell"}
      </span>
    );

    // create gradDesignation
    if (this.props.globalState.isGradAlum) {
      var gradDesignation = `${
        this.props.globalState.isUndergradAlum
          ? ", "
          : " "
      }`;
      for (var i = 0; i < this.props.globalState.gradInfo.length; i++) {
        if (i < this.props.globalState.gradInfo.length - 1) {
          if (i === 0) {
            gradDesignation =
              gradDesignation +
              ", " +
              "’" +
              this.props.globalState.gradInfo[i].year.toString().slice(-2) +
              " " +
              this.props.globalState.gradInfo[i].degree +
              ", ";
          } else {
            gradDesignation =
              gradDesignation +
              "’" +
              this.props.globalState.gradInfo[i].year.toString().slice(-2) +
              " " +
              this.props.globalState.gradInfo[i].degree +
              ", ";
          }
        } else {
          gradDesignation =
            gradDesignation +
            "’" +
            this.props.globalState.gradInfo[i].year.toString().slice(-2) +
            " " +
            this.props.globalState.gradInfo[i].degree;
        }
      }
    }

    var undergradDesignation = "";
    for (var i = 0; i < this.props.globalState.underGradInfo.length; i++) {
      undergradDesignation =
        undergradDesignation +
        " ’" +
        this.props.globalState.underGradInfo[i].year.toString().slice(-2);
    }

    // create parentDesignation
    if (this.props.globalState.isParentAlum) {
      var parentDesignation = `${
        this.props.globalState.isUndergradAlum ||
        this.props.globalState.isGradAlum
          ? ", "
          : " "
      }`;
      for (var i = 0; i < this.props.globalState.parentInfo.length; i++) {
        if (i < this.props.globalState.parentInfo.length - 1) {
          if (i === 0) {
            parentDesignation =
              parentDesignation +
              "’" +
              this.props.globalState.parentInfo[i].year.toString().slice(-2) +
              " " +
              this.props.globalState.parentInfo[i].degree +
              ", ";
          } else {
            parentDesignation =
              parentDesignation +
              "’" +
              this.props.globalState.parentInfo[i].year.toString().slice(-2) +
              " " +
              this.props.globalState.parentInfo[i].degree +
              ", ";
          }
        } else {
          parentDesignation =
            parentDesignation +
            "’" +
            this.props.globalState.parentInfo[i].year.toString().slice(-2) +
            " " +
            this.props.globalState.parentInfo[i].degree;
        }
      }
    }

    return (
      <section className="sig-result">
        <div className="sig-result__wrapper">
          <table
            cellPadding="0"
            cellSpacing="0"
            width="260"
            style={{
              borderTop: "1px solid #4e2a84",
              borderBottom: "1px solid #4e2a84",
              fontFamily: '"Arial"',
              fontSize: "11px",
              color: "#716C6B",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    fontFamily: '"Arial"',
                    fontSize: "13px",
                    color: "#4e2a84",
                    paddingTop: "10px",
                    lineHeight: "1.2",
                  }}
                >
                  <strong>
                    {this.props.globalState.firstName}{" "}
                    {`${this.props.globalState.middleName.length > 0 ? this.props.globalState.middleName + " ": ""}`}
                    {this.props.globalState.lastName}
                    {this.props.globalState.isUndergradAlum &&
                      undergradDesignation.length > 3 ? undergradDesignation : ""}
                    {this.props.globalState.isGradAlum && gradDesignation.length > 5 ? gradDesignation : ""}
                    {this.props.globalState.isParentAlum && parentDesignation.length > 5 && parentDesignation}
                  </strong>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontFamily: '"Arial"',
                    fontSize: "11px",
                    color: "#716C6B",
                    paddingTop: "10px",
                    lineHeight: "1.29",
                  }}
                >
                  {this.props.globalState.pronouns.subject.length > 0 &&
                    Pronouns}
                  {this.props.globalState.title.length > 0 && Job}
                  <span className="org">{this.props.globalState.org}</span>
                  <br />
                  <span className="nu">Northwestern University</span>
                  <br />
                  <span className="special-msg">
                    <em>{this.props.globalState.specialMsg}</em>
                  </span>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontFamily: '"Arial"',
                    fontSize: "11px",
                    color: "#716C6B",
                    paddingTop: "10px",
                    paddingBottom: "20px",
                    lineHeight: "1.29",
                  }}
                >
                  <span className="address">
                    {this.props.globalState.address}
                  </span>
                  {this.props.globalState.phoneNumValidity.office && OfficeNum}
                  {this.props.globalState.phoneNumValidity.cell && CellNum}
                </td>
              </tr>
            </tbody>
          </table>
          <table
            cellPadding="0"
            cellSpacing="0"
            style={{
              fontFamily: '"Arial"',
              fontSize: "11px",
              color: "#716C6B",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    fontFamily: '"Arial"',
                    fontSize: "13px",
                    color: "#4e2a84",
                    paddingTop: "10px",
                    lineHeight: "1.5",
                  }}
                >
                  <strong>
                    <a
                      style={{
                        color: "#4e2a84",
                      }}
                      href="https://wewill.northwestern.edu/s/1479/282-giving/index-campaign.aspx?gid=282&pgid=61&utm_medium=email&utm_source=ARD%20email&utm_campaign=ARD%20Email%20Signature"
                    >
                      We Will. The Campaign for Northwestern.
                    </a>{" "}
                    <br />
                    <a
                      style={{
                        color: "#4e2a84",
                      }}
                      href="https://www.alumni.northwestern.edu/s/1479/02-naa/16/home.aspx?sid=1479&gid=2&pgid=20761&utm_medium=email&utm_source=ARD%20email&utm_campaign=ARD%20Email%20Signature"
                    >
                      alumni.northwestern.edu
                    </a>
                  </strong>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontFamily: '"Arial"',
                    fontSize: "11px",
                    color: "#716C6B",
                    paddingTop: "10px",
                    lineHeight: "1.29",
                  }}
                >
                  <a
                    style={{ color: "#716C6B", textDecoration: "none" }}
                    href="https://www.facebook.com/northwesternalumni"
                  >
                    Facebook
                  </a>
                  {" | "}
                  <a
                    style={{ color: "#716C6B", textDecoration: "none" }}
                    href="https://twitter.com/NUAlumni"
                  >
                    Twitter
                  </a>
                  {" | "}
                  <a
                    style={{ color: "#716C6B", textDecoration: "none" }}
                    href="https://www.instagram.com/northwesternalumni/"
                  >
                    Instagram
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}
