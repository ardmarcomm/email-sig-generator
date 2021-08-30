import React, { Component } from "react";
import { Block } from "@material-ui/icons";

// NOTE: the use of style={{display: "inline-block"}} on nearly every element
// is to make the border line adjust to the longest line in the signature while allowing the table to hit max-width

// If you're feeling bold, the wrap issue might have been caused by special-message div having a fixed width in px
// but I don't want to go back and delete every inline-block styling when the app works fine like this anyway.

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
  constructor(props) {
    super(props);
    // these refs are never used?????
    this.titleRef = React.createRef;
    this.myDep = React.createRef;
    this.state = {
      value: "",
      copied: false,
      titleWidth: 0,
      depWidth: 0,
      widthSum: 0,
    };
  }

  componentDidMount() {
    console.log(this.titleRef);
  }

  componentDidUpdate() {
    console.log(this.titleRef);
  }
  render() {

    var pronounsStr = this.props.globalState.pronouns.replace(/[{()}]/g, '');
    pronounsStr = "(" + pronounsStr + ")";

    const Pronouns = (
      <span className="pronouns">
        {pronounsStr}
      </span>
    );

    var myTitle = this.props.globalState.title;
    var titleArray = myTitle.split(" ");
    myTitle = titleArray.join("\xa0");

    const Job = (
      <span
        className="job"
        style={{
          display: "inline-block"
        }}
      >
        <div style={{ display: "inline-block"}}>
          <span id="title" style={{ display: "inline-block"}}>{myTitle}</span>
        </div>
        <br />
        <div  style={{ display: "inline-block"}}>
          <span id="department" style={{ display: "inline-block"}}>
            {makeDepartment(this.props.globalState.department)}
          </span>
        </div>
        <br />
      </span>
    );

    const OfficeNum = (
      <span className="office-num" style={{ display: "inline-block"}}>
        +1 {makePhoneNum(this.props.globalState.officePhoneNum)}
        {" office"}
      </span>
    );

    const CellNum = (
      <span className="cell-num" style={{ display: "inline-block"}}>
        +1 {makePhoneNum(this.props.globalState.cellPhoneNum)}
        {" cell"}
      </span>
    );

    const addressStr = (
      <span className="address" style={{ display: "inline-block"}}>{this.props.globalState.address}</span>
    );

    var undergradDesignation = "";
    for (var i = 0; i < this.props.globalState.underGradInfo.length; i++) {
      if (this.props.globalState.underGradInfo[i].isYearValid) {
        undergradDesignation =
          undergradDesignation +
          " ’" +
          this.props.globalState.underGradInfo[i].year.toString().slice(-2);
      } 
    }

    var gradDesignation = "";
    // create gradDesignation
    if (this.props.globalState.isGradAlum) {
      gradDesignation = `${undergradDesignation.length > 0 ? ", " : " "
        }`;
      for (var i = 0; i < this.props.globalState.gradInfo.length; i++) {
        if (i < this.props.globalState.gradInfo.length - 1) {
          if (i === 0) {
            if (this.props.globalState.gradInfo[i].degree.length > 0) {
              gradDesignation =
                gradDesignation +
                ", " +
                "’" +
                this.props.globalState.gradInfo[i].year.toString().slice(-2) +
                " " +
                this.props.globalState.gradInfo[i].degree +
                ", ";
            }
          } else {
            if (this.props.globalState.gradInfo[i].degree.length > 0) {
              gradDesignation =
                gradDesignation +
                "’" +
                this.props.globalState.gradInfo[i].year.toString().slice(-2) +
                " " +
                this.props.globalState.gradInfo[i].degree +
                ", ";
            }
          }
        } else {
          if (this.props.globalState.gradInfo[i].degree.length > 0) {
            gradDesignation =
              gradDesignation +
              "’" +
              this.props.globalState.gradInfo[i].year.toString().slice(-2) +
              " " +
              this.props.globalState.gradInfo[i].degree;
          }
        }
      }
    }

    // create parentDesignation
    if (this.props.globalState.isParentAlum) {
      var parentDesignation = `${undergradDesignation.length > 0 ||
        gradDesignation.length > 0
        ? ", "
        : " "
        }`;
      for (var i = 0; i < this.props.globalState.parentInfo.length; i++) {
        if (i < this.props.globalState.parentInfo.length - 1) {
          if (i === 0) {
            if (this.props.globalState.parentInfo[i].degree.length > 0) {
              parentDesignation =
                parentDesignation +
                "’" +
                this.props.globalState.parentInfo[i].year.toString().slice(-2) +
                " " +
                this.props.globalState.parentInfo[i].degree +
                ", ";
            }
          } else {
            if (this.props.globalState.parentInfo[i].degree.length > 0) {
              parentDesignation =
                parentDesignation +
                "’" +
                this.props.globalState.parentInfo[i].year.toString().slice(-2) +
                " " +
                this.props.globalState.parentInfo[i].degree +
                ", ";
            }
          }
        } else {
          if (this.props.globalState.parentInfo[i].degree.length > 0) {
            parentDesignation =
              parentDesignation +
              "’" +
              this.props.globalState.parentInfo[i].year.toString().slice(-2) +
              " " +
              this.props.globalState.parentInfo[i].degree;
          } else {
            parentDesignation = parentDesignation.replace(/,\s*$/, "");
          }
        }
      }
    }

    return (
      <section className="sig-result">
         <div className="sig-result__wrapper" >
           <div className="table__wrapper" style={{display: "inline-block"}}>
            <table
              cellPadding="0"
              cellSpacing="0"
              style={{
                borderTop: "1px solid #4e2a84",
                borderBottom: "1px solid #4e2a84",
                fontFamily: '"Arial"',
                fontSize: "14px",
                color: "#716C6B",
                maxWidth: "max-content",
                display: "inline-block"
              }}
            >
              <tbody  style={{display: "inline-block"}}>
                <tr style={{display: "inline-block"}}>
                  <td
                    style={{
                      fontFamily: '"Arial"',
                      fontSize: "16px",
                      color: "#4e2a84",
                      paddingTop: "10px",
                      lineHeight: "1.2",
                      display: "inline-block"
                    }}
                  >
                    <strong>
                      {this.props.globalState.firstName}{" "}
                      {`${this.props.globalState.middleName.length > 0
                        ? this.props.globalState.middleName + " "
                        : ""
                        }`}
                      {this.props.globalState.lastName}
                      {this.props.globalState.isUndergradAlum &&
                        undergradDesignation.length > 3
                        ? undergradDesignation
                        : ""}
                      {this.props.globalState.isGradAlum &&
                        gradDesignation.length > 5
                        ? gradDesignation
                        : ""}
                      {this.props.globalState.isParentAlum &&
                        parentDesignation.length > 5 &&
                        parentDesignation}
                    </strong>
                  </td>
                </tr>
                <br />
                <tr  style={{display: "inline-block"}}>
                  <td
                    style={{
                      fontFamily: '"Arial"',
                      fontSize: "14px",
                      color: "#716C6B",
                      paddingTop: "10px",
                      lineHeight: "1.37",
                      width: "max-content",
                      display: "inline-block"
                    }}
                  >
                    {this.props.globalState.pronouns.length > 0 &&
                      Pronouns}
                      <br />
                    {this.props.globalState.title.length > 0 && Job}
                    <br />
                    <div style={{display: "inline-block"}}>
                      <span className="org" style={{display: "inline-block"}}>{this.props.globalState.org}</span>
                    </div>
                    <br />
                    <div style={{display: "inline-block"}}>
                      <span className="nu" style={{display: "inline-block"}}>Northwestern University</span>
                    </div>
                    <div
                      className="special-msg"
                      style={{
                        whiteSpace: "nowrap",
                        // width: "480px",
                        display: "inline-block"
                      }}
                    >
                      <em style={{ display: "inline-block"}}>{
                        this.props.globalState.specialMsg === "" ? this.props.globalState.specialMsg.replace("&#8209;", "–") : " "
                      }</em>
                    </div>
                  </td>
                </tr>
                <br />
                <tr style={{display: "inline-block"}}>
                  <td
                    style={{
                      fontFamily: '"Arial"',
                      fontSize: "14px",
                      color: "#716C6B",
                      paddingTop: "10px",
                      paddingBottom: "30px",
                      lineHeight: "1.37",
                      display: "inline-block"
                    }}
                  >
                    {this.props.globalState.address != "None" && addressStr}
                    <div></div>
                    {this.props.globalState.phoneNumValidity.office && OfficeNum}
                    <div />
                    {this.props.globalState.phoneNumValidity.cell && CellNum}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <table
            cellPadding="0"
            cellSpacing="0"
            style={{
              fontFamily: '"Arial"',
              fontSize: "14px",
              color: "#716C6B",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    fontFamily: '"Arial"',
                    fontSize: "14px",
                    color: "#4e2a84",
                    paddingTop: "10px",
                    lineHeight: "1.37",
                  }}
                >
                  <strong>
                    <a
                      style={{
                        color: "#4e2a84",
                      }}
                      href="https://www.alumni.northwestern.edu/s/1479/02-naa/16/home.aspx?sid=1479&gid=2&pgid=20761&utm_medium=email&utm_source=ARD%20email&utm_campaign=ARD%20Email%20Signature"
                      target="_blank"
                    >
                      alumni.northwestern.edu
                    </a>
                  </strong>
                </td>
              </tr>
              <tr>
                <td style={{
                    fontFamily: '"Arial"',
                    fontSize: "14px",
                    color: "#4e2a84",
                    paddingTop: "10px",
                    lineHeight: "1.37",
                  }}
                >
                  <strong>
                    <a
                      style={{
                        color: "#4e2a84",
                      }}
                      href="https://www.northwestern.edu/giving/" 
                      target="_blank"
                    >
                      giving.northwestern.edu
                    </a>
                  </strong>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontFamily: '"Arial"',
                    fontSize: "12px",
                    color: "#716C6B",
                    paddingTop: "10px",
                    lineHeight: "1.37",
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
