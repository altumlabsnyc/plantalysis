import React, { useState, CSSProperties } from "react";
import "./UserTypes";
import {
  userTypeFields,
  users,
  generalInputs,
  userSpecificInputs,
  UserType,
  Input,
} from "./UserTypes";

const RegisterForm: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState<UserType | undefined>();
  const [userInputs, setUserInputs] = useState<Map<Input, string>>(new Map());

  const updateUserInputs = (inputType: Input, value: string) => {
    userInputs.set(inputType, value);
    console.log(userInputs);
  };

  const showTab = (n: number) => {
    // Your showTab logic here
  };

  const nextPrev = (n: number) => {
    if (currentTab == 2 || (currentTab == 1 && selectedUser == UserType.Base)) {
      console.log(userInputs);
    }
    switch (n) {
      case -1:
        if (currentTab !== 0) {
          setCurrentTab(currentTab - 1);
        }
        break;
      case 1:
        if (currentTab !== 2 && selectedUser !== UserType.Base) {
          setCurrentTab(currentTab + 1);
        } else if (currentTab !== 1 && selectedUser == UserType.Base) {
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
    console.log("submitted");
  };

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
                              src={`./assets/svg/${user.code}.svg`}
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
                      {user.inputs.map((userInput) => (
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
