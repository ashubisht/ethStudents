import { Link } from "react-router-dom";
import Web3 from "web3";
import reportGeneratorABI from "./../abis/reportGenerator.json";
import detectEthereumProvider from "@metamask/detect-provider";

const Generate = () => {

  const handlePublish = async () => {
    //Web3 code
    const provider = await detectEthereumProvider();
    if (provider) {
      console.log(provider);
      provider.enable();
      const web3 = new Web3(provider);
      const reportGeneratorContractAddress = "0x198756a194107136B11beCd8C32d4f80Df3dc2ed";
      const reportGeneratorContract = new web3.eth.Contract(reportGeneratorABI, reportGeneratorContractAddress);
      await reportGeneratorContract.methods.updateStudentReport().send();
      await web3.currentProvider.disconnect();
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
      </div>
    </div>
  )
}

export default Generate;