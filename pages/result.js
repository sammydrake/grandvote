import React, { useState, useEffect, useContext } from "react";
import { Button } from "../components/index_1";
import { ContextElection } from "../context/Blockchain.services";

const ViewResult = ({ listedNames }) => {
  const {
    retrieveTotalAndWinner,
    retrieveAspirant,
    retrieveAspirantLength,
    isVotingEnd,
  } = useContext(ContextElection);
  const [aspirants, setAspirants] = useState([]);
  const [voteCount, setVoteCount] = useState([]);
  const [winner, setWinner] = useState("");
  const [totalVotes, setTotalVotes] = useState(0);

  const rehandleWinners = async () => {
    const votingEnded = await isVotingEnd();

    if (votingEnded) {
      const win = await retrieveTotalAndWinner();
      if (win) {
        setWinner(win.winner);
      }
      if (win) {
        setTotalVotes(win.totalVotes);
      }
      console.log(win);
    }
  };

  useEffect(() => {
    async function handleWinners() {
      const votingEnded = await isVotingEnd();
      console.log("voting " + votingEnded);

      if (votingEnded) {
        const win = await retrieveTotalAndWinner();
        if (win) {
          setWinner(win.winner);
        }
        if (win) {
          setTotalVotes(win.totalVotes);
        }
        console.log(win);
      }
    }
    handleWinners();
  }, []);

  useEffect(() => {
    setAspirants([]);
    setVoteCount([]);
    async function populateresult() {
      const tempCands = [];
      const tempVoteCt = [];
      const len = await retrieveAspirantLength();
      for (let i = 0; i < len; i++) {
        const aspr = await retrieveAspirant(i);

        tempCands.push(aspr[0]);
        tempVoteCt.push(aspr[1]);
      }
      setAspirants(tempCands);
      setVoteCount(tempVoteCt);
    }
    populateresult();
  }, [winner, totalVotes]);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage:
          "url('https://tscfm.org/wp-content/uploads/2022/01/easyvc-to-roll-out-blockchain-based-online-voting-solution.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aspirants &&
            aspirants.length > 0 &&
            aspirants.map((name, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="text-2xl font-bold">{name}</div>
                {voteCount && voteCount.length > 0 && (
                  <div className="text-gray-500 mt-2">
                    {voteCount[index]} Votes
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className="flex flex-col items-center mt-6">
          {winner && totalVotes && (
            <div className="bg-gray-200 rounded-lg p-4">
              <p className="text-lg">
                {winner} won the election, with {totalVotes} votes casted
              </p>
            </div>
          )}
          <div className="flex mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default ViewResult;
