import { Link } from "react-router-dom";
import Web3 from "web3";
import marksContractABI from "./../abis/marks.json";
import detectEthereumProvider from "@metamask/detect-provider";

const Teacher = () => {

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
    //Web3 code
    const provider = await detectEthereumProvider();
    if (provider) {
      console.log(provider);
      provider.enable();
      const web3 = new Web3(provider);
      const marksContractAddress = "0x29aB478436Dc668a5656c1772A6b9178323cC4ef";
      const marksContract = new web3.eth.Contract(marksContractABI, marksContractAddress);

      await marksContract.methods.setStudentMarks(id, marks).send();
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