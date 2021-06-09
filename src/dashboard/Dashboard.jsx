import { Link } from "react-router-dom";

const Dashboard = (props) => {
  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="userWelcome">Welcome {localStorage.getItem("username")}</div>
        <div className="logout"><Link to={"/login"}>Logout</Link></div>
      </div>
      {/* Content */}
      <div className="centerText">
        <div>
          <h2>Select an option to continue</h2>
        </div>
        <div className="dashboardBody">
          <div className="boxed"><Link to={"/register"}>Register yourself</Link></div>
          <div className="boxed"><Link to={"/report"}>View your reports</Link></div>
        </div>
      </div>
    </div>
  )
};

export default Dashboard;