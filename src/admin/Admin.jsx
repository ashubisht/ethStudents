import { useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import studentContractABI from "./../abis/student.json";
import { addresses } from "./../addresses/address";

const Admin = () => {

  const [isUpdated, setUpdated] = useState(false);
  const [reportAccountAddress, setReportAccountAddress] = useState("");

  const onAccAddressChange = async (e) => {
    setReportAccountAddress(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Web3 code

    const provider = await detectEthereumProvider();
    if (provider) {
      console.log(provider);
      provider.enable();
      const web3 = new Web3(provider);
      const studentContractAddress = addresses.studentContractAddress;
      const studentContract = new web3.eth.Contract(studentContractABI, studentContractAddress);
      // console.log(web3.eth.accounts[0]); // This is deprecated and outputs undefined. I HATE WEB3 NOW -_-
      await studentContract.methods.setReportOwner(reportAccountAddress).send({
        from: ((await web3.eth.getAccounts())[0])
      });
      // await web3.currentProvider.disconnect();

    } else {
      console.log("Unable to find provider. Please reinstall metamask!!");
    }

    setUpdated(true);
  }

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
          <h2>Enter account address of contract that will publisht he report</h2>
        </div>
        <div className="dashboardBody">
          <form>
            <label>
              Report Generator admin account address:
              <div>
                <input type="text" name="address" onChange={onAccAddressChange}></input>
              </div>
            </label>
            {/* <input type="button" value="Save" onClick={handleSave}></input> */}
            <input type="submit" value="Submit" onClick={handleSubmit} ></input>
          </form>
        </div>
        {isUpdated ? (
          <div style={{ display: "block" }}>
            <label>
              Your request has been updated. The report generator manager is {reportAccountAddress}
            </label>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default Admin;