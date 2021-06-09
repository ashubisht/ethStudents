import { Link } from "react-router-dom";
import Web3 from "web3";
import reportGeneratorABI from "./../abis/reportGenerator.json";
import detectEthereumProvider from "@metamask/detect-provider";
import { addresses } from "./../addresses/address";
import { useState } from "react";

const Generate = () => {

  const [isPublished, setPublished] = useState(false);

  const handlePublish = async () => {
    //Web3 code
    const provider = await detectEthereumProvider();
    if (provider) {
      console.log(provider);
      provider.enable();
      const web3 = new Web3(provider);
      const reportGeneratorContractAddress = addresses.reportGeneratorContractAddress;
      const reportGeneratorContract = new web3.eth.Contract(reportGeneratorABI, reportGeneratorContractAddress);
      await reportGeneratorContract.methods.updateStudentReport().send({
        from: (await web3.eth.getAccounts())[0]
      });
      // await web3.currentProvider.disconnect();
      setPublished(true);
    } else {
      console.log("Unable to find provider. Please reinstall metamask!!");
    }
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
          <h2>Make sure the teacher has published marks on the chain!!!</h2>
        </div>
        <div className="dashboardBody">
          <div className="boxed" onClick={handlePublish}>Publish results</div>
        </div>
        {isPublished ? (
          <div style={{ display: "block" }}>
            <label>
              Reports have been published
            </label>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}

export default Generate;