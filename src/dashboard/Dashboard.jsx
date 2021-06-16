import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../header/Header";
import { credentials } from "../mocks/backend";

const Dashboard = (_props) => {

  const [content, setContent] = useState(credentials.default);
  const history = useHistory();

  const designTwoBoxes = () => {
    if(credentials[localStorage.getItem("username")]){
      setContent(credentials[localStorage.getItem("username")]);
    }else {
      history.push({
        pathname: "/login"
      });
    }
  }

  useEffect(()=>{
    designTwoBoxes();
  })

  return (
    <div>
        {/* Header */}
        <Header></Header>
        {/* Content */}
        <div className="centerText">
          <div>
            <h2>Select an option to continue</h2>
          </div>
          <div className="dashboardBody">
            <div className="boxed"><Link to={content.link1}>{content.content1}</Link></div>
            <div className="boxed"><Link to={content.link2}>{content.content2}</Link></div>
          </div>
        </div>
      </div>
    );
};

export default Dashboard;