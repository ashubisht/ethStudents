import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import studentContractABI from "./../abis/student.json";
import { addresses } from "./../addresses/address";
import { credentials } from "../mocks/backend";
import Header from "../header/Header";

const Admin = () => {

  const [isUpdated, setUpdated] = useState(false);
  const [reportAccountAddress, setReportAccountAddress] = useState("");

  const history = useHistory();
  useEffect(()=>{
    if(!credentials[localStorage.getItem("username")]){
      history.push({
        pathname: "/login"
      });
    }
  });

  const onAccAddressChange = async (e) => {
    setReportAccountAddress(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!reportAccountAddress){
      return;
    }

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
      <Header></Header>
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