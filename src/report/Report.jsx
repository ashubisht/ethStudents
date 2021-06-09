import { useState } from "react";
import { Link } from "react-router-dom";

const Report = () => {

  const [resultAvailable, setResultAvailable] = useState(0);

  const handleRetry = () => {
    setResultAvailable(1);
  }

  const renderMessage = () => {
    switch (resultAvailable) {
      case 0:
        return (
          <div>
            <label>The results have not been yet generated. Please try again later</label>
            <br /> <br />
            <input type="button" onClick={handleRetry} value="Retry Again"></input>
          </div>
        );
      case 1:
        return (
          <div>
            <label>Congratulations, you are passed in your exam! We will contact you shortly :) </label>
          </div>
        );
      case 2:
        return (
          <div>
            <label>Unfortunately, you didn't passed the test. <br /> We wish you a good future and hope you will join us next year.</label>
          </div>
        )
      default:
        return (
          <div>
            <label>Something unexpected happenned. Please logout and retry again :(</label>
          </div>
        )
    }
  }


  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="userWelcome">Welcome user</div>
        <div className="logout"><Link to={"/login"}>Logout</Link></div>
      </div>
      {/* Content */}
      <div className="centerText">
        <div>
          <h2>View your result</h2>
        </div>
        <div className="dashboardBody">
          {renderMessage()}
        </div>
      </div>
    </div>
  )
}

export default Report;