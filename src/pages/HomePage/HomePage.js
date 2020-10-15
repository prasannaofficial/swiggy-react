import React, { useState, useEffect } from "react";
import "./HomePage.css";

import backgroundImage from "../../img/homepage.jpeg";
import logo from "../../img/swiggy-logo.png";
import { backendLink } from "../../constants";
import useInputHook from "../../hooks/useInputHook";

const HomePage = (props) => {
  const [loginMail, bindLoginMail, resetLoginMail] = useInputHook("");
  const [loginPwd, bindLoginPwd, resetLoginPwd] = useInputHook("");
  const [signupName, bindSignupName, resetSignupName] = useInputHook("");
  const [signupMail, bindSignupMail, resetSignupMail] = useInputHook("");
  const [signupPwd, bindSignupPwd, resetSignupPwd] = useInputHook("");

  const [greenMessage, setGreenMessage] = useState("");
  const [redMessage, setRedMessage] = useState("");
  const [formDisabled, setFormDisabled] = useState("");
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    fetchisLoggedin();
  }, []);

  const fetchisLoggedin = () => {
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    fetch(backendLink + "/api/isloggedin", {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.verifiedUser === true && res.role === "user") {
          props.history.push("/restaurants");
          return;
        } else if (res.verifiedUser === true && res.role === "admin") {
          props.history.push("/admin");
          return;
        }
      });
  };

  const postLogin = async (email, password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    const response = await fetch(
      backendLink + "/api/auth/login",
      requestOptions
    );
    const json = await response.json();
    if (json.loggedin === true) {
      localStorage.setItem("token", json.token);
      if (json.role === "user") props.history.push("/restaurants");
      else props.history.push("/admin");
    } else if (json.loggedin === false) {
      setGreenMessage("");
      setRedMessage(json.message);
      setFormDisabled("");
    }
  };

  const login = () => {
    if (formDisabled) return;
    let email = loginMail;
    let pwd = loginPwd;
    if (!email) {
      setRedMessage("Incorrect Email ID or Password!!");
      return;
    } else {
      let apos = email.indexOf("@");
      let dotpos = email.lastIndexOf(".");
      if (apos < 1 || dotpos - apos < 2) {
        setRedMessage("Incorrect Email ID or Password!!");
        return;
      }
    }
    if (!pwd) {
      setRedMessage("Incorrect Email ID or Password!!");
      return;
    }
    setGreenMessage("Please wait");
    setRedMessage("");
    setFormDisabled("disabled");
    postLogin(email, pwd);
  };

  const postSignUp = async (name, email, password) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("name", name);
    urlencoded.append("email", email);
    urlencoded.append("password", password);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    const response = await fetch(
      backendLink + "/api/auth/signup",
      requestOptions
    );
    const json = await response.json();
    if (json.userInserted === true) {
      localStorage.setItem("token", json.token);
      props.history.push("/restaurants");
    } else if (json.userInserted === false) {
      setGreenMessage("");
      setRedMessage(json.message);
      setFormDisabled("");
    }
  };
  const signup = () => {
    if (formDisabled) return;
    let name = signupName;
    let email = signupMail;
    let pwd = signupPwd;
    if (!name) {
      setRedMessage("Please enter your name!!!");
      return;
    }
    if (!email) {
      setRedMessage("Please enter your email!!!");
      return;
    } else {
      let apos = email.indexOf("@");
      let dotpos = email.lastIndexOf(".");
      if (apos < 1 || dotpos - apos < 2) {
        setRedMessage("Please enter valid email!!!");
        return;
      }
    }
    if (!pwd) {
      setRedMessage("Please enter the pasword!!!");
      return;
    }
    setGreenMessage("Please wait");
    setRedMessage("");
    setFormDisabled("disabled");
    postSignUp(name, email, pwd);
  };
  return (
    <div
      className="homepage-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0,0,0,0.4)),url(${backgroundImage})`,
      }}
    >
      <div className="homepage">
        <div className="heading-container">
          <img className="logo-image" src={logo} />
          <div className="buttons">
            <a
              className="login-btn"
              onClick={() => {
                if (formDisabled) return;
                setShowLogin(true);
                setGreenMessage("");
                setRedMessage("");
              }}
            >
              Login
            </a>
            <a
              className="signup-btn"
              onClick={() => {
                if (formDisabled) return;
                setShowLogin(false);
                setGreenMessage("");
                setRedMessage("");
              }}
            >
              Sign Up
            </a>
          </div>
        </div>
        <fieldset disabled={formDisabled}>
          <div className="form-wrapper">
            <div className="form-container">
              {showLogin ? (
                <>
                  <div className="heading">LOGIN</div>
                  <label for="email">Email</label>
                  <input
                    id="email"
                    className="input-field"
                    type="email"
                    {...bindLoginMail}
                  />
                  <label for="password">Password</label>
                  <input
                    id="password"
                    className="input-field"
                    type="password"
                    {...bindLoginPwd}
                  />
                  <div className="button" onClick={login}>
                    Login
                  </div>
                </>
              ) : (
                <>
                  <div className="heading">SIGN UP</div>
                  <label for="name">Name</label>
                  <input
                    id="name"
                    className="input-field"
                    type="text"
                    {...bindSignupName}
                  />
                  <label for="email">Email</label>
                  <input
                    id="email"
                    className="input-field"
                    type="email"
                    {...bindSignupMail}
                  />
                  <label for="password">Password</label>
                  <input
                    id="password"
                    className="input-field"
                    type="password"
                    {...bindSignupPwd}
                  />
                  <div className="button" onClick={signup}>
                    Sign Up
                  </div>
                </>
              )}
              <div
                style={{
                  marginTop: "15px",
                  color: "#6bff6b",
                  fontSize: "19px",
                }}
              >
                {greenMessage}
              </div>
              <div
                style={{
                  marginTop: "15px",
                  color: "red",
                  fontSize: "19px",
                }}
              >
                {redMessage}
              </div>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default HomePage;
