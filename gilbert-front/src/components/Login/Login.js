import React, { useState, useContext } from "react";
import "./Login.css";
import { UserContext } from "../../context/UserContext";

function Login() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { updateUserInfo } = useContext(UserContext);

  const database = [
    {
      username: "admin",
      password: "admin",
      permissions: "admin"
    },
    {
      username: "agent",
      password: "agent",
      permissions: "agent"
    },
    {
      username: "agent-leader",
      password: "agent-leader",
      permissions: "agent-leader"
    },
    {
      username: "user",
      password: "user",
      permissions: "user"
    }
  ];

  const errors = {
    uname: "Niepoprawny użytkownik",
    pass: "Niepoprawne hasło"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
        // save user info to UserContext
        updateUserInfo(userData);

      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  //  login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Nazwa użytkownika </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Hasło </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="Login">
      <div className="login-form">
        <div className="title">Logowanie</div>
        {isSubmitted ? <div>Użytkownik zalogowany</div> : renderForm}
      </div>
    </div>
  );
}

export default Login;