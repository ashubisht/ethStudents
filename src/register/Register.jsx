import { useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import studentContractABI from "./../abis/student.json";
import { addresses } from "./../addresses/address";
import Header from "../header/Header";

const Register = (props) => {

  const [registered, setRegistered] = useState(); // useState because we need to reload DOM
  let name = "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    /**
     * Write web3 logic here
     */
    //const web3 = new Web3(Web3.)
    const provider = await detectEthereumProvider();
    if (provider) {
      console.log(provider);
      provider.enable();
      const web3 = new Web3(provider);
      const studentContractAddress = addresses.studentContractAddress;
      const studentContract = new web3.eth.Contract(studentContractABI, studentContractAddress);
      // console.log(web3.eth.accounts[0]); // This is deprecated and outputs undefined. I HATE WEB3 NOW -_-
      await studentContract.methods.registerStudent(name).send({
        from: ((await web3.eth.getAccounts())[0]),
        value: web3.utils.toWei("6900000", "gwei")
      });
      // await web3.currentProvider.disconnect();

    } else {
      console.log("Unable to find provider. Please reinstall metamask!!");
    }

    setRegistered({
      registered: true
    })
  }

  const handleNameChange = async (e) => {
    name = e.target.value; // No need to re render the DOM
  }

  return (
    <div>

      {/* Header */}
      <Header></Header>

      {registered ? (
        <div className="dashboardBody">
          You are successfully registered
        </div>
      ) : (
        <div>
          {/* Content */}
          <div className="centerText">
            <div>
              <h2>Register for exam</h2>
            </div>
            <div className="dashboardBody">
              <form onSubmit={handleSubmit}>
                <label style={{ display: "inline" }}>Name: </label>
                <input type="text" name="name" onChange={handleNameChange}></input>
                <label style={{ display: "block" }}>Fees: 6900000 gwei</label>
                <input type="submit" value="Submit"></input>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default Register;