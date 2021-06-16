import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import reportGeneratorABI from "./../abis/reportGenerator.json";
import { addresses } from "./../addresses/address";
import { credentials } from "../mocks/backend";
import Header from "../header/Header";

const ReportAdmin = () => {

  const [isUpdated, setUpdated] = useState(false);
  const [studentContractAddress, setStudentContractAddress] = useState("");
  const [marksContractAddress, setMarksContractAddress] = useState("");

  const history = useHistory();
  useEffect(()=>{
    if(!credentials[localStorage.getItem("username")]){
      history.push({
        pathname: "/login"
      });
    }
  });

  const onStudentContractAddressChange = async (e) => {
    setStudentContractAddress(e.target.value);
  }
  const onMarksContractAddressChange = async (e) => {
    setMarksContractAddress(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!studentContractAddress || !marksContractAddress){
      return;
    }

    // Web3 code

    const provider = await detectEthereumProvider();
    if (provider) {
      provider.enable();
      const web3 = new Web3(provider);
      const reportGeneratorContractAddress = addresses.reportGeneratorContractAddress;
      const reportGeneratorContract = new web3.eth.Contract(reportGeneratorABI, reportGeneratorContractAddress);
      // console.log(web3.eth.accounts[0]); // This is deprecated and outputs undefined. I HATE WEB3 NOW -_-
      await reportGeneratorContract.methods.initAddress(studentContractAddress, marksContractAddress).send({
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
          <h2>Initialisation for report generation</h2>
        </div>
        <div className="dashboardBody">
          <form>
            <label>
              Enter details of marks contract and student contract:
              </label>
            <div>
              <label> Student Contract Address </label>
              <input type="text" name="studentContractAddress" onChange={onStudentContractAddressChange}></input>
            </div>
            <div>
              <label> Marks Contract Address </label>
              <input type="text" name="marksContractAddress" onChange={onMarksContractAddressChange}></input>
            </div>

            {/* <input type="button" value="Save" onClick={handleSave}></input> */}
            <input type="submit" value="Submit" onClick={handleSubmit} ></input>
          </form>
        </div>
        {isUpdated ? (
          <div style={{ display: "block" }}>
            <label>
              New address has been initialised.
            </label>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default ReportAdmin;