import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { credentials } from "../mocks/backend";


const Login = (props) => {

  // const [] = useState(); // Will also give useState method. But havent used it as no DOM reload is needed
  
  let state = {
    username: ""
  }
  
  const [errMsg, setErrMsg] = useState("");

  let history = useHistory();
  useEffect(() => {
    localStorage.clear();
  })

  const handleLogin = (e) => {
    e.preventDefault();
    if(credentials[state.username]){
      history.push({
        pathname: credentials[state.username].redirect,
        //state
      });
    }else {
      setErrMsg("Invalid credentials. Please try again");
    }
  }

  const handleUsernameChange = (e) => {
    state.username = e.target.value;
    localStorage.setItem("username", e.target.value);
  }

  return (
    <div>
      <h1 className="centerText">
        Welcome to B8 Portal
      </h1>
      <div className="loginPage">
        <form onSubmit={handleLogin}>
          <label>
            Username:
          <div>
              <input type="text" name="username" onChange={handleUsernameChange}></input>
            </div>
          </label>
          <label>
            Password:
          <div>
              <input type="password" name="password"></input>
            </div>
          </label>
          <input type="submit" value="Submit" ></input>
        </form>
        {errMsg}
      </div>
    </div>
  );
}

export default Login;