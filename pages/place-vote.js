import React, { useContext, useState, useEffect } from "react";
import Style from "../styles/placeVote.module.css";
import { Button, SumVoteTime, AspirantTable } from "../components/index_1";
import { ContextElection } from "../context/Blockchain.services";

const PlaceVote = () => {
  const { placeVote, retrieveAspirant, retrieveAspirantLength } =
    useContext(ContextElection);
  const [aspirants, setAspirants] = useState([]);
  useEffect(() => {
    const tempCands = [];
    async function retrieve() {
      const len = await retrieveAspirantLength();
      for (let i = 0; i < len; i++) {
        const aspir = await retrieveAspirant(i);

        tempCands.push(aspir[0]);
      }
      setAspirants(tempCands);
    }
    retrieve();
  }, []);
  useEffect(() => {
    console.log(aspirants);
  }, [setAspirants]);

  return (
    <div className={Style.placeVote}>
      {}
      {aspirants && <AspirantTable listedNames={aspirants} />}
    </div>
  );
};

export default PlaceVote;
