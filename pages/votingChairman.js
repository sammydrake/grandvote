import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Button, AspirantTable } from "../components/index_1";
import { ContextElection } from "../context/Blockchain.services";

const VotingChairman = ({ listOfAspirants }) => {
  //const router = useRouter();
  const { aspirants, grantOwnership, freshPoll } = useContext(ContextElection);

  const [listName, setListName] = useState("");
  const [ProofreadItem, setProofreadItem] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [commenceTime, setCommenceTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [leave, setLeave] = useState([]);
  const [isAspirantListed, setIsAspirantListed] = useState(false);
  const [grantChairmanRightTo, setGrantChairmanRightTo] = useState("");

  const onChangeHandler = (e) => {
    setListName(e.target.value);
  };

  const listHandler = () => {
    setProofreadItem([...ProofreadItem, listName]);
    setListName("");
    console.log(ProofreadItem.length);
  };

  const startDatehandler = (e) => {
    setStartDate(e.target.value);
    console.log(startDate);
  };

  const startTimehandler = (e) => {
    setCommenceTime(e.target.value);
    console.log(commenceTime);
  };

  const endDatehandler = (e) => {
    setEndDate(e.target.value);
    console.log(endDate);
  };

  const endTimehandler = (e) => {
    setEndTime(e.target.value);
    console.log(commenceTime);
  };

  const isValidStartDate = (startDate) => {
    const re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    return re.test(String(startDate).toLowerCase());
  };

  const isValidEndDate = (endDate) => {
    const re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    return re.test(String(endDate).toLowerCase());
  };

  const isValidCommenceTime = (commenceTime) => {
    const re = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;
    return re.test(String(commenceTime).toLowerCase());
  };

  const isValidEndTime = (endTime) => {
    const re = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;
    return re.test(String(endTime).toLowerCase());
  };

  const dateTimeHandler = () => {
    if (
      startDate === "" ||
      endDate === "" ||
      commenceTime === "" ||
      endTime === ""
    ) {
      alert("Provide a valid date and time.");
    } else if (
      !isValidStartDate(startDate) ||
      !isValidEndDate(endDate) ||
      !isValidCommenceTime(commenceTime) ||
      !isValidEndTime(endTime)
    ) {
      alert(
        "Kindly provide a valid date and time in this format: DATE: 01/01/1111 and also check the time format TIME: 1:00 PM"
      );
    } else {
      alert("Continue to the Proofread section.");
    }
  };

  const signature = (e) => {
    setGrantChairmanRightTo(e.target.value);
  };

  const grantRight = () => {
    grantOwnership(grantChairmanRightTo);
  };

  const cancel = () => {
    setListName("");
    setProofreadItem([]);
    setStartDate("");
    setEndDate("");
    setCommenceTime("");
    setEndTime("");
  };

  const submit = () => {
    if (ProofreadItem === "" || startDate === "" || endDate === "") {
      alert("One of the required field is missing. Fill it out to continue.");
    } else {
      const votingCommenceTime = startDate.concat(" " + commenceTime);
      const votingEndTime = endDate.concat(" " + endTime);
      const minVotes = 2;
      console.log(votingCommenceTime);
      console.log(votingEndTime);
      aspirants(ProofreadItem, votingCommenceTime, votingEndTime, minVotes);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage:
          "url('https://static.scientificamerican.com/sciam/cache/file/9669F97A-0F91-4AE3-A3035D9C423A1D5D_source.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-blue-200 shadow-lg rounded-lg overflow-hidden"></div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-white shadow rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-4">ADD ASPIRANTS</h1>
            <p className="text-indigo-700 mb-4">
              <span className="font-bold text-gray-800">REMINDER:</span> Follow
              The Sequence From Add Aspirant Down To Submit Button
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <input
                  className="border border-gray-300 rounded-lg p-2 w-full mb-2 md:mb-0"
                  type="text"
                  placeholder="List an Aspirant"
                  onChange={onChangeHandler}
                  value={listName}
                />
              </div>
              <div>
                <Button btnName="Add Aspirant" handleClick={listHandler} />
              </div>
            </div>

            <p className="text-indigo-700 mb-4">
              <span className="font-bold text-gray-800">REMINDER:</span> The
              Format Of The Time Should Be For Instance 10:00 AM Not 10:00AM
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <input
                  className="border border-gray-300 rounded-lg p-2 w-full mb-2 md:mb-0"
                  type="text"
                  placeholder="Vote StartDate: MM/DD/YYYY"
                  value={startDate}
                  onChange={startDatehandler}
                />
              </div>
              <div className="flex-1">
                <input
                  className="border border-gray-300 rounded-lg p-2 w-full mb-2 md:mb-0"
                  type="text"
                  placeholder="Vote EndDate: MM/DD/YYYY"
                  value={endDate}
                  onChange={endDatehandler}
                />
              </div>
              <div className="flex-1">
                <input
                  className="border border-gray-300 rounded-lg p-2 w-full mb-2 md:mb-0"
                  type="text"
                  placeholder="Vote StartTime: HH:MM A"
                  value={commenceTime}
                  onChange={startTimehandler}
                />
              </div>
              <div className="flex-1">
                <input
                  className="border border-gray-300 rounded-lg p-2 w-full mb-2 md:mb-0"
                  type="text"
                  placeholder="Vote EndTime: HH:MM A"
                  value={endTime}
                  onChange={endTimehandler}
                />
              </div>
              <div>
                <Button
                  className="bg-green-500 text-white p-2 rounded-lg"
                  btnName="Enter"
                  handleClick={dateTimeHandler}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <p className="text-indigo-700">
                  Kindly Add The Transferee's Address Only If You Want To Grant
                  Him Access
                </p>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      className="border border-gray-300 rounded-lg p-2 w-full mb-2 md:mb-0"
                      type="text"
                      placeholder="address"
                      value={grantChairmanRightTo}
                      onChange={signature}
                    />
                  </div>
                  <div>
                    <Button
                      className="bg-green-500 text-white p-2 rounded-lg"
                      btnName="Grant Right"
                      handleClick={grantRight}
                    />
                  </div>
                </div>
              </div>
            </div>
            {}
            <div className="w-full md:w-1/2 px-4">
              <h3 className="text-lg font-medium mb-2 text-gray-800">
                PROOFREAD
              </h3>
              <p className="text-sm mb-4">
                <span className="font-bold text-gray-800">REMINDER:</span>{" "}
                Proofread before submission.
              </p>

              <div className="mb-4">
                {ProofreadItem ? (
                  <div className="flex flex-col space-y-2">
                    {ProofreadItem.map((el, i) => (
                      <div key={i} className="flex items-center">
                        <span className="mr-2">{i + 1}.</span>
                        <span>{el}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No Aspirants added yet.</p>
                )}
              </div>

              <div className="mb-4">
                <p>
                  <span className="font-bold text-gray-800">
                    Vote StartDate/Time:
                  </span>{" "}
                  {startDate} {commenceTime}
                </p>
                <p>
                  <span className="font-bold text-gray-800">
                    Vote EndDate/Time:
                  </span>{" "}
                  {endDate} {endTime}
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  btnName="Cancel"
                  handleClick={cancel}
                  className="mr-2"
                />
                <Button
                  btnName="Submit"
                  handleClick={() => {
                    submit();
                  }}
                  className="bg-green-500 text-white p-2 rounded-lg"
                />
                <div>
                  <div className="flex mt-4">
                    <Button
                      btnName={"Create A Fresh Poll"}
                      handleClick={() => {
                        freshPoll();
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingChairman;
