import React, { useState, CSSProperties } from "react";
import "./UserTypes";
import {
  userTypeFields,
  users,
  generalInputs,
  userSpecificInputs,
  UserType,
} from "./UserTypes";

const RegisterForm: React.FC = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState<UserType | undefined>();

  const showTab = (n: number) => {
    // Your showTab logic here
  };

  const nextPrev = (n: number) => {
    if (n == 1) {
      setCurrentTab(currentTab + 1);
    } else {
      setCurrentTab(currentTab - 1);
    }
    switch (currentTab) {
      case 0:
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
          <form id="signupForm" action="/register/" method="POST">
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
                      placeholder={`Enter your ${userInput.name}`}
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
                            placeholder={`Enter your ${userInput.name}`}
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
