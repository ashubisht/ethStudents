import { useHistory } from "react-router-dom";
import Web3 from "web3";
import marksContractABI from "./../abis/marks.json";
import detectEthereumProvider from "@metamask/detect-provider";
import { addresses } from "./../addresses/address";
import { useEffect } from "react";
import { credentials } from "../mocks/backend";
import Header from "../header/Header";

const Teacher = () => {

  const history = useHistory();
  useEffect(()=>{
    if(!credentials[localStorage.getItem("username")]){
      history.push({
        pathname: "/login"
      });
    }
  });

  // const studentMarks = {}
  let id = -1;
  let marks = 0;

  const handleIdChange = async (e) => {
    id = parseInt(e.target.value, 10);
  }
  const handleMarksChange = async (e) => {
    marks = parseInt(e.target.value, 10);
  }
  // const handleSave = async(e) =>{
  //   studentMarks[id] = marks;
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Web3 code
    const provider = await detectEthereumProvider();
    if (provider) {
      console.log(provider);
      provider.enable();
      const web3 = new Web3(provider);
      const marksContractAddress = addresses.marksContractAddress;
      const marksContract = new web3.eth.Contract(marksContractABI, marksContractAddress);

      await marksContract.methods.setStudentMarks(id, marks).send({
        from: (await web3.eth.getAccounts())[0]
      });
      // await web3.currentProvider.disconnect();

    } else {
      console.log("Unable to find provider. Please reinstall metamask!!");
    }
  }

  return (
    <div>
      {/* Header */}
      <Header></Header>
      {/* Content */}
      <div className="centerText">
        <div>
          <h2>Enter student id and marks.</h2>
        </div>
        <div className="dashboardBody">
          <form>
            <label>
              Student Id:
              <div>
                <input type="text" name="id" onChange={handleIdChange}></input>
              </div>
            </label>
            <label>
              Marks:
              <div>
                <input type="text" name="marks" onChange={handleMarksChange}></input>
              </div>
            </label>
            {/* <input type="button" value="Save" onClick={handleSave}></input> */}
            <input type="submit" value="Submit" onClick={handleSubmit} ></input>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Teacher;