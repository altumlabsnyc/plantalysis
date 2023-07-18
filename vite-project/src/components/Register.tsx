import React, { useState, CSSProperties } from "react";
import "./UserTypes";
import {
  userTypeFields,
  users,
  generalInputs,
  userSpecificInputs,
  UserType,
  Input,
  userData,
  govUser,
  eduUser,
  labUser,
  prodUser,
} from "./UserTypes";
import { handleSignUp } from "./Authentication";

const RegisterForm: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState<UserType | undefined>();
  const [userInputs, setUserInputs] = useState<Map<Input, string>>(new Map());
  const [baseUserData, setBaseUserData] = useState<userData>();

  const updateUserInputs = (inputType: Input, value: string) => {
    userInputs.set(inputType, value);
  };

  const [userDataValues, setUserDataValues] = useState<userData>();

  const showTab = (n: number) => {
    // Your showTab logic here
  };

  const nextPrev = (n: number) => {
    if (currentTab == 2 || (currentTab == 1 && selectedUser == "consumer")) {
      handleSubmit();
    }
    switch (n) {
      case -1:
        if (currentTab !== 0) {
          setCurrentTab(currentTab - 1);
        }
        break;
      case 1:
        if (currentTab !== 2 && selectedUser !== "consumer") {
          setCurrentTab(currentTab + 1);
        } else if (currentTab !== 1 && selectedUser == "consumer") {
          setCurrentTab(currentTab + 1);
        }
        break;
      default:
        Error("wrongInput to nextPrev:" + n.toString());
    }
  };

  const validateForm = () => {
    // Your form validation logic here
  };

  const fixStepIndicator = (n: number) => {
    // Your fixStepIndicator logic here
  };

  const handleRadioButtonChange = (userType: UserType) => {
    setSelectedUser(userType);
  };

  const showTabContent = (selectedOption: string) => {
    // Your showTabContent logic here
  };

  const handleSubmit = () => {
    let firstName: string | null = "";
    let lastName: string | null = "";
    let email: string | null = "";
    let phone: string | null = "";
    let password: string | null = "";
    for (const [input, val] of userInputs) {
      switch (input.id) {
        case "firstName":
          firstName = val ? val : null;
          break;
        case "lastName":
          lastName = val ? val : null;
        case "email":
          email = val ? val : null;
          break;
        case "phone":
          phone = val ? val : null;
          break;
        case "password":
          password = val ? val : "";
          break;
        default:
          Error("Wrong input name for base user");
      }
    }
    const data: userData = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      id: "",
      user_type: selectedUser ? selectedUser : null,
      mfa_phone: phone,
    };
    switch (data.user_type) {
      case "consumer":
        handleSignUp(data, password);
        break;
      case "producer":
        handleSignUp(
          data,
          password,
          undefined,
          undefined,
          helperProdInfo(),
          undefined
        );
        break;
      case "university":
        handleSignUp(
          data,
          password,
          undefined,
          undefined,
          undefined,
          helperEduInfo()
        );
        break;
      case "lab":
        handleSignUp(
          data,
          password,
          helperLabInfo(),
          undefined,
          undefined,
          undefined
        );
        break;
      case "regulator":
        handleSignUp(
          data,
          password,
          undefined,
          helperGovInfo(),
          undefined,
          undefined
        );
        break;
    }
  };

  function helperEduInfo(): eduUser {
    const id = "";
    let lab_address: string | null = "";
    let primary_investigator: string | null = "",
      university_department: string | null = "",
      university_name: string | null = "";
    for (const [input, val] of userInputs) {
      switch (input.id) {
        case "university_lab_address":
          lab_address = val ? val : null;
          break;
        case "primary_investigator":
          primary_investigator = val ? val : null;
          break;
        case "university_department":
          primary_investigator = val ? val : null;
          break;
        case "university_name":
          university_name = val ? val : null;
          break;
      }
    }
    let uniData: eduUser = {
      lab_address: lab_address,
      university_department: university_department,
      university_name: university_name,
      id: id,
      primary_investigator: primary_investigator,
    };
    return uniData;
  }

  function helperProdInfo(): prodUser {
    const id = "";
    let billing_address: string | null = "";
    let common_name: string | null = "";
    let contact_phone: string | null = "";
    let legal_name: string | null = "";
    let license_number: string | null = "";
    let license_type: "AUCC" | "AUCP" | "AUHC" | null = null;
    let primary_facility_address: string | null = "";
    for (const [input, val] of userInputs) {
      switch (input.id) {
        case "billing_address":
          billing_address = val ? val : null;
          break;
        case "common_name":
          common_name = val ? val : null;
          break;
        case "producer_contact_phone":
          contact_phone = val ? val : null;
          break;
        case "legal_name":
          legal_name = val ? val : null;
          break;
        case "producer_license_number":
          license_number = val ? val : null;
          break;
        case "license_type":
          license_type =
            val && (val == "AUCC" || val == "AUCP" || val == "AUHC")
              ? val
              : null;
          break;
        case "primary_facility_address":
          primary_facility_address = val ? val : null;
      }
    }
    let prodData: prodUser = {
      primary_facility_address: primary_facility_address,
      billing_address: billing_address,
      legal_name: legal_name,
      common_name: common_name,
      license_number: license_number,
      id: id,
      license_type: license_type,
      contact_phone: contact_phone,
    };
    return prodData;
  }

  function helperLabInfo(): labUser {
    const id = "";
    let lab_address: string | null = "";
    let contact_phone: string | null = "";
    let license_number: number | null = null;
    let lab_name: string | null = "";
    let owner_name: string | null = "";
    for (const [input, val] of userInputs) {
      switch (input.id) {
        case "lab_address":
          lab_address = val ? val : null;
          break;
        case "lab_contact_phone":
          contact_phone = val ? val : null;
          break;
        case "lab_license_number":
          license_number = val ? parseInt(val) : null;
          break;
        case "lab_name":
          lab_name = val ? val : null;
          break;
        case "owner_name":
          owner_name = val ? val : null;
      }
    }
    let labData: labUser = {
      lab_address: lab_address,
      contact_phone: contact_phone,
      lab_name: lab_name,
      id: id,
      owner_name: owner_name,
      license_number: license_number,
    };
    return labData;
  }

  function helperGovInfo(): govUser {
    const id = "";
    let mailing_address: string | null = "";
    let regulator_name: string | null = "",
      contact_phone: string | null = "";
    for (const [input, val] of userInputs) {
      switch (input.id) {
        case "mailing_address":
          mailing_address = val ? val : null;
          break;
        case "regulator_name":
          regulator_name = val ? val : null;
          break;
        case "regulator_contact_phone":
          contact_phone = val ? val : null;
          break;
      }
    }
    let govData: govUser = {
      mailing_address: mailing_address,
      regulator_name: regulator_name,
      contact_phone: contact_phone,
      id: id,
    };
    return govData;
  }

  return (
    <div className="signup-container" style={{ display: "flex" }}>
      <div
        id="signupFormContainer"
        style={{ display: "block" }}
        className="signform-container"
      >
        <div className="board">
          <div className="board-back">
            <div className="board-details">
              <h3>Welcome to Altum.</h3>
              <h1>
                Create a new <br />
                account.
              </h1>
              <p>
                Using artificial intelligence and robotics, we test
                non-FDA-regulated products for wellness brands and enable them
                to quickly, affordably, and easily relay product information to
                consumers and regulators.
              </p>
            </div>
          </div>
        </div>
        <div className="centersignform">
          <form
            id="signupForm"
            onSubmit={handleSubmit}
            action="/register/"
            method="POST"
          >
            <div className="container-fluid p-0" style={{ paddingTop: "20px" }}>
              <div className="alert" role="alert">
                {/* Messages should be rendered dynamically using JavaScript */}
              </div>
            </div>
            {currentTab === 0 && (
              <div className="tab">
                <div className="radio-buttons">
                  <div className="radio-group">
                    <label htmlFor="gender" id="lablemargin">
                      Who are you?
                    </label>
                    {users.map((user) => (
                      <div className="radiobflex">
                        <div className="rdbwidth">
                          <label id="radio-buttons">
                            <img
                              src={`./src/components/assets/svg/${user.code}.svg`}
                              alt={`${user.code}.svg`}
                              style={{ height: "90%", width: "10%" }}
                            />
                            <input
                              type="radio"
                              name="signup-gender"
                              value={user.code}
                              id={user.code}
                              style={{ visibility: "hidden" }}
                              onChange={() => setSelectedUser(user.userType)}
                            />
                            I'm a {user.name}.
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {currentTab === 1 && (
              <div className="tab">
                <h2>Get started</h2>
                <p className="alamlink">
                  Already a member?{" "}
                  <a href="/login" id="showLoginFormLink">
                    Log in
                  </a>
                </p>
                {generalInputs.map((userInput) => (
                  <div>
                    <label
                      htmlFor={userInput.id}
                      id="lablemargin"
                      className="required-all"
                    >
                      {userInput.name}
                    </label>
                    <input
                      type={userInput.type}
                      id={userInput.id}
                      name={userInput.id}
                      value={userInputs.get(userInput)}
                      onChange={(e) =>
                        updateUserInputs(userInput, e.target.value)
                      }
                      placeholder={`Enter your ${userInput.name.toLowerCase()}`}
                      required
                    />
                  </div>
                ))}
              </div>
            )}
            {currentTab == 2 && (
              <div className="tab">
                {users
                  .filter((user) => selectedUser === user.userType)
                  .map((user) => (
                    <div id={`content${user.code}`} className="tab-content">
                      {user.inputs?.map((userInput) => (
                        <div>
                          <label htmlFor={userInput.id} id="lablemargin">
                            {userInput.name}
                          </label>
                          <input
                            type={userInput.type}
                            id={`${user.code}-${userInput.id}`}
                            name={userInput.id}
                            placeholder={`Enter your ${userInput.name.toLowerCase()}`}
                            value={userInputs.get(userInput)}
                            onChange={(e) =>
                              updateUserInputs(userInput, e.target.value)
                            }
                            required
                          />
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            )}
            <div
              style={{
                textAlign: "center",
                marginTop: "40px",
                paddingBottom: "40px",
              }}
            >
              <span className="step"></span>
              <span className="step"></span>
              <span className="step"></span>
            </div>
          </form>
          <div style={{ overflow: "auto", textAlign: "center" }}>
            <button
              type="button"
              id="prevBtn"
              // style={currentTab === 0 ? "block" : "none"}
              onClick={() => nextPrev(-1)}
            >
              Previous
            </button>
            <button type="button" id="nextBtn" onClick={() => nextPrev(1)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
