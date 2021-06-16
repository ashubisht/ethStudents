import { useHistory } from "react-router-dom";
import { credentials } from "../mocks/backend";
// import {promisify} from "util";
import { useState } from "react";

const Header = () =>{

    const [logoutMsg, setLogoutMsg] = useState("Logout");
    const [isClicked, setClicked] = useState(false);
    // const sleep = promisify(setTimeout);
    const history = useHistory();
    const logout = async() => {
        if(credentials[localStorage.getItem("username")].logoutWait){
            setLogoutMsg("Adios! :)");
            setClicked(true);
            //await sleep(2000);
            setTimeout(()=> {
                history.push({
                    pathname: "/login"
                });
            }, 2000)
        }else {
            history.push({
                pathname: "/login"
            });
        }
        
        
    }

    return(
      <div className="header">
        <div className="userWelcome">{credentials[localStorage.getItem("username")].welcome? credentials[localStorage.getItem("username")].welcome : "Welcome"} {credentials[localStorage.getItem("username")].name}</div>
        <div className="logout" onClick={logout}>{isClicked? logoutMsg: (<><u>{logoutMsg}</u></>)}</div>
      </div>
    );
};

export default Header;