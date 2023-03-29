import React, { useContext, useEffect } from "react";
import { Button } from "../components/index_1";
import { ContextElection } from "../context/Blockchain.services";
import { useRouter } from "next/router";

const EnlistVoters = () => {
  const router = useRouter();
  const { enlistVoter, retrieveAspirant, actualVoters, registeredVoters } =
    useContext(ContextElection);

  useEffect(() => {
    registeredVoters();
  }, [actualVoters]);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage:
          "url('https://www.verdict.co.uk/wp-content/uploads/2019/10/shutterstock_1094977760-scaled.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Register to Vote
          </h2>
          <p className="mb-4 text-center">
            Click on the register button below to get registered to vote.
          </p>
          <Button
            btnName="Register"
            handleClick={enlistVoter}
            className="w-full mb-4"
          />

          <hr className="my-4" />

          <div>
            <h3 className="text-lg font-bold mb-2">
              Once registered, your wallet id would display below as
              successfully registered voter.
            </h3>
            {actualVoters && actualVoters.length > 0 ? (
              actualVoters.map((voter) => (
                <div key={voter.voteraddress} className="mb-2">
                  <p className="text-sm">
                    {`${voter.voteraddress.substring(
                      0,
                      7
                    )}...${voter.voteraddress.substring(35, 42)}`}
                    <span
                      className={`ml-2 font-semibold ${
                        voter.votedAlready ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {voter.votedAlready ? "Voted" : "You are yet to vote"}
                    </span>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 mt-2">
                No registered voters found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnlistVoters;
