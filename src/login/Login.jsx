import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";


const Login = (props) => {

  // const [] = useState(); // Will also give useState method. But havent used it as no DOM reload is needed
  /*
  let state = {
    username: ""
  }
  */
  let history = useHistory();
  useEffect(() => {
    localStorage.clear();
  })

  const handleLogin = (e) => {
    e.preventDefault();

    history.push({
      pathname: "/dashboard",
      //state
    });
  }

  const handleUsernameChange = (e) => {
    //state.username = e.target.value;
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
      </div>
    </div>
  );
}

export default Login;