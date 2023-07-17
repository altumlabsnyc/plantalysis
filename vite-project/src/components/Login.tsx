import React, { useState } from "react";
import "./assets/css/login.css";
import { handleSignIn } from "./Authentication";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSignIn(email, password);
  };

  return (
    <div>
      <div className="spacer" style={{ padding: "40px" }}></div>
      <form id="loginForm" onSubmit={handleSubmit} method="POST">
        <h2>Welcome back.</h2>
        <div className="lablebottom">
          <label htmlFor="loginEmail" id="lablemargin">
            Email
          </label>
          <input
            type="email"
            id="loginEmail"
            name="loginEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="fieldanimation">
          <label htmlFor="loginPassword" id="lablemargin">
            Password
          </label>
          <input
            type="password"
            id="loginPassword"
            name="loginPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="rememerandforgot">
          <div>
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <div className="fpcolor">
            <p>Forgot password?</p>
          </div>
        </div>
        <div className="loginsub-animation">
          <button type="submit">Log in</button>
        </div>
        <div className="or-separator">
          <div className="or-line"></div>
          <p className="or-text">or</p>
          <div className="or-line"></div>
        </div>
        <div>
          <button id="loginWithGoogle">
            <img
              src="assets/svg/google-logo.svg"
              alt="Google Logo"
              className="google-logo"
            />
            <span className="button-text">
              <a href="/googleOAuth">Log in with Google</a>
            </span>
          </button>
        </div>
        <div className="dhave-animation">
          <p className="dhaccount" style={{ paddingRight: "15px" }}>
            Don't have an account?{" "}
            <a href="/register" id="showSignupFormLink">
              Sign up for free
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};
export default Login;
