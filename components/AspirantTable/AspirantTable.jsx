import React, { useContext } from "react";
import { Button } from "../index_1";
import { ContextElection } from "../../context/Blockchain.services";
import { useRouter } from "next/router";

const AspirantGrid = ({ listedNames }) => {
  const router = useRouter();
  const { voteNow } = useContext(ContextElection);

  return (
    <div>
      <style jsx global>{`
        body {
          background-color: #1e3a8a;
        }
      `}</style>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="grid grid-cols-2 gap-4 p-4">
          {listedNames.map((name, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-lg shadow-md flex flex-col justify-between"
            >
              <div className="text-gray-800 font-medium">{name}</div>
              <div className="flex items-center justify-end">
                <Button
                  btnName="Vote"
                  className="bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                  handleClick={() => {
                    voteNow(index);
                    alert("if done successfully, continue to the result page.");
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AspirantGrid;
